"use client"

// import Image from 'next/image'
import { useEffect, useState } from 'react'

type Show ={
  show: {
    id: number
    name: string
  }
}

export default function Home() {
  const [input, setInput]  = useState("")
  const [shows, setShows]  = useState<Show[]>([])
  const [searchQuery, setSearchQuery] = useState('')


  useEffect(() => {
    const fetchShows = async () => {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`)
      const data = await res.json()
      setShows(data)
    }
    fetchShows()
  }, [searchQuery])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>TVMaze Next</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        setSearchQuery(input)
        setInput("")
      }}>
        <input className="text-black caret-black" onChange={(e) => {
          setInput(e.target.value)
        }} value={input} />
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
