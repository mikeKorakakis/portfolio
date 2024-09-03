import Link from 'next/link';
import Head from 'next/head'
import Navbar from '@/components/Navbar';

function About() {
	return (
		<>
			<Head>
			  <title>About</title>
			</Head>

			<Navbar />

			<section className="hero">
			  <div className="container">
			    <div className="text-wrapper w-full">
			      <h1 className="title">About</h1>
			      <p className="description">
			      	My name is Michael and ...
			      </p>
		      </div>
	      </div>
			</section>
		</>
	);
}

export default About;