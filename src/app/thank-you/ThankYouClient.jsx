// app/thank-you/ThankYouClient.jsx
"use client";

import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const type = searchParams.get("type");
    const msg =
      type === "donation"
        ? t.thankYouMessageDonation
        : t.thankYouMessageContact;
    setMessage(msg);
  }, [searchParams, t]);

  if (!message) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold text-slate-700 pb-4">{message}</h1>
      <p className="text-lg text-gray-500 pb-6">{t.thankYouDescription}</p>
    </div>
  );
}
