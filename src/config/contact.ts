const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const contactConfig = {
  brandName: process.env.NEXT_PUBLIC_CONTACT_BRAND_NAME ?? "Elshbiny",
  phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ?? "",
  phoneHref: process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF ?? "",
  whatsappHref: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? (whatsappNumber ? `https://wa.me/${whatsappNumber}` : ""),
  messengerHref: process.env.NEXT_PUBLIC_MESSENGER_URL ?? "",
};

export const siteLinks = [
  { href: "/catalog", label: { en: "Catalog", ar: "الكتالوج" } },
  { href: "/fit-out", label: { en: "Fit-out", ar: "تجهيز المحل" } },
  { href: "/about", label: { en: "About", ar: "عن الشبيني" } },
  { href: "/faq", label: { en: "FAQ", ar: "الأسئلة" } },
  { href: "/contact", label: { en: "Contact", ar: "اتصل بنا" } },
  { href: "/login", label: { en: "Portal", ar: "الدخول" } },
];
