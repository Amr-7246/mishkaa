import { View } from 'react-native';
import React from 'react';
import { Text } from '../../ui/text';
import { Button } from '../../ui/button';

interface Props {
  urgentRequests?: {
    name: string;
    role: string;
    message: string;
    status: string;
    date: string;
  }[];

  lastSupscriptions?: {
    name: string;
    courseName: string;
    price: string;
    date: string;
  }[];
}

const HotStates = ({ urgentRequests, lastSupscriptions }: Props) => {
  return (
    <View className="gap-8">
      {/* Urgent Requests */}
      <View className="">
        <View className="mb-3 flex-row items-center justify-between">
          <Badge variant="destructive">
            <Text className="text-xs text-white">2</Text>
          </Badge>
          <Text className="text-lg font-bold text-text">استفسارات عاجلة للطلاب</Text>
        </View>
        {!urgentRequests && <Text variant={'large'}>لا توجد بيانات بعد</Text>}
        {urgentRequests &&
          urgentRequests.map((req) => (
            <View key={req.id} className="mb-3 rounded-xl border border-border bg-card p-4">
              <View className="mb-2 flex-row justify-between">
                <Badge variant="outline">
                  <Text className="text-xs">{req.status}</Text>
                </Badge>
                <Text className="font-bold text-text">{req.name}</Text>
              </View>
              <Text className="mb-2 text-right text-xs text-textInactive">{req.role}</Text>
              <Text className="mb-3 text-right text-sm text-text">{req.message}</Text>
              <View className="flex-row gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Text>إحالة للمساعد</Text>
                </Button>
                <Button size="sm" className="flex-1 bg-primary">
                  <Text className="text-primary-foreground">رد سريع</Text>
                </Button>
              </View>
            </View>
          ))}
      </View>

      {/* Last supscriptions */}
      <View className="flex-center gap-6">
        <View className="mb-3 flex-row items-center justify-between">
          <Badge variant="destructive">
            <Text className="text-xs text-white">2</Text>
          </Badge>
          <Text className="text-lg font-bold text-text">الاشتراكات الاخيرة</Text>
        </View>
        {!lastSupscriptions && <Text variant={'large'}>لا توجد بيانات بعد</Text>}
        {lastSupscriptions &&
          lastSupscriptions.map((sup, idx) => (
            <View key={idx} className="mb-3 rounded-xl border border-border bg-card p-4">
              <View className="mb-2 flex-row justify-between">
                <Badge variant="outline">
                  <Text className="text-xs">{sup.price} $</Text>
                </Badge>
                <Text className="font-bold text-text">{sup.name}</Text>
              </View>
              <Text className="mb-2 text-right text-xs text-textInactive">{sup.courseName}</Text>
              <Text className="mb-3 text-right text-sm text-text">{sup.date}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default HotStates;
