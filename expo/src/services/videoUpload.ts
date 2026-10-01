/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as ImagePicker from 'expo-image-picker';
import * as tus from 'tus-js-client';
import { Alert } from 'react-native';
import apiClient from '../api/apiClient';
import { Routes } from '../constants/Routes';

export type VideoUploadCallbacks = {
  onProgress: (percent: number) => void;
  onSuccess: (uploadUrl: string) => void;
  onError: (error: Error) => void;
  onCancel: () => void;
};

export const handleVideoUpload = async ({
  onProgress,
  onSuccess,
  onError,
  onCancel,
}: VideoUploadCallbacks): Promise<void | tus.Upload> => {
  //& ask the user local media access permission + capture the selected file
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Permission to access camera roll is required!');
    onCancel();
    return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['videos'],
    allowsEditing: false,
    quality: 1,
  });
  if (result.canceled || !result.assets || result.assets.length === 0) {
    onCancel();
    return;
  }
  const selectedVideo = result.assets[0];
  const fileUri = selectedVideo.uri;
  const fileSize = selectedVideo.fileSize;
  const fileDuration = selectedVideo.duration;

  if (!fileSize) {
    onError(new Error('Could not determine video file size.'));
    return;
  }
  //& bring the one time uploadLink + use tus protocol to upload the media
  const bodyData = {
    uploadLength: fileSize.toString(),
    fileDuration: fileDuration?.toString(),
  };
  try {
    const res = await apiClient.post<{ uploadUrl: string }>(Routes.VIDEO_UPLOAD, bodyData);
    if (!res.data) {
      throw new Error('Failed to fetch upload handshake details from backend server.');
    }
    const { uploadUrl } = res.data;

    const upload = new tus.Upload(
      { uri: fileUri },
      {
        endpoint: uploadUrl,
        retryDelays: [0, 1000, 3000, 5000, 10000], // exponential backoff
        metadata: {
          filename: selectedVideo.fileName || 'lecture_video.mp4',
          filetype: 'video/mp4',
          fileDuration: fileDuration?.toString() ?? '',
        },
        onError: (error) => {
          console.error('TUS upload error:', error);
          onError(error);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = Math.round((bytesUploaded / bytesTotal) * 100);
          onProgress(percentage);
        },
        onSuccess: () => {
          console.log('Video successfully uploaded directly to Cloudflare Stream!');
          onSuccess(uploadUrl);
        },
      }
    );
    upload.start();
    return upload; //to store the url at the form and preview the video
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'Network Error';
    onError(new Error(errorMessage));
  }
};

//~ USAGE
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [isUploading, setIsUploading] = useState<boolean>(false);

//   const startUploadProcess = async () => {
//     setIsUploading(true);
//     setUploadProgress(0);

//     await handleVideoSelectionAndUpload(
//       (progress) => {
//         setUploadProgress(progress);
//       },
//       (completedUrl) => {
//         setIsUploading(false);
//         alert("Lecture uploaded successfully!");
//       },
//       (error) => {
//         setIsUploading(false);
//         alert(`Upload Failed: ${error.message}`);
//       }
//     );
//   };
