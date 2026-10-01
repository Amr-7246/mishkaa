import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { QuizPayload } from '@/src/types/courses';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { CheckCircle2, XCircle, ArrowRight, Lock, Timer, GraduationCap } from 'lucide-react-native';
import Loader from '@/src/components/common/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGet } from '@/src/hooks/api/useBaseCrud';

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { data, isLoading } = useGet<QuizPayload>(['quiz', quizId], `/quizzes/${quizId}`);

  if (isLoading || !data) return <Loader />;

  const { currentQuestion, feedback } = data;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-border px-5 py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-card">
          <XCircle size={20} color="hsl(var(--text))" />
        </TouchableOpacity>
        <View className="flex-1 items-center px-2">
          <Text className="text-[10px] font-medium text-primary">{data.courseTitle}</Text>
          <Text className="text-sm font-bold text-text" numberOfLines={1}>
            {data.title}
          </Text>
        </View>
        <View className="h-10 w-10 items-center justify-center rounded-full border border-border bg-card">
          <Text className="text-sm font-bold text-primary">
            {data.currentQuestionIndex} / {data.totalQuestions}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="px-5 py-3">
        <View className="h-1.5 w-full overflow-hidden rounded-full bg-card">
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: `${data.progressPercentage}%` }}
          />
        </View>
        <View className="mt-1.5 flex-row justify-between">
          <Text className="text-[10px] text-textInactive">
            السؤال الحالي: {data.currentQuestionIndex}
          </Text>
          <Text className="text-[10px] font-bold text-primary">
            {data.progressPercentage}% مكتمل
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} className="gap-4 px-5 py-2">
        {/* Feedback Banner */}
        {feedback && (
          <View
            className={`flex-row items-center gap-3 rounded-2xl border p-3.5 ${feedback.isCorrect ? 'border-success/40 bg-success/10' : 'border-destructive/40 bg-destructive/10'}`}>
            <View
              className={`h-8 w-8 items-center justify-center rounded-full ${feedback.isCorrect ? 'bg-success/20' : 'bg-destructive/20'}`}>
              {feedback.isCorrect ? (
                <CheckCircle2 size={18} color="hsl(var(--success))" />
              ) : (
                <XCircle size={18} color="hsl(var(--destructive))" />
              )}
            </View>
            <View className="flex-1">
              <Text
                className={`text-sm font-bold ${feedback.isCorrect ? 'text-success' : 'text-destructive'}`}>
                {feedback.isCorrect ? 'إجابة صحيحة ومتقنة!' : 'إجابة غير صحيحة'}
              </Text>
              <Text
                className={`mt-0.5 text-xs ${feedback.isCorrect ? 'text-success/80' : 'text-destructive/80'}`}>
                {feedback.explanation}
              </Text>
            </View>
          </View>
        )}

        {/* Question Card */}
        <View className="rounded-2xl border border-border bg-card p-5">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
              <Text className="text-[10px] font-bold uppercase text-primary">
                سؤال اختياري متقدم
              </Text>
            </View>
            <Badge variant="secondary">
              <Text className="text-[10px] text-textInactive">{currentQuestion.points} درجتان</Text>
            </Badge>
          </View>
          <Text className="text-right text-base font-bold leading-relaxed text-text">
            {currentQuestion.question}
          </Text>
          <View className="mt-4 flex-row justify-between border-t border-border/50 pt-3">
            <View className="flex-row items-center gap-1.5">
              <GraduationCap size={14} color="hsl(var(--text-inactive))" />
              <Text className="text-[10px] text-textInactive">
                المستوى: {currentQuestion.difficulty}
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Timer size={14} color="hsl(var(--text-inactive))" />
              <Text className="text-[10px] text-textInactive">
                الوقت المقترح: {currentQuestion.suggestedTime}
              </Text>
            </View>
          </View>
        </View>

        {/* Answer Options */}
        <View className="gap-3">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => setSelectedOption(opt.id)}
                className={`flex-row items-center justify-between rounded-2xl border-2 p-4 ${
                  isSelected ? 'border-primary bg-card shadow-md' : 'border-border/50 bg-card/70'
                }`}>
                <View className="flex-1 flex-row items-center gap-3.5">
                  <View
                    className={`h-5 w-5 items-center justify-center rounded-full border-2 ${isSelected ? 'border-primary' : 'border-border'}`}>
                    {isSelected && <View className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </View>
                  <View className="flex-1">
                    <Text
                      className={`text-right text-sm font-bold ${isSelected ? 'text-text' : 'text-text/80'}`}>
                      {opt.text}
                    </Text>
                    {opt.label && (
                      <Text className="mt-0.5 text-right text-[10px] text-textInactive">
                        {opt.label}
                      </Text>
                    )}
                  </View>
                </View>
                {isSelected && <CheckCircle2 size={20} color="hsl(var(--primary))" />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/95 p-5">
        <Button
          disabled={!selectedOption}
          className={`w-full flex-row gap-2 rounded-full py-4 ${!selectedOption ? 'bg-muted' : 'bg-primary'}`}>
          <Text
            className={`text-base font-bold ${!selectedOption ? 'text-textInactive' : 'text-primary-foreground'}`}>
            تأكيد الإجابة والمتابعة...
          </Text>
          <ArrowRight
            size={20}
            color={!selectedOption ? 'hsl(var(--text-inactive))' : 'hsl(var(--primary-foreground))'}
          />
        </Button>
        <View className="mt-3 flex-row items-center justify-center gap-1.5">
          <Lock size={12} color="hsl(var(--text-inactive))" />
          <Text className="text-[10px] text-textInactive">
            يتم حفظ تقدمك تلقائياً في السجل الأكاديمي
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
