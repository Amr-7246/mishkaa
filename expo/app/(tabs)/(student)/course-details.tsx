import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import {
  ArrowRight,
  Bookmark,
  Share2,
  MessageCircle,
  GraduationCap,
  Loader,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CourseDetailsData } from '@/src/api/features/student/course';
import BottomNavBar from '@/src/components/student/BottomNavBar';
import { CourseHero } from '@/src/components/student/courseDetails/CourseHero';
import { InstructorBrief } from '@/src/components/student/courseDetails/InstructorBrief';
import { LearningOutcomes } from '@/src/components/student/courseDetails/LearningOutcomes';
import { MetricsGrid } from '@/src/components/student/courseDetails/MetricsGrid';
import { RequirementsCard } from '@/src/components/student/courseDetails/RequirementsCard';
import { ReviewsSnippet } from '@/src/components/student/courseDetails/ReviewsSnippet';
import { SyllabusAccordion } from '@/src/components/student/courseDetails/SyllabusAccordion';
import { useGet } from '@/src/hooks/api/useBaseCrud';

export default function CourseDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); // Get course ID from route params

  // Use your generic hook
  const { data, isLoading, isError } = useGet<CourseDetailsData>(
    ['course-details', id], // Query Key with dynamic ID
    `/courses/${id}` // Route
  );

  if (isLoading) return <Loader />;
  if (isError || !data)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-error">حدث خطأ في تحميل تفاصيل الدورة</Text>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between border-b border-border bg-background/95 px-5 py-4">
        <View className="flex-row gap-2">
          <Pressable className="h-10 w-10 items-center justify-center rounded-full border border-border bg-card">
            <Share2 size={20} color="hsl(var(--text))" />
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full border border-border bg-card">
            <Bookmark size={20} color="hsl(var(--text))" />
          </Pressable>
        </View>
        <View className="flex-row items-center gap-3">
          <Text className="text-base font-bold text-text">تفاصيل الدورة الأكاديمية</Text>
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full border border-border bg-card">
            <ArrowRight size={20} color="hsl(var(--text))" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }} // Extra padding for sticky bottom bar
        showsVerticalScrollIndicator={false}
        className="px-5 pt-4">
        <CourseHero data={data} />
        <InstructorBrief instructor={data.instructor} />
        <MetricsGrid metrics={data.metrics} />
        <LearningOutcomes outcomes={data.learningOutcomes} />
        <SyllabusAccordion modules={data.modules} />
        <RequirementsCard requirements={data.requirements} />
        <ReviewsSnippet reviews={data.reviews} />
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View className="absolute bottom-16 left-0 right-0 border-t border-border bg-background/95 p-3">
        <View className="flex-row items-center justify-between rounded-2xl border border-border bg-card p-3 shadow-lg">
          {/* Price Section */}
          <View className="pr-2">
            <Text className="text-[10px] text-textInactive">القيمة الإجمالية</Text>
            <View className="flex-row items-baseline gap-1.5">
              <Text className="text-xl font-extrabold text-text">{data.pricing.currentPrice}</Text>
              <Text className="text-xs font-bold text-primary">{data.pricing.currency}</Text>
              <Text className="text-xs text-textInactive line-through">
                {data.pricing.originalPrice} {data.pricing.currency}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row items-center gap-2">
            <Pressable className="h-11 w-11 items-center justify-center rounded-full border border-border bg-background">
              <MessageCircle size={20} color="hsl(var(--text))" />
            </Pressable>
            <Button className="flex-row gap-2 rounded-full bg-primary px-5 py-3">
              <GraduationCap size={20} color="hsl(var(--primary-foreground))" />
              <Text className="text-sm font-bold text-primary-foreground">
                سجل في الدورة الآن...
              </Text>
            </Button>
          </View>
        </View>
      </View>

      <BottomNavBar />
    </SafeAreaView>
  );
}
