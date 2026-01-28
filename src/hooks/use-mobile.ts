import * as React from "react"

const MOBILE_BREAKPOINT = 640
const TABLET_BREAKPOINT = 768
const LAPTOP_BREAKPOINT = 1024
const DESKTOP_BREAKPOINT = 1280
const LARGE_DESKTOP_BREAKPOINT = 1536

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useResponsive() {
  const [windowWidth, setWindowWidth] = React.useState<number>(0)
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    setIsHydrated(true)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Use default values during SSR to prevent hydration mismatches
  const isMobile = isHydrated ? windowWidth < MOBILE_BREAKPOINT : false
  const isTablet = isHydrated ? windowWidth >= MOBILE_BREAKPOINT && windowWidth < TABLET_BREAKPOINT : false
  const isLaptop = isHydrated ? windowWidth >= TABLET_BREAKPOINT && windowWidth < LAPTOP_BREAKPOINT : false
  const isDesktop = isHydrated ? windowWidth >= LAPTOP_BREAKPOINT && windowWidth < DESKTOP_BREAKPOINT : false
  const isLargeDesktop = isHydrated ? windowWidth >= DESKTOP_BREAKPOINT && windowWidth < LARGE_DESKTOP_BREAKPOINT : false
  const isXLargeDesktop = isHydrated ? windowWidth >= LARGE_DESKTOP_BREAKPOINT : false

  // Helper functions for responsive design
  const isMobileOrTablet = isHydrated ? windowWidth < LAPTOP_BREAKPOINT : false
  const isTabletOrLaptop = isHydrated ? windowWidth >= MOBILE_BREAKPOINT && windowWidth < DESKTOP_BREAKPOINT : false
  const isDesktopOrLarger = isHydrated ? windowWidth >= LAPTOP_BREAKPOINT : false

  return {
    windowWidth: isHydrated ? windowWidth : 1024, // Default to desktop width during SSR
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isLargeDesktop,
    isXLargeDesktop,
    isMobileOrTablet,
    isTabletOrLaptop,
    isDesktopOrLarger,
    isHydrated,
    // Breakpoint values for reference
    breakpoints: {
      mobile: MOBILE_BREAKPOINT,
      tablet: TABLET_BREAKPOINT,
      laptop: LAPTOP_BREAKPOINT,
      desktop: DESKTOP_BREAKPOINT,
      largeDesktop: LARGE_DESKTOP_BREAKPOINT,
    }
  }
}
