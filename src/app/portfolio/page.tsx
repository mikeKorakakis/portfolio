import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";

function Portfolio() {
	return (
		<>
			<Head>
				<title>Portfolio</title>
			</Head>

			<Navbar />

			<section className="hero">
				<div className="container">
					<div className="text-wrapper w-full">
						<h1 className="title">Portfolio</h1>
						<p className="description">
							These are a couple of sample projects that i host on my test
							server.
						</p>

						<div className="portfolio-wrapper">
							<div className="portfolio-item">
								<a href="https://www.social.korakakis.com">
									<Image
										alt="portfolio-image"
										src="/social.png"
										className="portfolio-image"
										width={1280}
										height={380}

									/>
								</a>
								<div className="div-left">
									<h4 className="portfolio-name">Social Network App</h4>
									<div className="portfolio-category">Web App</div>
								</div>
								<div className="div-right">
									<h4 className="tech-header">Tech Stack</h4>
                                    <ul>
									<li className="tech-name">ASP Core 5.0</li>
									<li className="tech-name">NextJS</li>
									<li className="tech-name">IdentityServer4</li>
									<li className="tech-name">Material-UI</li>
									<li className="tech-name">PostgreSQL</li>
									<li className="tech-name">Docker/Kubernetes</li>
                                    </ul>
								</div>
							</div>
							<div className="portfolio-item">
								<a href="https://zen1one.korakakis.com">
									<Image
										alt="zenone"
										src="/zenone.png"
										className="portfolio-image"
										width={1280}
										height={380}
									/>
								</a>
                                <div className="div-left">
								<h4 className="portfolio-name">Wordpress Website - Shop</h4>
								<div className="portfolio-category">Wordpress</div>
                                </div>
                                <div className="div-right">
                                <div className="div-right">
									<h4 className="tech-header">Tech Stack</h4>
                                    <ul>
									<li className="tech-name">Wordpress</li>
									<li className="tech-name">Woocommerce</li>
                                    </ul>
								</div>
                                </div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Portfolio;
