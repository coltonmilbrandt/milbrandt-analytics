import HomePage from "./home-page"

export default async function Page() {
	// Fetch data directly in a Server Component
	const recentPosts = [
		{ id: 1, title: "First Article" },
		{ id: 2, title: "Biden Replacement" },
		// Add more articles as needed
	]

	// Forward fetched data to your Client Component
	return <HomePage recentPosts={recentPosts} />
}
