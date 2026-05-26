import { terms } from "@/data/constants";

export default function Terms() {
  return (
    <div className="flex flex-col items-center flex-1 p-6 relative w-full h-full min-h-[calc(100vh-100px)]">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700/5 rounded-b-[50px] -z-10" />

      <div className="max-w-4xl w-full animate-fade-in">
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 flex items-center justify-center gap-4">
            Términos y Condiciones
          </h1>
          <p className="text-xl text-slate-500 font-medium">Última actualización: 28 de Abril de 2026</p>
        </div>

        <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-md border border-slate-200">

          <div className="prose max-w-none text-slate-700">
            <div className="mb-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl">
              <h3 className="text-xl font-bold text-amber-800 flex items-center gap-2 mb-2">
                Aviso Importante
              </h3>
              <p className="text-amber-700 font-medium m-0">
                La información proporcionada por ScamShield es puramente orientativa y se basa en modelos predictivos. No nos hacemos responsables por pérdidas financieras o daños derivados de transacciones con vendedores consultados en esta plataforma.
              </p>
            </div>
            {
              terms.map((term, index) => {
                return (
                  <div key={index}>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">{term.title}</h2>
                    <p className="text-lg leading-relaxed mb-6 font-medium text-slate-600">{term.description}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
