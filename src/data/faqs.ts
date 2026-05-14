export type FaqCategory =
  | "Store Setup"
  | "Mannequins"
  | "Pricing & Orders"
  | "Materials & Quality"
  | "Delivery"
  | "Custom Work"
  | "B2B / Wholesale";

export type FaqItem = {
  slug: string;
  category: FaqCategory;
  question_en: string;
  question_ar: string | null;
  short_answer_en: string;
  short_answer_ar: string | null;
  answer_en: string;
  answer_ar: string | null;
  seo_title_en: string;
  seo_title_ar: string | null;
  seo_description_en: string;
  seo_description_ar: string | null;
  is_featured: boolean;
  sort_order: number;
};

export const faqCategories: FaqCategory[] = [
  "Store Setup",
  "Mannequins",
  "Pricing & Orders",
  "Materials & Quality",
  "Delivery",
  "Custom Work",
  "B2B / Wholesale",
];

export const faqs: FaqItem[] = [
  {
    slug: "how-does-elshbiny-help-set-up-a-store",
    category: "Store Setup",
    question_en: "How does Elshbiny help set up a store?",
    question_ar: null,
    short_answer_en: "We connect mannequin choices to your store type, space, and display goals.",
    short_answer_ar: null,
    answer_en:
      "Elshbiny does more than sell individual mannequins. We help retailers think through the store type, the product mix, the window display, the floor space, and the quantity needed before a quote is prepared.",
    answer_ar: null,
    seo_title_en: "How Elshbiny Helps Retailers Set Up Stores",
    seo_title_ar: null,
    seo_description_en: "Learn how Elshbiny connects mannequin manufacturing with practical store display setup for retailers.",
    seo_description_ar: null,
    is_featured: true,
    sort_order: 10,
  },
  {
    slug: "do-i-need-to-know-exactly-what-to-order",
    category: "Store Setup",
    question_en: "Do I need to know exactly what to order?",
    question_ar: null,
    short_answer_en: "No. The fit-out path is made for retailers who need guidance first.",
    short_answer_ar: null,
    answer_en:
      "You can start with the store setup flow even if you are not sure about exact models or quantities. The goal is to understand your store and narrow the options before you buy.",
    answer_ar: null,
    seo_title_en: "Choosing Store Mannequins Without Knowing Exact Models",
    seo_title_ar: null,
    seo_description_en: "Retailers can start a guided store setup request before choosing exact mannequin models.",
    seo_description_ar: null,
    is_featured: true,
    sort_order: 20,
  },
  {
    slug: "can-elshbiny-plan-window-and-floor-displays",
    category: "Store Setup",
    question_en: "Can Elshbiny plan window and floor displays?",
    question_ar: null,
    short_answer_en: "Yes, the setup conversation can cover windows, floor areas, and display points.",
    short_answer_ar: null,
    answer_en:
      "Window mannequins, floor displays, modular forms, and prop sets can be considered together. This helps the store feel organized instead of buying separate pieces without a plan.",
    answer_ar: null,
    seo_title_en: "Window and Floor Display Planning With Mannequins",
    seo_title_ar: null,
    seo_description_en: "Elshbiny can help retailers think through window displays, floor displays, and mannequin quantities.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 30,
  },
  {
    slug: "what-types-of-mannequins-are-available",
    category: "Mannequins",
    question_en: "What types of mannequins are available?",
    question_ar: null,
    short_answer_en: "Full-body, modular, athletic, kids, tailoring forms, heads, hands, and display props.",
    short_answer_ar: null,
    answer_en:
      "The catalog includes full-body mannequins, seated forms, torso forms, athletic poses, kids and youth forms, tailoring forms, accessory supports, heads, hands, and display props.",
    answer_ar: null,
    seo_title_en: "Types of Retail Mannequins Available From Elshbiny",
    seo_title_ar: null,
    seo_description_en: "Explore full-body mannequins, modular forms, kids mannequins, tailoring forms, and retail display props.",
    seo_description_ar: null,
    is_featured: true,
    sort_order: 40,
  },
  {
    slug: "how-do-i-choose-the-right-mannequin",
    category: "Mannequins",
    question_en: "How do I choose the right mannequin?",
    question_ar: null,
    short_answer_en: "Start with your customer, clothing style, store space, and display mood.",
    short_answer_ar: null,
    answer_en:
      "A fashion store may need full-body window pieces, while a compact store may need torso forms or modular pieces. The right choice depends on product type, available space, and how premium or practical the display should feel.",
    answer_ar: null,
    seo_title_en: "How to Choose the Right Mannequin for a Store",
    seo_title_ar: null,
    seo_description_en: "A simple guide to choosing mannequins based on store type, clothing style, space, and display goals.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 50,
  },
  {
    slug: "are-there-mannequins-for-small-stores",
    category: "Mannequins",
    question_en: "Are there mannequins for small stores?",
    question_ar: null,
    short_answer_en: "Yes. Smaller stores can use torso forms, modular pieces, and focused display sets.",
    short_answer_ar: null,
    answer_en:
      "A small store does not always need many full-body mannequins. Torso forms, heads, hands, compact stands, and selected full-body pieces can create a strong display without crowding the space.",
    answer_ar: null,
    seo_title_en: "Mannequin Options for Small Retail Stores",
    seo_title_ar: null,
    seo_description_en: "Small retailers can use compact mannequin and display form options without overcrowding the store.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 60,
  },
  {
    slug: "why-are-some-prices-hidden",
    category: "Pricing & Orders",
    question_en: "Why are some prices hidden?",
    question_ar: null,
    short_answer_en: "Some items depend on quantity, finish, customization, or trade account status.",
    short_answer_ar: null,
    answer_en:
      "Hidden or authenticated prices are usually used for bulk orders, special finishes, custom work, or products where the final cost depends on the request details.",
    answer_ar: null,
    seo_title_en: "Why Some Mannequin Prices Are Hidden",
    seo_title_ar: null,
    seo_description_en: "Some mannequin prices depend on quantity, finish, customization, or buyer account status.",
    seo_description_ar: null,
    is_featured: true,
    sort_order: 70,
  },
  {
    slug: "can-i-request-a-quote-before-buying",
    category: "Pricing & Orders",
    question_en: "Can I request a quote before buying?",
    question_ar: null,
    short_answer_en: "Yes. The site is quote-first so retailers can confirm details before committing.",
    short_answer_ar: null,
    answer_en:
      "You can add products to the inquiry workspace or start the store setup flow. The quote request keeps the buying conversation practical and avoids guessing the final order too early.",
    answer_ar: null,
    seo_title_en: "Request a Mannequin Quote Before Buying",
    seo_title_ar: null,
    seo_description_en: "Retailers can request a mannequin or store setup quote before making a purchase decision.",
    seo_description_ar: null,
    is_featured: true,
    sort_order: 80,
  },
  {
    slug: "does-elshbiny-support-small-retailers",
    category: "Pricing & Orders",
    question_en: "Does Elshbiny support small retailers?",
    question_ar: null,
    short_answer_en: "Yes. The pricing philosophy is built to help smaller retailers grow with better displays.",
    short_answer_ar: null,
    answer_en:
      "Elshbiny aims to provide strong value for good material quality. The goal is to help growing store owners improve their display without feeling priced out.",
    answer_ar: null,
    seo_title_en: "Mannequin Pricing Support for Small Retailers",
    seo_title_ar: null,
    seo_description_en: "Elshbiny focuses on practical pricing and quality for small and growing retail businesses.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 90,
  },
  {
    slug: "what-materials-are-used",
    category: "Materials & Quality",
    question_en: "What materials are used?",
    question_ar: null,
    short_answer_en: "Materials vary by model and can include fiberglass, resin, polyurethane, linen, metal, or mixed materials.",
    short_answer_ar: null,
    answer_en:
      "Each product page includes technical specs where available. Materials can vary by model, pose, finish, and custom request, so the quote conversation confirms the final production details.",
    answer_ar: null,
    seo_title_en: "Materials Used in Retail Mannequins",
    seo_title_ar: null,
    seo_description_en: "Learn about common mannequin materials and how technical specs help retailers compare quality.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 100,
  },
  {
    slug: "how-can-i-check-product-quality",
    category: "Materials & Quality",
    question_en: "How can I check product quality?",
    question_ar: null,
    short_answer_en: "Start with specs, finish, use case, and the right product for your store environment.",
    short_answer_ar: null,
    answer_en:
      "Quality is not only the material name. The finish, joint style, base, weight, stability, and how the piece will be used in the store all matter.",
    answer_ar: null,
    seo_title_en: "How to Check Mannequin Quality Before Ordering",
    seo_title_ar: null,
    seo_description_en: "Understand mannequin quality through material, finish, base, stability, and retail use case.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 110,
  },
  {
    slug: "can-i-choose-finishes-and-colors",
    category: "Materials & Quality",
    question_en: "Can I choose finishes and colors?",
    question_ar: null,
    short_answer_en: "Many display requests can discuss finishes, colors, and surface direction.",
    short_answer_ar: null,
    answer_en:
      "Standard models have their own finish options, while custom or larger orders may allow more specific finish discussion. The final availability depends on the product and quantity.",
    answer_ar: null,
    seo_title_en: "Choosing Mannequin Finishes and Colors",
    seo_title_ar: null,
    seo_description_en: "Retailers can discuss mannequin finishes, colors, and custom display direction depending on the order.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 120,
  },
  {
    slug: "how-long-does-delivery-take",
    category: "Delivery",
    question_en: "How long does delivery take?",
    question_ar: null,
    short_answer_en: "Lead time depends on stock, quantity, customization, and delivery location.",
    short_answer_ar: null,
    answer_en:
      "Some products may be faster when ready or standard. Larger quantities, custom finishes, or complete store setup requests need more confirmation before the final timeline is promised.",
    answer_ar: null,
    seo_title_en: "Mannequin Delivery Time for Retail Orders",
    seo_title_ar: null,
    seo_description_en: "Delivery time depends on stock, quantity, custom work, and the retailer location.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 130,
  },
  {
    slug: "can-large-orders-be-delivered-in-stages",
    category: "Delivery",
    question_en: "Can large orders be delivered in stages?",
    question_ar: null,
    short_answer_en: "Yes, staged delivery can be discussed for larger or multi-branch needs.",
    short_answer_ar: null,
    answer_en:
      "For larger orders, phased delivery can make the process easier for the store and production team. The plan depends on quantity, timing, and branch needs.",
    answer_ar: null,
    seo_title_en: "Staged Delivery for Large Mannequin Orders",
    seo_title_ar: null,
    seo_description_en: "Large or multi-branch mannequin orders can discuss phased delivery and rollout needs.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 140,
  },
  {
    slug: "is-delivery-available-for-store-setup-projects",
    category: "Delivery",
    question_en: "Is delivery available for store setup projects?",
    question_ar: null,
    short_answer_en: "Delivery and handoff details are part of the quote discussion.",
    short_answer_ar: null,
    answer_en:
      "Store setup projects often include multiple display pieces, so delivery needs are confirmed with the quote instead of assumed from a single product page.",
    answer_ar: null,
    seo_title_en: "Delivery for Store Setup and Mannequin Projects",
    seo_title_ar: null,
    seo_description_en: "Delivery for store setup projects is confirmed during the quote discussion.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 150,
  },
  {
    slug: "can-i-request-custom-mannequins",
    category: "Custom Work",
    question_en: "Can I request custom mannequins?",
    question_ar: null,
    short_answer_en: "Custom work can be discussed depending on design, quantity, and production feasibility.",
    short_answer_ar: null,
    answer_en:
      "Custom poses, finishes, campaign props, and special display needs may be possible. The team needs to understand the retail goal before confirming feasibility and pricing.",
    answer_ar: null,
    seo_title_en: "Custom Mannequins and Retail Display Work",
    seo_title_ar: null,
    seo_description_en: "Elshbiny can discuss custom mannequin and display work based on the design and production request.",
    seo_description_ar: null,
    is_featured: true,
    sort_order: 160,
  },
  {
    slug: "what-details-help-with-custom-work",
    category: "Custom Work",
    question_en: "What details help with custom work?",
    question_ar: null,
    short_answer_en: "Store type, product category, dimensions, finish direction, quantity, and deadline.",
    short_answer_ar: null,
    answer_en:
      "The more practical the request is, the better the answer. Photos, store dimensions, reference styles, product type, and quantity help turn a custom idea into a clear quote.",
    answer_ar: null,
    seo_title_en: "Details Needed for Custom Mannequin Requests",
    seo_title_ar: null,
    seo_description_en: "Learn what details help when requesting custom mannequins, finishes, or display props.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 170,
  },
  {
    slug: "can-elshbiny-match-my-brand-style",
    category: "Custom Work",
    question_en: "Can Elshbiny match my brand style?",
    question_ar: null,
    short_answer_en: "Brand-matched display direction can be discussed for suitable products and quantities.",
    short_answer_ar: null,
    answer_en:
      "Retail display is stronger when the mannequins and props fit the store identity. The final options depend on the product type, finish, and production scope.",
    answer_ar: null,
    seo_title_en: "Brand-Matched Retail Mannequin Displays",
    seo_title_ar: null,
    seo_description_en: "Discuss mannequin and display choices that match a retailer brand style.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 180,
  },
  {
    slug: "does-elshbiny-handle-wholesale-orders",
    category: "B2B / Wholesale",
    question_en: "Does Elshbiny handle wholesale orders?",
    question_ar: null,
    short_answer_en: "Yes. B2B and wholesale needs are part of the quote-first workflow.",
    short_answer_ar: null,
    answer_en:
      "Retailers, traders, and multi-branch businesses can use the inquiry path to discuss quantities, pricing visibility, delivery timing, and product mix.",
    answer_ar: null,
    seo_title_en: "Wholesale Mannequin Orders for Retailers",
    seo_title_ar: null,
    seo_description_en: "Elshbiny supports B2B and wholesale mannequin quote requests for retailers and traders.",
    seo_description_ar: null,
    is_featured: true,
    sort_order: 190,
  },
  {
    slug: "can-i-create-a-buyer-account",
    category: "B2B / Wholesale",
    question_en: "Can I create a buyer account?",
    question_ar: null,
    short_answer_en: "Yes. Buyer access helps with authenticated pricing and quote history.",
    short_answer_ar: null,
    answer_en:
      "The B2B portal is built for returning buyers. It can show protected pricing where available and keep quote history connected to the buyer profile.",
    answer_ar: null,
    seo_title_en: "B2B Buyer Accounts for Mannequin Quotes",
    seo_title_ar: null,
    seo_description_en: "Buyer accounts help retailers access authenticated pricing and quote history.",
    seo_description_ar: null,
    is_featured: false,
    sort_order: 200,
  },
  {
    slug: "what-is-the-best-way-to-start",
    category: "B2B / Wholesale",
    question_en: "What is the best way to start?",
    question_ar: null,
    short_answer_en: "Start with store setup if you need guidance, or catalog if you already know the products.",
    short_answer_ar: null,
    answer_en:
      "If you are planning a store or display upgrade, start with Fit-out. If you already know the product direction, start with the Catalog and add items to the inquiry workspace.",
    answer_ar: null,
    seo_title_en: "Best Way to Start a Mannequin or Store Setup Request",
    seo_title_ar: null,
    seo_description_en: "Choose between the guided fit-out path and the product catalog based on how ready your order is.",
    seo_description_ar: null,
    is_featured: true,
    sort_order: 210,
  },
];

