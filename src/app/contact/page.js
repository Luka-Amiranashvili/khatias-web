"use client";

import { useLanguage } from "../../context/LanguageContext";

const ContactPage = () => {
  const { t } = useLanguage();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const handleSubmit = (e) => {
    const form = e.target;
    form.submit();
  };

  return (
    <form
      action="http://formsubmit.co/giokoch@hotmail.com"
      method="POST"
      className="flex flex-col items-center text-sm mt-12 mb-12"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={`${baseUrl}/`} />

      <p className="text-lg text-blue-600 font-medium pb-2">
        {t.contactPageTitle}
      </p>
      <h1 className="text-4xl font-semibold text-slate-700 pb-4">
        {t.contactPageSubtitle}
      </h1>
      <p className="text-sm text-gray-500 text-center pb-10">
        {t.contactPageDescription}
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
        <div className="w-full">
          <label className="text-black/70" htmlFor="name">
            {t.contactNameLabel}
          </label>
          <input
            name="name"
            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
            type="text"
            required
          />
        </div>
        <div className="w-full">
          <label className="text-black/70" htmlFor="email">
            {t.contactEmailLabel}
          </label>
          <input
            name="email"
            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
            type="email"
            required
          />
        </div>
      </div>

      <div className="mt-6 w-[350px] md:w-[700px]">
        <label className="text-black/70" htmlFor="message">
          {t.contactMessageLabel}
        </label>
        <textarea
          name="message"
          className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="mt-5 bg-indigo-600 hover:bg-indigo-500 text-white h-12 w-56 px-4 rounded active:scale-95 transition cursor-pointer"
      >
        {t.contactSendButton}
      </button>
    </form>
  );
};

export default ContactPage;
