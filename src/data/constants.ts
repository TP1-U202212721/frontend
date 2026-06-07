export const faqs = [
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
        answer: "Sí, tus consultas se almacenan de forma segura en tu historial personal para tu propia referencia. No compartimos tus datos de con terceros ni con los vendedores."
    }
];

export const terms = [
    {
        title: "1. Aceptación de los Términos",
        description: "Al acceder y utilizar ScamShield, usted acepta estar sujeto a estos Términos y Condiciones y a nuestra Política de Privacidad. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestros servicios."
    },
    {
        title: "2. Descripción del Servicio",
        description: "ScamShield proporciona una herramienta de estimación de riesgo de estafas en compras digitales en Perú mediante el uso de inteligencia artificial. Analizamos datos públicos y reportes de usuarios para asignar un nivel de riesgo a vendedores digitales. El resultado es una sugerencia y no constituye una garantía absoluta de la fiabilidad o falta de ella del vendedor."
    },
    {
        title: "3. Uso de la Información",
        description: "Usted se compromete a utilizar la información proporcionada por ScamShield exclusivamente para su protección personal. Queda estrictamente prohibido utilizar nuestros resultados para difamar, acosar o realizar campañas de desprestigio contra vendedores sin pruebas sustanciales adicionales."
    },
    {
        title: "4. Limitación de Responsabilidad",
        description: "Nuestros modelos de Machine Learning aprenden continuamente y pueden generar falsos positivos o falsos negativos. ScamShield, sus desarrolladores y afiliados no se hacen responsables de las decisiones de compra o venta que usted tome basándose en los niveles de riesgo presentados en la aplicación web."
    },
    {
        title: "5. Privacidad y Datos de Usuario",
        description: "Recopilamos información sobre sus consultas para mejorar nuestros modelos de IA y mantener su historial. Nos comprometemos a proteger sus datos personales y no vender su información a terceros. Puede eliminar su historial de consultas en cualquier momento desde la sección correspondiente."
    },
    {
        title: "6. Modificaciones a los Términos",
        description: "Nos reservamos el derecho de modificar o reemplazar estos Términos en cualquier momento. Se le notificará de cualquier cambio significativo a través de la aplicación o por correo electrónico. El uso continuado del servicio después de cualquier cambio constituye su aceptación de los nuevos Términos."
    }
]

export const PLATFORM_RULES: Record<string, { platform: string; regex: RegExp }[]> = {
  "mercadolibre": [
    { platform: "mercadolibre", regex: /[?&]wid=(MPE\d+)/i },
    { platform: "mercadolibre", regex: /\/p\/(MPE\d+)/i },
  ],
  "facebook": [
    { platform: "facebook", regex: /\/marketplace\/item\/(\d+)/ },
  ],
  "olx": [
    { platform: "olx", regex: /(\d+)\.html/ },
    { platform: "olx", regex: /iid-(\d+)/ },
  ],
};

export const riskLevels : Record<number, string> = {
    3: "Bajo",
    2: "Moderado",
    1: "Alto"
}