import { AppProps } from "next/app";

// import "../styles/globals.css";
import '../styles/app.scss';


function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
};

export default App;
