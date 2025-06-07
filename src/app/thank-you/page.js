"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";

const ThankYouPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { t } = useLanguage();

  let message;
  if (type === "donation") {
    message = t.thankYouMessageDonation;
  } else {
    message = t.thankYouMessageContact;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold text-slate-700 pb-4">{message}</h1>
      <p className="text-lg text-gray-500 pb-6">{t.thankYouDescription}</p>
    </div>
  );
};

export default ThankYouPage;
