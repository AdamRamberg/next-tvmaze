import { serverAPI } from "../../api/server"
import { BackButton } from "./components/BackButton"
import { ShowPageContent } from "./components/ShowPageContent"

type Props = {
  params: { id: string }
}

export default async function ShowPage({ params: { id } }: Props) {
  const show = await serverAPI.fetchShow(id).catch(() => null)
  const showTitle = show?.name ?? `Unknown show with id "${id}"`

  return (
    <main className="flex max-h-screen min-h-screen flex-col items-start overflow-x-hidden overflow-y-scroll bg-slate-900 px-6 py-12 lg:px-12">
      <div className="mb-4 mb-6 flex flex-row items-center md:mb-10">
        <BackButton />
        <h1 className="font-sans text-3xl font-extrabold md:text-5xl">
          {showTitle}
        </h1>
      </div>
      {!!show && <ShowPageContent show={show} />}
    </main>
  )
}
