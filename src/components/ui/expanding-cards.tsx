import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardItem {
  id: string | number
  title: string
  description: string
  imgSrc: string
  icon: React.ReactNode
  linkHref: string
  gradientClass: string
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[]
  defaultActiveIndex?: number
}

export const ExpandingCards = React.forwardRef<HTMLUListElement, ExpandingCardsProps>(
  ({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(defaultActiveIndex)
    const [isDesktop, setIsDesktop] = React.useState(false)

    React.useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth >= 768)
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    const gridStyle = React.useMemo(() => {
      if (activeIndex === null) return {}
      if (isDesktop) {
        const columns = items.map((_, i) => (i === activeIndex ? '5fr' : '1fr')).join(' ')
        return { gridTemplateColumns: columns }
      } else {
        const rows = items.map((_, i) => (i === activeIndex ? '5fr' : '1fr')).join(' ')
        return { gridTemplateRows: rows }
      }
    }, [activeIndex, items, isDesktop])

    return (
      <ul
        ref={ref}
        className={cn(
          'w-full max-w-6xl gap-2 grid',
          'h-[600px] md:h-[420px]',
          'transition-[grid-template-columns,grid-template-rows] duration-500 ease-out',
          className,
        )}
        style={{
          ...gridStyle,
          ...(isDesktop ? { gridTemplateRows: '1fr' } : { gridTemplateColumns: '1fr' }),
        }}
        {...props}
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              'group relative cursor-pointer overflow-hidden rounded-xl border border-white/5',
              'bg-[#111A14] text-white shadow-sm',
              'md:min-w-[60px] min-h-0 min-w-0',
            )}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            tabIndex={0}
            data-active={activeIndex === index}
          >
            {/* Background image — fades in when active */}
            <img
              src={item.imgSrc}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-data-[active=true]:opacity-100"
            />

            {/* Dark overlay on inactive cards */}
            <div className="absolute inset-0 bg-[#0A0F0A]/80 transition-opacity duration-500 group-data-[active=true]:opacity-0" />

            {/* Gradient overlay on active card — keeps text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-opacity duration-500 group-data-[active=true]:opacity-100" />

            {/* Base tint on inactive cards */}
            <div className={cn('absolute inset-0 opacity-40 transition-opacity duration-500 group-data-[active=true]:opacity-0', item.gradientClass)} />

            <article className="absolute inset-0 flex flex-col justify-end gap-2 p-5">
              {/* Collapsed label — rotated on desktop, hidden when active */}
              <h3 className="hidden origin-left rotate-90 text-[10px] font-light uppercase tracking-wider text-white/40 opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0 whitespace-nowrap">
                {item.title}
              </h3>

              {/* Icon */}
              <div className="text-[#6EE7B7] opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="w-full max-w-xs text-sm text-white/75 opacity-0 transition-all duration-300 delay-200 ease-out group-data-[active=true]:opacity-100 leading-relaxed">
                {item.description}
              </p>

              {/* Verify link */}
              {item.linkHref && (
                <a
                  href={item.linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 transition-all duration-300 delay-300 ease-out group-data-[active=true]:opacity-100 inline-flex items-center gap-1.5 text-xs font-medium text-[#6EE7B7] border border-[#6EE7B7]/30 rounded-full px-3 py-1 w-fit hover:bg-[#6EE7B7]/10 mt-1"
                >
                  Verify Credential →
                </a>
              )}
            </article>
          </li>
        ))}
      </ul>
    )
  },
)
ExpandingCards.displayName = 'ExpandingCards'
