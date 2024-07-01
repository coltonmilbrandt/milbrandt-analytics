// src/components/LeftCover.js
import React from "react"
import Image from "next/image"

const LeftCover = ({
	href,
	imageSrc,
	imageAlt,
	title,
	description,
	category,
}) => {
	return (
		<div className="flex-shrink max-w-full w-full lg:w-1/2 pb-1 lg:pb-0 lg:pr-1">
			<div className="relative hover-img max-h-98 overflow-hidden">
				<a href={href}>
					<Image
						className="max-w-full w-full mx-auto h-auto"
						src={imageSrc}
						alt={imageAlt}
					/>
				</a>
				<div className="absolute inset-0 bg-black opacity-40"></div>
				<div className="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
					<a href={href}>
						<h2 className="text-3xl font-bold capitalize text-white mb-3">
							{title}
						</h2>
					</a>
					<p className="text-gray-100 hidden sm:inline-block">
						{description}
					</p>
					<div className="pt-2">
						<div className="text-gray-100">
							<div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
							{category}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LeftCover
