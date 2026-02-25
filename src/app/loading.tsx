import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="bg-stone-100 py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <Skeleton className="h-12 w-3/4 max-w-xl mb-6" />
          <Skeleton className="h-6 w-1/2 max-w-md mb-8" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
