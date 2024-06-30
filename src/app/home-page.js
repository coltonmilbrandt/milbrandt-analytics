// src/app/page.js
import Image from "next/image"
import Layout from "../components/Layout"
import Link from "next/link"
import heroImage from "../../public/hero-image.jpg"
import trumpVsBiden from "../../public/trumpVsBiden.jpg"
import MarketCharts from "../components/MarketCharts"

const Home = () => {
	return (
		<Layout>
			<div className="relative w-full h-16 sm:h-60">
				<Image
					src={heroImage}
					layout="fill"
					objectFit="cover"
					alt="Hero Image"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
					<h1 className="text-4xl sm:text-6xl font-bold">
						Milbrandt Analytics
					</h1>
					<p className="mt-4 mb-4 text-lg sm:text-2xl">
						Actionable Insights, Analysis, and Consulting
					</p>
					<Link href="/login">
						<span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-lg cursor-pointer">
							Go Premium
						</span>
					</Link>
				</div>
			</div>
			<MarketCharts />
			<main id="content">
				{/* <!-- advertisement --> */}
				<div class="bg-gray-50 py-4 hidden">
					<div class="xl:container mx-auto px-3 sm:px-4 xl:px-2">
						<div class="mx-auto table text-center text-sm">
							<a class="uppercase" href="#">
								Advertisement
							</a>
							<a href="#">
								<Image
									src={heroImage}
									alt="advertisement area"
								/>
							</a>
						</div>
					</div>
				</div>

				{/* <!-- hero big grid --> */}
				<div class="bg-black py-6">
					<div class="xl:container mx-auto px-3 sm:px-4 xl:px-2">
						{/* <!-- big grid 1 --> */}
						<div class="flex flex-row flex-wrap">
							{/* <!--Start left cover--> */}
							<div class="flex-shrink max-w-full w-full lg:w-1/2 pb-1 lg:pb-0 lg:pr-1">
								<div class="relative hover-img max-h-98 overflow-hidden">
									<a href="/articles/first-article">
										<Image
											class="max-w-full w-full mx-auto h-auto"
											src={trumpVsBiden}
											alt="Image description"
										/>
									</a>
									<div className="absolute inset-0 bg-black opacity-40"></div>
									<div class="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
										<a href="/articles/first-article">
											<h2 class="text-3xl font-bold capitalize text-white mb-3">
												Paths to Victory: Will Trump
												Upend Expectations?
											</h2>
										</a>
										<p class="text-gray-100 hidden sm:inline-block">
											Our pre-debate model forecasts some
											suprises in November. Can Biden hold
											on?
										</p>
										<div class="pt-2">
											<div class="text-gray-100">
												<div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
												Politics
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* <!--Start box news--> */}
							<div class="flex-shrink max-w-full w-full lg:w-1/2">
								<div class="box-one flex flex-row flex-wrap">
									<article class="flex-shrink max-w-full w-full sm:w-1/2">
										<div class="relative hover-img max-h-48 overflow-hidden">
											<a href="#">
												<Image
													class="max-w-full w-full mx-auto h-auto"
													src={heroImage}
													alt="Image description"
												/>
											</a>
											<div class="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
												<a href="#">
													<h2 class="text-lg font-bold capitalize leading-tight text-white mb-1">
														News magazines are
														becoming obsolete,
														replaced by gadgets
													</h2>
												</a>
												<div class="pt-1">
													<div class="text-gray-100">
														<div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
														Techno
													</div>
												</div>
											</div>
										</div>
									</article>
									<article class="flex-shrink max-w-full w-full sm:w-1/2">
										<div class="relative hover-img max-h-48 overflow-hidden">
											<a href="#">
												<Image
													class="max-w-full w-full mx-auto h-auto"
													src={heroImage}
													alt="Image description"
												/>
											</a>
											<div class="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
												<a href="#">
													<h2 class="text-lg font-bold capitalize leading-tight text-white mb-1">
														Minimalist designs are
														starting to be popular
														with the next generation
													</h2>
												</a>
												<div class="pt-1">
													<div class="text-gray-100">
														<div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
														Architecture
													</div>
												</div>
											</div>
										</div>
									</article>
									<article class="flex-shrink max-w-full w-full sm:w-1/2">
										<div class="relative hover-img max-h-48 overflow-hidden">
											<a href="#">
												<Image
													class="max-w-full w-full mx-auto h-auto"
													src={heroImage}
													alt="Image description"
												/>
											</a>
											<div class="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
												<a href="#">
													<h2 class="text-lg font-bold capitalize leading-tight text-white mb-1">
														Tips for decorating the
														interior of the living
														room
													</h2>
												</a>
												<div class="pt-1">
													<div class="text-gray-100">
														<div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
														Interior
													</div>
												</div>
											</div>
										</div>
									</article>
									<article class="flex-shrink max-w-full w-full sm:w-1/2">
										<div class="relative hover-img max-h-48 overflow-hidden">
											<a href="#">
												<Image
													class="max-w-full w-full mx-auto h-auto"
													src={heroImage}
													alt="Image description"
												/>
											</a>
											<div class="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
												<a href="#">
													<h2 class="text-lg font-bold capitalize leading-tight text-white mb-1">
														Online taxi users are
														increasing drastically
														ahead of the new year
													</h2>
												</a>
												<div class="pt-1">
													<div class="text-gray-100">
														<div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
														Lifestyle
													</div>
												</div>
											</div>
										</div>
									</article>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <!-- block news --> */}
				<div class="bg-white">
					<div class="xl:container mx-auto px-3 sm:px-4 xl:px-2">
						<div class="flex flex-row flex-wrap">
							{/* <!-- Left --> */}
							<div class="flex-shrink max-w-full w-full lg:w-2/3 overflow-hidden">
								<div class="w-full py-3">
									<h2 class="text-gray-800 text-2xl font-bold">
										<span class="inline-block h-5 border-l-3 border-red-600 mr-2"></span>
										Europe
									</h2>
								</div>
								<div class="flex flex-row flex-wrap -mx-3">
									<div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
										<div class="flex flex-row sm:block hover-img">
											<a href="">
												<Image
													class="max-w-full w-full mx-auto"
													src={heroImage}
													alt="alt title"
												/>
											</a>
											<div class="py-0 sm:py-3 pl-3 sm:pl-0">
												<h3 class="text-lg font-bold leading-tight mb-2">
													<a href="#">
														5 Tips to Save Money
														Booking Your Next Hotel
														Room
													</a>
												</h3>
												<p class="hidden md:block text-gray-600 leading-tight mb-1">
													This is a wider card with
													supporting text below as a
													natural lead-in to
													additional content.
												</p>
												<a
													class="text-gray-500"
													href="#"
												>
													<span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>
													Europe
												</a>
											</div>
										</div>
									</div>
									<div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
										<div class="flex flex-row sm:block hover-img">
											<a href="">
												<Image
													class="max-w-full w-full mx-auto"
													src={heroImage}
													alt="alt title"
												/>
											</a>
											<div class="py-0 sm:py-3 pl-3 sm:pl-0">
												<h3 class="text-lg font-bold leading-tight mb-2">
													<a href="#">
														5 Tips to Save Money
														Booking Your Next Hotel
														Room
													</a>
												</h3>
												<p class="hidden md:block text-gray-600 leading-tight mb-1">
													This is a wider card with
													supporting text below as a
													natural lead-in to
													additional content.
												</p>
												<a
													class="text-gray-500"
													href="#"
												>
													<span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>
													Europe
												</a>
											</div>
										</div>
									</div>
									<div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
										<div class="flex flex-row sm:block hover-img">
											<a href="">
												<Image
													class="max-w-full w-full mx-auto"
													src={heroImage}
													alt="alt title"
												/>
											</a>
											<div class="py-0 sm:py-3 pl-3 sm:pl-0">
												<h3 class="text-lg font-bold leading-tight mb-2">
													<a href="#">
														5 Tips to Save Money
														Booking Your Next Hotel
														Room
													</a>
												</h3>
												<p class="hidden md:block text-gray-600 leading-tight mb-1">
													This is a wider card with
													supporting text below as a
													natural lead-in to
													additional content.
												</p>
												<a
													class="text-gray-500"
													href="#"
												>
													<span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>
													Europe
												</a>
											</div>
										</div>
									</div>
									<div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
										<div class="flex flex-row sm:block hover-img">
											<a href="">
												<Image
													class="max-w-full w-full mx-auto"
													src={heroImage}
													alt="alt title"
												/>
											</a>
											<div class="py-0 sm:py-3 pl-3 sm:pl-0">
												<h3 class="text-lg font-bold leading-tight mb-2">
													<a href="#">
														5 Tips to Save Money
														Booking Your Next Hotel
														Room
													</a>
												</h3>
												<p class="hidden md:block text-gray-600 leading-tight mb-1">
													This is a wider card with
													supporting text below as a
													natural lead-in to
													additional content.
												</p>
												<a
													class="text-gray-500"
													href="#"
												>
													<span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>
													Europe
												</a>
											</div>
										</div>
									</div>
									<div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
										<div class="flex flex-row sm:block hover-img">
											<a href="">
												<Image
													class="max-w-full w-full mx-auto"
													src={heroImage}
													alt="alt title"
												/>
											</a>
											<div class="py-0 sm:py-3 pl-3 sm:pl-0">
												<h3 class="text-lg font-bold leading-tight mb-2">
													<a href="#">
														5 Tips to Save Money
														Booking Your Next Hotel
														Room
													</a>
												</h3>
												<p class="hidden md:block text-gray-600 leading-tight mb-1">
													This is a wider card with
													supporting text below as a
													natural lead-in to
													additional content.
												</p>
												<a
													class="text-gray-500"
													href="#"
												>
													<span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>
													Europe
												</a>
											</div>
										</div>
									</div>
									<div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
										<div class="flex flex-row sm:block hover-img">
											<a href="">
												<Image
													class="max-w-full w-full mx-auto"
													src={heroImage}
													alt="alt title"
												/>
											</a>
											<div class="py-0 sm:py-3 pl-3 sm:pl-0">
												<h3 class="text-lg font-bold leading-tight mb-2">
													<a href="#">
														5 Tips to Save Money
														Booking Your Next Hotel
														Room
													</a>
												</h3>
												<p class="hidden md:block text-gray-600 leading-tight mb-1">
													This is a wider card with
													supporting text below as a
													natural lead-in to
													additional content.
												</p>
												<a
													class="text-gray-500"
													href="#"
												>
													<span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>
													Europe
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* <!-- right --> */}
							<div class="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-first lg:order-last">
								<div class="w-full bg-gray-50 h-full">
									<div class="text-sm py-6 sticky">
										<div class="w-full text-center">
											<a class="uppercase" href="#">
												Advertisement
											</a>
											<a href="#">
												<Image
													class="mx-auto"
													src={heroImage}
													alt="advertisement area"
												/>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			{/* <!-- end main --> */}
		</Layout>
	)
}

export default Home
