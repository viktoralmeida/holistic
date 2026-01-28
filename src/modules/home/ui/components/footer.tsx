"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Shield,
  ArrowUp,
  MessageCircle
} from "lucide-react"
import { Poppins } from "next/font/google"
import Image from "next/image"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
})

const socialLinks = [
  { 
    icon: "facebook", 
    href: "https://www.instagram.com/headspa_holistic.point", 
    label: "Facebook",
    src: "/facebook.png",
    alt: "Facebook"
  },
  { 
    icon: "instagram", 
    href: "https://www.instagram.com/headspa_holistic.point", 
    label: "Instagram",
    src: "/instagram.png",
    alt: "Instagram"
  },
]

const quickLinks = [
  { href: "/products", label: "Produkty" },
  { href: "/about", label: "Szkolenia" },
  { href: "/features", label: "Salon" },
  { href: "/contact", label: "Kontakt" },
]

const legalLinks = [
  { href: "/privacy-policy", label: "Prywatność", icon: Shield },
]

const FooterLink = ({ 
  href, 
  children, 
  icon: Icon,
  external = false 
}: { 
  href: string
  children: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  external?: boolean 
}) => (
  <Link 
    href={href}
    className={cn(
      "group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200",
      ""
    )}
  >
    {Icon && <Icon className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors duration-200" />}
    <span className="relative">
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200"></span>
    </span>
    {external && <ArrowUp className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
  </Link>
)

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-[#b19681] relative z-40">
      {/* Main footer content */}
      <div className="w-full px-4 lg:px-8 py-8">
        
        {/* Main Footer Content - Horizontal Layout */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left Section - Company Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-[#7A1317] px-3 py-2 rounded-md">
                <div className="text-center">
                  <div className={cn("font-semibold text-white leading-tight text-sm", poppins.className)}>
                    HOLISTIC
                  </div>
                  <div className={cn("font-medium text-white leading-tight text-xs", poppins.className)}>
                    POINT
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 text-xs text-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-foreground flex-shrink-0" />
                <span className="font-medium">Warsaw, Poland</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-foreground flex-shrink-0" />
                <span className="font-medium">+48 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-foreground flex-shrink-0" />
                <span className="font-medium">info@holisticpoint.pl</span>
              </div>
            </div>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
              {quickLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
            <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
              {legalLinks.map((link) => (
                <FooterLink key={link.href} href={link.href} icon={link.icon}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Right Section - Contact and Social */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Contact Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <h2 className="text-sm font-medium text-foreground">
                Masz terminowe pytanie?
              </h2>
              <Button 
                asChild
                className={cn(
                  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border rounded-md backdrop-blur-sm",
                  "h-8 px-3 text-xs",
                  "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80 hover:text-secondary-foreground hover:border-border/80 hover:shadow-lg transition-all duration-200"
                )}
              >
                <Link href="/contact">
                  <MessageCircle className="h-3 w-3" />
                  <span>Skontaktuj się</span>
                </Link>
              </Button>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link 
                  key={social.label}
                  href={social.href} 
                  aria-label={social.label}
                  className="block "
                >
                  <Image 
                    src={social.src}
                    alt={social.alt}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4 mt-4 border-t border-[#b19681]">
          <p className="text-xs text-foreground">
            &copy; {currentYear} Holistic Point. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-1 text-xs text-foreground">
            <span>Stworzone z</span>
            <Heart className="w-3 h-3 text-primary fill-current" />
            <span>w Polsce</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 
