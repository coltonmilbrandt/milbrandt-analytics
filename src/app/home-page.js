// src/app/page.js
"use client"

import Image from "next/image"
import Layout from "../components/Layout"
import Link from "next/link"
import heroImage from "../../public/hero-image.jpg"
import logo from "../../public/transparent-logo.png"
import MarketCharts from "../components/MarketCharts.js"
import LeftCover from "../components/LeftCover.js"
import NewsBox from "../components/NewsBox"
import ContentBox from "../components/ContentBox"
import MyChart from "../components/chart"
import { useState } from "react"

// ########### News Article Photos ########### //
import trumpVsBiden from "../../public/trumpvsbiden.jpg"
import chips from "../../public/chips.jpg"
import electionSimJPG from "../../public/ElectionSim.jpg"
import usaMapJPG from "../../public/usa-map.jpg"
import diceAndChips from "../../public/dice-and-chips.jpg"
import bitcoinJPG from "../../public/bitcoin.jpg"
import fedBuildingJPG from "../../public/fed-building.jpeg"

const Home = () => {
	const [outpaintedImagePath, setOutpaintedImagePath] = useState("")
	const [creativity, setCreativity] = useState(0.1)
	const [prompt, setPrompt] = useState(
		"1D Tradingview BTCUSD candlestick chart. Candlesticks go all the way to the right side of the chart. Light grey gridlines run across the chart horizontally for the full width. [[[no labels]]] [[[no words]]] [[[no text]]] [[[no numbers]]] [[[no gaps]]] [[[full width]]]"
	)
	const handleOutpaint = async () => {
		console.log("Outpainting...")
		try {
			const response = await fetch("/api/outpaint", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ creativity, prompt }),
			})
			const data = await response.json()
			if (data.success) {
				setOutpaintedImagePath(data.path)
				console.log("Outpainted image path:", data.path)
			} else {
				console.error("Failed to outpaint image")
			}
		} catch (error) {
			console.error("Error:", error)
		}
	}
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
					<Image src={logo} className="w-auto max-w-sm" />
					<p className="mt-4 mb-4 text-lg sm:text-2xl">
						<span className="text-orange-600">
							Max Out Your Alpha
						</span>{" "}
						with World-Class News & Analytics
					</p>
					{/* <Link href="/login">
						<span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-lg cursor-pointer">
							Go Premium
						</span>
					</Link> */}
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
							<LeftCover
								href="/articles/first-article"
								imageSrc={trumpVsBiden}
								imageAlt="Image description"
								title="Paths to Victory: Will Trump Upend Expectations?"
								description="Our pre-debate model forecasts some surprises in November. Can Biden hold on?"
								category="Politics"
							/>

							{/* <!--Start box news--> */}
							<div class="flex-shrink max-w-full w-full lg:w-1/2">
								<div class="box-one flex flex-row flex-wrap">
									<NewsBox
										href="/articles/trump-betting-discount"
										imageSrc={diceAndChips} // Ensure you have a relevant image imported
										imageAlt="Campaign rally"
										title="Trump Betting Odds May be at a Massive Discount"
										description="An in-depth look at the pivotal state that could determine Trump's path to victory in the upcoming election."
										category="Politics"
									/>
									<NewsBox
										href="/articles/nvidia-buy-timing"
										imageSrc={chips} // Ensure you have a relevant image imported
										imageAlt="Voting booth"
										title="Buying Nvidia: is it Cisco in 2000 or Apple in 2012?"
										description="Taking a look at the comparables and projected growth, is Nvidia a dud at this price or just getting started?"
										category="Stocks"
									/>
									<NewsBox
										href="/articles/biden-replacement"
										imageSrc={trumpVsBiden}
										imageAlt="Image description"
										title="November Surprise: The Most Likely Ways for Democrats to Win the Presidency"
										description="Our pre-debate model forecasts some surprises in November. Can Biden hold on?"
										category="Politics"
									/>
									<NewsBox
										href="/articles/trump-achilles-heel"
										imageSrc={bitcoinJPG} // Ensure you have a relevant image imported
										imageAlt="Political debate"
										title="If Bitcoin was a Stock, I Wouldn't Buy it Either"
										description="An analysis of the key vulnerabilities and challenges facing Trump's campaign as he vies for the presidency."
										category="Crypto"
									/>
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
										Election Models
									</h2>
								</div>
								<div class="flex flex-row flex-wrap -mx-3">
									<ContentBox
										href="/articles/trump-achilles-heel"
										imageSrc={electionSimJPG} // Ensure you have a relevant image imported
										imageAlt="Election Histogram Chart"
										title="Election Simulation Results: Trump Comes Out Ahead"
										description="Trump averages 294 electoral votes, but borders on a landslide win with a potential Rust-Belt sweep."
										category="Politics"
									/>
									<ContentBox
										href="/articles/trump-achilles-heel"
										imageSrc={usaMapJPG} // Ensure you have a relevant image imported
										imageAlt="Political debate"
										title="Trump's Must-Win States"
										description="Where should Trump campaign hardest? An analysis of the states that contribute the most statistically to a Trump win."
										category="Politics"
									/>
									<ContentBox
										href="/articles/trump-achilles-heel"
										imageSrc={trumpVsBiden} // Ensure you have a relevant image imported
										imageAlt="Political debate"
										title="Biden's Must-Win States"
										description="An analysis of the key vulnerabilities and challenges facing Trump's campaign as he vies for the presidency."
										category="Politics"
									/>
									<ContentBox
										href="/articles/trump-achilles-heel"
										imageSrc={trumpVsBiden} // Ensure you have a relevant image imported
										imageAlt="Political debate"
										title="Trump Undervalued? 20% Upside on Trump Betting Odds"
										description="An analysis of the key vulnerabilities and challenges facing Trump's campaign as he vies for the presidency."
										category="Politics"
									/>
									<ContentBox
										href="/articles/trump-achilles-heel"
										imageSrc={trumpVsBiden} // Ensure you have a relevant image imported
										imageAlt="Political debate"
										title="Trump's Achilles Heel: The Challenges That Could Derail His Campaign"
										description="An analysis of the key vulnerabilities and challenges facing Trump's campaign as he vies for the presidency."
										category="Politics"
									/>
									<ContentBox
										href="/articles/the-dangerous-policy-of-printing-money"
										imageSrc={fedBuildingJPG} // Ensure you have a relevant image imported
										imageAlt="The Fed"
										title="The Dangerous Policy of Printing Money"
										description="Controversial Monetary Policies and the Hidden Costs of Inflation - Why the Federal Reserve's Actions Need Urgent Reevaluation (2011)"
										category="Finance"
									/>
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
			<MyChart />
			<div>
				<div>
					<label>
						Creativity:
						<input
							type="number"
							class="text-gray-800"
							value={creativity}
							onChange={(e) =>
								setCreativity(parseFloat(e.target.value))
							}
							min="0"
							max="1"
							step="0.1"
						/>
					</label>
				</div>
				<div>
					<label>
						Prompt:
						<input
							type="text"
							class="text-gray-800 w-full"
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
						/>
					</label>
				</div>
				<button onClick={handleOutpaint}>Outpaint Image</button>
				{outpaintedImagePath && (
					<div>
						<h2>Outpainted Image:</h2>
						<img src={outpaintedImagePath} alt="Outpainted" />
					</div>
				)}
			</div>
		</Layout>
	)
}

export default Home
