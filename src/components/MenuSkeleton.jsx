export default function MenuSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex min-h-[190px] overflow-hidden rounded-[1.25rem] border border-sand bg-paper">
          <div className="w-[34%] min-w-[112px] animate-pulse bg-sand/70 sm:min-w-[138px]" />
          <div className="flex-1 space-y-3 p-5">
            <div className="h-3 w-1/3 animate-pulse rounded bg-sand/45" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-sand/70" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-sand/50" />
            <div className="h-9 animate-pulse rounded bg-sand/40" />
          </div>
        </div>
      ))}
    </div>
  )
}
