/* eslint-disable @tanstack/query/prefer-query-options */
/* eslint-disable @tanstack/query/exhaustive-deps */
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
  QueryKey,
} from '@tanstack/react-query';
import { Alert } from 'react-native';
import apiClient from '../../api/apiClient';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from '@/src/lib/toast';

//~ TYPES
interface NestApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}

interface UseMutationOptions<TResponse> {
  successMessage?: string;
  onSuccess?: (data: TResponse) => void;
  invalidateKeys?: string[][];
}

type UsePostOptions<TRequest, TResponse> = {
  invalidateKeys?: readonly QueryKey[];
  successMessage?: string;
  onSuccess?: (data: TResponse, variables: TRequest) => void | Promise<void>;
  onError?: (error: AxiosError<NestApiError>, variables: TRequest) => void;
  axiosConfig?: AxiosRequestConfig;
};

//& GENERIC POST HOOK
export const usePost = <TRequest, TResponse>(
  route: string,
  options?: UsePostOptions<TRequest, TResponse>
): UseMutationResult<TResponse, AxiosError<NestApiError>, TRequest> => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, AxiosError<NestApiError>, TRequest>({
    mutationFn: async (data: TRequest) => {
      const res = await apiClient.post<TResponse>(route, data, options?.axiosConfig);
      return res.data;
    },
    onSuccess: async (data, variables) => {
      if (options?.invalidateKeys?.length) {
        await Promise.all(
          options.invalidateKeys.map((key) => queryClient.invalidateQueries({ queryKey: key }))
        );
      }
      toast.show('success', 'كدة كله تمام', {
        description: options?.successMessage ?? 'تم تنفيذ طلبك بنجاح',
      });
      await options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      handleApiError(error);
      options?.onError?.(error, variables);
    },
  });
};

//& GENERIC READ HOOK
export const useGet = <TResponse>(
  queryKey: any[],
  route: string,
  staleTime = 1000 * 60 * 5 // Defaults to 5 minutes fresh
): UseQueryResult<TResponse, AxiosError<NestApiError>> => {
  return useQuery<TResponse, AxiosError<NestApiError>>({
    queryKey,
    queryFn: async () => {
      const res = await apiClient.get<TResponse>(route);
      return res.data;
    },
    staleTime,
  });
};

//& GENERIC UPDATE HOOK
export const useUpdate = <TRequest = any, TResponse = any>(
  route: string,
  options?: UseMutationOptions<TResponse>
): UseMutationResult<TResponse, AxiosError<NestApiError>, TRequest> => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, AxiosError<NestApiError>, TRequest>({
    mutationFn: async (data: TRequest) => {
      const res = await apiClient.put<TResponse>(route, data);
      return res.data;
    },
    onSuccess: (data) => {
      if (options?.invalidateKeys) {
        options.invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
      }
      options?.onSuccess
        ? options.onSuccess(data)
        : Alert.alert('نجاح', options?.successMessage ?? 'تم تحديث البيانات بنجاح');
    },
    onError: (error) => handleApiError(error),
  });
};

//& GENERIC DELETE HOOK
export const useDelete = <TResponse = any>(
  route: string,
  options?: UseMutationOptions<TResponse>
): UseMutationResult<TResponse, AxiosError<NestApiError>, string | number> => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, AxiosError<NestApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      // Appends ID to the endpoint dynamically (e.g., /courses/12)
      const res = await apiClient.delete<TResponse>(`${route}/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (options?.invalidateKeys) {
        options.invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
      }
      options?.onSuccess
        ? options.onSuccess(data)
        : Alert.alert('نجاح', options?.successMessage ?? 'تم حذف العنصر بنجاح');
    },
    onError: (error) => handleApiError(error),
  });
};

//~ Helper Error Handler
const handleApiError = (error: AxiosError<NestApiError>) => {
  const serverMessage = error.response?.data?.message;
  const formattedMessage = Array.isArray(serverMessage)
    ? serverMessage.join('\n')
    : (serverMessage ?? 'حدث خطأ غير متوقع');
  toast.show('error', 'فى حاجة غلط', { description: formattedMessage });
};
