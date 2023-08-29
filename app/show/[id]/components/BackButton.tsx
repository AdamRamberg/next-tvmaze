"use client"

import { useRouter } from "next/navigation"

export const BackButton = () => {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="mr-6 rounded-full border-2 p-1.5 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 md:mr-12 md:p-2.5"
    >
      <svg
        className="h-3 w-3 rotate-180 md:h-5 md:w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  )
}
