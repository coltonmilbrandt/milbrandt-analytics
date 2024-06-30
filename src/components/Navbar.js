// src/components/Navbar.js
import Link from "next/link"
import Image from "next/image"
import Logo from "../../public/logo.png"

const Navbar = () => {
	return (
		<nav className="bg-black shadow">
			<div className="container:xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0">
							<Link href="/">
								<Image src={Logo} className="w-48 h-auto" />
							</Link>
						</div>
					</div>
					<div className="flex items-center">
						<Link href="/login">
							<span className="mt-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-lg cursor-pointer">
								Log in
							</span>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
