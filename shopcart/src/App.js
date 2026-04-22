import React from "react";
import "./App.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">XD</div>
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#resume">Resume</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-text">
        <h1>Portfolio Website</h1>
        <h1>Xinran Dongfang</h1>
        <h2>Technical Artist / Web Developer</h2>
        <p>
          Technical Artist with a focus on pipeline efficiency, tool development, and cross-functional collaboration. Experienced in procedural generation, rigging, asset integration, and scene implementation across different game engines.
        </p>
        <button className="primary-btn">Explore Projects</button>
      </div>

      <div className="hero-card">
        <div className="avatar-placeholder">LOGO</div>
      </div>
    </section>
  );
}

function ProjectCard(props) {
  return (
    <div className="project-card">
      <div className="project-image">Screenshot Placeholder</div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <a href="/" className="card-btn">
        Live Demo
      </a>
    </div>
  );
}

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <h2>Projects</h2>
      <p className="section-text">
        These project cards are placeholders for future bootcamp assignments and
        portfolio work.
      </p>

      <div className="projects-grid">
        <ProjectCard
          title="Project One"
          description="Placeholder for a web development project with a live demo link."
        />
        <ProjectCard
          title="Project Two"
          description="Placeholder for a JavaScript or React application."
        />
        <ProjectCard
          title="Project Three"
          description="Placeholder for a UI/UX or responsive design project."
        />
        <ProjectCard
          title="Project Four"
          description="Placeholder for an advanced portfolio piece."
        />
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="resume-section" id="resume">
      <h2>Resume</h2>
      <p>
        Resume section placeholder. A downloadable PDF or embedded resume can be
        added here later.
      </p>

      <div className="resume-buttons">
        <button className="primary-btn">View Resume</button>
        <button className="secondary-btn">Download PDF</button>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <h2>Contact</h2>
      <p>Email: yourname@email.com</p>
      <p>dongfangxr.artstation.com</p>
      <p>GitHub: github.com/yourusername</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Portfolio Shell. Built with React.</p>
    </footer>
  );
}

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;