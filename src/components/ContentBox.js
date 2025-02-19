// src/components/ContentBox.js
import React from "react"
import Image from "next/image"

const ContentBox = ({
	href,
	imageSrc,
	imageAlt,
	title,
	description,
	category,
}) => {
	return (
		<div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
			<div class="flex flex-row sm:block hover-img">
				<a href={href}>
					<Image
						class="max-w-full w-full mx-auto"
						src={imageSrc}
						alt={imageAlt}
					/>
				</a>
				<div class="py-0 sm:py-3 pl-3 sm:pl-0">
					<h3 class="text-lg font-bold text-gray-700 leading-tight mb-2">
						<a href={href}>{title}</a>
					</h3>
					<p class="hidden md:block text-gray-600 leading-tight mb-1">
						{description}
					</p>
					<a class="text-gray-500" href={href}>
						<span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>
						{category}
					</a>
				</div>
			</div>
		</div>
	)
}

export default ContentBox
