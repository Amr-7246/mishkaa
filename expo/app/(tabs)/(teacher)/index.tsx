import { Alert, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHero from '@/src/components/teacher/dashboard/DashboardHero';
import PerformanceIndicator from '@/src/components/teacher/dashboard/PerformanceIndicator';
import HotStates from '@/src/components/teacher/dashboard/HotStates';
import { useDashHome } from '@/src/api/features/teacher/dash-home';
import Loader from '@/src/components/common/Loader';
import { Text } from '@/src/components/ui/text';
import { useFocusEffect } from 'expo-router';
import { useScrollContext } from '@/src/components/common/context/ScrollContext';

export default function index() {
  const { data, isError, isLoading, error } = useDashHome();
  if (isError) {
    return Alert.alert(`يوجد خطاء ما ${error}`);
  }
  //~ Scrolling nave bar sticking logic
  //! useEffect be executed when the route be hitted
  const { onScroll, reset } = useScrollContext();
  useFocusEffect(
    useCallback(() => {
      reset();
    }, [])
  );
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScroll(e.nativeEvent.contentOffset.y);
  };
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="px-4 pt-4">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Text variant={'large'}>لا توجد بيانات بعد</Text>
        ) : (
          <>
            <DashboardHero userName={data?.basic.userName} termCursor={data?.basic.termCursor} />
            <PerformanceIndicator
              revenue={data?.performance.revenue}
              students={data?.performance.students}
              completionRate={data?.performance.completionRate}
              npsScore={data?.performance.npsScore}
            />
            <HotStates
              urgentRequests={data?.hotStates.urgentRequests}
              lastSupscriptions={data?.hotStates.lastSupscriptions}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
