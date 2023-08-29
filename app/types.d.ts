export type Show = {
  id: number
  name: string
  image?: {
    medium: string
  }
  runtime: number | null
  averageRuntime: number | null
  rating?: { average: number | null }
  genres: string[]
  language: string
  status: string
  type: string
  officialSite?: string
  summary?: string
}

export type ShowResult = {
  show?: Show
}
