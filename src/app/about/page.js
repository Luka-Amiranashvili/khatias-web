"use client";

import { useLanguage } from "../../context/LanguageContext";

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white px-6 py-16 flex items-center justify-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          {t.aboutImediFoundation}
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          {t.aboutDescription}
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          {t.aboutOrphanageFocus}
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          {t.aboutElderlyFocus}
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          {t.aboutCommitment}
        </p>

        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          {t.aboutActions?.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>

        <p className="text-lg text-gray-700 leading-relaxed">
          {t.aboutSupport}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
