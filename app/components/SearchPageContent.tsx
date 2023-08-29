"use client"

// import Image from 'next/image'
import { useEffect, useState } from "react"
import { Show } from "../types"
import { fetchShows } from "../api/tvmaze"

type Props = {
  initialShows: Show[]
  initialSearchQuery: string | undefined
}

export default function SearchPageContent({
  initialShows = [],
  initialSearchQuery = "",
}: Props) {
  const [input, setInput] = useState(initialSearchQuery)
  const [shows, setShows] = useState<Show[]>(initialShows)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const updateShows = async () => {
      const result = await fetchShows(searchQuery)
      setShows(result)
    }
    updateShows()
  }, [searchQuery])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>TVMaze Next</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSearchQuery(input)
          setInput("")
        }}
      >
        <input
          className="text-black caret-black"
          onChange={(e) => {
            setInput(e.target.value)
          }}
          value={input}
        />
      </form>

      <div className="flex flex-col">
        {shows.map(({ show }) => {
          return (
            <div key={show.id} className="flex flex-col items-center">
              {/* {Boolean(show.image) && <Image src={show.image.medium} width="200" height="300" />} */}
              <h1>{show.name}</h1>
            </div>
          )
        })}
      </div>
    </main>
  )
}
