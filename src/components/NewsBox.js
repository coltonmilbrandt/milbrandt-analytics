// src/components/NewsBox.js
import React from "react"
import Image from "next/image"

const NewsBox = ({
	href,
	imageSrc,
	imageAlt,
	title,
	description,
	category,
}) => {
	return (
		<article className="flex-shrink max-w-full w-full sm:w-1/2">
			<div className="relative hover-img max-h-48 overflow-hidden">
				<a href={href}>
					<Image
						className="max-w-full w-full mx-auto h-auto"
						src={imageSrc}
						alt={imageAlt}
					/>
					<div className="absolute inset-0 bg-black opacity-50"></div>{" "}
					{/* Dark overlay */}
				</a>
				<div className="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
					<a href={href}>
						<h2 className="text-lg font-bold capitalize leading-tight text-white mb-1">
							{title}
						</h2>
					</a>
					<div className="pt-1">
						<div className="text-gray-100">
							<div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
							{category}
						</div>
					</div>
				</div>
			</div>
		</article>
	)
}

export default NewsBox
