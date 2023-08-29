type Props = {
  params: { id: string }
}

export default async function ShowPage({ params: { id } }: Props) {
  return (
    <main className="flex max-h-screen min-h-screen flex-col items-start overflow-hidden bg-slate-900 px-6 py-12 pb-0 lg:px-12">
      <h1 className="mb-4 font-sans text-5xl font-extrabold lg:mb-6 lg:text-5xl">
        Show {id}
      </h1>
    </main>
  )
}
