import { FileText, ShieldAlert } from "lucide-react";

export default function Terms() {
  return (
    <div className="flex flex-col items-center flex-1 p-6 relative w-full h-full min-h-[calc(100vh-100px)]">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700/5 rounded-b-[50px] -z-10" />

      <div className="max-w-4xl w-full animate-fade-in">
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 flex items-center justify-center gap-4">
            <FileText size={40} className="text-blue-500" />
            Términos y Condiciones
          </h1>
          <p className="text-xl text-slate-500 font-medium">Última actualización: 28 de Abril de 2026</p>
        </div>

        <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-md border border-slate-200">
          
          <div className="prose max-w-none text-slate-700">
            <div className="mb-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl">
              <h3 className="text-xl font-bold text-amber-800 flex items-center gap-2 mb-2">
                <ShieldAlert size={24} />
                Aviso Importante
              </h3>
              <p className="text-amber-700 font-medium m-0">
                La información proporcionada por ScamShield es puramente orientativa y se basa en modelos predictivos. No nos hacemos responsables por pérdidas financieras o daños derivados de transacciones con vendedores consultados en esta plataforma.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">1. Aceptación de los Términos</h2>
            <p className="text-lg leading-relaxed mb-6 font-medium text-slate-600">
              Al acceder y utilizar ScamShield, usted acepta estar sujeto a estos Términos y Condiciones y a nuestra Política de Privacidad. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestros servicios.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">2. Descripción del Servicio</h2>
            <p className="text-lg leading-relaxed mb-6 font-medium text-slate-600">
              ScamShield proporciona una herramienta de estimación de riesgo de estafas en compras digitales en Perú mediante el uso de inteligencia artificial. Analizamos datos públicos y reportes de usuarios para asignar un nivel de riesgo a vendedores digitales. El resultado es una sugerencia y no constituye una garantía absoluta de la fiabilidad o falta de ella del vendedor.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">3. Uso de la Información</h2>
            <p className="text-lg leading-relaxed mb-6 font-medium text-slate-600">
              Usted se compromete a utilizar la información proporcionada por ScamShield exclusivamente para su protección personal. Queda estrictamente prohibido utilizar nuestros resultados para difamar, acosar o realizar campañas de desprestigio contra vendedores sin pruebas sustanciales adicionales.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">4. Limitación de Responsabilidad</h2>
            <p className="text-lg leading-relaxed mb-6 font-medium text-slate-600">
              Nuestros modelos de Machine Learning aprenden continuamente y pueden generar falsos positivos o falsos negativos. ScamShield, sus desarrolladores y afiliados no se hacen responsables de las decisiones de compra o venta que usted tome basándose en los niveles de riesgo presentados en la aplicación web.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">5. Privacidad y Datos de Usuario</h2>
            <p className="text-lg leading-relaxed mb-6 font-medium text-slate-600">
              Recopilamos información sobre sus consultas para mejorar nuestros modelos de IA y mantener su historial. Nos comprometemos a proteger sus datos personales y no vender su información a terceros. Puede eliminar su historial de consultas en cualquier momento desde la sección correspondiente.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">6. Modificaciones a los Términos</h2>
            <p className="text-lg leading-relaxed mb-6 font-medium text-slate-600">
              Nos reservamos el derecho de modificar o reemplazar estos Términos en cualquier momento. Se le notificará de cualquier cambio significativo a través de la aplicación o por correo electrónico. El uso continuado del servicio después de cualquier cambio constituye su aceptación de los nuevos Términos.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-center font-medium text-slate-500">
                Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos en <a href="mailto:soporte@scamshield.pe" className="text-blue-600 hover:text-blue-800 underline">soporte@scamshield.pe</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
