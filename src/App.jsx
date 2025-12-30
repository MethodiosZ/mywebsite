import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ReactTyped } from "react-typed";
import { Github, Linkedin, Mail } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Uptimedisplay from "./Uptimedisplay";
import "./index.css";

export default function App() {
    const [showScroll, setShowScroll] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [init, setInit] = useState(false);

    useEffect(() => {
	//Particles Initialize
	initParticlesEngine(async (engine) => {
	    await loadSlim(engine);
	}).then(() => {
	    setInit(true);
	});
    }, []);
    
    useEffect(() => {
	//Local Preference
	const root = document.documentElement;
	const savedMode = localStorage.getItem("darkMode");
	const prefers = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
	const initial = savedMode === "true" || (savedMode === null && prefers);
	setDarkMode(initial);
	if(initial) root.classList.add("dark");
    }, []);

    useEffect(() => {
	//Dark Mode Button
	const root = document.documentElement;
	if(darkMode) root.classList.add("dark");
	else root.classList.remove("dark");
	localStorage.setItem("darkMode", darkMode ? "true" : "false");
    }, [darkMode]);
    
    useEffect(() => {
	//Scroll to Top Button
	const handleScroll = () => {
	    if(window.scrollY > 300) {
		setShowScroll(true);
	    } else {
		setShowScroll(false);
	    }
	};

	window.addEventListener("scroll", handleScroll);
	return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth"});
    };
    
    return (
	<div className="p-6 dark:bg-gray-900 dark:text-blue-100 bg-white text-gray-800">
	    {/* Navbar */}
	    <nav className="flex justify-center items-center p-6 shadow-md bg-blue-100 dark:bg-gray-800 relative z-10">
		<button
		    onClick={()  => setDarkMode(prev => !prev)}
		    className="ml-4 px-3 py-1 absolute top-3 right-3 rounded dark:bg-blue-200 dark:text-white dark:hover:bg-blue-500 bg-gray-400 hover:bg-gray-600"
		>
		    {darkMode ? "☀️" : "🌙"}
		</button>
		<div className="flex flex-col items-center py-4 space-y-3">
		    <span className="text-2xl font-bold">Methodios Zacharioudakis</span>
		    <div className="flex space-x-6 text-lg font-medium">
			<a href="#about" className="px-3 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-700 transition">About Me</a>
			<a href="#projects" className="px-3 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-700 transition">Projects</a>
			<a href="#contact" className="px-3 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-700 transition">Contact</a>
		    </div>
		</div>
	    </nav>

	    {/* Hero Section */}
	    <motion.section
		initial={{ opacity: 0, y: -50 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8 }}
		className="relative min-h-screen flex flex-col justify-center items-center text-center p-10 overflow-hidden"
	    >
		{init && (
			<Particles
			    id="tsparticles"
			    className="absolute inset-0 h-full w-full z-0"
			    options={{
				background: {color: {value: "transparent" } },
				fpsLimit: 30,
				interactivity: {
				    events: {onHover: { enable: true, mode: "repulse" } },
				    modes: { repulse: { distance: 100, duration: 0.4 } },
				},
				particles: {
				    color: { value: darkMode ? "#60a5fa" : "#0568e3" },
				    links: { color: darkMode ? "#60a5fa" : "#0568e3", distance: 150, enable: true, opacity: 0.3, width: 1 },
				    move: { enable: true, speed: 2 },
				    number: { value: 60 },
				    opacity: { value: 0.5 },
				    shape: { type: "circle" },
				    size: { value: { min: 1, max: 4 } },
				},
				detectRetina: true,
			    }}
			/>
		)}
		<h2 className="text-3xl md:text-6xl font-bold mb-4 relative z-10">Hi, I'm Methodios</h2>
		<ReactTyped
		    strings={[
			"Computer Scientist",
			"Web Developer",
			"Cybersecurity Enthusiast",
			]}
		    typeSpeed={60}
		    backSpeed={40}
		    loop
		    className="text-lg md:text-2xl mb-6 text-gray-800 dark:text-blue-100 relative z-10"
		/>
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 py-3 relative z-10">
		    <div className="p-4 bg-blue-200 dark:bg-gray-800 rounded-lg shadow">
			👨‍ <span className="font-bold">10+</span> Projects
		    </div>
		    <div className="p-4 bg-blue-200 dark:bg-gray-800 rounded-lg shadow">
			🎓 <span className="font-bold">CS Graduate</span>
		    </div>
		    <div className="p-4 bg-blue-200 dark:bg-gray-800 rounded-lg shadow">
			💼 <span className="font-bold">Open to Work</span>
		    </div>
		</div>
		<div className="flex items-center font-large relative z-10">
		    <a
			href={`${import.meta.env.BASE_URL}CV.pdf`}
			target="_blank"
			rel="noopener noreferrer"
			className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
		    >
			View Resume
		    </a>
		    <a
			href={`${import.meta.env.BASE_URL}CV.pdf`}
			download="MethodiosZacharioudakis_Resume.pdf"
			className="px-3 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
		    >
			↓
		    </a>
		</div>
	    </motion.section>

	    {/* About Section */}
	    <section id="about" className="max-w-4xl mx-auto p-10 shadow-md bg-blue-200 dark:bg-gray-700 relative z-10">
		<h3 className="text-3xl font-bold mb-4 text-center">About Me</h3>
		<p className="text-lg leading-relaxed">
		    I'm a recent Computer Science graduate with deep passion for programming
		    and continuous learning. During my studies I developed a solid foundation
		    in software development, working with technologies such as Java, Python, C and SQL.
		    Beyond coursework, I've dedicated myself to personal projects and hands-on
		    practice-building applications, with consistenly challenging myself to learn
		    new technologies. I take great pride in writing clean, efficient code and thrive
		    on solving complex problems with practical, scalable solutions.
		</p>

		{/* Recent Updates */}
		<h4 className="text-2xl py-4 font-semibold mb-4">Recent Updates</h4>
		<ul className="space-y-4 border-l-2 border-blue-600 dark:border-blue-400 pl-4">
			<li>
			<div className="flex items-center space-x-2">
			    <span className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
			    <p className="text-gray-800 dark:text-gray-100">
				<span className="font-semibold">Dec 2025:</span> Created a Next.js template for building custom websites 
			    </p>
			</div>
		    </li>
			<li>
			<div className="flex items-center space-x-2">
			    <span className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
			    <p className="text-gray-800 dark:text-gray-100">
				<span className="font-semibold">Nov 2025:</span> Created a simple CRUD website
			    </p>
			</div>
		    </li>
		    <li>
			<div className="flex items-center space-x-2">
			    <span className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
			    <p className="text-gray-800 dark:text-gray-100">
				<span className="font-semibold">Oct 2025:</span> Started working on a new Full-stack Project
			    </p>
			</div>
		    </li>
		    <li>
			<div className="flex items-center space-x-2">
			    <span className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
			    <p className="text-gray-800 dark:text-gray-100">
				<span className="font-semibold">Oct 2025:</span> Transitioned to HackTheBox for my cyber security path
			    </p>
			</div>
		    </li>
		    <li>
			<div className="flex items-center space-x-2">
			    <span className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
			    <p className="text-gray-800 dark:text-gray-100">
				<span className="font-semibold">Sept 2025:</span> Attended VoxxedDays
			    </p>
			</div>
		    </li>
		    <li>
			<div className="flex items-center space-x-2">
			    <span className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
			    <p className="text-gray-800 dark:text-gray-100">
				<span className="font-semibold">Sept 2025:</span> Started my learning path at TryHackMe.com
			    </p>
			</div>
		    </li>
		    <li>
			<div className="flex items-center space-x-2">
			    <span className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
			    <p className="text-gray-800 dark:text-gray-100">
				<span className="font-semibold">July 2025:</span> Finished Computer Science degree 🎓
			    </p>
			</div>
		    </li>
		</ul>
	    </section>

	    {/* Projects Section */}
	    <section id="projects" className="max-w-6xl mx-auto p-10 relative z-10">
		<h3 className="text-3xl font-bold mb-8 text-center">Projects</h3>
		<div className="grid md:grid-cols-2 gap-8">
		    
		    {/* Project 1 */}
		    <motion.div
			whileHover={{ scale: 1.03 }}
			className="p-6 bg-white dark:bg-gray-800 border rounded-2xl shadow hover:shadow-xl transition"
		    >
			<h4 className="text-xl font-semibold mb-2">Event Booking System</h4>
			<p className="mb-3 text-gray-700 dark:text-gray-300">
			    A web-based event booking platform built with <strong>Java</strong> (servlets) and <strong>MySQL</strong>, 
			    featuring user authentication and dynamic event management.
			</p>
			<div className="flex flex-wrap gap-2 mb-3">
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">Java</span>
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">MySQL</span>
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">Tomcat</span>
			</div>
			<div className="flex space-x-3">
			    <a href="https://github.com/MethodiosZ/EventManager" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
				GitHub
			    </a>
			</div>
		    </motion.div>

		    {/* Project 2 */}
		    <motion.div
			whileHover={{ scale: 1.03 }}
			className="p-6 bg-white dark:bg-gray-800 border rounded-2xl shadow hover:shadow-xl transition"
		    >
			<h4 className="text-xl font-semibold mb-2">Cancer Sample Analysis Pipeline</h4>
			<p className="mb-3 text-gray-700 dark:text-gray-300">
			    Integrated bioinformatics pipeline for analyzing cancer samples and discovering biological correlations, 
			    built during my thesis project.
			</p>
			<div className="flex flex-wrap gap-2 mb-3">
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">Python</span>
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">Bash</span>
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">Bioinformatics</span>
			</div>
			<div className="flex space-x-3">
			    <a href="https://github.com/MethodiosZ/ExomeTumorClustering" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
				GitHub
			    </a>
			</div>
		    </motion.div>

		    {/* Project 3 */}
		    <motion.div
			whileHover={{ scale: 1.03 }}
			className="p-6 bg-white dark:bg-gray-800 border rounded-2xl shadow hover:shadow-xl transition"
		    >
			<h4 className="text-xl font-semibold mb-2">Personal Portfolio Website</h4>
			<p className="mb-3 text-gray-700 dark:text-gray-300">
			    This very site — built with <strong>React</strong>, <strong>Vite</strong>, <strong>TailwindCSS</strong>, and deployed on <strong>GitHub Pages</strong>.
			</p>
			<div className="flex flex-wrap gap-2 mb-3">
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">React</span>
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">Tailwind</span>
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">Vite</span>
			</div>
			<div className="flex space-x-3">
			    <a href="https://github.com/MethodiosZ/mywebsite" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
				GitHub
			    </a>
			</div>
		    </motion.div>

		    {/* Project 4 */}
		    <motion.div
			whileHover={{ scale: 1.03 }}
			className="p-6 bg-white dark:bg-gray-800 border rounded-2xl shadow hover:shadow-xl transition"
		    >
			<h4 className="text-xl font-semibold mb-2">Simple Web App</h4>
			<p className="mb-3 text-gray-700 dark:text-gray-300">
			    A simple CRUD full-stack web application written using <strong>React</strong>, <strong>Next.js</strong> and <strong>Java</strong>.
			</p>
			<div className="flex flex-wrap gap-2 mb-3">
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">React</span>
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">Next.js</span>
			    <span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">Java</span>
				<span className="px-2 py-1 text-sm bg-blue-300 dark:bg-gray-700 rounded">PostgreSQL</span>
			</div>
			<div className="flex space-x-3">
			    <a href="https://github.com/MethodiosZ/SimpleWebApp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
				GitHub
			    </a>
			</div>
		    </motion.div>
		</div>
	    </section>

	    {/* Contact Section */}
	    <section id="contact" className="max-w-3xl mx-auto p-10 text-center shadow-md bg-blue-300 dark:bg-gray-600 relative z-10">
		<h3 className="text-3xl font-bold mb-4">Contact</h3>
		<p className="mb-6">Feel free to reach out for collaborations or job opportunities.</p>
		<div className="flex justify-center space-x-6 text-lg font-medium">
		    <a
			href="mailto:methzaxa@gmail.com"
			className="px-3 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-500 transition"
		    >
			<Mail size={28} />
		    </a>
		    <a
			href="https://linkedin.com/in/methodios-zacharioudakis-771941261/"
			target="_blank"
			rel="noopener noreferrer"
			className="px-3 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-500 transition"
		    >
			<Linkedin size={28} />
		    </a>
		    <a
			href="https://github.com/MethodiosZ"
			target="_blank"
			rel="noopener noreferrer"
			className="px-3 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-500 transition"
		    >
			<Github size={28} />
		    </a>
		</div>
	    </section>

	    {/* Footer */}
	    <footer className="p-6 text-center border-t relative z-10">
		<p>
		    © {new Date().getFullYear()} Methodios Zacharioudakis. All rights reserved.
		</p>

		<div className="flex justify-center space-x-6">
		    {/*Visitor Counter*/}
		    <img
			src="https://visitor-badge.laobi.icu/badge?page_id=MethodiosZ.mywebsite&style=flat-sqaure&color=blue"
			alt="Visitor Counter"
			className="h-5"
		    />

		    {/*Last Commit*/}
		    <img
			src="https://img.shields.io/github/last-commit/MethodiosZ/mywebsite?color=blue"
			alt="Last Commit"
			className="h-5"
		    />

		    {/*Uptime*/}
		    <Uptimedisplay />
		</div>
	    </footer>

	    {/* Scroll to Top button */}
	    <AnimatePresence>
		{showScroll && (
		    <motion.button
			animate={{ opacity: showScroll ? 1 : 0, y: showScroll ? 0 : 30 }}
			transition={{ duration: 0.6, ease: "easeInOut"}}
			onClick={scrollTop}
			style={{ pointerEvents: showScroll ? "auto" : "none" }}
			className="fixed top-6 right-6 p-3 z-20 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition"
		    >
			↑
		    </motion.button>
		)}
	    </AnimatePresence>
	</div>
    );
}
