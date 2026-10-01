import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Badge } from '@/src/components/ui/badge';
import { Plus, Trash2, Video } from 'lucide-react-native';
import { CreateCourseFormData } from '@/src/schemas/courseSchema';

export const Step2Curriculum = () => {
  const { control, register } = useFormContext<CreateCourseFormData>();
  const {
    fields: modules,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: 'modules',
  });

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="mb-4 flex-row items-center justify-between">
        <Button
          size="sm"
          variant="outline"
          onPress={() => appendModule({ title: '', description: '', isPublished: false })}>
          <Plus size={16} color="hsl(var(--text))" />
          <Text className="ml-1 text-text">إضافة وحدة</Text>
        </Button>
        <Text className="text-lg font-bold text-text">المنهج الدراسي</Text>
      </View>

      {modules.map((module, mIndex) => (
        <View key={module.id} className="mb-4 rounded-xl border border-border bg-card p-4">
          <View className="mb-3 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => removeModule(mIndex)}>
              <Trash2 size={18} color="hsl(var(--error))" />
            </TouchableOpacity>
            <Text className="font-bold text-text">الوحدة {mIndex + 1}</Text>
          </View>

          <Input
            {...register(`modules.${mIndex}.title`)}
            placeholder="عنوان الوحدة الدراسية"
            className="mb-3 text-right"
          />

          {/* Lessons would be nested here using another useFieldArray, 
              but to keep code readable, we simulate the Lesson Card UI */}
          <View className="mb-2 flex-row items-center justify-between rounded-lg border border-border bg-background p-3">
            <View className="flex-row gap-2">
              <Video size={16} color="hsl(var(--primary))" />
              <Badge variant="secondary">
                <Text>1.1</Text>
              </Badge>
            </View>
            <Text className="text-sm text-text">مقدمة نظرية في المعمارية</Text>
          </View>

          <Button variant="ghost" className="mt-2 border border-dashed border-border">
            <Plus size={16} color="hsl(var(--primary))" />
            <Text className="ml-2 text-xs text-primary">إضافة درس جديد</Text>
          </Button>
        </View>
      ))}
    </ScrollView>
  );
};
