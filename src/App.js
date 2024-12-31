import "./App.css";

import { enableInfiniteScroll } from "./infiniteScroll";
// Import your local images
import img1 from "./images/1.png";
import img2 from "./images/2.jpg";
import img3 from "./images/3.png";
import img4 from "./images/4.png";

import React, { useEffect, useState, useRef } from "react";

import Typed from "typed.js";


function App() {
  
  const typedRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    fetch(`https://python-react.onrender.com/send-email`, {  // Use the Render public URL here
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
        alert(data.message);
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    })
    .catch((error) => {
        alert("Failed to send message.");
        console.log(error);
    });
};

 
  
  // Smooth scrolling to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cards = [
    { image: img1, label: "Project 1" },
    { image: img2, label: "Project 2" },
    { image: img3, label: "Project 3" },
    { image: img4, label: "Project 4" },
  ];


  useEffect(() => {
    const cursor = document.querySelector('.cursor');

    if (cursor) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px'; 
        cursor.style.top = e.clientY - 10 + 'px';
      });
    }
    return () => {
      document.removeEventListener('mousemove', () => {});
    };
  }, []);

  useEffect(() => {
    const moveEllipse = (ellipse) => {
      const screenWidth = window.innerWidth - 50; // Adjust for ellipse size
      const screenHeight = window.innerHeight - 50;

      const randomX = Math.random() * screenWidth;
      const randomY = Math.random() * screenHeight;

      ellipse.style.transform = `translate(${randomX}px, ${randomY}px)`;
    };

    const animateEllipses = () => {
      const ellipses = document.querySelectorAll(' .ellipse3');
      setInterval(() => {
        ellipses.forEach(ellipse => moveEllipse(ellipse));
      }, 2000); // Adjust interval as needed
    };

    animateEllipses();
  }, []);
  


  useEffect(() => {
    // Enable infinite scroll for projects grid
    enableInfiniteScroll();
  }, []); // Run only once when the component mounts

  useEffect(() => {
    const options = {
      strings: ["Websites", "Softwares", "Designs"],
      typeSpeed: 150,
      backSpeed: 100,
      loop: true,
    };

    const typed = new Typed(typedRef.current, options);

    // Cleanup to destroy the Typed instance when component unmounts
    return () => {
      typed.destroy();
    };
  }, []);




  return (

    <div className="App">
      <header className="navbar">
  <nav className="navbeta">
  <a onClick={() => scrollToSection("intro/heading")} className="logo-container">
  <img src={`${process.env.PUBLIC_URL}/ScaleUp.png`} alt="ScaleUp Logo" className="logo" />
  </a>
  <span className="menu-toggle" onClick={toggleMenu}>
        ☰
      </span>
  <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
  <li><a onClick={() => scrollToSection("services")}>Services</a></li>
    <li><a onClick={() => scrollToSection("projects")}>Projects</a></li>
    <li><a onClick={() => scrollToSection("new-section")}>Why Us?</a></li>
  </ul>
  <button className="contact"><a onClick={() => scrollToSection("discuss")}>Book a Call</a></button>
</nav>

      </header>
  
      <main>
      <section id="intro/heading">

  <h1 className='heading-hero'>
  Stunning <span className="autotype" ref={typedRef}></span>
    <br />
    Built Affordably.
  </h1>
  <p className="intro">
  ScaleUp crafts hand-coded websites for small businesses worldwide, ensuring top performance and optimal rankings without using page builders.
  </p>
  <button onClick={() => scrollToSection("discuss")}className="cta">Book a Call</button>
  <div className="ellipse3"></div>

</section>

      <br/>
        <section id="services" className="section">
  <h2>Our Services</h2>
  <p>
  Elevate your business with top-tier design, development, and marketing solutions tailored for success.
  </p>
  {/* CARDS */}

  <div className="spacing-service-cards">
    <div className="service-card">
      <h3>Web and Mobile Development</h3>
      <p>Crafting innovative digital solutions that grow with your business.
      </p>
      <img src={`${process.env.PUBLIC_URL}/flutter.png`}  className="service-icons" alt="Project 1" />
      <img src={`${process.env.PUBLIC_URL}/logo512.png`}  className="service-icons" alt="Project 1" />
      <img src={`${process.env.PUBLIC_URL}/tailwind.png`}  className="service-icons" alt="Project 1" />

    </div>
    <div className="service-card">
      <h3>UI/UX Design</h3>
      <p>Deliver intuitive and engaging designs for a seamless user experience.</p>
      <img src={`${process.env.PUBLIC_URL}/Adobe_Illustrator_CC.png`}  className="service-icons" alt="Project 1" />
      <img src={`${process.env.PUBLIC_URL}/Adobe_Photoshop_CC.png`}  className="service-icons" alt="Project 1" />
      <img src={`${process.env.PUBLIC_URL}/Figma.svg`}  className="service-icons" alt="Project 1" />

    </div>
    <div className="service-card">
      <h3>Social Media Marketing</h3>
      <p>Native apps, Cross-platform solutions, Web applications, & Cloud integration
      </p>
      <img src={`${process.env.PUBLIC_URL}/tiktok.webp`}  className="service-icons" alt="Project 1" />
      <img src={`${process.env.PUBLIC_URL}/Instagram.svg`}  className="service-icons" alt="Project 1" />
      <img src={`${process.env.PUBLIC_URL}/meta.svg`}  className="service-icons" alt="Project 1" />

    </div>
    <div className="service-card">
      <h3>Search Engine Optimization</h3>
      <p>Elevating your digital footprint through data-driven optimization. 
      </p>
      <img src={`${process.env.PUBLIC_URL}/SEO.svg`}  className="service-icons" alt="Project 1" />
      <img src={`${process.env.PUBLIC_URL}/Google_Analytics.svg`}  className="service-icons" alt="Project 1" />
      <img src={`${process.env.PUBLIC_URL}/Google__G__Logo.svg`}  className="service-icons" alt="Project 1" />
    </div>
    <div className="service-card">
      <h3>Branding</h3>
      <p>Creating unique brand stories that resonate. Turning your vision into reality.</p>
      <img src={`${process.env.PUBLIC_URL}/Canva.png`}  className="service-icons" alt="Project 1" />
      <img src={`${process.env.PUBLIC_URL}/wix.png`}  className="service-icons" alt="Project 1" />
      <img src={`${process.env.PUBLIC_URL}/Adobe_Illustrator_CC.png`}  className="service-icons" alt="Project 1" />

    </div>
    <div className="service-card">
      <h3>Like Our Services?</h3>
      <p>To book a call with one of our representatives, please click the button below!!</p>
      <button onClick={() => scrollToSection("discuss")}className="services-cta">Book a Call</button>
    </div>
  </div>
</section>
{/* END OF CARDS */}




<section id="projects" className="section">
  <h2>Our Projects</h2>
  <div className="projects-blur-container">
    <div className="projects-container">
      <div className="projects-grid" id="projects-grid">
        {/* Updated Project Cards */}
        <div className="project-card">
          <img src={`${process.env.PUBLIC_URL}/projects(5).png`} alt="Project 1" />
          <div className="project-title">App - Nutrinova: The Smart Calorie Tracker</div>
        </div>
        <div className="project-card">
          <img src={`${process.env.PUBLIC_URL}/project (3).png`} alt="Project 2" />
          <div className="project-title">Software Development - Weather Prediction</div>
        </div>
        <div className="project-card">
          <img src={`${process.env.PUBLIC_URL}/project (2).png`} alt="Project 3" />
          <div className="project-title">App- AI Children Learning App</div>
        </div>
        <div className="project-card">
          <img src={`${process.env.PUBLIC_URL}/project (1).jpg`} alt="Project 4" />
          <div className="project-title">Website Development - Sunrise</div>
        </div>
        <div className="project-card">
          <img src={`${process.env.PUBLIC_URL}/project (4).png`} alt="Project 5" />
          <div className="project-title">Website - IT FEST 2024, Kyrgystan</div>
        </div>
        <div className="project-card">
          <img src={`${process.env.PUBLIC_URL}/project (2).png`} alt="Project 6" />
          <div className="project-title">App- AI Children Learning App</div>
        </div>
      </div>
    </div>
  </div>
</section>








<section id="new-section" className="section">
  <h2>Why Choose ScaleUp?</h2>
  <div className="choose-us-grid">
    <div className="choose-us-card">
      <h3>Expertise You Can Trust</h3>
      <p>
        With years of experience in web design, development, and marketing, our
        team delivers high-quality solutions tailored to your business needs.
      </p>
    </div>
    <div className="choose-us-card">
      <h3>Affordable Pricing</h3>
      <p>
        We provide top-notch services at competitive prices to help you grow
        without breaking the bank.
      </p>
    </div>
    <div className="choose-us-card">
      <h3>Customer-Centric Approach</h3>
      <p>
        Your success is our priority. We listen to your ideas and ensure
        they're transformed into reality.
      </p>
    </div>
    <div className="choose-us-card">
      <h3>Proven Results</h3>
      <p>
        From increasing online visibility to boosting conversions, our
        solutions deliver measurable outcomes.
      </p>
    </div>
  </div>
</section>


        <section id="discuss" className="section">
        <h2>Discuss Your Project</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <textarea
            type="text"
            name="message"
            placeholder="Tell us about your project"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
      </main>

      <footer class="footer">
  <div class="footer-left">
    <h2>SOCIALS</h2>
    <ul class="social-links">
        <li><a href="https://www.linkedin.com/company/scaleupsys/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="https://www.instagram.com/thescaleupp" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://www.facebook.com/profile.php?id=61566540658549" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        <li><a href="https://www.tiktok.com/@scaleup_agency" target="_blank" rel="noopener noreferrer">Tiktok</a></li>

    </ul>
  </div>

  <div class="footer-center">
    <h2>Navigation</h2>
    <ul class="navigation-links">
    <li><a href="/home">Home</a></li>
    <li><a href="/about-us">About Us</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/portfolio">Portfolio</a></li>
</ul>
  </div>
  <div class="footer-right">
  <h2>Contact Us</h2>
  <a href="mailto:scaleupdigitalagency@gmail.com">scaleupdigitalagency@gmail.com</a>
</div>

<div class="footer-bottom">
  <p>© 2024 ScaleUp Agency. All rights reserved.</p>
</div>


</footer>
    </div>
  );
}

export default App;
