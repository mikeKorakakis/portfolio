import Link from 'next/link';
import Head from 'next/head'
import Navbar from '@/components/Navbar';

function Contact() {
	return (
		<>
			<Head>
			  <title>Contact</title>
			</Head>

			<Navbar />

			<section className="hero">
			  <div className="container">
			    <div className="text-wrapper w-full">
			      <h1 className="title">Contact</h1>
			      <p className="description">
			      	Please feel free to contact me .
			      </p>
			      <ul className="contact-links">
			      	<li className="contact-item">Email: mike.korakakis@gmail.com</li>
			      	{/* <li className="contact-item">Phone: +6212344321007</li> */}
			      </ul>
		      </div>
	      </div>
			</section>
		</>
	);
}

export default Contact;