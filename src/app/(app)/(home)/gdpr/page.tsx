import { Metadata } from "next"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Eye, Shield, Users, FileText, Clock, Mail, Phone, CheckCircle, AlertTriangle, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
})

export const metadata: Metadata = {
  title: "GDPR Compliance - HeadSpa",
  description: "Learn about HeadSpa's GDPR compliance measures and how we protect your personal data in accordance with European data protection regulations.",
}

const GDPRPrincipleCard = ({ 
  title, 
  description, 
  icon: Icon,
  color = "primary"
}: { 
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color?: "primary" | "accent" | "destructive" | "warning"
}) => {
  const colorClasses = {
    primary: "from-primary/10 to-primary/5 border-primary/20",
    accent: "from-accent/10 to-accent/5 border-accent/20",
    destructive: "from-destructive/10 to-destructive/5 border-destructive/20",
    warning: "from-yellow-500/10 to-yellow-500/5 border-yellow-500/20"
  }

  const iconColors = {
    primary: "text-primary",
    accent: "text-accent",
    destructive: "text-destructive",
    warning: "text-yellow-500"
  }

  return (
    <div className={cn(
      "bg-gradient-to-br from-card/50 to-background/50 rounded-2xl p-6 border border-border/30 backdrop-blur-sm",
      "hover:shadow-lg transition-all duration-300 transform-gpu hover:-translate-y-1"
    )}>
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-xl bg-gradient-to-r", colorClasses[color])}>
          <Icon className={cn("w-6 h-6", iconColors[color])} />
        </div>
        <div className="flex-1 space-y-3">
          <h3 className={cn("text-lg font-semibold text-foreground", poppins.className)}>
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

const RightsCard = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }> 
}) => (
  <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-xl p-4 border border-border/30 backdrop-blur-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
)

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card/30 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h1 className={cn("text-4xl lg:text-5xl font-bold text-foreground", poppins.className)}>
              GDPR Compliance
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            HeadSpa is committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR). 
            Learn about your rights and our data protection measures.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-2xl p-6 mb-12 backdrop-blur-sm border border-border/30">
          <h3 className={cn("text-lg font-semibold mb-4", poppins.className)}>
            Data Protection Officer Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">dpo@headspa.pl</p>
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

        {/* What is GDPR */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className={cn("text-2xl font-semibold text-foreground mb-3", poppins.className)}>
                What is GDPR?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect 
                on May 25, 2018. It applies to all organizations operating within the EU and those that offer goods or 
                services to individuals in the EU, regardless of where the organization is based.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Key Objectives</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Give individuals control over their personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Simplify the regulatory environment for international business</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Ensure consistent data protection across the EU</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Hold organizations accountable for data protection</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Who It Applies To</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Data Controllers:</strong> Organizations that determine how and why personal data is processed</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Data Processors:</strong> Organizations that process data on behalf of controllers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Data Subjects:</strong> Individuals whose personal data is being processed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* GDPR Principles */}
        <div className="mb-12">
          <h2 className={cn("text-3xl font-bold text-center mb-8", poppins.className)}>
            GDPR Principles We Follow
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GDPRPrincipleCard
              title="Lawfulness, Fairness, and Transparency"
              description="We process personal data lawfully, fairly, and in a transparent manner. We clearly inform you about how we use your data and obtain your consent when required."
              icon={Shield}
              color="primary"
            />
            
            <GDPRPrincipleCard
              title="Purpose Limitation"
              description="We collect personal data for specified, explicit, and legitimate purposes. We do not process your data for purposes incompatible with the original purpose."
              icon={Eye}
              color="accent"
            />
            
            <GDPRPrincipleCard
              title="Data Minimization"
              description="We only collect personal data that is adequate, relevant, and limited to what is necessary for the purposes for which it is processed."
              icon={Database}
              color="warning"
            />
            
            <GDPRPrincipleCard
              title="Accuracy"
              description="We ensure that personal data is accurate and kept up to date. We take reasonable steps to rectify or erase inaccurate data."
              icon={CheckCircle}
              color="primary"
            />
            
            <GDPRPrincipleCard
              title="Storage Limitation"
              description="We keep personal data in a form that permits identification for no longer than necessary for the purposes for which it is processed."
              icon={Clock}
              color="accent"
            />
            
            <GDPRPrincipleCard
              title="Integrity and Confidentiality"
              description="We implement appropriate technical and organizational measures to ensure the security of personal data, including protection against unauthorized access."
              icon={Shield}
              color="warning"
            />
          </div>
        </div>

        {/* Your Rights */}
        <div className="mb-12">
          <h2 className={cn("text-3xl font-bold text-center mb-8", poppins.className)}>
            Your GDPR Rights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <RightsCard
              title="Right to Access"
              description="You have the right to request a copy of your personal data and information about how we process it."
              icon={Eye}
            />
            <RightsCard
              title="Right to Rectification"
              description="You can request correction of inaccurate personal data and completion of incomplete data."
              icon={FileText}
            />
            <RightsCard
              title="Right to Erasure"
              description="You can request deletion of your personal data in certain circumstances (right to be forgotten)."
              icon={Database}
            />
            <RightsCard
              title="Right to Restriction"
              description="You can request limitation of processing in certain situations."
              icon={Shield}
            />
            <RightsCard
              title="Right to Portability"
              description="You can receive your personal data in a structured, machine-readable format."
              icon={Users}
            />
            <RightsCard
              title="Right to Object"
              description="You can object to processing of your personal data in certain circumstances."
              icon={AlertTriangle}
            />
          </div>
        </div>

        {/* How We Protect Your Data */}
        <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-2xl p-8 mb-12 backdrop-blur-sm border border-border/30">
          <h2 className={cn("text-2xl font-semibold mb-6", poppins.className)}>
            How We Protect Your Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Technical Measures</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Encryption of data in transit and at rest</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Regular security assessments and penetration testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Multi-factor authentication for sensitive operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Secure data centers with physical access controls</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Organizational Measures</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Data protection training for all employees</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Access controls and role-based permissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Regular data protection impact assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Incident response procedures and breach notification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Processing Activities */}
        <div className="mb-12">
          <h2 className={cn("text-2xl font-semibold mb-6", poppins.className)}>
            Our Data Processing Activities
          </h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-xl p-6 backdrop-blur-sm border border-border/30">
              <h3 className="font-semibold text-foreground mb-3">Customer Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Purpose</p>
                  <p className="text-muted-foreground">Providing spa services and customer support</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Legal Basis</p>
                  <p className="text-muted-foreground">Contract performance and legitimate interest</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Retention Period</p>
                  <p className="text-muted-foreground">7 years (legal requirements)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-xl p-6 backdrop-blur-sm border border-border/30">
              <h3 className="font-semibold text-foreground mb-3">Marketing Communications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Purpose</p>
                  <p className="text-muted-foreground">Sending promotional offers and updates</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Legal Basis</p>
                  <p className="text-muted-foreground">Consent and legitimate interest</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Retention Period</p>
                  <p className="text-muted-foreground">Until consent withdrawal</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-xl p-6 backdrop-blur-sm border border-border/30">
              <h3 className="font-semibold text-foreground mb-3">Website Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Purpose</p>
                  <p className="text-muted-foreground">Improving website performance and user experience</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Legal Basis</p>
                  <p className="text-muted-foreground">Legitimate interest</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Retention Period</p>
                  <p className="text-muted-foreground">26 months (Google Analytics)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* International Transfers */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 mb-12">
          <h2 className={cn("text-2xl font-semibold mb-6", poppins.className)}>
            International Data Transfers
          </h2>
          <p className="text-muted-foreground mb-6">
            When we transfer your personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Adequacy Decisions</h3>
              <p className="text-sm text-muted-foreground">
                We transfer data to countries that have been deemed to provide an adequate level of protection 
                by the European Commission.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Standard Contractual Clauses</h3>
              <p className="text-sm text-muted-foreground">
                We use EU-approved standard contractual clauses to ensure adequate protection when transferring 
                data to countries without adequacy decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Exercising Your Rights */}
        <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-2xl p-8 backdrop-blur-sm border border-border/30">
          <h2 className={cn("text-2xl font-semibold mb-6", poppins.className)}>
            How to Exercise Your Rights
          </h2>
          <div className="space-y-6">
            <p className="text-muted-foreground">
              To exercise your GDPR rights, you can contact us using any of the following methods:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Contact Methods</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>Email: dpo@headspa.pl</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>Phone: +48 123 456 789</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Online form in your account settings</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Response Timeline</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>We will respond to your request within 30 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Complex requests may take up to 60 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>We may request additional information to verify your identity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center">
          <h3 className={cn("text-2xl font-semibold mb-4", poppins.className)}>
            Questions About GDPR Compliance?
          </h3>
          <p className="text-muted-foreground mb-6">
            If you have any questions about our GDPR compliance or would like to exercise your data protection rights, 
            please contact our Data Protection Officer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Link href="/contact">
                Contact DPO
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
