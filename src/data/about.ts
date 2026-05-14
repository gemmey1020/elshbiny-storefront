export type AboutSection = {
  title_en: string;
  title_ar: string | null;
  body_en: string;
  body_ar: string | null;
};

export const aboutPage = {
  nav_label_en: "About",
  nav_label_ar: "عن الشبيني",
  eyebrow_en: "About Elshbiny",
  eyebrow_ar: "عن الشبيني",
  title_en: "Mannequins, display fixtures, and store setup experience for local retailers.",
  title_ar: "مانيكانات وتجهيزات عرض وخبرة في تجهيز المحلات للتجار.",
  intro_en:
    "Elshbiny is built around a simple promise: help retailers show products better with practical mannequin manufacturing, display experience, and fair pricing.",
  intro_ar:
    "الشبيني قائم على وعد بسيط: نساعد التاجر يعرض بضاعته أحسن بمانيكانات مصنعة صح، وخبرة عرض حقيقية، وسعر عادل.",
  sections: [
    {
      title_en: "Market experience",
      title_ar: "خبرة من السوق",
      body_en:
        "The work starts from real retail floors, not from theory. Elshbiny understands the way local store owners think about space, stock, visibility, and budget.",
      body_ar:
        "الشغل هنا جاي من أرض المحلات مش من كلام نظري. الشبيني فاهم التاجر المحلي بيفكر إزاي في المساحة والبضاعة والشكل والميزانية.",
    },
    {
      title_en: "Manufacturing capability",
      title_ar: "قدرة تصنيع",
      body_en:
        "The catalog is backed by production knowledge across full mannequins, modular forms, display props, finishes, and bulk retail needs.",
      body_ar:
        "الكتالوج وراه خبرة تصنيع في المانيكان الكامل، القطع المرنة، إكسسوارات العرض، التشطيبات، واحتياجات الجملة.",
    },
    {
      title_en: "Fair pricing philosophy",
      title_ar: "سعر عادل",
      body_en:
        "The goal is not to make the product feel unreachable. Better materials and reliable quality should help smaller retailers grow, not push them away.",
      body_ar:
        "الفكرة مش إن المنتج يبقى بعيد عن التاجر. الخامة الكويسة والجودة الثابتة لازم تساعد المحل يكبر، مش تخليه يحس إنها مش ليه.",
    },
    {
      title_en: "Working with retailers",
      title_ar: "شغل مع التجار",
      body_en:
        "Whether a store needs a few pieces or a complete display direction, the buying path is built around conversation, practical choices, and quote clarity.",
      body_ar:
        "سواء محتاج كام قطعة أو اتجاه عرض كامل للمحل، المسار معمول علشان الكلام يبقى واضح والاختيارات عملية وعرض السعر مفهوم.",
    },
  ] satisfies AboutSection[],
  cta_title_en: "Ready to plan the store display?",
  cta_title_ar: "جاهز تظبط عرض المحل؟",
  cta_body_en: "Start with the fit-out path or browse products if you already know what you need.",
  cta_body_ar: "ابدأ من تجهيز المحل لو محتاج توجيه، أو افتح الكتالوج لو عارف محتاج إيه.",
};
