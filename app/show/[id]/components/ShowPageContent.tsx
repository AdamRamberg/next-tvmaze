import { Show } from "../../../types"
import { ShowImage, ImageSize } from "../../../components/ShowImage"

export const ShowPageContent = ({ show }: { show: Show }) => {
  var imgSrc = show.image?.medium

  return (
    <div>
      <div className="flex flex-row">
        <ShowImage src={imgSrc} name={show.name} size={ImageSize.Large} />
        <ul className="p-2 text-sm md:text-base">
          <li className="mb-2">
            <span className="pr-2 font-extrabold">Genres: </span>
            {show.genres.join(", ")}
          </li>
          <li className="mb-2">
            <span className="pr-2 font-extrabold">Language: </span>
            {show.language}
          </li>
          <li className="mb-2">
            <span className="pr-2 font-extrabold">Status: </span>
            {show.status}
          </li>
          <li className="mb-2">
            <span className="pr-2 font-extrabold">Show type: </span>
            {show.type}
          </li>
          {show.officialSite && (
            <li className="mb-2">
              <a
                className="rounded-sm pr-2 font-extrabold text-sky-400 underline hover:text-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-300"
                href={show.officialSite}
                target="_blank"
              >
                Official site
              </a>
            </li>
          )}
        </ul>
      </div>
      {show.summary && (
        <div
          className="py-6 text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: show.summary }}
        />
      )}
      {!show.summary && (
        <div className="py-6 text-sm md:text-base">
          <p className="text-slate-400">No summary available...</p>
        </div>
      )}
    </div>
  )
}
