import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/" className="group flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none dark:prose-invert">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using GraphQL Blog, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on GraphQL Blog for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
          <p>
            The materials on GraphQL Blog are provided on an 'as is' basis. GraphQL Blog makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
          <p>
            In no event shall GraphQL Blog or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GraphQL Blog.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Privacy Policy</h2>
          <p>
            Your Privacy is important to us. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Revisions and Errata</h2>
          <p>
            The materials appearing on GraphQL Blog could include technical, typographical, or photographic errors. GraphQL Blog does not promise that any of the materials on its web site are accurate, complete, or current.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Site Terms of Use Modifications</h2>
          <p>
            GraphQL Blog may revise these terms of service for its web site at any time without notice. By using this web site, you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p>
            Email: contact@graphqlblog.com<br />
            Address: 123 Web Developer Street, Tech City, TC 12345
          </p>
        </div>
      </div>
    </div>
  )
}
