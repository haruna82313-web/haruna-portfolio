const projectsData = [
    {
        title: "UG-JOBSWIPE",
        desc: "A job discovery and application platform tailored for local opportunities in Uganda.",
        stack: ["React", "Node.js", "Supabase"],
        demoLink: "https://ugjobswipe.vercel.app",
        repoLink: "#",
        screenshot: "images/2.jpeg"
    },
    {
        title: "MOVIE MANIA",
        desc: "A movie discovery companion site showcasing showtimes and reviews.",
        stack: ["JavaScript", "Tailwind CSS", "Vercel"],
        demoLink: "https://movie-mania-ug.vercel.app",
        repoLink: "#",
        screenshot: "images/4.png"
    },
    {
        title: "SMART-RETAIL",
        desc: "A lightweight retail POS and inventory interface built for small stores and merchants.",
        stack: ["JavaScript", "Node.js", "PostgreSQL"],
        demoLink: "https://smart-retail-ug.vercel.app",
        repoLink: "#",
        screenshot: "images/3.png"
    }
];

const skillsData = [
    "React",
    "JavaScript",
    "Python",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "Git & GitHub"
];

document.addEventListener("DOMContentLoaded", () => {
    // Initialize everything
    renderProjects();
    renderSkills();
    setCopyrightYear();
    initPreloader();
    initCustomCursor();
    initScrollAnimations();
    initMobileNav();
    initBackToTop();
    initStickyHeader();
});

// Preloader
function initPreloader() {
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
        setTimeout(() => {
            const preloader = document.querySelector(".preloader");
            if (preloader) preloader.style.display = "none";
        }, 600);
    });
}

// Custom Cursor
function initCustomCursor() {
    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");
    
    if (!dot || !outline) return;

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.transform = `translate(${posX}px, ${posY}px)`;
        
        // Outline follows with a slight delay
        outline.animate({
            transform: `translate(${posX - 20}px, ${posY - 20}px)`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects
    const links = document.querySelectorAll("a, button, .project-card, .skill-card");
    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            outline.style.width = "60px";
            outline.style.height = "60px";
            outline.style.borderColor = "rgba(139, 92, 246, 0.5)";
            outline.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
        });
        link.addEventListener("mouseleave", () => {
            outline.style.width = "40px";
            outline.style.height = "40px";
            outline.style.borderColor = "var(--accent)";
            outline.style.backgroundColor = "transparent";
        });
    });
}

// Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const reveals = document.querySelectorAll(".reveal, .project-card, .skill-card, .stat-card, .about-list li");
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}

// Mobile Nav
function initMobileNav() {
    const toggle = document.querySelector(".mobile-nav-toggle");
    const nav = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        nav.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            toggle.classList.remove("active");
            nav.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    });
}

// Back to Top
function initBackToTop() {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            btn.classList.add("visible");
        } else {
            btn.classList.remove("visible");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Sticky Header
function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

function renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    container.innerHTML = projectsData.map((project, index) => `
        <article class="project-card reveal" style="transition-delay: ${index * 0.1}s">
            <div class="project-image-wrap">
                <img src="${project.screenshot}" alt="${project.title} screenshot" class="project-screenshot">
            </div>
            <div class="project-content">
                <div class="project-tags">
                    ${project.stack.map(skill => `<span class="project-tag">${skill}</span>`).join("")}
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.desc}</p>
                <div class="project-links" style="display: flex; gap: 1.5rem">
                    <a href="${project.demoLink}" target="_blank" rel="noreferrer" class="project-link-demo">
                        Live Demo 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                    ${project.repoLink && project.repoLink !== "#" ? `
                    <a href="${project.repoLink}" target="_blank" rel="noreferrer" class="project-link-source">Source</a>
                    ` : ""}
                </div>
            </div>
        </article>
    `).join("");
}

function renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container) return;

    container.innerHTML = skillsData.map((skill, index) => `
        <div class="skill-card reveal" style="transition-delay: ${index * 0.05}s">
            <span>${skill}</span>
        </div>
    `).join("");
}

function setCopyrightYear() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

