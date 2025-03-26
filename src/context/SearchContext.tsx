"use client"
import { createContext, useContext, useState, type ReactNode } from "react"

type SearchContextType = {
  searchQuery: string
  isSearching: boolean
  setSearchQuery: (query: string) => void
  setIsSearching: (isSearching: boolean) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        isSearching,
        setSearchQuery,
        setIsSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider")
  }
  return context
}