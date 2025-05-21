"use client";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

function DonatePage() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl space-y-4 cursor-pointer"
      >
        <h2 className="text-2xl font-bold text-center">{t.donatePageTitle}</h2>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={t.donatePageInputPlaceholder}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
        >
          {t.donatePageSubmitButton}
        </button>
      </form>
    </div>
  );
}

export default DonatePage;
