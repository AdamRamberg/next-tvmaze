type SearchInputProps = {
  onSubmit: () => void
  value: string
  onChange: (newValue: string) => void
}

export const SearchInput = ({
  onSubmit,
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <form
      className="w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <label
        htmlFor="search-input"
        className="sr-only mb-2 text-sm font-medium text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-4 w-4 text-slate-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search-input"
          className="block w-full rounded-lg border-slate-800 bg-slate-800 p-2 pl-10 text-sm text-white placeholder-slate-400 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 lg:p-4 lg:pl-10"
          placeholder="Search shows..."
          required
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        />
        <button
          type="submit"
          className="absolute bottom-1 right-1 rounded-lg bg-sky-500 px-4 py-1 text-sm font-medium text-white hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 lg:bottom-2 lg:right-2 lg:py-2"
        >
          Search
        </button>
      </div>
    </form>
  )
}
