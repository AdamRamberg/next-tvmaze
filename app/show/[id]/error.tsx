"use client"

import { BackButton } from "./components/BackButton"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <main className="flex max-h-screen min-h-screen flex-col items-start overflow-x-hidden overflow-y-scroll bg-slate-900 px-6 py-12 lg:px-12">
      <div className="mb-4 mb-6 flex flex-row items-center md:mb-10">
        <BackButton />
        <h1 className="font-sans text-3xl font-extrabold md:text-5xl">
          Unknown show...
        </h1>
        <p>{error.toString()}</p>
      </div>
    </main>
  )
}
