import { View, Pressable, Animated, Image } from 'react-native';
import React from 'react';
import { MessageCircle } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useScrollContext } from '../common/context/ScrollContext';
import { Text } from '../ui/text';

const TopNavBar = (avatar?: string, username?: string, title?: string) => {
  const { translateY } = useScrollContext();
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
      <View>
        <Link href={'/'}>
          <Pressable>
            <Image source={{ uri: avatar }} />
          </Pressable>
        </Link>
        <View>
          <Text variant={'large'}>{username}</Text>
          <Text variant={'muted'}>{title}</Text>
        </View>
      </View>
      <View className="">
        <MessageCircle size={26} />
      </View>
    </Animated.View>
  );
};

export default TopNavBar;
