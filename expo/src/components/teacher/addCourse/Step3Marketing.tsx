import React, { useState } from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Text } from '@/src/components/ui/text';
import { Input } from '@/src/components/ui/input';
import { UploadCloud, PlayCircle } from 'lucide-react-native';
import { CreateCourseFormData } from '@/src/schemas/courseSchema';
import { handleVideoUpload } from '@/src/services/videoUpload';
import { toast } from '@/src/lib/toast';

export const Step3Marketing = () => {
  const { control } = useFormContext<CreateCourseFormData>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  //& File upload logic
  const startUploadProcess = async (onChange: (url: string) => void): Promise<void> => {
    if (isUploading) return;
    setIsUploading(true);
    setUploadProgress(0);

    await handleVideoUpload({
      onProgress: setUploadProgress,
      onSuccess: (uploadUrl) => {
        setIsUploading(false);
        toast.show('success', 'تم رفع الفيديو بنجاح');
        onChange(uploadUrl);
      },
      onError: (error) => {
        setIsUploading(false);
        toast.show('error', 'فشل رفع الفيديو', { description: error.message });
      },
      onCancel: () => {
        setIsUploading(false);
      },
    });
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Text className="mb-4 text-right text-lg font-bold text-text">التسويق والوسائط</Text>

      {/* Thumbnail Upload */}
      <View className="mb-6">
        <Text className="mb-2 text-right text-sm text-textInactive">صورة غلاف الدورة</Text>
        <Pressable className="h-40 items-center justify-center overflow-hidden rounded-xl border border-border bg-card">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400',
            }}
            className="absolute h-full w-full opacity-50"
          />
          <UploadCloud size={32} color="hsl(var(--text))" />
          <Text className="mt-2 text-xs text-text">اسحب الملف أو اضغط للرفع</Text>
        </Pressable>
      </View>

      {/* Promo Video Upload */}
      <View className="mb-6">
        <Text className="mb-2 text-right text-sm text-textInactive">الفيديو الترويجي</Text>
        <Controller
          control={control}
          name="courseIntroUrl"
          render={({ field: { onChange, value } }) => (
            <View className="items-center rounded-xl border border-border bg-card p-4">
              {value ? (
                <View className="items-center">
                  <PlayCircle size={40} color="hsl(var(--primary))" />
                  <Text className="mt-2 text-xs text-success">تم الرفع بنجاح</Text>
                </View>
              ) : (
                <Pressable
                  onPress={() => void startUploadProcess(onChange)}
                  className="items-center">
                  <UploadCloud size={32} color="hsl(var(--textInactive))" />
                  <Text className="mt-2 text-xs text-textInactive">
                    {isUploading ? `جاري الرفع... ${uploadProgress}%` : 'رفع فيديو (MP4)'}
                  </Text>
                </Pressable>
              )}
            </View>
          )}
        />
      </View>

      {/* Pricing */}
      <View className="mb-6">
        <Text className="mb-2 text-right text-sm text-textInactive">سعر الدورة (بالجنيه)</Text>
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={(text) => onChange(Number(text))}
              className="text-right"
              placeholder="0.00"
            />
          )}
        />
      </View>
    </ScrollView>
  );
};
