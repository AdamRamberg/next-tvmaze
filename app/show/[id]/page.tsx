import { fetchShow } from "../../api/tvmaze"
import { BackButton } from "./components/BackButton"
import { ShowPageContent } from "./components/ShowPageContent"

type Props = {
  params: { id: string }
}

export default async function ShowPage({ params: { id } }: Props) {
  const show = await fetchShow(id)
  const showTitle = show?.name ?? `Show with ${id} is unknown`

  return (
    <main className="flex max-h-screen min-h-screen flex-col items-start overflow-hidden bg-slate-900 px-6 py-12 pb-0 lg:px-12">
      <div className="mb-4 flex flex-row items-center lg:mb-10">
        <BackButton />
        <h1 className="font-sans text-3xl font-extrabold lg:text-5xl">
          {showTitle}
        </h1>
      </div>
      {!!show && <ShowPageContent show={show} />}
    </main>
  )
}
