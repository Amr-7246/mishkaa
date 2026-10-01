import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Badge } from '@/src/components/ui/badge';
import { Plus, Trash2, HelpCircle, CheckCircle2, XCircle } from 'lucide-react-native';

export const Step4Publish = () => {
  // const { control, register } = useFormContext<CreateCourseFormData>();
  // TODO: quizzes are nested inside Lessons inside Modules.
  // see how to `useFieldArray` on `modules.${mIndex}.lessons.${lIndex}.quizzes`

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Text className="mb-4 text-right text-lg font-bold text-text">الاختبارات والمنشورات</Text>

      {/* Quiz Builder Card */}
      <View className="mb-4 rounded-xl border border-border bg-card p-4">
        <View className="mb-4 flex-row items-center justify-between">
          <TouchableOpacity>
            <Trash2 size={18} color="hsl(var(--error))" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <HelpCircle size={20} color="hsl(var(--primary))" />
            <Text className="font-bold text-text">السؤال الأول</Text>
          </View>
        </View>

        <Text className="mb-1 text-right text-xs text-textInactive">نوع السؤال</Text>
        <View className="mb-4 flex-row gap-2">
          <Badge variant="default" className="bg-primary/20">
            <Text className="text-xs text-primary">اختيار متعدد</Text>
          </Badge>
          <Badge variant="outline">
            <Text className="text-xs text-textInactive">صح أو خطأ</Text>
          </Badge>
          <Badge variant="outline">
            <Text className="text-xs text-textInactive">إجابة موجزة</Text>
          </Badge>
        </View>

        <Text className="mb-1 text-right text-xs text-textInactive">صياغة نص السؤال</Text>
        <Input placeholder="اكتب السؤال هنا..." multiline className="mb-4 h-20 text-right" />

        <Text className="mb-2 text-right text-xs text-textInactive">الخيارات المتاحة</Text>

        {/* Option 1 (Correct) */}
        <View className="mb-2 flex-row items-center gap-2 rounded-lg border border-success/50 bg-background p-2">
          <CheckCircle2 size={18} color="hsl(var(--success))" />
          <Input
            className="flex-1 border-0 bg-transparent text-right"
            placeholder="الخيار الصحيح"
          />
        </View>

        {/* Option 2 (Incorrect) */}
        <View className="mb-4 flex-row items-center gap-2 rounded-lg border border-border bg-background p-2">
          <XCircle size={18} color="hsl(var(--textInactive))" />
          <Input className="flex-1 border-0 bg-transparent text-right" placeholder="خيار خاطئ" />
        </View>

        <Button variant="outline" size="sm" className="w-full border-dashed">
          <Plus size={14} color="hsl(var(--primary))" />
          <Text className="ml-1 text-xs text-primary">إضافة خيار</Text>
        </Button>
      </View>

      {/* Final Save Button */}
      <Button className="mt-4 h-12 w-full rounded-xl bg-primary">
        <Text className="text-lg font-bold text-primary-foreground">نشر الدورة</Text>
      </Button>
    </ScrollView>
  );
};
