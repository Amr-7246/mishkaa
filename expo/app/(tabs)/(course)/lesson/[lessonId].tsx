import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Download,
  FileText,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  X,
  Loader,
} from 'lucide-react-native';
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGet } from '@/src/hooks/api/useBaseCrud';
import { LessonPayload } from '@/src/types/courses';
import { Text } from '@/src/components/ui/text';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Routes } from '@/src/constants/Routes';

export default function LessonPlayerScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources'>('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

  //& Network layer
  const { data, isLoading } = useGet<LessonPayload>(
    ['lesson', lessonId],
    `${Routes.courseLessons}/${lessonId}`
  );

  // Initialize Video Player
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const player = useVideoPlayer(data?.videoUrl || '', (player: VideoPlayer) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    player.loop = false;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    player.play();
  });

  if (isLoading || !data) return <Loader />;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Custom Header for Player */}
      <View className="flex-row items-center justify-between border-b border-border bg-background px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center rounded-2xl bg-card">
          <X size={20} color="hsl(var(--text))" />
        </TouchableOpacity>
        <View className="flex-1 items-center px-2">
          <Text className="text-[10px] text-primary">{data.moduleTitle}</Text>
          <Text className="text-sm font-bold text-text" numberOfLines={1}>
            {data.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsBookmarked(!isBookmarked)}
          className="h-9 w-9 items-center justify-center rounded-2xl bg-card">
          <Bookmark
            size={20}
            color={isBookmarked ? 'hsl(var(--primary))' : 'hsl(var(--text-inactive))'}
            fill={isBookmarked ? 'hsl(var(--primary))' : 'none'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Video Player Section */}
        <View className="relative aspect-video w-full bg-black">
          <VideoView
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            player={player}
            style={{ width: '100%', height: '100%' }}
            fullscreenOptions={{ enable: true }}
            allowsPictureInPicture
          />
          {/* Custom overlay for academic feel (optional, as expo-video has native controls) */}
          <View className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1">
            <Text className="text-[10px] font-bold text-white">1080p • بث فائق الدقة</Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="m-4 flex-row rounded-2xl border border-border bg-card p-1">
          {(['overview', 'notes', 'resources'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 items-center rounded-2xl py-2 ${activeTab === tab ? 'bg-primary' : ''}`}>
              <Text
                className={`text-xs font-bold ${activeTab === tab ? 'text-primary-foreground' : 'text-textInactive'}`}>
                {tab === 'overview'
                  ? 'نظرة عامة'
                  : tab === 'notes'
                    ? 'الملاحظات'
                    : 'المصادر والمرفقات'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View className="gap-4 px-4">
          {activeTab === 'overview' && (
            <>
              {/* Summary Card */}
              <View className="rounded-2xl border border-border bg-card p-4">
                <View className="mb-3 flex-row items-center gap-2">
                  <View className="h-4 w-1 rounded-full bg-primary" />
                  <Text className="text-sm font-bold text-text">ملخص المحتوى</Text>
                </View>
                <Text className="mb-4 text-right text-sm leading-relaxed text-textInactive">
                  {data.summary}
                </Text>

                <View className="border-t border-border/60 pt-3">
                  <Text className="mb-3 text-sm font-bold text-text">
                    ماذا ستتعلم في هذا الدرس:
                  </Text>
                  <View className="gap-2.5">
                    {data.learningObjectives.map((obj, i) => (
                      <View key={i} className="flex-row items-start gap-2.5">
                        <CheckCircle2 size={16} color="hsl(var(--primary))" className="mt-0.5" />
                        <Text className="flex-1 text-right text-sm text-textInactive">{obj}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Quiz Prerequisite Gate */}
              {data.quizGate && (
                <View className="rounded-2xl border border-primary/30 bg-card p-4">
                  <View className="flex-row items-start gap-3">
                    <View className="h-10 w-10 items-center justify-center rounded-2xl border border-primary/40 bg-primary/20">
                      <FileText size={20} color="hsl(var(--primary))" />
                    </View>
                    <View className="flex-1">
                      <View className="mb-1 flex-row items-center justify-between">
                        <Text className="text-sm font-bold text-text">{data.quizGate.title}</Text>
                        <Badge className="bg-primary/20">
                          <Text className="text-[9px] font-bold text-primary"></Text>
                        </Badge>
                      </View>
                      <Text className="text-right text-xs leading-relaxed text-textInactive">
                        اجتياز هذا الاختبار القصير بدرجة لا تقل عن {data.quizGate.passingScore}% شرط
                        أساسي لإلغاء قفل الدرس الموالي.
                      </Text>
                    </View>
                  </View>
                  <View className="mt-4 flex-row items-center justify-between border-t border-border/60 pt-3">
                    <Text className="text-[10px] text-textInactive">
                      الزمن المقدر: {data.quizGate.estimatedTime}
                    </Text>
                    <Button
                      onPress={() => router.push(`/quiz/${data.quizGate!.id}`)}
                      className="rounded-2xl bg-primary">
                      <Text className="text-xs font-bold text-primary-foreground">
                        بدء الاختبار...
                      </Text>
                    </Button>
                  </View>
                </View>
              )}
            </>
          )}

          {activeTab === 'resources' && (
            <View className="gap-3">
              {data.resources.map((res) => (
                <View
                  key={res.id}
                  className="flex-row items-center justify-between rounded-2xl border border-border bg-card p-3">
                  <View className="flex-1 flex-row items-center gap-3">
                    <View className="h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background">
                      <FileText size={22} color="hsl(var(--primary))" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-right text-sm font-semibold text-text">
                        {res.title}
                      </Text>
                      <Text className="text-right text-[10px] text-textInactive">
                        {res.size} • {res.pages}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card">
                    <Download size={18} color="hsl(var(--text))" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-3 border-t border-border bg-background/95 p-4">
        <Button
          variant="outline"
          disabled={!data.navigation.previousLessonId}
          onPress={() =>
            data.navigation.previousLessonId &&
            router.push(`/lesson/${data.navigation.previousLessonId}`)
          }
          className="flex-1 flex-row gap-1.5 rounded-2xl border-border">
          <ArrowRight size={16} color="hsl(var(--text))" />
          <Text className="text-xs font-bold text-text">السابق</Text>
        </Button>
        <Button
          disabled={data.navigation.isNextLocked}
          onPress={() =>
            data.navigation.nextLessonId && router.push(`/lesson/${data.navigation.nextLessonId}`)
          }
          className={`flex-1 flex-row gap-2 rounded-2xl ${data.navigation.isNextLocked ? 'bg-muted' : 'bg-primary'}`}>
          <Text
            className={`text-xs font-bold ${data.navigation.isNextLocked ? 'text-textInactive' : 'text-primary-foreground'}`}>
            الدرس التالي
          </Text>
          {data.navigation.isNextLocked ? (
            <Lock size={14} color="hsl(var(--text-inactive))" />
          ) : (
            <ArrowLeft size={16} color="hsl(var(--primary-foreground))" />
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
}
