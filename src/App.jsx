import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

export default function App() {
    const [showScroll, setShowScroll] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    
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
	    <nav className="flex justify-center items-center p-6 shadow-md bg-blue-100 dark:bg-gray-800">
		<button
		    onClick={()  => setDarkMode(prev => !prev)}
		    className="ml-4 px-3 py-1 absolute top-8 right-8 rounded dark:bg-blue-200 dark:text-white dark:hover:bg-blue-500 bg-gray-400 hover:bg-gray-600"
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
		className="min-h-screen flex flex-col justify-center items-center text-center p-10"
	    >
		<h2 className="text-3xl md:text-6xl font-bold mb-4">Hi, I'm Methodios</h2>
		<p className="text-lg md:text-2xl mb-6">Computer Scientist | Web Developer | Software Engineer</p>
		<div className="flex items-center font-large">
		    <a
			href={'${import.meta.env.BASE_URL}CV.pdf'}
			target="_blank"
			rel="noopener noreferrer"
			className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
		    >
			View Resume
		    </a>
		    <a
			href={'${import.meta.env.BASE_URL}CV.pdf'}
			download="MethodiosZacharioudakis_Resume.pdf"
			className="px-3 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
		    >
			↓
		    </a>
		</div>
	    </motion.section>

	    {/* About Section */}
	    <section id="about" className="max-w-4xl mx-auto p-10 shadow-md bg-blue-200 dark:bg-gray-700">
		<h3 className="text-3xl font-bold mb-4">About Me</h3>
		<p className="text-lg leading-relaxed">
		    I'm a computer scientist with strong skills in backend development, database design,
		    and cybersecurity. I recently finished my degree and I'm eager to contribute to
		    real-world projects.
		</p>
	    </section>

	    {/* Projects Section */}
	    <section id="projects" className="max-w-5xl mx-auto p-10">
		<h3 className="text-3xl font-bold mb-8">Projects</h3>
		<div className="grid md:grid-cols-2 gap-6">
		    {[1, 2, 3].map((project) => (
			<motion.div
			    key={project}
			    whileHover={{ scale: 1.05 }}
			    className="p-6 border rounded-2xl shadow hover:shadow-lg transition"
			>
			    <h4 className="text-xl font-semibold mb-2">Project {project}</h4>
			    <p className="mb-3">Short description of the project, tech stack, and purpose.</p>
			    <div className="flex space-x-3">
				<a href="#" className="text-blue-600 hover:underline">GitHub</a>
				<a href="#" className="text-blue-600 hover:underline">Live Demo</a>
			    </div> 
			</motion.div>
		    ))}
		</div>
	    </section>

	    {/* Contact Section */}
	    <section id="contact" className="max-w-3xl mx-auto p-10 text-center shadow-md bg-blue-300 dark:bg-gray-600">
		<h3 className="text-3xl font-bold mb-4">Contact</h3>
		<p className="mb-6">Feel free to reach out for collaborations or job opportunities.</p>
		<div className="flex justify-center space-x-6 text-lg font-medium">
		    <a href="mailto:methzaxa@gmail.com" className="px-3 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-500 transition">Email</a>
		    <a
			href="https://linkedin.com/in/methodios-zacharioudakis-771941261/"
			target="_blank"
			rel="noopener noreferrer"
			className="px-3 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-500 transition"
		    >
			LinkedIn
		    </a>
		    <a
			href="https://github.com/MethodiosZ"
			target="_blank"
			rel="noopener noreferrer"
			className="px-3 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-500 transition"
		    >
			GitHub
		    </a>
		</div>
	    </section>

	    {/* Footer */}
	    <footer className="p-6 text-center border-t">
		<p>
		    © {new Date().getFullYear()} Methodios Zacharioudakis. All rights reserved.
		</p>

		<div className="flex justify-center space-x-6">
		    {/*Visitor Counter*/}
		    <img
			src="https://komarev.com/ghpvc/?username=MethodiosZ&repo=mywebsite&style=flat-sqaure&color=blue"
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
		    <img
			src="https://img.shields.io/uptimerobot/status/m801470619-6a4aa2fa3a68863bc7f4f7c2?color=blue"
			alt="Uptime"
			className="h-5"
		    />
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
			className="fixed top-6 right-6 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition"
		    >
			↑
		    </motion.button>
		)}
	    </AnimatePresence>
	</div>
    );
}
