import { StubHeader as Header } from "./stub-header"
import { Footer } from "./footer"
import { Toaster } from "@/components/ui/toaster"
import { StubUserProvider } from "@/contexts/stub-user-context"
import { ToastContextProvider } from "@/contexts/toast-context"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastContextProvider>
      <StubUserProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
      </StubUserProvider>
    </ToastContextProvider>
  )
}
