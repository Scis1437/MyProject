import '../styles/globals.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes ,
  Redirect,
  Navigate ,
} from "react-router-dom";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}



export default MyApp
