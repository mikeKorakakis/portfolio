import Navbar from "../components/Navbar";
import Head from "next/head";
import React, { Suspense } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import dynamic from 'next/dynamic'
import Matter from "../components/Matter";
// const PixiTest = dynamic(import('../components/Matter'), {ssr: false})


function Home() {
	return (
		<>
			<div className="content">
				<Head>
					<title>Home</title>
				</Head>

				<Navbar />

				<Hero />
				<Suspense fallback={<div>Loading...</div>}>
					<Matter />
				</Suspense>
				{/* <Tech/> */}
			</div>

			<Footer />
		</>
	);
}

export default Home;
