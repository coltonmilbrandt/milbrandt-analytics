import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkImages from "remark-images"
import Layout from "../../../components/Layout"
import Image from "next/image"
import heroImage from "../../../../public/hero-image.jpg"
import trumpVsBiden from "../../../../public/trumpVsBiden.jpg"
import profile from "../../../../public/profile-img.jpg"

export default async function Article({ params: { slug } }) {
	const filePath = path.join(process.cwd(), "articles", `${slug}.md`)
	const markdownWithMeta = fs.readFileSync(filePath, "utf-8")
	const { data: frontmatter, content } = matter(markdownWithMeta)

	const processedContent = await remark()
		.use(remarkImages, {
			resolveUrl: (src) => `${src}`,
		})
		.use(html)
		.process(content)
	const contentHtml = processedContent.toString()

	return (
		<Layout>
			{/* <!--
Template Name: Tailnews - Tailwind News Template
Author: Aribudin
Website: https://www.tailwindtemplate.net
Contact: support@tailwindtemplate.net
Purchase: https://themes.tailwindtemplate.net/tailnews
License: You must have a valid license from official store to legally use the theme for your project.
--> */}
			{/* <!DOCTYPE html> */}

			<body className="pt-9 sm:pt-10">
				{/* <!-- =========={ MAIN }==========  --> */}
				<main id="content">
					{/* <!-- advertisement --> */}
					<div className="bg-gray-50 py-4 hidden">
						<div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
							<div className="mx-auto table text-center text-sm">
								<a className="uppercase" href="#">
									Advertisement
								</a>
								<a href="#">
									<Image
										src={heroImage}
										alt="advertisement area"
									/>{" "}
								</a>
							</div>
						</div>
					</div>

					{/* <!-- block news --> */}
					<div className="bg-gray-50 py-6 text-gray-800">
						<div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
							<div className="flex flex-row flex-wrap">
								{/* <!-- Left --> */}
								<div className="flex-shrink max-w-full w-full lg:w-2/3 overflow-hidden">
									<div className="w-full py-3 mb-3">
										<article className="prose lg:prose-xl">
											<h1>{frontmatter.title}</h1>
										</article>
									</div>
									<div className="flex flex-row flex-wrap -mx-3">
										<div className="max-w-full w-full px-4">
											{/* <!-- Post content --> */}
											<div className="leading-relaxed pb-4">
												<article className="prose lg:prose-xl">
													<div
														dangerouslySetInnerHTML={{
															__html: contentHtml,
														}}
													/>
												</article>

												<div className="relative flex flex-row items-center justify-between overflow-hidden bg-gray-100 dark:bg-gray-900 dark:bg-opacity-20 mt-12 mb-2 px-6 py-2">
													<div className="my-4 text-sm">
														{/* <!--author--> */}
														<span className="mr-2 md:mr-4">
															{/* <!-- <i className="fas fa-user me-2"></i> --> */}
															<svg
																className="bi bi-person mr-2 inline-block"
																width="1rem"
																height="1rem"
																viewBox="0 0 16 16"
																fill="currentColor"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z"
																	clipRule="evenodd"
																></path>
															</svg>{" "}
															by{" "}
															<a
																className="font-semibold"
																href="#"
															>
																{
																	frontmatter.author
																}
															</a>
														</span>
														{/* <!--date--> */}
														<time
															className="mr-2 md:mr-4"
															dateTime="2020-10-22 10:00"
														>
															{/* <!-- <i className="fas fa-calendar me-2"></i> --> */}
															<svg
																className="bi bi-calendar mr-2 inline-block"
																width="1rem"
																height="1rem"
																viewBox="0 0 16 16"
																fill="currentColor"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	d="M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
																	clipRule="evenodd"
																></path>
																<path
																	fillRule="evenodd"
																	d="M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z"
																	clipRule="evenodd"
																></path>
															</svg>{" "}
															{frontmatter.date}
														</time>
														{/* <!--view--> */}
														<span className="mr-2 md:mr-4">
															{/* <!-- <i className="fas fa-eye me-2"></i> --> */}
															<svg
																className="bi bi-eye mr-2 inline-block"
																width="1rem"
																height="1rem"
																viewBox="0 0 16 16"
																fill="currentColor"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 001.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0014.828 8a13.133 13.133 0 00-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 001.172 8z"
																	clipRule="evenodd"
																></path>
																<path
																	fillRule="evenodd"
																	d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
																	clipRule="evenodd"
																></path>
															</svg>{" "}
															{/* 1.230x view */}
														</span>
														{/* <!--end view--> */}
													</div>

													<div className="hidden lg:block">
														<ul className="space-x-3">
															{/* <!--facebook--> */}
															<li className="inline-block">
																<a
																	target="_blank"
																	className="hover:text-red-700"
																	href="#"
																	title="Share to Facebook"
																>
																	{/* <!-- <i className="fab fa-facebook fa-2x"></i> --> */}
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="2rem"
																		height="2rem"
																		viewBox="0 0 512 512"
																	>
																		<path
																			fill="currentColor"
																			d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z"
																		></path>
																	</svg>
																</a>
															</li>
															{/* <!--twitter--> */}
															<li className="inline-block">
																<a
																	target="_blank"
																	className="hover:text-red-700"
																	href="#"
																	title="Share to Twitter"
																>
																	{/* <!-- <i className="fab fa-twitter fa-2x"></i> --> */}
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="2rem"
																		height="2rem"
																		viewBox="0 0 512 512"
																	>
																		<path
																			fill="currentColor"
																			d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z"
																		></path>
																	</svg>
																</a>
															</li>
															{/* <!--instagram--> */}
															<li className="inline-block">
																<a
																	target="_blank"
																	className="hover:text-red-700"
																	href="#"
																	title="Share to Instagram"
																>
																	{/* <!-- <i className="fab fa-instagram fa-2x"></i> --> */}
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="2rem"
																		height="2rem"
																		viewBox="0 0 512 512"
																	>
																		<path
																			fill="currentColor"
																			d="M349.33,69.33a93.62,93.62,0,0,1,93.34,93.34V349.33a93.62,93.62,0,0,1-93.34,93.34H162.67a93.62,93.62,0,0,1-93.34-93.34V162.67a93.62,93.62,0,0,1,93.34-93.34H349.33m0-37.33H162.67C90.8,32,32,90.8,32,162.67V349.33C32,421.2,90.8,480,162.67,480H349.33C421.2,480,480,421.2,480,349.33V162.67C480,90.8,421.2,32,349.33,32Z"
																		></path>
																		<path
																			fill="currentColor"
																			d="M377.33,162.67a28,28,0,1,1,28-28A27.94,27.94,0,0,1,377.33,162.67Z"
																		></path>
																		<path
																			fill="currentColor"
																			d="M256,181.33A74.67,74.67,0,1,1,181.33,256,74.75,74.75,0,0,1,256,181.33M256,144A112,112,0,1,0,368,256,112,112,0,0,0,256,144Z"
																		></path>
																	</svg>
																</a>
															</li>
															{/* <!--end instagram--> */}
														</ul>
													</div>
												</div>
											</div>

											{/* <!-- author --> */}
											<div className="flex flex-wrap flex-row -mx-4 justify-center py-4">
												<div className="flex-shrink max-w-full px-4 w-1/3 sm:w-1/4 md:w-1/6">
													<a href="#">
														<Image
															className="rounded-full border max-w-full h-auto dark:border-gray-700"
															src={profile}
															alt="author"
														/>
													</a>
												</div>
												<div className="flex-shrink max-w-full px-4 w-2/3 sm:w-3/4 md:w-10/12">
													{/* <!--name--> */}
													<p className="text-lg leading-normal mb-2 font-semibold text-gray-800">
														<span className="font-semibold">
															{frontmatter.author}
														</span>
													</p>
													{/* <!-- website --> */}
													<p className="mb-1">
														<a
															target="_blank"
															className="text-red-700"
															href="#"
														>
															{
																frontmatter.website
															}
														</a>
													</p>
													{/* <!--description--> */}
													<p>{frontmatter.bio}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/* <!-- right --> */}
								<div className="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-first lg:order-last">
									<div className="w-full bg-white">
										<div className="mb-6">
											<div className="p-4 bg-gray-100">
												<h2 className="text-lg font-bold">
													Most Popular
												</h2>
											</div>
											<ul className="post-number">
												<li className="border-b border-gray-100 hover:bg-gray-50">
													<a
														className="text-lg font-bold px-6 py-3 flex flex-row items-center"
														href="#"
													>
														Why the world would end
														without political polls
													</a>
												</li>
												<li className="border-b border-gray-100 hover:bg-gray-50">
													<a
														className="text-lg font-bold px-6 py-3 flex flex-row items-center"
														href="#"
													>
														Meet The Man Who
														Designed The Ducati
														Monster
													</a>
												</li>
												<li className="border-b border-gray-100 hover:bg-gray-50">
													<a
														className="text-lg font-bold px-6 py-3 flex flex-row items-center"
														href="#"
													>
														2020 Audi R8 Spyder spy
														shots release
													</a>
												</li>
												<li className="border-b border-gray-100 hover:bg-gray-50">
													<a
														className="text-lg font-bold px-6 py-3 flex flex-row items-center"
														href="#"
													>
														Lamborghini makes
														Huracán GT3 racer faster
														for 2019
													</a>
												</li>
												<li className="border-b border-gray-100 hover:bg-gray-50">
													<a
														className="text-lg font-bold px-6 py-3 flex flex-row items-center"
														href="#"
													>
														ZF plans $14 billion
														autonomous vehicle push,
														concept van
													</a>
												</li>
											</ul>
										</div>
									</div>

									<div className="text-sm py-6 sticky">
										<div className="w-full text-center">
											<a className="uppercase" href="#">
												Advertisement
											</a>
											<a href="#">
												<Image
													className="mx-auto"
													src={heroImage}
													alt="advertisement area"
												/>{" "}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
				{/* <!-- end main --> */}

				{/* <!-- =========={ FOOTER }==========  --> */}
				<footer className="bg-black text-gray-400">
					{/* <!--Footer content--> */}
					<div
						id="footer-content"
						className="relative pt-8 xl:pt-16 pb-6 xl:pb-12"
					>
						<div className="xl:container mx-auto px-3 sm:px-4 xl:px-2 overflow-hidden">
							<div className="flex flex-wrap flex-row lg:justify-between -mx-3">
								<div className="flex-shrink max-w-full w-full lg:w-2/5 px-3 lg:pr-16">
									<div className="flex items-center mb-2">
										<span className="text-3xl leading-normal mb-2 font-bold text-gray-100 mt-2">
											TailNews
										</span>
										{/* <!-- <img src={heroImage} alt="LOGO"> --> */}
									</div>
									<p>
										Tailwind News Template for build great
										newspapper, magazine and news portal.
									</p>
									<ul className="space-x-3 mt-6 mb-6 Lg:mb-0">
										{/* <!--facebook--> */}
										<li className="inline-block">
											<a
												target="_blank"
												className="hover:text-gray-100"
												rel="noopener noreferrer"
												href="https://facebook.com"
												title="Facebook"
											>
												{/* <!-- <i className="fab fa-facebook fa-2x"></i> --> */}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="2rem"
													height="2rem"
													viewBox="0 0 512 512"
												>
													<path
														fill="currentColor"
														d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z"
													></path>
												</svg>
											</a>
										</li>
										{/* <!--twitter--> */}
										<li className="inline-block">
											<a
												target="_blank"
												className="hover:text-gray-100"
												rel="noopener noreferrer"
												href="https://twitter.com"
												title="Twitter"
											>
												{/* <!-- <i className="fab fa-twitter fa-2x"></i> --> */}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="2rem"
													height="2rem"
													viewBox="0 0 512 512"
												>
													<path
														fill="currentColor"
														d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z"
													></path>
												</svg>
											</a>
										</li>
										{/* <!--youtube--> */}
										<li className="inline-block">
											<a
												target="_blank"
												className="hover:text-gray-100"
												rel="noopener noreferrer"
												href="https://youtube.com"
												title="Youtube"
											>
												{/* <!-- <i className="fab fa-youtube fa-2x"></i> --> */}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="2rem"
													height="2rem"
													viewBox="0 0 512 512"
												>
													<path
														fill="currentColor"
														d="M508.64,148.79c0-45-33.1-81.2-74-81.2C379.24,65,322.74,64,265,64H247c-57.6,0-114.2,1-169.6,3.6-40.8,0-73.9,36.4-73.9,81.4C1,184.59-.06,220.19,0,255.79q-.15,53.4,3.4,106.9c0,45,33.1,81.5,73.9,81.5,58.2,2.7,117.9,3.9,178.6,3.8q91.2.3,178.6-3.8c40.9,0,74-36.5,74-81.5,2.4-35.7,3.5-71.3,3.4-107Q512.24,202.29,508.64,148.79ZM207,353.89V157.39l145,98.2Z"
													></path>
												</svg>
											</a>
										</li>
										{/* <!--instagram--> */}
										<li className="inline-block">
											<a
												target="_blank"
												className="hover:text-gray-100"
												rel="noopener noreferrer"
												href="https://instagram.com"
												title="Instagram"
											>
												{/* <!-- <i className="fab fa-instagram fa-2x"></i> --> */}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="2rem"
													height="2rem"
													viewBox="0 0 512 512"
												>
													<path
														fill="currentColor"
														d="M349.33,69.33a93.62,93.62,0,0,1,93.34,93.34V349.33a93.62,93.62,0,0,1-93.34,93.34H162.67a93.62,93.62,0,0,1-93.34-93.34V162.67a93.62,93.62,0,0,1,93.34-93.34H349.33m0-37.33H162.67C90.8,32,32,90.8,32,162.67V349.33C32,421.2,90.8,480,162.67,480H349.33C421.2,480,480,421.2,480,349.33V162.67C480,90.8,421.2,32,349.33,32Z"
													></path>
													<path
														fill="currentColor"
														d="M377.33,162.67a28,28,0,1,1,28-28A27.94,27.94,0,0,1,377.33,162.67Z"
													></path>
													<path
														fill="currentColor"
														d="M256,181.33A74.67,74.67,0,1,1,181.33,256,74.75,74.75,0,0,1,256,181.33M256,144A112,112,0,1,0,368,256,112,112,0,0,0,256,144Z"
													></path>
												</svg>
											</a>
										</li>
										{/* <!--end instagram--> */}
									</ul>
								</div>
								<div className="flex-shrink max-w-full w-full lg:w-3/5 px-3">
									<div className="flex flex-wrap flex-row">
										<div className="flex-shrink max-w-full w-1/2 md:w-1/4 mb-6 lg:mb-0">
											<h4 className="text-base leading-normal mb-3 uppercase text-gray-100">
												Product
											</h4>
											<ul>
												<li className="py-1 hover:text-white">
													<a href="#">Landing</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Pages</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Sections</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Sign Up</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Login</a>
												</li>
											</ul>
										</div>
										<div className="flex-shrink max-w-full w-1/2 md:w-1/4 mb-6 lg:mb-0">
											<h4 className="text-base leading-normal mb-3 uppercase text-gray-100">
												Support
											</h4>
											<ul>
												<li className="py-1 hover:text-white">
													<a href="#">
														Documentation
													</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Changelog</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Tools</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Icons</a>
												</li>
											</ul>
										</div>
										<div className="flex-shrink max-w-full w-1/2 md:w-1/4 mb-6 lg:mb-0">
											<h4 className="text-base leading-normal mb-3 uppercase text-gray-100">
												Includes
											</h4>
											<ul>
												<li className="py-1 hover:text-white">
													<a href="#">Utilities</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Components</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Example code</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Updates</a>
												</li>
											</ul>
										</div>
										<div className="flex-shrink max-w-full w-1/2 md:w-1/4 mb-6 lg:mb-0">
											<h4 className="text-base leading-normal mb-3 uppercase text-gray-100">
												Legal
											</h4>
											<ul>
												<li className="py-1 hover:text-white hover:text-white">
													<a href="#">
														Privacy Policy
													</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">Terms of Use</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">License</a>
												</li>
												<li className="py-1 hover:text-white">
													<a href="#">GDPR</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* <!--Start footer copyright--> */}
					<div className="footer-dark">
						<div className="container py-4 border-t border-gray-200 border-opacity-10">
							<div className="row">
								<div className="col-12 col-md text-center">
									<p className="d-block my-3">
										Copyright © Your Company | All rights
										reserved.
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* <!--End footer copyright--> */}
				</footer>
				{/* <!-- end footer --> */}

				{/* <!-- =========={ SCROLL TO TOP }==========  --> */}
				<a
					href="#"
					className="back-top fixed p-4 rounded bg-gray-100 border border-gray-100 text-gray-500 dark:bg-gray-900 dark:border-gray-800 right-4 bottom-4 hidden"
					aria-label="Scroll To Top"
				>
					<svg
						width="1rem"
						height="1rem"
						viewBox="0 0 16 16"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
							clipRule="evenodd"
						></path>
						<path
							fillRule="evenodd"
							d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z"
							clipRule="evenodd"
						></path>
					</svg>
				</a>

				{/* <!--Vendor js--> */}
				<script src="src/vendors/hc-sticky/dist/hc-sticky.js"></script>
				<script src="src/vendors/glightbox/dist/js/glightbox.min.js"></script>
				<script src="src/vendors/@splidejs/splide/dist/js/splide.min.js"></script>
				<script src="src/vendors/@splidejs/splide-extension-video/dist/js/splide-extension-video.min.js"></script>

				{/* <!-- Start development js --> */}
				<script src="src/js/theme.js"></script>
				{/* <!-- End development js --> */}

				{/* <!-- Production js --> */}
				{/* <!-- <script src="dist/js/scripts.js"></script> --> */}
			</body>
		</Layout>
	)
}

export async function generateStaticParams() {
	const articlesDir = path.join(process.cwd(), "articles")
	const filenames = fs.readdirSync(articlesDir)

	return filenames.map((filename) => ({
		slug: filename.replace(".md", ""),
	}))
}
