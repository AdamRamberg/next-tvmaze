import { Show } from "../../types"
import { ShowImage, ImageSize, ShowImageSkeleton } from "../ShowImage"
import Link from "next/link"

type SearchResultItemProps = {
  show: Show
}

export const SearchResultItem = ({ show }: SearchResultItemProps) => {
  var imgSrc = show.image?.medium

  const time = show.runtime ?? show.averageRuntime
  const timeString = time ? `${time} min` : ""

  const rating = show.rating?.average ?? "-"

  return (
    <Link
      href={`/show/${show.id}`}
      className="mb-2 flex w-full flex-row items-start rounded-lg p-1 outline-none hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-300"
    >
      <ShowImage
        src={imgSrc}
        name={show.name}
        size={ImageSize.Small}
        className="mr-6 flex shrink-0 grow-0"
      />
      <div className="flex h-max shrink grow flex-row justify-between py-2">
        <div className="flex flex-col">
          <h3 className="text-base text-white">{show.name}</h3>
          <p className="text-sm text-slate-400">{show.name}</p>
        </div>
        <div className="flex flex-col items-end justify-between pr-2">
          <p className="text-right text-sm text-slate-400">{timeString}</p>
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
            <p>{rating}</p>
          </span>
        </div>
      </div>
    </Link>
  )
}

type SearchResultContainerProps = {
  error: Error | undefined
  isLoading: boolean
  isSlow: boolean
  children: React.ReactNode
}

export const SearchResultContainer = ({
  error,
  isLoading,
  isSlow,
  children,
}: SearchResultContainerProps) => {
  return (
    <div className="relative flex w-full max-w-md flex-col overflow-y-hidden">
      <div className="relative my-1 h-6 w-full shrink-0 grow-0 flex-row">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-row items-center justify-between">
          {error && (
            <p className="mr-4 text-sm text-red-400">Something went wrong...</p>
          )}
          {!error && isLoading && (
            <p className="mr-4 text-sm text-slate-400">Loading...</p>
          )}
          {!error && isLoading && isSlow && (
            <p className="text-sm text-slate-400 text-yellow-300">
              Search seems slower than usual
            </p>
          )}
        </div>
      </div>
      <div className="overflow-y-scroll p-1 pb-8">{children}</div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900 from-slate-900" />
    </div>
  )
}

export const SearchResultItemSkeleton = () => {
  return (
    <div className="mb-2 flex w-full animate-pulse flex-row items-start rounded-lg p-1 outline-none">
      <ShowImageSkeleton
        size={ImageSize.Small}
        className="mr-6 flex shrink-0 grow-0"
      />
      <div className="flex h-max shrink grow flex-row justify-between py-2">
        <div className="flex flex-col">
          <div className="mb-2 h-4 w-32 bg-slate-800"></div>
          <div className="mb-2 h-3 w-24 bg-slate-800"></div>
        </div>
        <div className="flex flex-col items-end justify-between pr-2">
          <div className="h-3 w-12 bg-slate-800"></div>
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
            <div className="h-3 w-4 bg-slate-800"></div>
          </span>
        </div>
      </div>
    </div>
  )
}

export const SearchResultSkeleton = () => {
  return (
    <SearchResultContainer error={undefined} isSlow={false} isLoading={false}>
      <SearchResultItemSkeleton />
      <SearchResultItemSkeleton />
      <SearchResultItemSkeleton />
      <SearchResultItemSkeleton />
      <SearchResultItemSkeleton />
    </SearchResultContainer>
  )
}
