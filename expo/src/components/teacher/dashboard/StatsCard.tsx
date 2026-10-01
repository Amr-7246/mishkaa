import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Badge } from '@/src/components/ui/badge';

interface StatsProps {
  className?: string;
  title: string;
  value: string | number;
  badge?: number | string;
  subtext?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode; // For charts
}

export const StatsCard = ({
  className,
  title,
  value,
  badge,
  subtext,
  icon,
  children,
}: StatsProps) => {
  return (
    <View className={`${className} mb-4 rounded-xl border border-border bg-card p-4`}>
      <View className="mb-2 flex-row items-center justify-between">
        <View className="rounded-full bg-muted p-2">{icon}</View>
        <Text className="text-sm font-bold text-textInactive">{title}</Text>
      </View>

      <View className="items-end">
        <View>
          <Text className="text-2xl font-bold text-text">{value}</Text>
          {badge ?? <Badge>{badge} %</Badge>}
        </View>
        {subtext && <Text className="mt-1 text-xs text-textInactive">{subtext}</Text>}
      </View>

      {children && <View className="mt-4">{children}</View>}
    </View>
  );
};
