import Link from "next/link";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Tech from "../components/Tech";
import dynamic from 'next/dynamic'
const PixiTest = dynamic(import('../components/Pixi'), {ssr: false})


function Home() {
	return (
		<>
			<div className="content">
				<Head>
					<title>Home</title>
				</Head>

				<Navbar />
                <PixiTest/>

				<Hero/>
                <Tech/>
			</div>

			<Footer />
		</>
	);
}

export default Home;
