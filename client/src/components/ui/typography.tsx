import { cn } from "@/lib/utils"

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn("scroll-m-20 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight", className)}>
      {children}
    </h1>
  )
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn("scroll-m-20 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight", className)}>
      {children}
    </h2>
  )
}

export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn("scroll-m-20 text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  )
}

export function TypographyP({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-sm sm:text-base leading-6 sm:leading-7 [&:not(:first-child)]:mt-3 sm:[&:not(:first-child)]:mt-4", className)}>
      {children}
    </p>
  )
}

export function TypographyLarge({ children, className }: TypographyProps) {
  return (
    <div className={cn("text-base sm:text-lg lg:text-xl font-semibold", className)}>
      {children}
    </div>
  )
}

export function TypographySmall({ children, className }: TypographyProps) {
  return (
    <small className={cn("text-xs sm:text-sm font-medium leading-none", className)}>
      {children}
    </small>
  )
}

export function TypographyMuted({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-xs sm:text-sm text-muted-foreground", className)}>
      {children}
    </p>
  )
}