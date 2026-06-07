export function Modal({ isOpen, onClose, title, description}: { isOpen: boolean; onClose: () => void; title: string; description: string }) {
    if (!isOpen) return null;
    return (<div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all animate-scale-in flex flex-col items-center">
            <div className="w-full relative py-6 px-8 border-b border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="w-12 h-12 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Cerrar"
              >
                <span className="text-2xl font-bold leading-none">&times;</span>
              </button>
            </div>
            <div className="px-8 sm:px-12 pb-12 w-full flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center mb-10 break-all">
                {title}
              </h2>
              <p className="text-xl font-bold text-slate-700 mb-8 text-center">
                {description}
              </p>
              <button
                onClick={onClose}
                className="w-full sm:w-1/2 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>)
}