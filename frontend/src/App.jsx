import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./index.css";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";

// import Home from "./pages/Home/Home";
// import About from "./pages/About/About";
// import Gallery from "./pages/Gallery/Gallery";
// import Blog from "./pages/Blog/Blog";
// import Testimonials from "./pages/Testimonials/Testimonials";
import Contact from "./Components/Contact/Contact";
// import ServiceDetail from "./pages/Services/ServiceDetail";
// import NotFound from "./pages/NotFound/NotFound";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />

      {/* Home's Hero fills the screen behind the transparent navbar,
          so it gets no offset. Every other page needs top padding
          equal to the navbar's height so its content isn't hidden
          underneath the fixed navbar. */}
      <main className={isHome ? "" : "page-offset"}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/services/:slug" element={<ServiceDetail />} /> */}
          {/* <Route path="/gallery" element={<Gallery />} /> */}
          {/* <Route path="/blog" element={<Blog />} /> */}
          {/* <Route path="/testimonials" element={<Testimonials />} /> */}
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
