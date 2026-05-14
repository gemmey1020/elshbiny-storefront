import { BadgeCheck, Boxes, Building2, Factory, HelpCircle, Ruler, Store } from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

export type LocalizedText = {
  en: string;
  ar: string | null;
};

export type HomePath = {
  title_en: string;
  title_ar: string | null;
  body_en: string;
  body_ar: string | null;
  href: string;
  label_en: string;
  label_ar: string | null;
  icon: ComponentType<LucideProps>;
};

export type HomeTrustPoint = {
  title_en: string;
  title_ar: string | null;
  body_en: string;
  body_ar: string | null;
};

export const homeHero = {
  eyebrow_en: "Elshbiny Store Setup",
  eyebrow_ar: "تجهيز محلات الشبيني",
  title_en: "Professional mannequins and display setups that help your store sell more.",
  title_ar: "مانيكينات احترافية وتجهيزات عرض تساعد محلك يبيع أكتر.",
  body_en:
    "A practical showroom for local retailers: see real mannequin lines, compare display styles, and start a store setup request without feeling lost.",
  body_ar:
    "شوف خطوط المانيكانات، قارن شكل العرض المناسب لمحلك، وابدأ طلب تجهيز واضح من غير ما تحس إنك تايه.",
  primary_cta_en: "Plan Store Setup",
  primary_cta_ar: "جهز محلك",
  secondary_cta_en: "Browse Catalog",
  secondary_cta_ar: "تصفح المنتجات",
};

export const quickPaths: HomePath[] = [
  {
    title_en: "Set up a store",
    title_ar: "جهز محلك",
    body_en: "Answer a guided path so we understand your space, style, and display needs.",
    body_ar: "جاوب على خطوات بسيطة علشان نفهم مساحة المحل وشكل العرض اللي محتاجه.",
    href: "/fit-out",
    label_en: "Start fit-out",
    label_ar: "ابدأ التجهيز",
    icon: Store,
  },
  {
    title_en: "Choose mannequins",
    title_ar: "اختار المانيكانات",
    body_en: "Browse real product lines by category, material, pose, and pricing status.",
    body_ar: "تصفح المنتجات حسب التصنيف والخامة والوضعية وطريقة السعر.",
    href: "/catalog",
    label_en: "Open catalog",
    label_ar: "افتح الكتالوج",
    icon: Boxes,
  },
  {
    title_en: "Ask before ordering",
    title_ar: "اسأل قبل الطلب",
    body_en: "Review common questions about prices, delivery, custom work, and wholesale orders.",
    body_ar: "راجع أهم الأسئلة عن الأسعار والتوصيل والشغل الخاص وطلبات الجملة.",
    href: "/faq",
    label_en: "Read FAQ",
    label_ar: "شوف الأسئلة",
    icon: HelpCircle,
  },
];

export const storeSetupSteps: HomeTrustPoint[] = [
  {
    title_en: "Tell us the store type",
    title_ar: "قولنا نوع المحل",
    body_en: "Men, women, kids, sportswear, bridal, accessories, or mixed retail.",
    body_ar: "رجالي، حريمي، أطفال، رياضة، عرايس، إكسسوارات، أو محل متنوع.",
  },
  {
    title_en: "Match the right forms",
    title_ar: "نرشح الشكل المناسب",
    body_en: "We connect mannequins, bases, finishes, and display quantities to your space.",
    body_ar: "نوصل بين المانيكانات والقواعد والتشطيبات والعدد المناسب لمساحة محلك.",
  },
  {
    title_en: "Prepare the quote",
    title_ar: "نجهز عرض السعر",
    body_en: "You get a practical request path before buying, especially for bulk or custom work.",
    body_ar: "تاخد مسار واضح قبل الشراء، خصوصًا لو طلب جملة أو شغل مخصوص.",
  },
];

export const aboutPreview = {
  eyebrow_en: "About Elshbiny",
  eyebrow_ar: "عن الشبيني",
  title_en: "A mannequin factory built around store display experience.",
  title_ar: "مصنع مانيكانات مبني على خبرة حقيقية في عرض المحلات.",
  body_en:
    "Elshbiny combines market experience, manufacturing capacity, and fair pricing so smaller and growing retailers can build stronger store displays.",
  body_ar:
    "الشبيني بيجمع خبرة السوق مع التصنيع والسعر العادل، علشان التاجر الصغير والنامي يعرف يطلع عرض أقوى في محله.",
  cta_en: "Learn about Elshbiny",
  cta_ar: "اعرف أكتر عن الشبيني",
};

export const homeStats = [
  { label_en: "Retail focus", label_ar: "تركيزنا", value_en: "Store setup", value_ar: "تجهيز المحلات" },
  { label_en: "Catalog surface", label_ar: "الكتالوج", value_en: "Live products", value_ar: "منتجات حقيقية" },
  { label_en: "Buying path", label_ar: "طريقة الشراء", value_en: "Quote first", value_ar: "عرض سعر الأول" },
];

export const categoryFallbacks = [
  {
    title_en: "Window mannequins",
    title_ar: "مانيكانات الواجهة",
    body_en: "Front-of-store display forms for the first look customers see.",
    body_ar: "قطع عرض لأول نظرة العميل بيشوفها وهو داخل أو معدي على المحل.",
    icon: Building2,
  },
  {
    title_en: "Modular forms",
    title_ar: "قطع عرض مرنة",
    body_en: "Torso, head, hand, and feature forms for compact spaces.",
    body_ar: "تورسو ورؤوس وأيادي وقطع مناسبة للمساحات الصغيرة.",
    icon: Ruler,
  },
  {
    title_en: "Custom production",
    title_ar: "تصنيع مخصوص",
    body_en: "Finishes, quantities, and display sets shaped around the retailer.",
    body_ar: "تشطيبات وكميات ومجموعات عرض حسب احتياج التاجر.",
    icon: Factory,
  },
  {
    title_en: "Retail confidence",
    title_ar: "ثقة للتاجر",
    body_en: "Better materials, practical prices, and support for growing stores.",
    body_ar: "خامات أفضل، سعر عملي، ودعم للمحلات اللي عايزة تكبر.",
    icon: BadgeCheck,
  },
];
