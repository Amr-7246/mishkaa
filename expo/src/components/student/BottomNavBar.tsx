import { View, Pressable } from 'react-native';
import React from 'react';
import { BookOpen, Home, LayoutGrid, User } from 'lucide-react-native';
import { Text } from '../ui/text';
import { Link, usePathname } from 'expo-router';

const BottomNavBar = () => {
  const pathname = usePathname();
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: Home, href: '/' },
    { id: 'courses', label: 'الدورات', icon: LayoutGrid, href: '/courses' },
    { id: 'blog', label: 'المدونة', icon: BookOpen, href: '/blog' },
    { id: 'profile', label: 'حسابي', icon: User, href: '/profile' },
  ];
  return (
    <View className="flex-center !justify-around border-t border-border bg-card py-2 pb-6">
      {tabs.map((tab, idx) => {
        const isActive = tab.href === pathname;
        return (
          <Link key={idx} href={tab.href} asChild>
            <Pressable
              android_ripple={{ color: 'gray' }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              })}
              hitSlop={10}
              className="items-center gap-1">
              <tab.icon
                size={24}
                color={isActive ? 'hsl(var(--primary))' : 'hsl(var(--text-inactive))'}
              />
              <Text
                className={`text-xs ${isActive ? 'font-bold text-primary' : 'text-textInactive'}`}>
                {tab.label}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
};

export default BottomNavBar;
