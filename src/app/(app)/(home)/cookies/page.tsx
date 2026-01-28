import { Metadata } from "next"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Cookie, Settings, Shield, Eye, Clock, Database, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
})

export const metadata: Metadata = {
  title: "Cookie Policy - HeadSpa",
  description: "Learn about how HeadSpa uses cookies and similar technologies to enhance your browsing experience and provide personalized services.",
}

const CookieTypeCard = ({ 
  title, 
  description, 
  duration, 
  examples, 
  icon: Icon,
  color = "primary"
}: { 
  title: string
  description: string
  duration: string
  examples: string[]
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
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Duration: {duration}</span>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-foreground">Examples:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {examples.map((example, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const CookieTable = ({ cookies }: { cookies: Array<{ name: string, purpose: string, duration: string, type: string }> }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border/30">
          <th className="text-left py-3 px-4 font-semibold text-foreground">Cookie Name</th>
          <th className="text-left py-3 px-4 font-semibold text-foreground">Purpose</th>
          <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
          <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
        </tr>
      </thead>
      <tbody>
        {cookies.map((cookie, index) => (
          <tr key={index} className="border-b border-border/20 hover:bg-card/30 transition-colors">
            <td className="py-3 px-4 font-mono text-sm text-foreground">{cookie.name}</td>
            <td className="py-3 px-4 text-sm text-muted-foreground">{cookie.purpose}</td>
            <td className="py-3 px-4 text-sm text-muted-foreground">{cookie.duration}</td>
            <td className="py-3 px-4">
              <span className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                cookie.type === "Essential" && "bg-primary/10 text-primary",
                cookie.type === "Analytics" && "bg-accent/10 text-accent",
                cookie.type === "Marketing" && "bg-yellow-500/10 text-yellow-600",
                cookie.type === "Preferences" && "bg-blue-500/10 text-blue-600"
              )}>
                {cookie.type}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function CookiesPage() {
  const essentialCookies = [
    { name: "session_id", purpose: "Maintains user session", duration: "Session", type: "Essential" },
    { name: "csrf_token", purpose: "Security protection", duration: "Session", type: "Essential" },
    { name: "language", purpose: "Stores language preference", duration: "1 year", type: "Essential" },
  ]

  const analyticsCookies = [
    { name: "_ga", purpose: "Google Analytics tracking", duration: "2 years", type: "Analytics" },
    { name: "_gid", purpose: "Google Analytics session", duration: "24 hours", type: "Analytics" },
    { name: "_gat", purpose: "Google Analytics throttling", duration: "1 minute", type: "Analytics" },
  ]

  const marketingCookies = [
    { name: "_fbp", purpose: "Facebook pixel tracking", duration: "3 months", type: "Marketing" },
    { name: "_fbc", purpose: "Facebook click tracking", duration: "3 months", type: "Marketing" },
    { name: "ads_prefs", purpose: "Advertising preferences", duration: "1 year", type: "Marketing" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card/30 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
              <Cookie className="w-8 h-8 text-primary" />
            </div>
            <h1 className={cn("text-4xl lg:text-5xl font-bold text-foreground", poppins.className)}>
              Cookie Policy
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We use cookies and similar technologies to enhance your browsing experience, 
            analyze site traffic, and personalize content. Learn more about how we use cookies.
          </p>
        </div>

        {/* What are Cookies Section */}
        <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-2xl p-8 mb-12 backdrop-blur-sm border border-border/30">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className={cn("text-2xl font-semibold text-foreground mb-3", poppins.className)}>
                What Are Cookies?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us remember your preferences, analyze how you use our site, and provide you 
                with a better, more personalized experience.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">How Cookies Work</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Stored on your device when you visit our website</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Sent back to our servers with each request</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Help us remember your preferences and settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Enable personalized content and recommendations</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Cookie Categories</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Essential:</strong> Required for basic website functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Analytics:</strong> Help us understand site usage</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Marketing:</strong> Used for personalized advertising</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Preferences:</strong> Remember your settings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="mb-12">
          <h2 className={cn("text-3xl font-bold text-center mb-8", poppins.className)}>
            Types of Cookies We Use
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CookieTypeCard
              title="Essential Cookies"
              description="These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions."
              duration="Session to 1 year"
              examples={[
                "Authentication and security",
                "Shopping cart functionality",
                "Language preferences",
                "Session management"
              ]}
              icon={Shield}
              color="primary"
            />
            
            <CookieTypeCard
              title="Analytics Cookies"
              description="These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously."
              duration="24 hours to 2 years"
              examples={[
                "Page visit statistics",
                "User behavior analysis",
                "Performance monitoring",
                "Error tracking"
              ]}
              icon={Eye}
              color="accent"
            />
            
            <CookieTypeCard
              title="Marketing Cookies"
              description="These cookies are used to track visitors across websites to display relevant and engaging advertisements."
              duration="3 months to 1 year"
              examples={[
                "Ad personalization",
                "Social media integration",
                "Retargeting campaigns",
                "Conversion tracking"
              ]}
              icon={Settings}
              color="warning"
            />
            
            <CookieTypeCard
              title="Preference Cookies"
              description="These cookies allow the website to remember information that changes the way it behaves or looks."
              duration="1 month to 1 year"
              examples={[
                "Theme preferences",
                "Font size settings",
                "Content preferences",
                "Interface customization"
              ]}
              icon={Settings}
              color="primary"
            />
          </div>
        </div>

        {/* Cookie Details Tables */}
        <div className="space-y-8">
          <div>
            <h3 className={cn("text-2xl font-semibold mb-4", poppins.className)}>
              Essential Cookies
            </h3>
            <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-2xl p-6 backdrop-blur-sm border border-border/30">
              <CookieTable cookies={essentialCookies} />
            </div>
          </div>

          <div>
            <h3 className={cn("text-2xl font-semibold mb-4", poppins.className)}>
              Analytics Cookies
            </h3>
            <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-2xl p-6 backdrop-blur-sm border border-border/30">
              <CookieTable cookies={analyticsCookies} />
            </div>
          </div>

          <div>
            <h3 className={cn("text-2xl font-semibold mb-4", poppins.className)}>
              Marketing Cookies
            </h3>
            <div className="bg-gradient-to-r from-card/50 to-background/50 rounded-2xl p-6 backdrop-blur-sm border border-border/30">
              <CookieTable cookies={marketingCookies} />
            </div>
          </div>
        </div>

        {/* Cookie Management */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h2 className={cn("text-2xl font-semibold text-foreground", poppins.className)}>
                Managing Your Cookie Preferences
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You have control over which cookies you accept. You can manage your preferences 
              through your browser settings or use our cookie consent manager.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Browser Settings</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Disabling essential cookies may break website functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Most browsers allow you to block third-party cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>You can delete cookies through browser settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Private/incognito mode automatically clears cookies</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Our Cookie Manager</h3>
              <p className="text-sm text-muted-foreground">
                Use our cookie consent manager to control which types of cookies you accept. 
                You can change your preferences at any time.
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  Manage Cookie Preferences
                </Button>
                <Button variant="outline" className="w-full">
                  Accept All Cookies
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="mt-12 bg-gradient-to-r from-card/50 to-background/50 rounded-2xl p-8 backdrop-blur-sm border border-border/30">
          <h2 className={cn("text-2xl font-semibold mb-6", poppins.className)}>
            Third-Party Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Google Analytics</h3>
              <p className="text-sm text-muted-foreground">
                We use Google Analytics to understand how visitors use our website. 
                Google Analytics uses cookies to collect information about your use of our site.
              </p>
              <Link href="#" className="text-sm text-primary hover:underline">
                Google Privacy Policy →
              </Link>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Facebook Pixel</h3>
              <p className="text-sm text-muted-foreground">
                We use Facebook Pixel to track conversions and optimize our advertising campaigns. 
                This helps us provide more relevant content and offers.
              </p>
              <Link href="#" className="text-sm text-primary hover:underline">
                Facebook Data Policy →
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center">
          <h3 className={cn("text-2xl font-semibold mb-4", poppins.className)}>
            Questions About Cookies?
          </h3>
          <p className="text-muted-foreground mb-6">
            If you have any questions about our use of cookies or would like to exercise 
            your rights regarding your personal data, please contact us.
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
