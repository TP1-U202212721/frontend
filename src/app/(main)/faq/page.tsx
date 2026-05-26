"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqs } from "@/data/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center flex-1 p-6 relative w-full h-full min-h-[calc(100vh-100px)]">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700/5 rounded-b-[50px] -z-10" />

      <div className="max-w-4xl w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 text-center">
          Preguntas Frecuentes
        </h1>
        <p className="text-xl sm:text-2xl text-slate-500 font-medium text-center mb-12 flex items-center justify-center gap-2">
          Encuentra respuestas sobre cómo funciona nuestra herramienta.
        </p>

        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6 sm:p-10">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-slate-100 last:border-0 pb-4 last:pb-0 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus:ring-4 focus:ring-blue-100 rounded-xl px-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xl font-bold text-slate-800 pr-4">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp size={24} className="text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown size={24} className="text-slate-400 shrink-0" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100 mt-4 px-4 pb-4" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
