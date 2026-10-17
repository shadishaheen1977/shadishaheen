/* ======================================================================
   SHADI SHAHEEN — CENTRAL CONTENT FILE
   ----------------------------------------------------------------------
   ★ THIS IS THE ONLY FILE YOU NEED TO EDIT ★

   • Swap ANY image / video / mascot character by changing its line below.
   • Use a local path (drop files into `public/assets/...`) e.g.
       "/assets/photography/restaurants/01.jpg"
     …or paste any URL — both work everywhere.
   • If a file is missing, the layout shows a styled placeholder instead
     of breaking — so feel free to experiment.
   • All UI copy lives in `ui` at the bottom (English + Arabic).
   ====================================================================== */

/* ------------------------------------------------------------------ */
/* Types (so your editor autocompletes — you can ignore these)         */
/* ------------------------------------------------------------------ */

export type ImgItem = { src: string; alt?: string; title?: L };
export type L = { en: string; ar: string }; // localized string

export type VideoCat = "products" | "restaurants" | "medical" | "cars" | "realestate" | "acting";
export type VideoItem =
  | { type: "video"; src: string; poster?: string; title?: L; duration?: string; cat?: VideoCat }
  | { type: "youtube"; id: string; poster?: string; title?: L; duration?: string; cat?: VideoCat }
  | { type: "vimeo"; id: string; poster?: string; title?: L; duration?: string; cat?: VideoCat };

export type WorkItem = {
  title: L;
  client: string;
  year: string;
  tags: L[];
  description: L;
  cover: string;
  images: string[];
};

export type StatItem = {
  value: number;      // numeric part (animated)
  prefix?: string;    // e.g. "+"
  suffix?: string;    // e.g. "M" or "%"
  decimals?: number;  // e.g. 1 → "2.4"
  label: L;
};

/* ======================================================================
   1) SITE — brand, links, resume
   ====================================================================== */

export const site = {
  name: "SHADI SHAHEEN",
  email: "shadi.shaheen@example.com",
  whatsapp: "https://wa.me/971500000000",
  instagram: "https://www.instagram.com/",
  behance: "https://www.behance.net/",
  linkedin: "https://www.linkedin.com/",
  location: {
    en: "Dubai — UAE",
    ar: "دبي — الإمارات"
  },
  resumeUrl: "/assets/SHADI-SHAHEEN-Resume.pdf",
  portfolioUrl: "/assets/SHADI-SHAHEEN-Portfolio.pdf"
};

/* ======================================================================
   2) CHARACTERS — the mascot per section.
      Swap any path to your own PNG (ideally on a dark/transparent bg).
      Set to `null` to hide a section's mascot.
   ====================================================================== */

export const characters: Record<string, string | null> = {
  hero: null,
  works: null,
  photography: null,
  video: null,
  content: null,
  social: null,
  design: null,
  advertising: null,
  personal: null,
  footer: null,
};

/* ======================================================================
   3) MEDIA — every photo & video on the site.
   ====================================================================== */

