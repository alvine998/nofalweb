import { React } from "react";
import Carousels from "../components/Carousels";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Carousels />
            </div>

        </div>
    )
}

export default Home