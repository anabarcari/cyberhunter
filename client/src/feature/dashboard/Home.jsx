import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import "../../styles.css";
import Navbar from "../../components/Navbar.jsx";

// Modal.setAppElement('#root'); // Set the app element

function Home() {
  return (
    <div className="home">
      <Navbar />

      {/* HINT: here all components will replace whenever we will navigate from one component to another */}
      <Outlet />

      <Footer />
    </div>
  );
}

export default Home;
