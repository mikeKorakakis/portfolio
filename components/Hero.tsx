import Link from "next/link";
import React from "react";
import Image from "next/image";

function Hero() {
	return (
		<section className="hero">
			<div className="container">
				<div className="text-wrapper">
					<h1 className="title">
						Hello, my name is Michael Korakakis
					</h1>
					<p className="description">
						I am a Full Stack Web Developer/ System Administrator.
						<br></br>
						Creating web apps is my main field of interest.
						<br></br>
						Please let me know if I can be of any help.
					</p>

					<Link href="/contact">
						<a className="cta">Contact Me</a>
					</Link>
				</div>

				<div className="image-wrapper">
					<Image className="img-profile" src="/me2.png" width="350" height="350" />
				</div>
			</div>
		</section>
	);
}

export default Hero;
