import { NextResponse } from "next/server"
import { fetchShows } from "../tvmaze"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchQuery = searchParams.get("q")
  const result = await fetchShows(searchQuery)
  return NextResponse.json(result)
}
