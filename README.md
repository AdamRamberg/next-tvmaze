# Next.js + Tailwind CSS + TVMaze API 📺
This is a [Next.js](https://nextjs.org/) project that uses Tailwind CSS for styling and the [TVMaze API](https://www.tvmaze.com/api) to display a list of TV shows.

## Run the project 🏃

First, install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO 👷
- [ ] Better error handling in API calls.
- [ ] Clean up API usage. API-route (`GET(request: Request)`) is actually currently not used.
- [ ] Add unit testing with Jest and React Testing Library.
- [ ] Skeleton component as fallback for `<Suspense />` in search page.
- [ ] Better visualization of errors and slow connection in show page.
- [ ] Adding offline indicator using `Navigator: onLine property`.
- [ ] Implement light / dark mode.