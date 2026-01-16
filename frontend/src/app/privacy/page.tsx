import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none dark:prose-invert">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
          <p>
            GraphQL Blog ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Personal Data</h3>
          <p>
            Personally identifiable information, such as Name, email address, and telephone number, and other information that is voluntarily provided to us when you register for the Site or when you choose to participate in various activities related to the Site.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Usage Data</h3>
          <p>
            We automatically collect certain information when you visit, use, or navigate the Site. This information does not reveal your specific identity but may include device and usage information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>GraphQL Blog uses the collected data for various purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features when you choose to do so</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Data Protection Rights</h2>
          <p>
            You have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p>
            Email: privacy@graphqlblog.com<br />
            Address: 123 Web Developer Street, Tech City, TC 12345
          </p>
        </div>
      </div>
    </div>
  )
}
