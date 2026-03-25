export default async function Home() {
  const response = await fetch('https://dummyjson.com/products')
  const data = await response.json()

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return (
    <main>
      <h1>Hello!</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
