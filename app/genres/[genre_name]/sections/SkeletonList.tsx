"use client"

type Props = {
  pageSize: number
}

export default function SkeletonList({ pageSize }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {Array.from({ length: pageSize }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 animate-pulse"
        >
          <div className="w-28 h-36 rounded-md bg-neutral-800" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-neutral-700 rounded w-2/3" />
            <div className="h-3 bg-neutral-700 rounded w-1/2" />
            <div className="h-3 bg-neutral-700 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  )
}
