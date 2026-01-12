import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons/faDesktop';
import { faBolt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const App = () => {
  const [isDark, setIsDark] = useState(false);

  // --- Theme Logic ---
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);
    if (newDarkState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // --- Improved Smooth Scroll ---
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 2500; // Duration in milliseconds
    let start = null;

    // Easing function: Quintic Out (very smooth deceleration)
    const easeOutQuint = (t) => 1 + --t * t * t * t * t;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      window.scrollTo(0, startPosition + distance * easeOutQuint(percentage));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  // --- Data & Content ---
  const skillCategories = [
    {
      title: "Primary Stack",
      skills: [
        { name: "Laravel", role: "PHP Framework", logo: "https://cdn.brandfetch.io/ide68-31CH/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1751260985434" },
        { name: "React JS", role: "Web Frontend", logo: "https://cdn.brandfetch.io/idREYlLkpD/theme/dark/id-H4pLvmU.svg?c=1bxid64Mup7aczewSAYMX&t=1746616569173" },
        { name: "React Native", role: "Mobile Apps", logo: "https://cdn.brandfetch.io/idREYlLkpD/theme/dark/id-H4pLvmU.svg?c=1bxid64Mup7aczewSAYMX&t=1746616569173" },
        { name: "Tailwind CSS", role: "Modern Styling", logo: "https://cdn.brandfetch.io/idMNEQh7-0/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1687779047045" }
      ]
    },
    {
      title: "Languages & Frameworks",
      items: ["PHP", "jQuery", "JavaScript", "AlpineJS", "Redux"]
    },
    {
      title: "Frontend & UI",
      items: ["HTML5", "CSS3", "Bootstrap CSS", "Material UI"]
    },
    {
      title: "Databases",
      items: ["MySQL", "MSSQL"]
    },
    {
      title: "Tools & Productivity",
      items: ["Git", "GitHub", "Bitbucket", "Figma", "Adobe XD", "Adobe Photoshop"]
    }
  ];

  const processSteps = [
    { num: "1", title: "Discovery", desc: "I work with you to understand your needs, target audience, and business goals to scope your project." },
    { num: "2", title: "Strategy", desc: "I create a Technical Roadmap with the right architecture (Laravel/React) for speed and scalability." },
    { num: "3", title: "Development", desc: "I develop using clean code and provide a private link so you can monitor progress in real-time." },
    { num: "4", title: "Deployment", desc: "I manage server configuration and launch, ensuring everything is secure and optimized for performance." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:20px_20px]">

      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <div className="flex justify-between items-center py-4 px-6 max-w-4xl mx-auto">
          <div className="text-xl font-bold tracking-tight">Allan Steven</div>
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-300"
          >
            {isDark ? <FontAwesomeIcon icon={faSun} size="xl" widthAuto /> : <FontAwesomeIcon icon={faMoon} size="xl" widthAuto />}
          </button>
        </div>
      </nav>

      <main className="pt-24 px-6 max-w-4xl mx-auto space-y-24 sm:space-y-32 pb-24">

        {/* --- Hero Section --- */}
        <section className="flex flex-col justify-center min-h-[60vh] text-center sm:text-left animate-fade-in">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">Allan</span>.
            <br />
            I build Web & Mobile Apps.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
            I create clean, functional software tailored to your needs. My goal is to address real problems without any unnecessary details.
          </p>
          <div>
            <a
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              className="cursor-pointer inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              Let’s work together
            </a>
          </div>
        </section>

        {/* --- Services Section --- */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
            What I Can Do
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 border border-gray-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 group transition-all">
              <FontAwesomeIcon icon={faDesktop} size="xl" widthAuto className="w-7 h-7 text-blue-600 dark:text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Web Development</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Custom web applications and dashboards built for speed and security.</p>
            </div>
            <div className="p-8 border border-gray-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 group transition-all">
              <FontAwesomeIcon icon={faMobileAlt} size="xl" widthAuto className="w-7 h-7 text-blue-600 dark:text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Mobile Development</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Cross-platform iOS and Android apps using React Native.</p>
            </div>
            <div className="p-8 border border-gray-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 group transition-all">
              <FontAwesomeIcon icon={faBolt} size="xl" widthAuto className="w-7 h-7 text-blue-600 dark:text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Support & Maintenance</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">I take over, update, and fix apps left behind by previous developers.</p>
            </div>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {skillCategories[0].skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm transition-all hover:border-blue-500/50">
                <div className="flex-shrink-0 bg-gray-100 dark:bg-slate-700 p-2.5 rounded-lg w-12 h-12 flex items-center justify-center">
                  <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-none mb-1">{skill.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">{skill.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {skillCategories.slice(1).map((category, idx) => (
              <div key={idx} className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700/50">
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="px-3 py-1 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-sm rounded-md border border-gray-200 dark:border-slate-600 shadow-sm transition-colors hover:bg-blue-50 dark:hover:bg-slate-600 cursor-pointer">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Process Section --- */}
        <section className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-12 flex items-center gap-2">
            <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
            How We’ll Work Together
          </h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 w-full border-t-2 border-dotted border-gray-300 dark:border-slate-700 z-0"></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {processSteps.map((step) => (
                <div key={step.num} className="group relative">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="scroll-mt-24">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-16 text-center border border-gray-100 dark:border-slate-700 shadow-xl relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative z-10 text-gray-900 dark:text-white">Ready to start?</h2>
            <p className="mb-10 text-gray-600 dark:text-gray-300 max-w-md mx-auto relative z-10 text-lg">
              Feel free to reach out—<span className="font-medium text-blue-600 dark:text-blue-400">resume available upon request.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <a href="mailto:reyesallansteven@gmail.com" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                <FontAwesomeIcon icon={faEnvelope} size="xl" widthAuto /> Email Me
              </a>
              <a href="https://www.linkedin.com/in/allanstevenreyes/" target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all hover:scale-105">
                <FontAwesomeIcon icon={faLinkedin} size="xl" widthAuto /> LinkedIn
              </a>
            </div>
          </div>

          <footer className="mt-16 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Allan Steven. All rights reserved.
          </footer>
        </section>

      </main>
    </div>
  );
};

export default App;