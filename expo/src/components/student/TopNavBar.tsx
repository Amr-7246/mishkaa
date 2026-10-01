import { View, Pressable, Animated } from 'react-native';
import React from 'react';
import { School, Menu, User, MessageCircle } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useScrollContext } from '../common/context/ScrollContext';

const TopNavBar = () => {
  const { translateY } = useScrollContext();
  const tabs = [
    { icon: Menu, active: true },
    { icon: MessageCircle, active: false },
    { icon: User, active: false },
  ];
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 100,
        transform: [{ translateY }],
        paddingTop: 44,
        paddingHorizontal: 16,
      }}
      className="flex-center !justify-between border-t border-border bg-card py-2 pb-6">
      <Link href={'/'}>
        <Pressable>
          <School size={'32'} color={'hsl(var(--primary))'} />
        </Pressable>
      </Link>
      <View>
        {tabs.map((tab, idx) => (
          <Pressable key={idx} className="items-center gap-1">
            <tab.icon
              size={24}
              color={tab.active ? 'hsl(var(--primary))' : 'hsl(var(--text-inactive))'}
            />
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
};

export default TopNavBar;
