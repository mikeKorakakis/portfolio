import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faTwitter,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import React from "react";

function Footer() {
	return (
		<div className="footer">
			<div className="container">
				<div className="subcontainer">
					<span className="header">About</span>
					<span className="text">
						Copyright ©2021 All rights reserved
					</span>
				</div>
			</div>
			<div className="container">
				<div className="subcontainer">
					<span className="header">Contact</span>
					<span className="text">
						Email: mike.korakakis@gmail.com
					</span>
					<div className="social">
						<a href="#"><FontAwesomeIcon icon={faFacebook} color="white"  className="social"/></a>
						<a href="#"><FontAwesomeIcon icon={faTwitter} color="white" className="social"/></a>
						<a href="#"><FontAwesomeIcon icon={faLinkedin} color="white" className="social"/></a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
