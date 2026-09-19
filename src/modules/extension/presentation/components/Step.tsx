import { LucideIcon } from "lucide-react";

export const focusRing =
  "focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50";

export const stepText = "text-base sm:text-lg text-slate-600 font-medium sm:pl-15";

export function Step({
  number,
  title,
  Icon,
  children,
}: {
  number: number;
  title: string;
  Icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <li className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
      <div className="flex items-center gap-4 mb-3">
        <span
          className="w-11 h-11 shrink-0 rounded-full bg-blue-700 text-white flex items-center justify-center text-xl font-extrabold"
          aria-hidden="true"
        >
          {number}
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 flex items-center gap-2">
          <span className="sr-only">Paso {number}: </span>
          {title}
          <Icon size={22} className="text-blue-600 shrink-0" aria-hidden="true" />
        </h3>
      </div>
      {children}
    </li>
  );
}
