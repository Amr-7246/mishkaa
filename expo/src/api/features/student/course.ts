export interface CourseMetric {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface LearningOutcome {
  id: string;
  text: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isFreePreview: boolean;
  isLocked: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessonCount: string;
  duration: string;
  isExpanded: boolean; // For UI state
  hasFreePreview: boolean;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  author: string;
  timeAgo: string;
  text: string;
  rating: number;
  avatarInitial: string;
}

export interface CourseDetailsData {
  id: string;
  title: string;
  description: string;
  videoThumbnail: string;
  rating: number;
  reviewCount: string;
  level: string;
  lastUpdated: string;
  instructor: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    isVerified: boolean;
  };
  metrics: CourseMetric[];
  learningOutcomes: LearningOutcome[];
  modules: Module[];
  requirements: string[];
  reviews: Review[];
  pricing: {
    currentPrice: number;
    originalPrice: number;
    currency: string;
  };
}

export const fetchCourseDetails = async (courseId: string): Promise<CourseDetailsData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: courseId,
    title: 'معمارية النظم الموزعة والحوسبة السحابية',
    description:
      'برنامج تخصصي رفيع المستوى يركز على تصميم أنظمة مرنة وموثوقة، معالجة البيانات الفائقة، وتطبيق مبادئ التوسع الأفقي في بيئات الإنتاج المعقدة.',
    videoThumbnail:
      'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: '2,400',
    level: 'مستوى متقدم',
    lastUpdated: 'تحديث ربيع 2025',
    instructor: {
      id: '1',
      name: 'د. أريس فانس',
      title: 'كبير معماريي النظم ورئيس أبحاث البنية التحتية',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      isVerified: true,
    },
    metrics: [
      { id: '1', label: 'عدد الساعات', value: '18 ساعة مكثفة', icon: 'clock' },
      { id: '2', label: 'المشاريع', value: '4 مشاريع عملية', icon: 'terminal' },
      { id: '3', label: 'الاختبارات', value: '6 اختبارات تقييم', icon: 'quiz' },
      { id: '4', label: 'الشهادة', value: 'شهادة إتمام معتمدة', icon: 'award' },
    ],
    learningOutcomes: [
      {
        id: '1',
        text: 'تصميم معمارية الأنظمة الموزعة وفق مبادئ التوافرية العالية وتحمل الأعطال الشاملة.',
      },
      {
        id: '2',
        text: 'إدارة وتنسيق موازنات الأحمال الشبكية والتعامل مع تدفقات البيانات الضخمة المتزامنة.',
      },
      {
        id: '3',
        text: 'تحقيق الاتساق النهائي ونظريات المعالجة السحابية في قواعد البيانات غير المترابطة.',
      },
      { id: '4', text: 'نشر وتأمين البنى التحتية البرمجية عبر أدوات الأتمتة السحابية الحديثة.' },
    ],
    modules: [
      {
        id: '1',
        title: 'الأساسيات والمعمارية الموزعة',
        lessonCount: '3 دروس',
        duration: '45 د',
        isExpanded: true,
        hasFreePreview: true,
        lessons: [
          {
            id: '1-1',
            title: '1.1 مدخل إلى النظم المتزامنة والموزعة',
            duration: '12:40',
            isFreePreview: true,
            isLocked: false,
          },
          {
            id: '1-2',
            title: '1.2 نظريات الاتساق والتوافر الشبكي',
            duration: '18:15',
            isFreePreview: true,
            isLocked: false,
          },
          {
            id: '1-3',
            title: '1.3 نماذج الاتصال غير المتزامن وناقل الرسائل',
            duration: '14:20',
            isFreePreview: false,
            isLocked: true,
          },
        ],
      },
      {
        id: '2',
        title: 'موازنة الأحمال والشبكات السحابية',
        lessonCount: '5 دروس',
        duration: 'ساعتان',
        isExpanded: false,
        hasFreePreview: false,
        lessons: [],
      },
      {
        id: '3',
        title: 'إدارة البيانات والتخزين المؤقت الموزع',
        lessonCount: '4 دروس',
        duration: '1.5 س',
        isExpanded: false,
        hasFreePreview: false,
        lessons: [],
      },
    ],
    requirements: [
      'معرفة جيدة بلغات البرمجة الخلفية وأساسيات هياكل البيانات.',
      'فهم مبدئي لبروتوكولات الإنترنت وخوادم الويب وقواعد البيانات.',
    ],
    reviews: [
      {
        id: '1',
        author: 'م. سلمان القحطاني',
        timeAgo: 'منذ يومين',
        text: '"أعمق برنامج تدريبي عربي في هندسة المعمارية الموزعة. غيرت مفاهيمي تماماً حول استقرار الخوادم تحت الضغط العالي."',
        rating: 5,
        avatarInitial: 'م',
      },
    ],
    pricing: {
      currentPrice: 349,
      originalPrice: 680,
      currency: 'ر.س',
    },
  };
};
