import { Header } from "./header"
import { Footer } from "./footer"
import { Toaster } from "sonner"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  )
}
