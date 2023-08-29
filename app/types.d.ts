export type Show = {
  id: number
  name: string
  image?: {
    medium: string
  }
  runtime: number | null
  averageRuntime: number | null
  rating?: { average: number | null }
}

export type ShowResult = {
  show?: Show
}
