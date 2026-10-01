export interface TeacherStats {
  students: string;
  rating: number;
  reviews: string;
  experience: string;
}

export interface SocialLink {
  id: string;
  label: string;
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  isActive: boolean;
  description: string;
  badge: string; // e.g., "الأكثر مبيعاً"
  rating: number;
  reviews: string;
  level: string;
  duration: string;
  price: number;
  lastModule: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface TeacherProfileData {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  location: string;
  specialty: string;
  badges: string[];
  stats: TeacherStats;
  philosophy: string;
  introVideoThumbnail: string;
  socialLinks: SocialLink[];
  courses: Course[];
  testimonial: Testimonial;
}

export const fetchTeacherProfile = async (): Promise<TeacherProfileData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name: 'د. أريس فانس',
    title: 'كبير معماريين النظم',
    bio: 'تمكين أكثر من 45 ألف مهندس من إتقان النظم البرمجية وهندسة البيانات المتقدمة...',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    isVerified: true,
    location: 'كاليفورنيا، أمريكا',
    specialty: 'هندسة النظم',
    badges: ['نخبة الموجهين'],
    stats: {
      students: '+45,200',
      rating: 4.9,
      reviews: '6.8k',
      experience: '12 سنة',
    },
    philosophy:
      '"نحن نربط بين الدقة الرياضية الصارمة وهندسة النظم الإنتاجية الفائقة لتصميم عناقيد معالجة متوازية قادرة على خدمة ملايين العمليات..."',
    introVideoThumbnail:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=400&auto=format&fit=crop',
    socialLinks: [
      { id: '1', label: 'مؤتمر الذكاء' },
      { id: '2', label: 'مؤلف علمي' },
      { id: '3', label: 'معيار هندسي' },
    ],
    courses: [
      {
        id: '1',
        title: 'معمارية نظم التعلم الآلي ونماذج اللغة',
        description: 'معسكر شامل لمدة 12 أسبوعاً • تفكيك الأنظمة الحية المتقدمة...',
        badge: 'الأكثر مبيعاً',
        rating: 4.9,
        reviews: '(2,400)',
        level: 'متقدم',
        duration: '12 أسبوعاً',
        price: 599,
        lastModule: 'الوحدة الرابعة: معالجة البيانات...',
        thumbnail: '',
        isActive: false,
      },
      {
        id: '2',
        title: 'قواعد البيانات المتجهية والبحث الدلالي',
        description: 'مكثف لمدة 6 أسابيع • التخزين المؤقت وإعادة الترتيب الذكي...',
        badge: 'الفوج القادم',
        rating: 4.8,
        reviews: '(1,800)',
        level: 'متوسط',
        duration: '6 أسابيع',
        price: 349,
        lastModule: 'الوحدة الثانية: الفهارس المتجهية...',
        thumbnail: '',
        isActive: false,
      },
      {
        id: '3',
        title: 'البرمجة عالية الأداء لنظم الذكاء',
        description: 'دراسة ذاتية لمدة 4 أسابيع • بناء محركات معالجة المصفوفات الفائقة...',
        badge: 'إصدار جديد',
        rating: 4.9,
        reviews: '(950)',
        level: 'متقدم',
        duration: '4 أسابيع',
        price: 199,
        lastModule: 'الوحدة الأولى: تسريع العمليات...',
        thumbnail: '',
        isActive: false,
      },
    ],
    testimonial: {
      id: '1',
      quote:
        '"منهاج الدكتور فانس هو أكثر محتوى هندسي متماسك وصارم واجهته في هندسة التعلم، وقد مكننا من إعادة تطوير البنية التحتية بنجاح..."',
      author: 'إيلينا روستوفا',
      role: 'كبير مهندسي البنية التحتية',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    },
  };
};
