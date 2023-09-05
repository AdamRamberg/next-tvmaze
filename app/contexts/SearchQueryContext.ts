import { createContext, useContext } from "react"

const searchQueryContext = createContext<string>("")
export const useSearchQuery = () => useContext(searchQueryContext)
export const SeachQueryProvider = searchQueryContext.Provider
