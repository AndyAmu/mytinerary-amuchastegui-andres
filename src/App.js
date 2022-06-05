import NavBar from "./components/Navbar/NavBar";
import Body from "./components/Body/Body"
import Footer from "./components/Footer/Footer"
import "./components/Styles/Body.css"
import { Carousel } from "bootstrap";
import CarouselBody from "./components/Body/Carousel"

function App() {
  return (
    <>
    <NavBar />
    <Body />
    <Footer />
    </>
  );
}

export default App;
