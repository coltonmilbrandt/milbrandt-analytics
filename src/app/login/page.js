// src/app/login/page.js
"use client"

import Head from "next/head"
import { signIn } from "next-auth/react"
import Layout from "../../components/Layout"

export default function Login() {
	const handleSignIn = () => {
		signIn("google", { callbackUrl: "/" })
	}

	return (
		<>
			<Head>
				<title>Log In - Milbrandt Analytics</title>
				<meta
					name="description"
					content="Log in to Milbrandt Analytics"
				/>
			</Head>
			<Layout>
				<div className="flex items-center justify-center min-h-screen">
					<div className="p-6 bg-white rounded-lg shadow-md">
						<h1 className="mb-4 text-2xl font-bold">Login</h1>
						<button
							onClick={handleSignIn}
							className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
						>
							Sign in with Google
						</button>
					</div>
				</div>
			</Layout>
		</>
	)
}
