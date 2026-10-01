import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Badge } from '@/src/components/ui/badge';
import { ChevronDown, ChevronUp, PlayCircle, Lock } from 'lucide-react-native';
import { Module } from '@/src/api/features/student/course';

export const SyllabusAccordion = ({ modules }: { modules: Module[] }) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    modules.find((m) => m.isExpanded)?.id || null
  );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <View className="mb-5">
      <View className="mb-3 flex-row items-center justify-between">
        <TouchableOpacity>
          <Text className="text-xs text-primary">تحميل المنهج...</Text>
        </TouchableOpacity>
        <View className="flex-row items-center gap-2">
          <Text className="font-bold text-text">منهج ومحتوى الدورة</Text>
          <View className="h-4 w-1.5 rounded-full bg-primary" />
        </View>
      </View>

      <View className="gap-3">
        {modules.map((module) => {
          const isExpanded = expandedId === module.id;
          return (
            <View
              key={module.id}
              className="overflow-hidden rounded-2xl border border-border bg-card">
              {/* Header */}
              <TouchableOpacity
                onPress={() => toggleExpand(module.id)}
                className={`flex-row items-center justify-between p-4 ${isExpanded ? 'border-b border-border bg-muted' : ''}`}>
                <View className="flex-1 items-end">
                  <View className="mb-1 flex-row items-center gap-2">
                    {module.hasFreePreview && (
                      <Badge className="bg-primary">
                        <Text className="text-[10px] text-primary-foreground">
                          معاينة مجانية...
                        </Text>
                      </Badge>
                    )}
                    <Text className="text-xs font-semibold text-primary">{module.title}</Text>
                  </View>
                  <Text className="text-xs text-textInactive">
                    {module.lessonCount} • {module.duration}
                  </Text>
                </View>
                <View className="mr-3">
                  {isExpanded ? (
                    <ChevronUp size={20} color="hsl(var(--primary))" />
                  ) : (
                    <ChevronDown size={20} color="hsl(var(--text-inactive))" />
                  )}
                </View>
              </TouchableOpacity>

              {/* Expanded Lessons */}
              {isExpanded && (
                <View className="gap-2 bg-background p-3">
                  {module.lessons.map((lesson) => (
                    <View
                      key={lesson.id}
                      className="flex-row items-center justify-between rounded-xl border border-border bg-card p-2.5">
                      <View className="flex-1 flex-row items-center gap-2.5">
                        {lesson.isLocked ? (
                          <Lock size={16} color="hsl(var(--text-inactive))" />
                        ) : (
                          <PlayCircle size={16} color="hsl(var(--primary))" />
                        )}
                        <Text
                          className={`flex-1 text-right text-sm ${lesson.isLocked ? 'text-textInactive' : 'text-text'}`}>
                          {lesson.title}
                        </Text>
                      </View>
                      <Text className="text-[10px] text-textInactive">{lesson.duration}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};
