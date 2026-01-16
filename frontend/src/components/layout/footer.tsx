import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Footer() {
  return (
    <TooltipProvider>
      <footer className="border-t py-6 md:py-0">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with Next.js, GraphQL, and Tailwind CSS.
        </p>
        <div className="flex items-center space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View our terms of service</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View our privacy policy</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Get in touch with us</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </footer>
    </TooltipProvider>
  )
}
