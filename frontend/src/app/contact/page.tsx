'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message sent successfully!',
        description: 'We\'ll get back to you as soon as possible.',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-bold tracking-tight mb-8 text-left">Contact Us</h1>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader className="text-left">
              <CardTitle className="text-left">Send us a message</CardTitle>
              <CardDescription className="text-left">
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-left">
                <CardTitle className="flex items-center gap-2 text-left">
                  <Mail className="h-5 w-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <p className="text-muted-foreground">Get in touch via email</p>
                <p className="font-medium">contact@graphqlblog.com</p>
                <p className="font-medium">support@graphqlblog.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-left">
                <CardTitle className="flex items-center gap-2 text-left">
                  <Phone className="h-5 w-5" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <p className="text-muted-foreground">Call us during business hours</p>
                <p className="font-medium">+1 (555) 123-4567</p>
                <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-5PM EST</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-left">
                <CardTitle className="flex items-center gap-2 text-left">
                  <MapPin className="h-5 w-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <p className="font-medium">GraphQL Blog Inc.</p>
                <p className="text-muted-foreground">123 Web Developer Street</p>
                <p className="text-muted-foreground">Tech City, TC 12345</p>
                <p className="text-muted-foreground">United States</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-left">
                <CardTitle className="text-left">Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 5:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 2:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
