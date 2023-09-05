export const SearchItemSkeleton = () => {
  return (
    <div className="mb-2 flex w-full animate-pulse flex-row items-start rounded-lg p-1">
      <div style={{ width: 42, height: 58 }} className="bg-gray-200"></div>
      <div className="flex h-max shrink grow flex-row justify-between py-2">
        <div className="flex flex-col">
          <h3 className="text-base text-white">Name</h3>
          <p className="text-sm text-slate-400">Name</p>
        </div>
        <div className="flex flex-col justify-between pr-2">
          <p className="text-right text-sm text-slate-400">Time string</p>
          <span className="flex items-center justify-end text-sm text-slate-400">
            <svg
              className="mr-1 h-4 w-4 text-slate-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p>rating</p>
          </span>
        </div>
      </div>
    </div>
  )
}
