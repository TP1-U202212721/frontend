import "../styles/index.css";
import "../styles/tailwind.css";
import "../styles/theme.css";
import "../styles/fonts.css";
import { GlobalProvider } from "@/modules/shared/presentation/GlobalProvider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
         <GlobalProvider>
                {children}
          </GlobalProvider>
      </body>
    </html>
  );
}
