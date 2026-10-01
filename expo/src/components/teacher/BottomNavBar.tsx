import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { LayoutDashboard, Users, FileText, Settings } from 'lucide-react-native';

export const BottomNavBar = () => {
  const tabs = [
    { id: 'dashboard', label: 'لوحة القيادة', icon: LayoutDashboard, active: true },
    { id: 'students', label: 'الطلاب', icon: Users, active: false },
    { id: 'requests', label: 'الطلبات', icon: FileText, active: false },
    { id: 'settings', label: 'الإعدادات', icon: Settings, active: false },
  ];

  return (
    <View className="flex-row items-center justify-around border-t border-border bg-card py-2 pb-6">
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.id} className="items-center gap-1">
          <tab.icon
            size={24}
            color={tab.active ? 'hsl(var(--primary))' : 'hsl(var(--text-inactive))'}
          />
          <Text
            className={`text-xs ${tab.active ? 'font-bold text-primary' : 'text-textInactive'}`}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