const faqArabicCopy: Record<
  string,
  Pick<FaqItem, "question_ar" | "short_answer_ar" | "answer_ar" | "seo_title_ar" | "seo_description_ar">
> = {
  "how-does-elshbiny-help-set-up-a-store": {
    question_ar: "الشبيني بيساعدني أجهز المحل إزاي؟",
    short_answer_ar: "بنربط اختيار المانيكانات بنوع المحل والمساحة وطريقة العرض اللي تناسبك.",
    answer_ar:
      "الشبيني مش بيبيع مانيكانات وخلاص. إحنا بنساعدك تفكر في نوع المحل، شكل البضاعة، الواجهة، مساحة الأرض، والعدد المناسب قبل ما نوصل لعرض سعر واضح.",
    seo_title_ar: "الشبيني وتجهيز المحلات بالمانيكانات",
    seo_description_ar: "اعرف إزاي الشبيني بيربط تصنيع المانيكانات بتجهيز عرض عملي للتجار والمحلات.",
  },
  "do-i-need-to-know-exactly-what-to-order": {
    question_ar: "لازم أكون عارف هطلب إيه بالظبط؟",
    short_answer_ar: "لا. مسار تجهيز المحل معمول للتاجر اللي محتاج توجيه الأول.",
    answer_ar:
      "تقدر تبدأ من تجهيز المحل حتى لو مش عارف الموديلات أو الكميات. المهم نفهم محلك ونضيق الاختيارات لحد ما تبقى الصورة واضحة قبل الشراء.",
    seo_title_ar: "اختيار المانيكانات حتى لو مش عارف تبدأ منين",
    seo_description_ar: "التاجر يقدر يبدأ طلب تجهيز محل قبل ما يحدد موديلات المانيكانات بالظبط.",
  },
  "can-elshbiny-plan-window-and-floor-displays": {
    question_ar: "ينفع الشبيني يساعد في الواجهة وترتيب العرض جوه المحل؟",
    short_answer_ar: "أيوه، نقدر نتكلم في الواجهة ونقاط العرض والمساحات الداخلية.",
    answer_ar:
      "مانيكانات الواجهة، العرض الداخلي، القطع المرنة، وإكسسوارات العرض ممكن يتشافوا كصورة واحدة. ده بيخلي المحل منظم بدل ما تشتري قطع منفصلة من غير خطة.",
    seo_title_ar: "تخطيط واجهة المحل والعرض الداخلي بالمانيكانات",
    seo_description_ar: "الشبيني يساعد التجار يفكروا في الواجهة والعرض الداخلي وعدد المانيكانات المناسب.",
  },
  "what-types-of-mannequins-are-available": {
    question_ar: "إيه أنواع المانيكانات الموجودة؟",
    short_answer_ar: "مانيكان كامل، تورسو، أطفال، رياضي، خياطة، رؤوس، أيادي، وإكسسوارات عرض.",
    answer_ar:
      "الكتالوج فيه مانيكانات كاملة، مانيكانات قاعدة، تورسو، وضعيات رياضية، أطفال وشباب، مانيكان خياطة، حوامل إكسسوارات، رؤوس، أيادي، وقطع عرض مساعدة.",
    seo_title_ar: "أنواع المانيكانات المتاحة من الشبيني",
    seo_description_ar: "تصفح مانيكانات كاملة وقطع عرض وتورسو وأطفال وخياطة وإكسسوارات للمحلات.",
  },
  "how-do-i-choose-the-right-mannequin": {
    question_ar: "أختار المانيكان المناسب إزاي؟",
    short_answer_ar: "ابدأ من نوع عميلك، شكل اللبس، مساحة المحل، والإحساس اللي عايز توصله.",
    answer_ar:
      "محل ملابس كبير ممكن يحتاج مانيكانات كاملة للواجهة، ومحل صغير ممكن يناسبه تورسو أو قطع مرنة. الاختيار الصح بيتحدد حسب نوع البضاعة والمساحة وهل العرض مطلوب يبقى فاخر ولا عملي.",
    seo_title_ar: "إزاي تختار المانيكان المناسب لمحل الملابس",
    seo_description_ar: "دليل بسيط لاختيار المانيكان حسب نوع المحل والمساحة وشكل العرض.",
  },
  "are-there-mannequins-for-small-stores": {
    question_ar: "فيه اختيارات مناسبة للمحلات الصغيرة؟",
    short_answer_ar: "أيوه. المحلات الصغيرة ينفع تستخدم تورسو وقطع مرنة ومجموعات عرض مركزة.",
    answer_ar:
      "المحل الصغير مش لازم يملاه مانيكانات كاملة. ممكن تورسو، رؤوس، أيادي، حوامل صغيرة، وقطعة أو اتنين كاملين يعملوا شكل قوي من غير زحمة.",
    seo_title_ar: "مانيكانات مناسبة للمحلات الصغيرة",
    seo_description_ar: "اختيارات مانيكانات وقطع عرض للمحلات الصغيرة من غير ما تزحم المساحة.",
  },
  "why-are-some-prices-hidden": {
    question_ar: "ليه بعض الأسعار مش ظاهرة؟",
    short_answer_ar: "بعض المنتجات سعرها بيتغير حسب الكمية أو التشطيب أو التخصيص أو حساب التاجر.",
    answer_ar:
      "الأسعار المخفية أو المحمية غالبًا بتكون لطلبات الجملة، التشطيبات الخاصة، الشغل المخصوص، أو منتجات سعرها النهائي محتاج تفاصيل أكتر من العميل.",
    seo_title_ar: "ليه بعض أسعار المانيكانات بتكون مخفية",
    seo_description_ar: "بعض أسعار المانيكانات تعتمد على الكمية والتشطيب والتخصيص وحساب المشتري.",
  },
  "can-i-request-a-quote-before-buying": {
    question_ar: "ينفع أطلب عرض سعر قبل الشراء؟",
    short_answer_ar: "أيوه. الموقع معمول بطريقة عرض السعر الأول علشان القرار يبقى واضح.",
    answer_ar:
      "تقدر تضيف منتجات لمساحة الاستفسار أو تبدأ من تجهيز المحل. طلب عرض السعر بيخلي الكلام عملي وبيمنع إنك تخمن الطلب النهائي بدري.",
    seo_title_ar: "طلب عرض سعر مانيكانات قبل الشراء",
    seo_description_ar: "التجار يقدروا يطلبوا عرض سعر للمانيكانات أو تجهيز المحل قبل قرار الشراء.",
  },
  "does-elshbiny-support-small-retailers": {
    question_ar: "الشبيني مناسب للتجار الصغيرين؟",
    short_answer_ar: "أيوه. فلسفة السعر معمولة تساعد المحلات الصغيرة تكبر بعرض أحسن.",
    answer_ar:
      "الشبيني بيحاول يقدم قيمة قوية مقابل خامة كويسة. الهدف إن صاحب المحل يطور العرض من غير ما يحس إن السعر قافل الباب في وشه.",
    seo_title_ar: "دعم التجار الصغيرين في أسعار المانيكانات",
    seo_description_ar: "الشبيني يركز على سعر عملي وجودة مناسبة للتجار الصغيرين والمحلات النامية.",
  },
  "what-materials-are-used": {
    question_ar: "إيه الخامات المستخدمة؟",
    short_answer_ar: "الخامات بتختلف حسب الموديل، زي فايبر جلاس، ريزن، بولي يوريثان، قماش، معدن، أو خامات مختلطة.",
    answer_ar:
      "كل صفحة منتج فيها مواصفات فنية لما تكون متاحة. الخامة بتختلف حسب الموديل والوضعية والتشطيب والطلب الخاص، وده بيتأكد في عرض السعر.",
    seo_title_ar: "خامات المانيكانات المستخدمة في المحلات",
    seo_description_ar: "اعرف الخامات الشائعة في المانيكانات وإزاي المواصفات الفنية تساعدك تقارن الجودة.",
  },
  "how-can-i-check-product-quality": {
    question_ar: "أعرف جودة المنتج إزاي؟",
    short_answer_ar: "بص على المواصفات والتشطيب والاستخدام المناسب للمحل.",
    answer_ar:
      "الجودة مش اسم الخامة بس. التشطيب، المفاصل، القاعدة، الوزن، الثبات، وطريقة استخدام القطعة جوه المحل كلها بتفرق.",
    seo_title_ar: "إزاي تفحص جودة المانيكان قبل الطلب",
    seo_description_ar: "افهم جودة المانيكان من الخامة والتشطيب والثبات والاستخدام داخل المحل.",
  },
  "can-i-choose-finishes-and-colors": {
    question_ar: "ينفع أختار الألوان أو التشطيبات؟",
    short_answer_ar: "في طلبات كتير ينفع نتناقش في التشطيب واللون واتجاه الشكل.",
    answer_ar:
      "الموديلات العادية ليها اختياراتها، والطلبات الخاصة أو الكميات الأكبر ممكن تفتح مساحة أكبر للتشطيبات. التوافر النهائي حسب المنتج والكمية.",
    seo_title_ar: "اختيار ألوان وتشطيبات المانيكانات",
    seo_description_ar: "التجار يقدروا يتناقشوا في ألوان وتشطيبات المانيكانات حسب المنتج والطلب.",
  },
  "how-long-does-delivery-take": {
    question_ar: "التوصيل بياخد وقت قد إيه؟",
    short_answer_ar: "المدة حسب المخزون والكمية والتخصيص ومكان التوصيل.",
    answer_ar:
      "بعض المنتجات بتكون أسرع لو جاهزة أو قياسية. الكميات الكبيرة والتشطيبات الخاصة وتجهيز المحلات محتاجة تأكيد قبل ما نوعد بموعد نهائي.",
    seo_title_ar: "مدة توصيل المانيكانات للمحلات",
    seo_description_ar: "وقت توصيل المانيكانات يعتمد على المخزون والكمية والتخصيص ومكان العميل.",
  },
  "can-large-orders-be-delivered-in-stages": {
    question_ar: "ينفع الطلبات الكبيرة تتسلم على مراحل؟",
    short_answer_ar: "أيوه، التسليم المرحلي ممكن يتناقش في الطلبات الكبيرة أو الفروع المتعددة.",
    answer_ar:
      "في الطلبات الكبيرة، التسليم على مراحل ممكن يسهل العملية على المحل وفريق الإنتاج. الخطة بتتحدد حسب الكمية والتوقيت واحتياج الفروع.",
    seo_title_ar: "تسليم طلبات المانيكانات الكبيرة على مراحل",
    seo_description_ar: "طلبات الجملة أو الفروع المتعددة ممكن تتسلم على مراحل حسب الخطة.",
  },
  "is-delivery-available-for-store-setup-projects": {
    question_ar: "هل التوصيل متاح لمشاريع تجهيز المحلات؟",
    short_answer_ar: "التوصيل والتسليم بيتحددوا ضمن مناقشة عرض السعر.",
    answer_ar:
      "مشاريع تجهيز المحلات غالبًا فيها قطع عرض كتير، فالتوصيل بيتأكد مع عرض السعر بدل ما يتاخد كأنه منتج واحد عادي.",
    seo_title_ar: "توصيل تجهيز المحلات والمانيكانات",
    seo_description_ar: "توصيل مشاريع تجهيز المحلات يتم تأكيده أثناء مناقشة عرض السعر.",
  },
  "can-i-request-custom-mannequins": {
    question_ar: "ينفع أطلب مانيكانات مخصوص؟",
    short_answer_ar: "ينفع نتناقش في الشغل المخصوص حسب التصميم والكمية وإمكانية التصنيع.",
    answer_ar:
      "الوضعيات الخاصة، التشطيبات، قطع الحملات، واحتياجات العرض المختلفة ممكن تكون متاحة. الفريق محتاج يفهم هدف المحل قبل تأكيد التنفيذ والسعر.",
    seo_title_ar: "مانيكانات مخصصة وشغل عرض خاص",
    seo_description_ar: "الشبيني يناقش طلبات المانيكانات والتجهيزات الخاصة حسب التصميم والإنتاج.",
  },
  "what-details-help-with-custom-work": {
    question_ar: "إيه التفاصيل اللي تساعد في الشغل المخصوص؟",
    short_answer_ar: "نوع المحل، نوع البضاعة، المقاسات، اتجاه التشطيب، الكمية، والميعاد.",
    answer_ar:
      "كل ما الطلب يبقى عملي أكتر، الرد يبقى أدق. الصور، مقاسات المحل، المراجع، نوع البضاعة، والكمية بيساعدوا نحول الفكرة لعرض سعر واضح.",
    seo_title_ar: "تفاصيل مهمة لطلبات المانيكانات المخصصة",
    seo_description_ar: "اعرف التفاصيل المطلوبة عند طلب مانيكانات أو تشطيبات أو قطع عرض مخصصة.",
  },
  "can-elshbiny-match-my-brand-style": {
    question_ar: "ينفع الشبيني يظبط العرض على ستايل البراند؟",
    short_answer_ar: "اتجاه عرض مناسب للبراند ممكن يتناقش حسب المنتج والكمية.",
    answer_ar:
      "العرض بيبقى أقوى لما المانيكانات والقطع تمشي مع هوية المحل. الاختيارات النهائية بتعتمد على نوع المنتج والتشطيب وحجم الطلب.",
    seo_title_ar: "عرض مانيكانات مناسب لهوية البراند",
    seo_description_ar: "ناقش اختيارات مانيكانات وتجهيزات عرض تناسب شكل براند المحل.",
  },
  "does-elshbiny-handle-wholesale-orders": {
    question_ar: "الشبيني بيشتغل في طلبات الجملة؟",
    short_answer_ar: "أيوه. احتياجات الجملة والشركات جزء من مسار عرض السعر.",
    answer_ar:
      "التجار وأصحاب الفروع والشركات يقدروا يستخدموا مسار الاستفسار لمناقشة الكميات، الأسعار المحمية، توقيت التوصيل، ومزيج المنتجات.",
    seo_title_ar: "طلبات جملة مانيكانات للتجار والشركات",
    seo_description_ar: "الشبيني يدعم طلبات عروض سعر للمانيكانات بالجملة للتجار والشركات.",
  },
  "can-i-create-a-buyer-account": {
    question_ar: "ينفع أعمل حساب مشتري؟",
    short_answer_ar: "أيوه. حساب المشتري يساعد في الأسعار المحمية وتاريخ عروض الأسعار.",
    answer_ar:
      "بوابة B2B معمولة للعملاء الراجعين. ممكن تعرض أسعار محمية لما تكون متاحة وتحافظ على تاريخ عروض السعر مربوط بملف المشتري.",
    seo_title_ar: "حسابات مشتري B2B لعروض أسعار المانيكانات",
    seo_description_ar: "حسابات المشتري تساعد التجار في الوصول للأسعار المحمية وتاريخ عروض الأسعار.",
  },
  "what-is-the-best-way-to-start": {
    question_ar: "أبدأ منين؟",
    short_answer_ar: "ابدأ بتجهيز المحل لو محتاج توجيه، أو الكتالوج لو عارف المنتجات.",
    answer_ar:
      "لو بتجهز محل أو بتطور العرض، ابدأ من تجهيز المحل. لو عارف اتجاه المنتج، افتح الكتالوج وضيف القطع لمساحة الاستفسار.",
    seo_title_ar: "أفضل طريقة تبدأ طلب مانيكانات أو تجهيز محل",
    seo_description_ar: "اختار بين مسار تجهيز المحل والكتالوج حسب أنت جاهز للطلب قد إيه.",
  },
};

function withArabicCopy(faq: FaqItem): FaqItem {
  return { ...faq, ...(faqArabicCopy[faq.slug] ?? {}) };
}

export function listFaqs() {
  return faqs.map(withArabicCopy).sort((a, b) => a.sort_order - b.sort_order);
}

export function getFaqBySlug(slug: string) {
  const faq = faqs.find((item) => item.slug === slug);

  return faq ? withArabicCopy(faq) : null;
}

export function getFeaturedFaqs(limit = 4) {
  return listFaqs()
    .filter((faq) => faq.is_featured)
    .slice(0, limit);
}

export function getFaqCategories() {
  return faqCategories.map((category) => ({
    category,
    items: listFaqs().filter((faq) => faq.category === category),
  }));
}
