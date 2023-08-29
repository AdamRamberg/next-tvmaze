import { fetchShow } from "../../api/tvmaze"
import { BackButton } from "./components/BackButton"
import { ShowPageContent } from "./components/ShowPageContent"

type Props = {
  params: { id: string }
}

export default async function ShowPage({ params: { id } }: Props) {
  const show = await fetchShow(id)
  const wasFound = show?.status !== 404
  const showTitle = wasFound ? show?.name : `Show with id "${id}" is unknown`

  return (
    <main className="flex max-h-screen min-h-screen flex-col items-start overflow-x-hidden overflow-y-scroll bg-slate-900 px-6 py-12 lg:px-12">
      <div className="mb-4 mb-6 flex flex-row items-center md:mb-10">
        <BackButton />
        <h1 className="font-sans text-3xl font-extrabold md:text-5xl">
          {showTitle}
        </h1>
      </div>
      {!!show && wasFound && <ShowPageContent show={show} />}
    </main>
  )
}
