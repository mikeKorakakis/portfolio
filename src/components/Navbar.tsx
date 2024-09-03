"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';


function Navbar() {

	const pathname = usePathname();
	const navs = [
		{ text: 'Home', href: '/' },
		{ text: 'About', href: '/about' },
		{ text: 'Portfolio', href: '/portfolio' },
		{ text: 'Contact', href: '/contact' },
		// { text: '', href: '' },
	];

	return (
		<nav className="navbar">
			<div className="container">
				<Link href="/" className="logo">Mike.</Link>

				<ul className="nav-links">
					{navs.map((nav, i) => (
						<li key={i}><Link href={nav.href} className={`nav-item ${pathname == nav.href ? 'active' : ''}`}>{nav.text}</Link></li>
					))}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;