"use client";

import { useTranslations } from "./I18nProvider";





export default function ContactCTA() {
  const { dict } = useTranslations();

  return (
    <section id="contact" className="py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
          <span className="text-white">{dict.contact.title}</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-zinc-300">
          {dict.contact.description}
        </p>


      </div>
    </section>
  );
}
