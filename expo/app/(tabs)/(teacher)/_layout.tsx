import { Stack } from 'expo-router';
import { View } from 'react-native';
import TopNavBar from '@/src/components/teacher/TopNavBar';
import { ScrollProvider } from '@/src/components/common/context/ScrollContext';
import { BottomNavBar } from '@/src/components/teacher/BottomNavBar';

const NAVBAR_TOTAL_HEIGHT = 64 + 44;

export default function TeacherLayout() {
  return (
    <ScrollProvider>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            // Push every screen's content down so it's NOT hidden under the navbar
            contentStyle: {
              paddingTop: NAVBAR_TOTAL_HEIGHT,
            },
          }}
        />
        <TopNavBar />
        <BottomNavBar />
      </View>
    </ScrollProvider>
  );
}
