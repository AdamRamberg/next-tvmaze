"use client"

import { Suspense, useState } from "react"
import { SearchInput } from "./SearchInput"
import { SeachQueryProvider } from "../contexts/SearchQueryContext"
import { SearchItemSkeleton } from "./SeachItemSkeleton"

type Props = {
  initialSearchQuery: string | undefined
  children: React.ReactNode
}

const Skeleton = () => {
  return (
    <div className="relative flex w-full max-w-md flex-col overflow-y-hidden">
      <div className="relative my-1 h-6 w-full flex-row"></div>
      <div className="overflow-y-scroll p-1 pb-8">
        <SearchItemSkeleton />
        <SearchItemSkeleton />
        <SearchItemSkeleton />
        <SearchItemSkeleton />
        <SearchItemSkeleton />
      </div>
    </div>
  )
}

export default function Search({ initialSearchQuery = "", children }: Props) {
  const [input, setInput] = useState(initialSearchQuery)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)

  return (
    <SeachQueryProvider value={searchQuery}>
      <SearchInput
        value={input}
        onChange={setInput}
        onSubmit={() => {
          setSearchQuery(input)
        }}
      />
      <Suspense fallback={<Skeleton />}>{children}</Suspense>
    </SeachQueryProvider>
  )
}
