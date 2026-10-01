import { View, Animated, Pressable } from 'react-native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCourseFormData, CreateCourseSchema } from '@/src/schemas/courseSchema';
import { useRouter } from 'expo-router';
import { Save, ChevronRight, ChevronLeft } from 'lucide-react-native';
import { Text } from '@/src/components/ui/text';
import { Button } from '@/src/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Step1BasicInfo } from '@/src/components/teacher/addCourse/Step1BasicInfo';
import { Step2Curriculum } from '@/src/components/teacher/addCourse/Step2Curriculum';
import { Step3Marketing } from '@/src/components/teacher/addCourse/Step3Marketing';
import { Step4Publish } from '@/src/components/teacher/addCourse/Step4Publish';
import { Stepper } from '@/src/components/teacher/addCourse/Stepper';
import { usePost } from '@/src/hooks/api/useBaseCrud';
import { Routes } from '@/src/constants/Routes';
import { QueryKeies } from '@/src/constants/QueryKeies';

//~ animation wrapper
const StepTransition = ({ children, stepKey }: { children: React.ReactNode; stepKey: number }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateX = React.useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [stepKey]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateX }] }}>
      {children}
    </Animated.View>
  );
};

const AddCourse = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(0);
  const steps = ['البيانات الأساسية', 'الوحدات والدروس', 'التسويق والوسائط', 'الاختبارات'];
  //& Centerlize the form operations

  const methods = useForm<CreateCourseFormData>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      isFree: false,
      difficultyLevel: 'beginner',
      tags: [],
      requirements: [],
      whatYouWillLearn: [],
      targetAudience: [],
      modules: [{ title: '', isPublished: false }],
    },
    mode: 'onChange',
  });

  const { handleSubmit, trigger } = methods;

  //& Network layer
  const { mutate, isPending } = usePost(Routes.addCourse, {
    invalidateKeys: [[QueryKeies.course]],
  });

  //& Steps controle logic
  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 0) isValid = await trigger(['title', 'description', 'difficultyLevel']);
    else if (currentStep === 1) isValid = await trigger(['modules']);
    else if (currentStep === 2) isValid = await trigger(['price', 'courseIntroUrl']);

    if (isValid || currentStep === 3) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit((data) => mutate(data))();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    else router.back();
  };

  //& Render the steps dynamicly
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1BasicInfo />;
      case 1:
        return <Step2Curriculum />;
      case 2:
        return <Step3Marketing />;
      case 3:
        return <Step4Publish />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-border bg-card px-4 py-3">
        <Pressable onPress={() => router.back()} className="rounded-full bg-muted p-2">
          <Save size={20} color="hsl(var(--text))" />
        </Pressable>
        <Text className="text-xl font-bold text-text">إضافة دورة جديدة</Text>
        <Pressable onPress={handleBack} className="p-2">
          <ChevronRight size={24} color="hsl(var(--text))" />
        </Pressable>
      </View>

      <View className="flex-1 px-4 pt-4">
        {/* Stepper */}
        <Stepper currentStep={currentStep} totalSteps={steps.length} steps={steps} />

        {/* Form Content with Animation */}
        <FormProvider {...methods}>
          <StepTransition stepKey={currentStep}>{renderStep()}</StepTransition>
        </FormProvider>
      </View>

      {/* Footer Navigation */}
      <View className="flex-row items-center justify-between border-t border-border bg-card px-4 py-4">
        <Button variant="outline" onPress={handleBack} className="mr-2 flex-1 flex-row gap-2">
          <ChevronRight size={18} color="hsl(var(--text))" />
          <Text className="text-text">السابق</Text>
        </Button>

        <Button
          onPress={() => handleNext}
          disabled={isPending}
          className="ml-2 flex-1 flex-row gap-2 bg-primary">
          {isPending ? (
            <Text className="text-primary-foreground">جاري الحفظ...</Text>
          ) : (
            <>
              <Text className="text-primary-foreground">
                {currentStep === steps.length - 1 ? 'نشر الدورة' : 'التالي'}
              </Text>
              {currentStep < steps.length - 1 && (
                <ChevronLeft size={18} color="hsl(var(--primary-foreground))" />
              )}
            </>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddCourse;
