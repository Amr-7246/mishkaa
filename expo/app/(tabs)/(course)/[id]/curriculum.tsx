import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronDown, ChevronUp, PlayCircle, Lock, Check, Loader } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/src/components/courses/ScreenHeader';
import { useGet } from '@/src/hooks/api/useBaseCrud';
import { CourseCurriculum } from '@/src/types/courses';
import { Text } from '@/src/components/ui/text';
import { Badge } from '@/src/components/ui/badge';
import { Routes } from '@/src/constants/Routes';

export default function CurriculumScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  //& Network layer
  const { data, isLoading } = useGet<CourseCurriculum>(
    ['curriculum', id],
    `${Routes.courseCurriculum}/${id}`
  );

  // Set initial expanded module when data loads
  React.useEffect(() => {
    if (data && !expandedId) {
      const activeModule = data.modules.find((m) => m.isExpanded);
      if (activeModule) setExpandedId(activeModule.id);
    }
  }, [data]);

  if (isLoading || !data) return <Loader />;

  const toggleExpand = (modId: string) => {
    setExpandedId((prev) => (prev === modId ? null : modId));
  };

  const renderLessonIcon = (state: string) => {
    switch (state) {
      case 'completed':
        return <Check size={16} color="hsl(var(--success))" />;
      case 'current':
        return <PlayCircle size={18} color="hsl(var(--primary-foreground))" />;
      case 'locked':
        return <Lock size={16} color="hsl(var(--text-inactive))" />;
      default:
        return <View className="h-2 w-2 rounded-full bg-border" />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScreenHeader title="منهج ومحتوى الدورة" subtitle="هندسة المنظومات البرمجية" />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="px-4 pt-4">
        {/* Overall Progress Card */}
        <View className="mb-4 rounded-2xl border border-border bg-card p-4">
          <View className="mb-2.5 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="h-2.5 w-2.5 rounded-full bg-primary" />
              <Text className="text-sm font-bold text-text">
                الإنجاز العام: {data.overallProgress}%
              </Text>
            </View>
            <Badge className="border-primary/20 bg-primary/10">
              <Text className="text-xs text-primary">
                {data.completedLessons} من {data.totalLessons} درس
              </Text>
            </Badge>
          </View>
          <View className="h-2 w-full overflow-hidden rounded-full bg-background">
            <View
              className="h-full rounded-full bg-primary"
              style={{ width: `${data.overallProgress}%` }}
            />
          </View>
          <View className="mt-3 flex-row items-center justify-between border-t border-border/50 pt-2.5">
            <Text className="text-[10px] text-textInactive">
              متبقي تقريباً {data.remainingTime}
            </Text>
            <Text className="text-tertiary text-[10px]">شهادة معتمدة</Text>
          </View>
        </View>

        {/* Accordion Modules */}
        <View className="gap-3.5">
          {data.modules.map((mod) => {
            const isExpanded = expandedId === mod.id;
            return (
              <View
                key={mod.id}
                className="overflow-hidden rounded-2xl border border-border bg-card">
                <TouchableOpacity
                  onPress={() => toggleExpand(mod.id)}
                  className={`flex-row items-center justify-between p-4 ${isExpanded ? 'border-b border-border bg-card/90' : ''}`}>
                  <View className="flex-1 flex-row items-center gap-3">
                    <View
                      className={`h-8 w-8 items-center justify-center rounded-xl border ${isExpanded ? 'border-primary/30 bg-primary/15' : 'border-border bg-background'}`}>
                      <Text
                        className={`text-sm font-bold ${isExpanded ? 'text-primary' : 'text-textInactive'}`}>
                        {mod.number}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-bold text-text">{mod.title}</Text>
                      <Text className="mt-0.5 text-[10px] text-textInactive">
                        {mod.completedLessons}/{mod.totalLessons} دروس مكتملة
                      </Text>
                    </View>
                  </View>
                  <View className="h-8 w-8 items-center justify-center rounded-xl bg-background">
                    {isExpanded ? (
                      <ChevronUp size={20} color="hsl(var(--primary))" />
                    ) : (
                      <ChevronDown size={20} color="hsl(var(--text-inactive))" />
                    )}
                  </View>
                </TouchableOpacity>

                {isExpanded && (
                  <View className="gap-2.5 bg-background/50 p-3">
                    {mod.lessons.map((lesson) => {
                      const isCurrent = lesson.state === 'current';
                      const isLocked = lesson.state === 'locked';
                      const isCompleted = lesson.state === 'completed';
                      return (
                        <TouchableOpacity
                          key={lesson.id}
                          onPress={() => {
                            if (!isLocked) router.push(`/lesson/${lesson.id}`);
                          }}
                          disabled={isLocked}
                          className={`flex-row items-center justify-between rounded-xl border p-3 ${
                            isCurrent
                              ? 'border-2 border-primary bg-card'
                              : isLocked
                                ? 'border-border/20 bg-background/50 opacity-60'
                                : 'border-border/30 bg-card/50'
                          }`}>
                          <View className="flex-1 flex-row items-center gap-3">
                            <View
                              className={`h-8 w-8 items-center justify-center rounded-full ${
                                isCompleted
                                  ? 'bg-success/15'
                                  : isCurrent
                                    ? 'bg-primary'
                                    : 'border border-border bg-background'
                              }`}>
                              {renderLessonIcon(lesson.state)}
                            </View>
                            <View className="flex-1">
                              <View className="flex-row items-center gap-2">
                                <Text
                                  className={`text-xs font-semibold ${isCurrent ? 'text-primary' : isLocked ? 'text-textInactive' : 'text-text'}`}>
                                  {lesson.title}
                                </Text>
                                {isCurrent && (
                                  <View className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                                )}
                              </View>
                              <Text className="mt-0.5 text-[10px] text-textInactive">
                                {lesson.duration} •{' '}
                                {lesson.type === 'video'
                                  ? 'فيديو'
                                  : lesson.type === 'pdf'
                                    ? 'مستند'
                                    : 'اختبار'}
                              </Text>
                              {lesson.lockReason && (
                                <Text className="mt-1 text-[9px] text-textInactive">
                                  {lesson.lockReason}
                                </Text>
                              )}
                            </View>
                          </View>
                          {isCurrent && (
                            <Badge className="bg-primary">
                              <Text className="text-[9px] text-primary-foreground">
                                الدرس الحالي
                              </Text>
                            </Badge>
                          )}
                          {isCompleted && (
                            <Badge variant="secondary" className="bg-success/10">
                              <Text className="text-[9px] text-success">مكتمل</Text>
                            </Badge>
                          )}
                          {isLocked && <Lock size={14} color="hsl(var(--text-inactive))" />}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/95 p-4">
        <TouchableOpacity
          onPress={() => router.push(`/lesson/${data.nextLesson.id}`)}
          className="flex-row items-center justify-between rounded-2xl border border-border bg-card p-3">
          <View className="flex-row items-center gap-2">
            <View className="h-10 w-2.5 rounded-full bg-primary" />
            <View>
              <Text className="text-[10px] text-textInactive">مواصلة التعلم</Text>
              <Text className="text-sm font-bold text-text">
                الدرس القادم: {data.nextLesson.title}
              </Text>
            </View>
          </View>
          <View className="h-11 flex-row items-center gap-2 rounded-xl bg-primary px-4">
            <Text className="text-sm font-bold text-primary-foreground">بدء الدرس</Text>
            <PlayCircle
              size={18}
              color="hsl(var(--primary-foreground))"
              fill="hsl(var(--primary-foreground))"
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
