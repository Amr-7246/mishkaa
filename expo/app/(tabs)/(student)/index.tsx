import { HeroSection } from '@/src/components/student/home/HeroSection';
import SearchFilterBar from '@/src/components/student/home/SearchFilterBar';
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react-native';
import { useHomeList } from '@/src/api/features/student/home-list';
import { InstructorCard } from '@/src/components/student/home/InstructorCard';
import { CourseCard } from '@/src/components/student/home/CourseCard';
import { Skeleton } from '@/src/components/ui/skeleton';
import { useScrollContext } from '@/src/components/common/context/ScrollContext';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function StudentHomeScreen() {
  const { onScroll, reset } = useScrollContext();
  const { isError, isLoading, data: homeList, error, refetch } = useHomeList();

  //~ Scrolling nave bar sticking logic
  //! useEffect be executed when the route be hitted
  useFocusEffect(
    useCallback(() => {
      reset();
    }, [])
  );
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScroll(e.nativeEvent.contentOffset.y);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 24 }}>
        {/*//& Hero Section + search/filter bar */}
        <HeroSection />
        <SearchFilterBar />

        {/*//& teacher listing */}
        <View className="flex-center !justify-between">
          <Text variant={'h1'} className="border-r-6 border-primary pr-4">
            هيئة التدريس
          </Text>
          <Button variant={'ghost'} size={'sm'}>
            <ArrowLeft size={16} />
            <Text variant={'small'}>هيئة التدريس</Text>
          </Button>
        </View>

        {isLoading && (
          <View className="flex-1 items-center justify-center">
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <Skeleton key={idx} className="mb-8 h-[20px] w-[100%] rounded-full" />
            ))}
          </View>
        )}

        {isError && (
          <View className="flex-1 items-center justify-center gap-3 px-6">
            <Text variant="muted" className="text-center">
              {error?.message ?? 'حدث خطأ غير متوقع'}
            </Text>
            <Button
              variant="outline"
              size="sm"
              onPress={() => {
                refetch();
              }}>
              <RefreshCw size={16} />
              <Text>إعادة المحاولة</Text>
            </Button>
          </View>
        )}

        {homeList &&
          homeList.data.map((list) => (
            <View>
              {/* topper teacher info card */}
              <InstructorCard
                name={list.fullName}
                title={list.bio ?? ''}
                imageLink={list.avatarUrl ?? ''}
                feild={
                  (Array.isArray(list.specialties) ? list.specialties[0] : list.specialties) ?? ''
                }
                students={list.totalStudents}
                courseNumber={list.totalCourses}
              />

              {/* Section Header: Courses */}
              <View className="mb-3 mt-2 flex-row items-center justify-between">
                <View className="flex-row gap-2">
                  <Pressable>
                    <Text className="text-xs text-textInactive">مرئيات</Text>
                  </Pressable>
                  <Pressable>
                    <Text className="text-xs font-bold text-primary">مسارات</Text>
                  </Pressable>
                </View>
                <Text className="text-lg font-bold text-text">المسارات المطروحة</Text>
              </View>

              {/* Horizontal Course List */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-8"
                contentContainerStyle={{ paddingLeft: 16 }} // For RTL spacing
              >
                {list.courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    thumbnail={course.thumbnailUrl}
                    duration={String(course.durationSeconds)}
                    price={course.price}
                    isActive={true}
                  />
                ))}
              </ScrollView>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
