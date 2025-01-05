import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/navbar";
import { IconBase } from "react-icons";
import Image from "next/image";
import FooterPage from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  title: "โรงเรียนบ้านหนองเบิด",
  description:
    "โรงเรียนบ้านหนองเบิด ตำบลเมืองน้อย อำเภอธวัชบุรี จังหวัดร้อยเอ็ด",
  keywords: "Nongberd School, โรงเรียนบ้านหนองเบิด, หนองเบิด",
  icons: {
    icon: "/favicon.png", // Default favicon
    shortcut: "/favicon.ico", // Optional shortcut icon
    apple: "/apple-touch-icon.png", // Optional Apple Touch icon
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-6xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    {/* <Navbar /> */}
                    {/* <Image
                      src={
                        "https://res.cloudinary.com/dja3yvewr/image/upload/v1735833752/main_folder/sub_folder/wngxwwdpitpnzzrpumil.png"
                      }
                      alt={"....."}
                      width={32}
                      height={16}
                      className="w-full h-full object-cover rounded-lg"
                    /> */}
                    <Link href={"/"} className="text-bold text-wrap text-3xl">โรงเรียนบ้านหนองเบิด</Link>

                    <div className="flex items-center gap-2">
                      {/* <DeployButton /> */}
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>

              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                {/* <p>
                  Powered by{" "}
                  <a
                    href=""
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p> */}
                <p className="text-sm text-blod">90 หมู่ 7 ตำบลเมืองน้อย อำเภอธวัชบุรี จังหวัดร้อยเอ็ด</p>
                <br />
                <ThemeSwitcher />
              </footer>
              {/* <FooterPage /> */}
                {/* <p>90 หมู่ 7 ตำบลเมืองน้อย, Amphoe Thawat Buri, Thailand, Roi Et</p> */}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
