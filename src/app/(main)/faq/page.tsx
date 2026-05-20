"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ShieldQuestion } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo funciona la estimación del nivel de riesgo de estafa?",
      answer: "La estimación del riesgo se basa en algoritmos de Inteligencia Artificial que analizan múltiples factores, como el historial de ventas, las reseñas de los clientes, y la verificación de la identidad del vendedor, para determinar un nivel de riesgo: Bajo, Moderado o Alto."
    },
    {
      question: "¿Qué significa un nivel de riesgo 'Alto'?",
      answer: "Un nivel de riesgo 'Alto' indica que el vendedor presenta características comunes en perfiles asociados a actividades fraudulentas o estafas. Te recomendamos encarecidamente evitar realizar transacciones con este vendedor o proceder con extrema precaución."
    },
    {
      question: "¿Puedo confiar completamente en el nivel de riesgo estimado?",
      answer: "El nivel de riesgo es una estimación basada en datos disponibles y modelos de aprendizaje automático. Aunque es una herramienta muy útil para mitigar riesgos, no es infalible y puede cometer errores. Siempre debes usar tu propio juicio y verificar la información del vendedor."
    },
    {
      question: "¿Cómo puedo reportar a un vendedor sospechoso?",
      answer: "Puedes reportar a un vendedor desde la página principal o la sección de 'Reportar'. Ingresa los detalles del vendedor y cualquier evidencia que tengas para ayudar a mejorar nuestros modelos y proteger a otros usuarios."
    },
    {
      question: "¿Mis consultas son privadas?",
      answer: "Sí, tus consultas se almacenan de forma segura en tu historial personal para tu propia referencia. No compartimos tus datos de consulta con terceros ni con los vendedores."
    }
  ];

  return (
    <div className="flex flex-col items-center flex-1 p-6 relative w-full h-full min-h-[calc(100vh-100px)]">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700/5 rounded-b-[50px] -z-10" />

      <div className="max-w-4xl w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 text-center">
          Preguntas Frecuentes
        </h1>
        <p className="text-xl sm:text-2xl text-slate-500 font-medium text-center mb-12 flex items-center justify-center gap-2">
          <ShieldQuestion size={28} className="text-blue-500" />
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
        
        <div className="mt-12 text-center">
          <p className="text-slate-500 font-medium">¿No encontraste lo que buscabas?</p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-bold underline transition-colors">Contáctanos</a>
        </div>
      </div>
    </div>
  );
}