export const media = {
  hero: {
    desktopVideo: "/assets/hero/reel.mp4",
    mobileVideo: "/assets/hero/reel.mp4",
    poster: "/assets/hero/reel-poster.jpg"
  },
  works: [
    {
      title: {
        en: "Noir Oud — Fragrance Campaign",
        ar: "نوار عود — حملة عطر"
      },
      client: "Noir Oud",
      year: "2025",
      tags: [
        {
          en: "Photography",
          ar: "تصوير"
        },
        {
          en: "Video",
          ar: "فيديو"
        },
        {
          en: "Ads",
          ar: "إعلانات"
        }
      ],
      description: {
        en: "A full visual campaign for a niche oud house — product films, macro stills and a paid social rollout that sold out the first drop in 11 days.",
        ar: "حملة بصرية متكاملة لدار عود متخصصة — أفلام منتج، صور ماكرو، وإطلاق مدفوع باع الدفعة الأولى خلال ١١ يوماً."
      },
      cover: "https://images.pexels.com/photos/37900999/pexels-photo-37900999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      images: [
        "https://images.pexels.com/photos/11216321/pexels-photo-11216321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/36779953/pexels-photo-36779953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/31771395/pexels-photo-31771395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      ]
    },
    {
      title: {
        en: "Velocity Motors — Night Launch",
        ar: "فيلوسيتي موتورز — إطلاق ليلي"
      },
      client: "Velocity Motors",
      year: "2025",
      tags: [
        {
          en: "Photography",
          ar: "تصوير"
        },
        {
          en: "Video",
          ar: "فيديو"
        }
      ],
      description: {
        en: "A neon-soaked city shoot for a sports car launch. 4.2M organic views across reels in the first month, zero paid spend.",
        ar: "جلسة تصوير ليلية بأجواء النيون لإطلاق سيارة رياضية. 4.2 مليون مشاهدة عضوية خلال أول شهر، بدون أي إنفاق إعلاني."
      },
      cover: "https://images.pexels.com/photos/15394325/pexels-photo-15394325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      images: [
        "https://images.pexels.com/photos/24589327/pexels-photo-24589327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/7161591/pexels-photo-7161591.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/19273958/pexels-photo-19273958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      ]
    },
    {
      title: {
        en: "Skyline — Penthouse Series",
        ar: "سكاي لاين — سلسلة البنتهاوس"
      },
      client: "Skyline Estates",
      year: "2024",
      tags: [
        {
          en: "Photography",
          ar: "تصوير"
        },
        {
          en: "Content",
          ar: "محتوى"
        }
      ],
      description: {
        en: "A 6-week content series for a luxury real-estate developer — interiors stills, walkthrough films and agent-led shorts that lifted enquiries 3.4x.",
        ar: "سلسلة محتوى لمدة ٦ أسابيع لمطور عقاري فاخر — صور داخلية، جولات مصورة، ومقاطع قصيرة رفعت الاستفسارات 3.4 أضعاف."
      },
      cover: "https://images.pexels.com/photos/29012720/pexels-photo-29012720.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      images: [
        "https://images.pexels.com/photos/7031712/pexels-photo-7031712.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/7045918/pexels-photo-7045918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/8082324/pexels-photo-8082324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      ]
    },
    {
      title: {
        en: "Candlelight — Restaurant Rebrand",
        ar: "كاندل لايت — هوية مطعم جديدة"
      },
      client: "Candlelight",
      year: "2024",
      tags: [
        {
          en: "Photography",
          ar: "تصوير"
        },
        {
          en: "Social",
          ar: "سوشيال"
        },
        {
          en: "Design",
          ar: "تصميم"
        }
      ],
      description: {
        en: "Full menu shoot, moody interiors and a refreshed identity system. Weekend bookings doubled within two months of the relaunch.",
        ar: "جلسة تصوير كاملة للقائمة والأجواء مع نظام هوية محدّث. تضاعفت حجوزات نهاية الأسبوع خلال شهرين من إعادة الإطلاق."
      },
      cover: "https://images.pexels.com/photos/8112945/pexels-photo-8112945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      images: [
        "https://images.pexels.com/photos/8112955/pexels-photo-8112955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/31415304/pexels-photo-31415304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/8112888/pexels-photo-8112888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      ]
    },
    {
      title: {
        en: "Neon District — Fashion Editorial",
        ar: "نيون ديستريكت — إفتتاحية أزياء"
      },
      client: "District Studio",
      year: "2023",
      tags: [
        {
          en: "Content",
          ar: "محتوى"
        },
        {
          en: "Video",
          ar: "فيديو"
        }
      ],
      description: {
        en: "Gel-lit editorial series for an independent fashion label — shot, graded and delivered as a 12-asset launch kit.",
        ar: "سلسلة إفتتاحية بإضاءة ملونة لعلامة أزياء مستقلة — تصوير وتلوين وتسليم كحزمة إطلاق من ١٢ أصلاً بصرياً."
      },
      cover: "https://images.pexels.com/photos/35514244/pexels-photo-35514244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      images: [
        "https://images.pexels.com/photos/6835869/pexels-photo-6835869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/6835958/pexels-photo-6835958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/7858124/pexels-photo-7858124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      ]
    }
  ],
  photography: {
    restaurants: [
      {
        src: "https://images.pexels.com/photos/8112955/pexels-photo-8112955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Plated dish, candlelit table"
      },
      {
        src: "https://images.pexels.com/photos/33191824/pexels-photo-33191824.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Latte art & phone in café"
      },
      {
        src: "https://images.pexels.com/photos/13240964/pexels-photo-13240964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Black coffee, moody café"
      },
      {
        src: "https://images.pexels.com/photos/31286786/pexels-photo-31286786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Salmon omakase close-up"
      },
      {
        src: "https://images.pexels.com/photos/8112945/pexels-photo-8112945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Candlelit restaurant table"
      },
      {
        src: "https://images.pexels.com/photos/35821973/pexels-photo-35821973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Heart latte art"
      },
      {
        src: "https://images.pexels.com/photos/8112888/pexels-photo-8112888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Gourmet scallops, dark plate"
      },
      {
        src: "https://images.pexels.com/photos/31415304/pexels-photo-31415304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Sushi set, dramatic light"
      },
      {
        src: "https://images.pexels.com/photos/27101357/pexels-photo-27101357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Purple dumplings"
      },
      {
        src: "https://images.pexels.com/photos/29168406/pexels-photo-29168406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Grilled salmon plate"
      }
    ],
    cars: [
      {
        src: "https://images.pexels.com/photos/24589327/pexels-photo-24589327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Red sports car, night street"
      },
      {
        src: "https://images.pexels.com/photos/19273958/pexels-photo-19273958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Luxury car under neon"
      },
      {
        src: "https://images.pexels.com/photos/7161591/pexels-photo-7161591.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Sports car under bridge"
      },
      {
        src: "https://images.pexels.com/photos/16889490/pexels-photo-16889490.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "White sports car, neon shopfront"
      },
      {
        src: "https://images.pexels.com/photos/18313148/pexels-photo-18313148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Convertible in the city"
      },
      {
        src: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Sports car detail, dramatic light"
      },
      {
        src: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Classic car close-up"
      },
      {
        src: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Luxury car on the road"
      }
    ],
    medical: [
      {
        src: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Modern clinic interior"
      },
      {
        src: "https://images.pexels.com/photos/305566/pexels-photo-305566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Medical equipment close-up"
      },
      {
        src: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Stethoscope on white"
      },
      {
        src: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Dental clinic chair"
      },
      {
        src: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Doctor consultation"
      },
      {
        src: "https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Clean medical corridor"
      },
      {
        src: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Aesthetic clinic detail"
      },
      {
        src: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Skincare treatment room"
      }
    ],
    products: [
      {
        src: "https://images.pexels.com/photos/12053217/pexels-photo-12053217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Perfume bottle with petals"
      },
      {
        src: "https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Perfume on black silk"
      },
      {
        src: "https://images.pexels.com/photos/37900999/pexels-photo-37900999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Watch & perfume on leather"
      },
      {
        src: "https://images.pexels.com/photos/36779953/pexels-photo-36779953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Perfume on textured fabric"
      },
      {
        src: "https://images.pexels.com/photos/11216321/pexels-photo-11216321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Black bottle, glossy reflection"
      },
      {
        src: "https://images.pexels.com/photos/36779955/pexels-photo-36779955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Perfume macro on fabric"
      },
      {
        src: "https://images.pexels.com/photos/36779956/pexels-photo-36779956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Glass perfume bottle"
      },
      {
        src: "https://images.pexels.com/photos/31771395/pexels-photo-31771395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Profumo bottle on black"
      }
    ],
    realestate: [
      {
        src: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Modern villa exterior at dusk"
      },
      {
        src: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Contemporary house facade"
      },
      {
        src: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Luxury living room interior"
      },
      {
        src: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Designer kitchen island"
      },
      {
        src: "https://images.pexels.com/photos/3288104/pexels-photo-3288104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Penthouse with city view"
      },
      {
        src: "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Modern bedroom, warm light"
      },
      {
        src: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Villa with pool at night"
      },
      {
        src: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        alt: "Bright minimalist interior"
      }
    ]
  },
  video: [
    {
      type: "video",
      cat: "products",
      src: "https://videos.pexels.com/video-files/31916297/13595529_3840_2160_60fps.mp4",
      poster: "https://images.pexels.com/videos/31916297/pexels-photo-31916297.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
      title: {
        en: "Product film — essentials",
        ar: "فيديو منتجات — الأساسيات"
      },
      duration: "00:45"
    },
    {
      type: "video",
      cat: "products",
      src: "https://videos.pexels.com/video-files/8089527/8089527-uhd_4096_2160_25fps.mp4",
      poster: "https://images.pexels.com/videos/8089527/action-adult-analogue-antique-8089527.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
      title: {
        en: "Product film — brand teaser",
        ar: "فيديو منتجات — تشويق العلامة"
      },
      duration: "00:58"
    },
    {
      type: "video",
      cat: "restaurants",
      src: "https://videos.pexels.com/video-files/3196036/3196036-uhd_3840_2160_25fps.mp4",
      poster: "https://images.pexels.com/photos/8112945/pexels-photo-8112945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=675",
      title: {
        en: "Restaurant film — plating",
        ar: "فيديو مطاعم — التقديم"
      },
      duration: "00:41"
    },
    {
      type: "video",
      cat: "restaurants",
      src: "https://videos.pexels.com/video-files/4114797/4114797-uhd_3840_2160_25fps.mp4",
      poster: "https://images.pexels.com/photos/13240964/pexels-photo-13240964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=675",
      title: {
        en: "Café film — pour & steam",
        ar: "فيديو كافيه — صب وبخار"
      },
      duration: "00:33"
    },
    {
      type: "video",
      cat: "medical",
      src: "https://videos.pexels.com/video-files/4266933/4266933-uhd_3840_2160_25fps.mp4",
      poster: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=675",
      title: {
        en: "Medical center — walkthrough",
        ar: "مركز طبي — جولة"
      },
      duration: "00:52"
    },
    {
      type: "video",
      cat: "medical",
      src: "https://videos.pexels.com/video-files/4021521/4021521-uhd_3840_2160_25fps.mp4",
      poster: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=675",
      title: {
        en: "Clinic film — treatment",
        ar: "فيديو عيادة — العلاج"
      },
      duration: "00:38"
    },
    {
      type: "video",
      cat: "cars",
      src: "https://videos.pexels.com/video-files/13633630/13633630-uhd_3840_2160_30fps.mp4",
      poster: "https://images.pexels.com/videos/13633630/pexels-photo-13633630.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
      title: {
        en: "Automotive film — desert",
        ar: "فيديو سيارات — الصحراء"
      },
      duration: "00:29"
    },
    {
      type: "video",
      cat: "cars",
      src: "https://videos.pexels.com/video-files/5309381/5309381-uhd_3840_2160_25fps.mp4",
      poster: "https://images.pexels.com/photos/19273958/pexels-photo-19273958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=675",
      title: {
        en: "Automotive film — city night",
        ar: "فيديو سيارات — ليل المدينة"
      },
      duration: "00:47"
    },
    {
      type: "video",
      cat: "realestate",
      src: "https://videos.pexels.com/video-files/7578552/7578552-uhd_3840_2160_30fps.mp4",
      poster: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=675",
      title: {
        en: "Property tour — villa",
        ar: "جولة عقارية — فيلا"
      },
      duration: "00:54"
    },
    {
      type: "video",
      cat: "realestate",
      src: "https://videos.pexels.com/video-files/8514727/8514727-uhd_3840_2160_25fps.mp4",
      poster: "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=675",
      title: {
        en: "Property tour — interiors",
        ar: "جولة عقارية — تشطيبات داخلية"
      },
      duration: "00:42"
    }
  ],
  content: [
    {
      src: "https://images.pexels.com/photos/35514244/pexels-photo-35514244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Gel-lit studio portrait"
    },
    {
      src: "https://images.pexels.com/photos/6835869/pexels-photo-6835869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Neon portrait close-up"
    },
    {
      src: "https://images.pexels.com/photos/6835823/pexels-photo-6835823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Creative neon makeup"
    },
    {
      src: "https://images.pexels.com/photos/7858124/pexels-photo-7858124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Luminous paint portrait"
    },
    {
      src: "https://images.pexels.com/photos/6835827/pexels-photo-6835827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Neon room portrait"
    },
    {
      src: "https://images.pexels.com/photos/13015486/pexels-photo-13015486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Color-lit indoor portrait"
    },
    {
      src: "https://images.pexels.com/photos/6835958/pexels-photo-6835958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Neon duo editorial"
    },
    {
      src: "https://images.pexels.com/photos/6835952/pexels-photo-6835952.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Street neon styling"
    }
  ],
  social: {
    stats: [
      {
        value: 2.4,
        prefix: "+",
        suffix: "M",
        decimals: 1,
        label: {
          en: "Organic reach / quarter",
          ar: "وصول عضوي كل ربع سنة"
        }
      },
      {
        value: 6.8,
        suffix: "%",
        decimals: 1,
        label: {
          en: "Avg. engagement rate",
          ar: "متوسط معدل التفاعل"
        }
      },
      {
        value: 180,
        prefix: "+",
        suffix: "K",
        label: {
          en: "New followers / year",
          ar: "متابع جديد كل سنة"
        }
      },
      {
        value: 340,
        prefix: "+",
        label: {
          en: "Campaigns shipped",
          ar: "حملة منفذة"
        }
      }
    ],
    clients: [
      {
        name: {
          en: "Nova Café",
          ar: "نوفا كافيه"
        },
        cover: "https://images.pexels.com/photos/35821973/pexels-photo-35821973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=800",
        designs: [
          {
            src: "https://images.pexels.com/photos/35821973/pexels-photo-35821973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Latte art post"
          },
          {
            src: "https://images.pexels.com/photos/8937411/pexels-photo-8937411.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Coffee flat-lay"
          },
          {
            src: "https://images.pexels.com/photos/13240964/pexels-photo-13240964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Moody café shot"
          },
          {
            src: "https://images.pexels.com/photos/8112945/pexels-photo-8112945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Table setting"
          }
        ]
      },
      {
        name: {
          en: "Vertex Motors",
          ar: "فيرتكس موتورز"
        },
        cover: "https://images.pexels.com/photos/19273958/pexels-photo-19273958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=800",
        designs: [
          {
            src: "https://images.pexels.com/photos/19273958/pexels-photo-19273958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Car drop teaser"
          },
          {
            src: "https://images.pexels.com/photos/16889490/pexels-photo-16889490.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Night launch post"
          },
          {
            src: "https://images.pexels.com/photos/24589327/pexels-photo-24589327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Red car street"
          },
          {
            src: "https://images.pexels.com/photos/7161591/pexels-photo-7161591.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Car under bridge"
          }
        ]
      },
      {
        name: {
          en: "Lumière Clinic",
          ar: "عيادة لوميير"
        },
        cover: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=800",
        designs: [
          {
            src: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Clinic detail"
          },
          {
            src: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Treatment room"
          },
          {
            src: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Clinic interior"
          }
        ]
      },
      {
        name: {
          en: "Aurora Residences",
          ar: "أورورا للعقارات"
        },
        cover: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=800",
        designs: [
          {
            src: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Living room"
          },
          {
            src: "https://images.pexels.com/photos/3288104/pexels-photo-3288104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Penthouse view"
          },
          {
            src: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Villa with pool"
          },
          {
            src: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Villa exterior"
          }
        ]
      },
      {
        name: {
          en: "Saffron Kitchen",
          ar: "مطبخ الزعفران"
        },
        cover: "https://images.pexels.com/photos/31415304/pexels-photo-31415304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=800",
        designs: [
          {
            src: "https://images.pexels.com/photos/31415304/pexels-photo-31415304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Sushi set"
          },
          {
            src: "https://images.pexels.com/photos/8112888/pexels-photo-8112888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Gourmet scallops"
          },
          {
            src: "https://images.pexels.com/photos/29168406/pexels-photo-29168406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Salmon plate"
          }
        ]
      },
      {
        name: {
          en: "Halo Beauty",
          ar: "هالو بيوتي"
        },
        cover: "https://images.pexels.com/photos/6835958/pexels-photo-6835958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=800",
        designs: [
          {
            src: "https://images.pexels.com/photos/6835958/pexels-photo-6835958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Neon editorial"
          },
          {
            src: "https://images.pexels.com/photos/13015486/pexels-photo-13015486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Color portrait"
          },
          {
            src: "https://images.pexels.com/photos/6835823/pexels-photo-6835823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Neon makeup"
          },
          {
            src: "https://images.pexels.com/photos/6835869/pexels-photo-6835869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1000",
            alt: "Neon close-up"
          }
        ]
      }
    ]
  },
  design: [
    {
      src: "https://images.pexels.com/photos/5706015/pexels-photo-5706015.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Business card system"
    },
    {
      src: "https://images.pexels.com/photos/8490097/pexels-photo-8490097.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Stationery on dark desk"
    },
    {
      src: "https://images.pexels.com/photos/4466420/pexels-photo-4466420.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Black identity cards"
    },
    {
      src: "https://images.pexels.com/photos/8489947/pexels-photo-8489947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Card on stone, foliage"
    },
    {
      src: "https://images.pexels.com/photos/8489955/pexels-photo-8489955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Minimal card mockup"
    },
    {
      src: "https://images.pexels.com/photos/5420976/pexels-photo-5420976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Letterhead & pen"
    },
    {
      src: "https://images.pexels.com/photos/4466104/pexels-photo-4466104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: "Cards on wooden table"
    }
  ],
  clientLogos: [
    {
      name: "Nova Café",
      src: "/assets/clients/nova.png"
    },
    {
      name: "Vertex Motors",
      src: "/assets/clients/vertex.png"
    },
    {
      name: "Lumière Clinic",
      src: "/assets/clients/lumiere.png"
    },
    {
      name: "Aurora Residences",
      src: "/assets/clients/aurora.png"
    },
    {
      name: "Saffron Kitchen",
      src: "/assets/clients/saffron.png"
    },
    {
      name: "Halo Beauty",
      src: "/assets/clients/halo.png"
    },
    {
      name: "Metro Estates",
      src: "/assets/clients/metro.png"
    },
    {
      name: "Pulse Fitness",
      src: "/assets/clients/pulse.png"
    }
  ],
  advertising: [
    {
      title: {
        en: "Night Shift — launch sprint",
        ar: "نايت شيفت — سباق الإطلاق"
      },
      cover: "https://images.pexels.com/photos/14780175/pexels-photo-14780175.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      metrics: [
        {
          label: {
            en: "Impressions",
            ar: "مشاهدات"
          },
          value: "0"
        },
        {
          label: {
            en: "CTR",
            ar: "نسبة النقر"
          },
          value: "0"
        },
        {
          label: {
            en: "ROAS",
            ar: "العائد"
          },
          value: "0"
        }
      ]
    },
    {
      title: {
        en: "City Lights — awareness",
        ar: "أضواء المدينة — انتشار"
      },
      cover: "https://images.pexels.com/photos/1827234/pexels-photo-1827234.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      metrics: [
        {
          label: {
            en: "Impressions",
            ar: "مشاهدات"
          },
          value: "0"
        },
        {
          label: {
            en: "CTR",
            ar: "نسبة النقر"
          },
          value: "0"
        },
        {
          label: {
            en: "CPM",
            ar: "كلفة الألف"
          },
          value: "0"
        }
      ]
    },
    {
      title: {
        en: "Downtown Drop — retargeting",
        ar: "داون تاون — إعادة استهداف"
      },
      cover: "https://images.pexels.com/photos/29849362/pexels-photo-29849362.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      metrics: [
        {
          label: {
            en: "Conversions",
            ar: "تحويلات"
          },
          value: "0"
        },
        {
          label: {
            en: "CTR",
            ar: "نسبة النقر"
          },
          value: "0"
        },
        {
          label: {
            en: "ROAS",
            ar: "العائد"
          },
          value: "0"
        }
      ]
    }
  ],
  personal: [
    {
      src: "https://videos.pexels.com/video-files/7234088/7234088-uhd_2160_3840_24fps.mp4",
      poster: "https://images.pexels.com/videos/7234088/adult-airport-blur-bus-7234088.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
      title: {
        en: "Airport diaries",
        ar: "يوميات المطار"
      }
    },
    {
      src: "https://videos.pexels.com/video-files/7823380/7823380-uhd_2160_3840_30fps.mp4",
      poster: "https://images.pexels.com/videos/7823380/pexels-photo-7823380.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
      title: {
        en: "Handheld nights",
        ar: "ليالي يدوية"
      }
    },
    {
      src: "https://videos.pexels.com/video-files/8115521/8115521-uhd_2160_3840_24fps.mp4",
      poster: "https://images.pexels.com/videos/8115521/pexels-photo-8115521.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
      title: {
        en: "Phone-first stories",
        ar: "حكايات بالجوال"
      }
    }
  ]
};

