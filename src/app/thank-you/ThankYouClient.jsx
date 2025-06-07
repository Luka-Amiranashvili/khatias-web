"use client";

import { useSearchParams } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { t } = useLanguage();

  const message =
    type === "donation" ? t.thankYouMessageDonation : t.thankYouMessageContact;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold text-slate-700 pb-4">{message}</h1>
      <p className="text-lg text-gray-500 pb-6">{t.thankYouDescription}</p>
    </div>
  );
}
