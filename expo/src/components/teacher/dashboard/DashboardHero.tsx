import { ScrollView, View } from 'react-native';
import React from 'react';
import { Text } from '../../ui/text';
import { Badge } from '../../ui/badge';
import { MoreHorizontal, Send } from 'lucide-react-native';
import { Button } from '../../ui/button';

interface Props {
  userName?: string;
  termCursor?: string;
}

const DashboardHero = ({ userName, termCursor }: Props) => {
  return (
    <View className="flex-center my-6 gap-8">
      {/* date and term cursor */}
      <View className="flex-centre !justify-between">
        <Text variant={'muted'} className="text-xs text-primary">
          {/* (e.g., "Apr 25") */}
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{' '}
        </Text>
        <Badge variant="outline" className="border-primary/20 bg-primary/10">
          <Text className="text-xs text-primary">
            {' '}
            {termCursor ?? 'الفصل الخريفي - الاسبوع الاول'}{' '}
          </Text>
        </Badge>
      </View>

      {/* Greeting */}
      <View className="items-end">
        <Text variant={'h1'} className="mb-1 text-2xl font-bold text-text">
          مرحباً {userName ?? ''}
        </Text>
        <Text variant={'h3'} className="text-right text-sm text-textInactive">
          ملخص تنفيذي لأداء الدفعات، المهام التشغيلية، وإنجازات الطلاب اليوم.
        </Text>
      </View>

      {/* Quick Actions */}
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingLeft: 16 }}
        showsHorizontalScrollIndicator={false}
        className="flex-row gap-3">
        <Button>
          <MoreHorizontal size={16} color="hsl(var(--text))" />
          <Text className="text-text">اضافة كورس</Text>
        </Button>
        <Button variant="outline">
          <Send size={16} color="hsl(var(--text))" />
          <Text className="text-text">عرض الكورسات</Text>
        </Button>
        <Button variant="secondary">
          <Send size={16} color="hsl(var(--text))" />
          <Text className="text-text">الاشتراكات</Text>
        </Button>
        <Button variant="ghost">
          <Send size={16} color="hsl(var(--text))" />
          <Text className="text-text">بيانات المحفطة</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default DashboardHero;
