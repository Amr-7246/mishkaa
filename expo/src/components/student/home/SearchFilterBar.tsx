import { View } from 'react-native';
import React from 'react';
import { Filter, Search } from 'lucide-react-native';
import { Input } from '../../ui/input';

const SearchFilterBar = () => {
  return (
    <View className="flex-center !justify-between rounded-none bg-card p-6">
      {/*//& search bar */}
      <View className="mb-6 flex-row items-center rounded-lg border border-border bg-background px-3 py-1">
        <Search size={20} color="hsl(var(--primary))" />
        <Input
          placeholder="ابحث عن محاضر، تخصص، أو مسار..."
          placeholderTextColor="hsl(var(--text-inactive))"
          className="flex-1 px-2 py-2 text-right text-text"
          textAlign="right"
        />
      </View>

      {/*//& Filter bar */}
      <View className="flex-center rounded-none bg-background p-6">
        <Filter size={20} color="hsl(var(--primary))" />
      </View>
    </View>
  );
};

export default SearchFilterBar;
