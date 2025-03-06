import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <main>
            <Header />
            {children}
        </main>
    </ClerkProvider>
  );
}