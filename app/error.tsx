"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-900 px-6 py-12 lg:px-12">
      <h2 className="mb-4 font-sans text-2xl font-extrabold lg:mb-6 lg:text-5xl">
        Something went wrong!
      </h2>
      <button
        className="rounded-lg bg-sky-500 px-4 py-1 text-sm font-medium text-white hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 lg:py-2"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  )
}
