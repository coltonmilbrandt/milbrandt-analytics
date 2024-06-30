// src/app/dashboard/page.js
"use client"

import { useSession, signOut } from "next-auth/react"
import Layout from "../../components/Layout"

export default function Dashboard() {
	const { data: session, status } = useSession()

	if (status === "loading") {
		return <div>Loading...</div>
	}

	if (!session) {
		return <div>You must be logged in to view this page.</div>
	}

	return (
		<Layout>
			<div className="p-6">
				<h1 className="mb-4 text-2xl font-bold">
					Welcome, {session.user.name}!
				</h1>
				<p>
					This is your dashboard. Premium content will be displayed
					here.
				</p>
				<button
					onClick={() => signOut()}
					className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-700"
				>
					Sign Out
				</button>
			</div>
		</Layout>
	)
}
