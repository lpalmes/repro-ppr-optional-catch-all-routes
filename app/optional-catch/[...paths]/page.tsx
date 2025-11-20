

export function generateStaticParams() {
  return [
    {
      paths: ["pokemon", "ditto"],
    },
  ];
}


export default async function TestCatchAllRoute({
  params
}: PageProps<"/optional-catch/[...paths]">) {
  "use cache"

  const { paths = [] } = await params

  const subpath = paths.join("/")

  const json = await fetchApi(subpath)
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Optional catch all routes [[...segments]]
          </h1>
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            This should be partially pre-rendered, instant
          </h1>
        </div>
        <p>
          {JSON.stringify(json, null, 2)}
        </p>
      </main>
    </div>
  );
}


async function fetchApi(resource: string) {
  "use cache"

  const response = await fetch("https://pokeapi.co/api/v2/" + resource)
  return response.json()
}
