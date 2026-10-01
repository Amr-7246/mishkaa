import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CourseOverview } from '@/src/types/courses';
import Loader from '@/src/components/common/Loader';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { ScreenHeader } from '@/src/components/courses/ScreenHeader';
import {
  PlayCircle,
  CheckCircle2,
  Lock,
  MoreVertical,
  BookOpen,
  Filter,
} from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import { useGet } from '@/src/hooks/api/useBaseCrud';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes } from '@/src/constants/Routes';

export default function CourseOverviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  //& Network llaer
  const { data, isLoading } = useGet<CourseOverview>(['course', id], `${Routes.userCourses}/${id}`);
  if (isLoading || !data) return <Loader />;

  // Circular Progress Component
  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (
      <View className="absolute inset-0 items-center justify-center bg-background/70">
        <Svg width="56" height="56" viewBox="0 0 56 56">
          <Circle
            cx="28"
            cy="28"
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth="3.5"
            fill="none"
          />
          <Circle
            cx="28"
            cy="28"
            r={radius}
            stroke="hsl(var(--primary))"
            strokeWidth="3.5"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 28 28)"
          />
        </Svg>
        <Text className="absolute text-[10px] font-bold text-primary">{percentage}%</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScreenHeader
        title="معمارية النظم الموزعة"
        rightAction={
          <TouchableOpacity>
            <MoreVertical size={20} color="hsl(var(--text-inactive))" />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="px-5 pt-4">
        {/* Hero Card */}
        <View className="relative mb-4 overflow-hidden rounded-2xl border border-border bg-card p-4">
          <View className="flex-row gap-3.5">
            <View className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border">
              <Image source={{ uri: data.thumbnail }} className="h-full w-full opacity-80" />
              <CircularProgress percentage={data.progressPercentage} />
            </View>
            <View className="flex-1">
              <View className="mb-1 flex-row items-center gap-1.5">
                <View className="h-1.5 w-1.5 rounded-full bg-primary" />
                <Text className="text-[10px] text-textInactive">{data.subtitle}</Text>
              </View>
              <Text className="mb-2 text-base font-bold text-text" numberOfLines={2}>
                {data.title}
              </Text>
              <View className="flex-row items-center gap-2">
                <Image source={{ uri: data.instructor.avatar }} className="h-6 w-6 rounded-full" />
                <Text className="text-xs font-medium text-text">{data.instructor.name}</Text>
              </View>
            </View>
          </View>
          <View className="mt-3 flex-row items-center justify-between border-t border-border pt-3">
            <Text className="text-xs font-bold text-primary">{data.progressPercentage}% مكتمل</Text>
            <Text className="text-xs text-textInactive">{data.status}</Text>
          </View>
          <Button className="mt-3 w-full flex-row gap-2 rounded-2xl bg-primary">
            <PlayCircle size={18} color="hsl(var(--primary-foreground))" />
            <Text className="font-bold text-primary-foreground">متابعة التعلم...</Text>
          </Button>
        </View>

        {/* Stats Row */}
        <View className="mb-6 flex-row gap-2.5">
          <View className="flex-1 items-center rounded-2xl border border-border bg-card p-2.5">
            <BookOpen size={18} color="hsl(var(--primary))" />
            <Text className="mt-1 text-sm font-bold text-text">{data.stats.completedLessons}</Text>
            <Text className="text-[10px] text-textInactive">درساً منجزاً</Text>
          </View>
          <View className="flex-1 items-center rounded-2xl border border-border bg-card p-2.5">
            <CheckCircle2 size={18} color="hsl(var(--tertiary))" />
            <Text className="mt-1 text-sm font-bold text-text">{data.stats.completedQuizzes}</Text>
            <Text className="text-[10px] text-textInactive">اختبارات منجزة</Text>
          </View>
          <View className="flex-1 items-center rounded-2xl border border-border bg-card p-2.5">
            <MoreVertical size={18} color="hsl(var(--text-inactive))" />
            <Text className="mt-1 text-sm font-bold text-text">{data.stats.watchTime}</Text>
            <Text className="text-[10px] text-textInactive">زمن المشاهدة</Text>
          </View>
        </View>

        {/* Content Section */}
        <View className="mb-3 flex-row items-center justify-between">
          <TouchableOpacity className="flex-row items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5">
            <Text className="text-[10px] text-textInactive">تصفية</Text>
            <Filter size={14} color="hsl(var(--text-inactive))" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-text">محتوى الدورة</Text>
            <View className="h-4 w-1.5 rounded-full bg-primary" />
          </View>
        </View>

        {/* Modules Preview */}
        <View className="gap-3">
          {data.modulesPreview.map((mod) => (
            <TouchableOpacity
              key={mod.id}
              onPress={() => router.push(`/course/${id}/curriculum`)}
              className="rounded-2xl border border-border bg-card p-4">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 flex-row gap-3">
                  <View
                    className={`h-9 w-9 items-center justify-center rounded-full border ${mod.state === 'completed' ? 'bg-tertiary/20 border-tertiary/30' : mod.state === 'locked' ? 'border-border bg-muted' : 'border-primary/30 bg-primary/20'}`}>
                    {mod.state === 'completed' ? (
                      <CheckCircle2 size={16} color="hsl(var(--tertiary))" />
                    ) : mod.state === 'locked' ? (
                      <Lock size={16} color="hsl(var(--text-inactive))" />
                    ) : (
                      <Text className="text-xs font-bold text-primary">{mod.number}</Text>
                    )}
                  </View>
                  <View className="flex-1">
                    <View className="mb-1 flex-row items-center gap-2">
                      <Text className="text-sm font-bold text-text">{mod.title}</Text>
                      {mod.state === 'in_progress' && (
                        <Badge className="bg-primary/15">
                          <Text className="text-[9px] text-primary">قيد الإنجاز</Text>
                        </Badge>
                      )}
                      {mod.state === 'completed' && (
                        <Badge className="bg-tertiary/15">
                          <Text className="text-tertiary text-[9px]">مكتملة</Text>
                        </Badge>
                      )}
                      {mod.state === 'locked' && (
                        <Badge variant="secondary">
                          <Text className="text-[9px]">مغلقة</Text>
                        </Badge>
                      )}
                    </View>
                    <Text className="text-[10px] text-textInactive">
                      {mod.lessonCount} دروس • {mod.duration}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Progress Bar */}
              <View className="mt-3">
                <View className="mb-1 flex-row justify-between">
                  <Text
                    className={`text-[10px] font-bold ${mod.state === 'completed' ? 'text-tertiary' : 'text-primary'}`}>
                    {mod.progressPercentage}%
                  </Text>
                  <Text className="text-[10px] text-textInactive">
                    {mod.completedLessons} من {mod.totalLessons} دروس
                  </Text>
                </View>
                <View className="h-2 w-full overflow-hidden rounded-full bg-background">
                  <View
                    className={`h-full rounded-full ${mod.state === 'completed' ? 'bg-tertiary' : 'bg-primary'}`}
                    style={{ width: `${mod.progressPercentage}%` }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
