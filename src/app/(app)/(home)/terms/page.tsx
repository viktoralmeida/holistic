import { Metadata } from "next"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { FileText, Shield, Users, AlertTriangle, CheckCircle, Clock, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
})

export const metadata: Metadata = {
  title: "Terms of Service - HeadSpa",
  description: "Read our terms of service to understand the rules and guidelines for using HeadSpa's services, products, and website.",
}

const TermsSection = ({ 
  title, 
  children, 
  icon: Icon 
}: { 
  title: string
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }> 
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className={cn("text-2xl font-semibold text-foreground", poppins.className)}>
        {title}
      </h2>
    </div>
    <div className="prose prose-gray dark:prose-invert max-w-none">
      {children}
    </div>
  </div>
)

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card/30 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className={cn("text-4xl lg:text-5xl font-bold text-foreground", poppins.className)}>
              Terms of Service
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By using HeadSpa, you agree to these terms.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Version 1.0</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-2xl p-6 mb-12 backdrop-blur-sm border border-border/30">
          <h3 className={cn("text-lg font-semibold mb-4", poppins.className)}>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">legal@headspa.pl</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">+48 123 456 789</p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="space-y-12">
          
          <TermsSection title="1. Acceptance of Terms" icon={CheckCircle}>
            <div className="space-y-4">
              <p>
                By accessing and using the HeadSpa website and services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access or use the service. By using our service, 
                you represent that you are at least 18 years old and have the legal capacity to enter into this agreement.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="2. Description of Service" icon={Users}>
            <div className="space-y-4">
              <p>
                HeadSpa provides professional head spa treatments, online training courses, and wellness products. 
                Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Professional head spa treatments at our Warsaw salon</li>
                <li>Online training courses and educational content</li>
                <li>Wellness products and equipment</li>
                <li>Customer support and consultation services</li>
                <li>Website and mobile application access</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of our service at any time 
                with reasonable notice to users.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="3. User Accounts" icon={Shield}>
            <div className="space-y-4">
              <p>
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use another person&apos;s account without permission</li>
                <li>Create multiple accounts for malicious purposes</li>
                <li>Share your account credentials with others</li>
                <li>Use automated systems to access our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
              <p>
                We reserve the right to terminate accounts that violate these terms or for any other reason 
                at our sole discretion.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="4. Payment Terms" icon={FileText}>
            <div className="space-y-4">
              <p>
                All purchases are subject to the following payment terms:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Pricing:</strong> All prices are listed in Polish Złoty (PLN) and include applicable taxes</li>
                <li><strong>Payment Methods:</strong> We accept major credit cards, bank transfers, and other payment methods as displayed</li>
                <li><strong>Billing:</strong> Payment is due at the time of purchase or booking</li>
                <li><strong>Refunds:</strong> Refund policies vary by service type and are detailed in our refund policy</li>
                <li><strong>Late Payments:</strong> Late payments may result in service suspension or account termination</li>
              </ul>
              <p>
                We use secure third-party payment processors and do not store your payment information on our servers.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="5. Cancellation and Refund Policy" icon={AlertTriangle}>
            <div className="space-y-4">
              <p>
                Our cancellation and refund policies are designed to be fair to both customers and our business:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Appointments:</strong> 24-hour notice required for appointment cancellations</li>
                <li><strong>Online Courses:</strong> 30-day money-back guarantee for digital products</li>
                <li><strong>Physical Products:</strong> 14-day return policy for unused items in original packaging</li>
                <li><strong>No-Shows:</strong> Full charge for missed appointments without proper notice</li>
                <li><strong>Processing Time:</strong> Refunds processed within 5-10 business days</li>
              </ul>
              <p>
                Special circumstances may be considered on a case-by-case basis. Contact our customer service 
                team for assistance with cancellations or refunds.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="6. Intellectual Property" icon={Shield}>
            <div className="space-y-4">
              <p>
                All content on our website and in our services is owned by HeadSpa or our licensors and is protected 
                by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Copy, reproduce, or distribute our content without permission</li>
                <li>Use our trademarks or logos without written consent</li>
                <li>Reverse engineer our software or systems</li>
                <li>Create derivative works based on our content</li>
                <li>Use our content for commercial purposes without authorization</li>
              </ul>
              <p>
                We grant you a limited, non-exclusive, non-transferable license to access and use our services 
                for personal, non-commercial purposes in accordance with these terms.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="7. User Conduct" icon={Users}>
            <div className="space-y-4">
              <p>
                You agree to use our services only for lawful purposes and in accordance with these terms. 
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Upload or transmit harmful, offensive, or inappropriate content</li>
                <li>Interfere with the operation of our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services for spam or unsolicited communications</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
              <p>
                We reserve the right to investigate and take appropriate action against anyone who violates 
                these terms, including removing content and terminating accounts.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="8. Privacy and Data Protection" icon={Shield}>
            <div className="space-y-4">
              <p>
                Your privacy is important to us. Our collection and use of personal information is governed 
                by our Privacy Policy, which is incorporated into these terms by reference.
              </p>
              <p>
                By using our services, you consent to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The collection and use of your personal information as described in our Privacy Policy</li>
                <li>The use of cookies and similar technologies as described in our Cookie Policy</li>
                <li>Receiving communications from us about our services and updates</li>
                <li>The transfer of your data to third-party service providers as necessary</li>
              </ul>
              <p>
                You can manage your privacy preferences through your account settings or by contacting us directly.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="9. Disclaimers and Limitations" icon={AlertTriangle}>
            <div className="space-y-4">
              <p>
                Our services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind. 
                We disclaim all warranties, express or implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Warranties of merchantability and fitness for a particular purpose</li>
                <li>Warranties that our services will be uninterrupted or error-free</li>
                <li>Warranties regarding the accuracy or completeness of information</li>
                <li>Warranties that defects will be corrected</li>
              </ul>
              <p>
                In no event shall HeadSpa be liable for any indirect, incidental, special, consequential, 
                or punitive damages arising out of or relating to your use of our services.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="10. Indemnification" icon={Shield}>
            <div className="space-y-4">
              <p>
                You agree to indemnify, defend, and hold harmless HeadSpa and its officers, directors, 
                employees, and agents from and against any claims, damages, losses, and expenses 
                (including reasonable attorneys&apos; fees) arising out of or relating to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your use of our services</li>
                <li>Your violation of these terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any content you submit or transmit through our services</li>
              </ul>
              <p>
                We reserve the right to assume the exclusive defense and control of any matter subject 
                to indemnification by you, and you agree to cooperate with our defense of such claims.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="11. Governing Law and Disputes" icon={FileText}>
            <div className="space-y-4">
              <p>
                These terms shall be governed by and construed in accordance with the laws of Poland, 
                without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising out of or relating to these terms or our services shall be resolved 
                through the following process:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>First, attempt to resolve the dispute through direct communication</li>
                <li>If unsuccessful, engage in mediation with a neutral third party</li>
                <li>As a last resort, submit to binding arbitration in Warsaw, Poland</li>
              </ul>
              <p>
                You agree to waive any right to a jury trial or to participate in a class action lawsuit.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="12. Changes to Terms" icon={Clock}>
            <div className="space-y-4">
              <p>
                We reserve the right to modify these terms at any time. When we make changes, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Update the &ldquo;Last updated&rdquo; date at the top of these terms</li>
                <li>Notify registered users via email of material changes</li>
                <li>Post a notice on our website about significant changes</li>
                <li>Provide reasonable advance notice for major changes</li>
              </ul>
              <p>
                Your continued use of our services after any changes indicates your acceptance of the updated terms. 
                If you do not agree to the new terms, you should stop using our services.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="13. Severability" icon={CheckCircle}>
            <div className="space-y-4">
              <p>
                If any provision of these terms is found to be unenforceable or invalid, that provision 
                will be limited or eliminated to the minimum extent necessary so that these terms will 
                otherwise remain in full force and effect and enforceable.
              </p>
              <p>
                The failure of HeadSpa to enforce any right or provision of these terms will not be deemed 
                a waiver of such right or provision.
              </p>
            </div>
          </TermsSection>

          <TermsSection title="14. Entire Agreement" icon={FileText}>
            <div className="space-y-4">
              <p>
                These terms, together with our Privacy Policy and Cookie Policy, constitute the entire 
                agreement between you and HeadSpa regarding the use of our services.
              </p>
              <p>
                These terms supersede all prior agreements, representations, and understandings between 
                the parties regarding the subject matter hereof.
              </p>
            </div>
          </TermsSection>

        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center">
          <h3 className={cn("text-2xl font-semibold mb-4", poppins.className)}>
            Questions About These Terms?
          </h3>
          <p className="text-muted-foreground mb-6">
            If you have any questions about these terms of service or need clarification on any provision, 
            please don&apos;t hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/privacy-policy">
                Privacy Policy
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