/* ======================================================================
   4) UI COPY — every label on the site, in English + Arabic.
   ====================================================================== */

export const ui = {
  en: {
    nav: {
      photography: "Photography",
      video: "Video",
      advertising: "Ad Campaigns",
      social: "Social Media",
      about: "About",
      clients: "Our Clients",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
      slogan: "Photography & Videography"
    },
    hero: {
      kicker: "Photography & Videography",
      l1: "Every frame",
      l2: "tells a story.",
      l3: "Yours.",
      tagline: "Photography & videography for restaurants, cars, medical centers, real estate and products — from the first frame to the final cut.",
      scroll: "Scroll",
      available: "Available for new projects",
      reel: "Showreel"
    },
    marquee: [
      "Photography",
      "Video",
      "Ad Campaigns",
      "Social Media"
    ],
    photo: {
      kicker: "01 — Stills",
      titleA: "Photography",
      titleB: "professional stills",
      sub: "For restaurants, cars, medical centers, real estate and products.",
      filters: {
        all: "All",
        restaurants: "Restaurants",
        cars: "Cars",
        medical: "Medical Centers",
        realestate: "Real Estate",
        products: "Products"
      }
    },
    video: {
      kicker: "02 — Motion",
      titleA: "Video",
      titleB: "cinematic content",
      sub: "Product, restaurant, medical, real estate and automotive films — from idea to delivery. Drag to explore.",
      drag: "Drag",
      empty: "Acting videos will be added soon.",
      filters: {
        all: "All",
        products: "Products",
        restaurants: "Restaurants",
        medical: "Medical Centers",
        realestate: "Real Estate",
        cars: "Cars",
        acting: "Acting"
      }
    },
    ads: {
      kicker: "03 — Performance",
      titleA: "Ad Campaigns",
      titleB: "campaigns that convert",
      sub: "Advertising campaign visuals and paid media with numbers you can actually read."
    },
    social: {
      kicker: "04 — Numbers",
      titleA: "Social Media",
      titleB: "designs & posts",
      sub: "Social media designs and post systems that grow accounts, not just feeds.",
      postsTitle: "Recent posts",
      likes: "likes",
      clientsTitle: "Designs by client",
      pickHint: "Pick a client to view their designs",
      viewAll: "View all",
      viewLess: "Show less",
      designsLabel: "designs",
      back: "Back to clients"
    },
    about: {
      kicker: "03 — About",
      titleA: "About",
      titleB: "me",
      body: "Shadi Shaheen is a photographer and videographer who turns brands, spaces and products into images people stop scrolling for. From plated dishes and car launches to clinics, properties and product campaigns, every shoot is planned, lit and edited with one goal: visuals that look premium and work hard for the business behind them."
    },
    clients: {
      kicker: "06 — Trusted by",
      titleA: "Our",
      titleB: "clients",
      sub: "A few of the brands and businesses I've had the pleasure to work with."
    },
    contact: {
      kicker: "04 — End of scroll",
      titleA: "You've reached",
      titleB: "the end.",
      titleC: "Or the beginning.",
      sub: "Have a brand, a product or a story? Let's make it impossible to ignore.",
      emailLabel: "Email",
      copyEmail: "Copy email",
      copied: "Copied",
      sendEmail: "Send email",
      whatsappLabel: "WhatsApp",
      resume: "Download résumé",
      portfolio: "Download portfolio",
      based: "Based in",
      follow: "Find me on",
      rights: "All rights reserved.",
      made: "Photography & Videography.",
      cta: "Start a project"
    }
  },
  ar: {
    nav: {
      photography: "تصوير",
      video: "فيديو",
      advertising: "الحملات الإعلانية",
      social: "سوشيال ميديا",
      about: "عني",
      clients: "عملاؤنا",
      contact: "تواصل",
      menu: "القائمة",
      close: "إغلاق",
      slogan: "تصوير فوتوغرافي وفيديو"
    },
    hero: {
      kicker: "تصوير فوتوغرافي وفيديو",
      l1: "كل لقطة",
      l2: "تحكي قصة.",
      l3: "قصتك.",
      tagline: "تصوير فوتوغرافي وفيديو للمطاعم والسيارات والمراكز الطبية والعقارات والمنتجات — من أول لقطة حتى المونتاج النهائي.",
      scroll: "اسحب",
      available: "متاح لمشاريع جديدة",
      reel: "شو ريل"
    },
    marquee: [
      "تصوير",
      "فيديو",
      "حملات إعلانية",
      "سوشيال ميديا"
    ],
    photo: {
      kicker: "٠١ — صور ثابتة",
      titleA: "تصوير",
      titleB: "لقطات احترافية",
      sub: "للمطاعم، السيارات، المراكز الطبية، العقارات والمنتجات.",
      filters: {
        all: "الكل",
        restaurants: "مطاعم",
        cars: "سيارات",
        medical: "مراكز طبية",
        realestate: "عقارات",
        products: "منتجات"
      }
    },
    video: {
      kicker: "٠٢ — حركة",
      titleA: "فيديو",
      titleB: "محتوى سينمائي",
      sub: "فيديوهات منتجات ومطاعم ومراكز طبية وعقارات وسيارات — من الفكرة إلى التسليم. اسحب للاستكشاف.",
      drag: "اسحب",
      empty: "ستُضاف فيديوهات التمثيل قريباً.",
      filters: {
        all: "الكل",
        products: "منتجات",
        restaurants: "مطاعم",
        medical: "مراكز طبية",
        realestate: "عقارات",
        cars: "سيارات",
        acting: "تمثيل"
      }
    },
    ads: {
      kicker: "٠٣ — أداء",
      titleA: "الحملات",
      titleB: "الإعلانية",
      sub: "صور الحملات الإعلانية وإعلانات مدفوعة بأرقام تستطيع قراءتها فعلاً."
    },
    social: {
      kicker: "٠٤ — أرقام",
      titleA: "سوشيال ميديا",
      titleB: "تصاميم وبوستات",
      sub: "تصاميم سوشيال ميديا وأنظمة بوستات تنمّي الحسابات، لا تملأ الصفحات فقط.",
      postsTitle: "أحدث المنشورات",
      likes: "إعجاب",
      clientsTitle: "التصاميم حسب العميل",
      pickHint: "اختر منشأة لعرض تصاميمها",
      viewAll: "مشاهدة الكل",
      viewLess: "عرض أقل",
      designsLabel: "تصميم",
      back: "رجوع للعملاء"
    },
    about: {
      kicker: "٠٣ — عني",
      titleA: "نبذة",
      titleB: "عني",
      body: "شادي شاهين مصوّر فوتوغرافي ومصوّر فيديو يحوّل العلامات التجارية والأماكن والمنتجات إلى صور تشدّ الانتباه. من أطباق المطاعم وإطلاق السيارات إلى العيادات والعقارات وحملات المنتجات، كل جلسة تصوير يتم التخطيط لها وإضاءتها ومونتاجها بهدف واحد: صور بمظهر فاخر تخدم البيزنس اللي وراها."
    },
    clients: {
      kicker: "٠٦ — موثوق من",
      titleA: "عملاؤنا",
      titleB: "",
      sub: "بعض العلامات والمنشآت التي سعدت بالعمل معها."
    },
    contact: {
      kicker: "٠٤ — نهاية التمرير",
      titleA: "وصلت إلى",
      titleB: "النهاية.",
      titleC: "أو إلى البداية.",
      sub: "عندك علامة، منتج أو حكاية؟ خلنا نصنع شيئاً يستحيل تجاهله.",
      emailLabel: "البريد الإلكتروني",
      copyEmail: "نسخ الإيميل",
      copied: "تم النسخ",
      sendEmail: "إرسال إيميل",
      whatsappLabel: "واتساب",
      resume: "تحميل السيرة الذاتية",
      portfolio: "تحميل البورتفوليو",
      based: "مقرّي",
      follow: "تجدني على",
      rights: "جميع الحقوق محفوظة.",
      made: "تصوير فوتوغرافي وفيديو.",
      cta: "ابدأ مشروعك"
    }
  }
};

export type Lang = keyof typeof ui; // 'en' | 'ar'
