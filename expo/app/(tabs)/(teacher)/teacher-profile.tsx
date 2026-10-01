import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Menu, Share2, Bookmark, Bell, Loader } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TeacherProfileData } from '@/src/api/features/teacher/teacher';
import BottomNavBar from '@/src/components/student/BottomNavBar';
import { PhilosophySection } from '@/src/components/teacher/profile/PhilosophySection';
import { ProfileHero } from '@/src/components/teacher/profile/ProfileHero';
import { StatsBar } from '@/src/components/teacher/profile/StatsBar';
import { TestimonialCard } from '@/src/components/teacher/profile/TestimonialCard';
import { useGet } from '@/src/hooks/api/useBaseCrud';
import { QueryKeies } from '@/src/constants/QueryKeies';
import { Routes } from '@/src/constants/Routes';
import { CourseCard } from '@/src/components/teacher/profile/CourseCard';

export default function TeacherProfileScreen() {
  //& the network layer
  const { data, isLoading, isError } = useGet<TeacherProfileData>(
    [QueryKeies.teacherProfile],
    Routes.teacherProfile
  );

  if (isLoading) return <Loader />;
  if (isError || !data)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-error">حدث خطأ في تحميل الملف الشخصي</Text>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between border-b border-border bg-card px-4 py-3">
        <View className="flex-row gap-2">
          <TouchableOpacity className="relative p-2">
            <Bell size={22} color="hsl(var(--text))" />
            <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Bookmark size={22} color="hsl(var(--text-inactive))" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Share2 size={22} color="hsl(var(--text-inactive))" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-lg font-bold text-text">منصة باحث...</Text>
          <TouchableOpacity className="p-2">
            <Menu size={24} color="hsl(var(--text))" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="px-4 pt-4">
        {/* Hero Section */}
        <ProfileHero data={data} />

        {/* Stats Bar */}
        <StatsBar stats={data.stats} />

        {/* Philosophy & Video */}
        <PhilosophySection data={data} />

        {/* Courses Section */}
        <View className="mb-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="mt-0.5 text-xs text-textInactive">
              معسكرات تطبيقية ومكثفة تركز على البنى التحتية للمطورين.
            </Text>
            <Text className="text-xl font-bold text-text">
              المسارات التدريبية المميزة ({data.courses.length})
            </Text>
          </View>

          {/* Filter Chips (Mocked) */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row gap-2">
              <Badge className="bg-primary">
                <Text className="text-xs font-bold text-primary-foreground">الكل</Text>
              </Badge>
              <Badge variant="outline" className="border-border">
                <Text className="text-xs text-textInactive">الأكثر طلباً...</Text>
              </Badge>
              <Badge variant="outline" className="border-border">
                <Text className="text-xs text-textInactive">أفواج مباشرة...</Text>
              </Badge>
              <Badge variant="outline" className="border-border">
                <Text className="text-xs text-textInactive">دراسة ذاتية...</Text>
              </Badge>
            </View>
          </ScrollView>

          {data.courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </View>

        {/* Testimonial */}
        <TestimonialCard data={data.testimonial} />

        {/* Enterprise Banner */}
        <View className="mb-4 flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row">
          <View className="flex-1">
            <Text className="mb-1 text-sm font-bold text-text">تدريب مخصص للشركات والمؤسسات؟</Text>
            <Text className="text-xs text-textInactive">
              ورش عمل تطبيقية متخصصة ومصممة للقيادات الهندسية وفرق البحث والتطوير...
            </Text>
          </View>
          <Button variant="outline" className="mt-3 border-border sm:mt-0">
            <Text className="text-xs font-bold text-text">طلب المنهاج...</Text>
          </Button>
        </View>
      </ScrollView>

      <BottomNavBar />
    </SafeAreaView>
  );
}
