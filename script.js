/**
 * Ebenezer Opoku Boateng - Personal Portfolio Script
 * Modern Vanilla JavaScript for Interactivity, Theme Management & Shell Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initActiveNavOnScroll();
    initSkillFilters();
    initProjectFilters();
    initProjectModals();
    initCVModal();
    initTerminalShell();
    initContactAndToast();
    initScrollTop();
});

/* ===================================================================
   1. THEME SWITCHER (DARK / LIGHT WITH LOCALSTORAGE)
   =================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved preference or fallback to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);

            showToast(`Switched to ${newTheme.toUpperCase()} theme`);
        });
    }
}

/* ===================================================================
   2. MOBILE NAVIGATION MENU
   =================================================================== */
function initMobileNav() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('show-menu');
        });
    });
}

/* ===================================================================
   3. SCROLL NAVIGATION & ACTIVE LINK HIGHLIGHTING
   =================================================================== */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Sticky header styling
        if (header) {
            if (scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = 'none';
            }
        }

        // Active link highlighting
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    });
}

/* ===================================================================
   4. SKILLS FILTERING
   =================================================================== */
function initSkillFilters() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.getAttribute('data-target');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (target === 'all' || category === target) {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; }, 20);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.display = 'none'; }, 200);
                }
            });
        });
    });
}

/* ===================================================================
   5. PROJECT FILTERING
   =================================================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 30);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 200);
                }
            });
        });
    });
}

/* ===================================================================
   6. PROJECT DETAILS MODAL
   =================================================================== */
const projectsData = {
    inventory: {
        title: "Inventory Management System",
        category: "Full-Stack Web Database Solution",
        tags: ["PHP", "MySQL", "Apache/XAMPP", "JavaScript", "HTML/CSS"],
        overview: "A comprehensive web-based inventory and supply tracking system. Built with PHP and MySQL running on XAMPP, this application enables businesses to record purchases, track real-time stock levels, maintain transaction audits, and issue automated low-stock warnings.",
        features: [
            "Complete CRUD functionality for product catalogs, stock items, and suppliers.",
            "Dynamic stock-level calculations with threshold alerts for items requiring replenishment.",
            "Historical sales logs with timestamped transaction entries.",
            "Structured relational database schema ensuring relational integrity."
        ],
        role: "Lead Full-Stack Developer",
        learningOutcome: "Deepened practical expertise with database schema normalization, SQL foreign key constraints, backend input sanitization, and server-rendered dynamic web architecture."
    },
    taskflow: {
        title: "Taskflow - Productivity Engine",
        category: "Productivity & Workflow Management Tool",
        tags: ["JavaScript (ES6+)", "Modern CSS", "HTML5", "LocalStorage"],
        overview: "An intuitive web-based productivity application engineered for developers to streamline daily milestones, manage project sprints, and track task completions without external friction.",
        features: [
            "Interactive kanban/list workflows with instant state transitions.",
            "Persistent browser state utilizing HTML5 Web Storage API (localStorage).",
            "Priority classification and custom category labeling for coding sprints.",
            "Clean dark/light visual design adhering to accessibility standards."
        ],
        role: "Frontend Engineer & UI Architect",
        learningOutcome: "Mastered advanced DOM event handling, custom state persistence patterns, and modular CSS design architectures."
    },
    banking: {
        title: "Bank Account OOP Architecture",
        category: "Object-Oriented Software Engineering (Java)",
        tags: ["Java", "OOP", "Interfaces", "Encapsulation", "Inheritance"],
        overview: "A robust Java-based banking engine designed to model secure financial transactions, balance checks, overdraft protections, and comprehensive account audits using standard Object-Oriented principles.",
        features: [
            "Strict data encapsulation with private state variables and getter/setter validation.",
            "Safe deposit and withdrawal mechanics with negative balance guard rails.",
            "Modular interface and inheritance hierarchy for extensible account types (Savings, Checking).",
            "Custom toString() audit serializers for transparent transaction logging."
        ],
        role: "Java Systems Developer",
        learningOutcome: "Strengthened core understanding of abstraction, polymorphism, boundary condition handling, and industrial software engineering paradigms."
    },
    tkinter: {
        title: "Tkinter GUI & Backend API Bridge",
        category: "Desktop GUI & REST Integration (Python)",
        tags: ["Python", "Tkinter", "REST APIs", "Error Handling", "Git"],
        overview: "Developed during the internship at DND Next Gen Technology. A native desktop client built in Python utilizing Tkinter that connects to backend RESTful API endpoints for secure data exchange and transaction workflows.",
        features: [
            "Interactive desktop graphical interface featuring event-driven widgets and reactive layouts.",
            "Secure API endpoint integration with serialized request/response handling.",
            "Comprehensive try-catch error diagnostics with clear human-readable alerts.",
            "Standardized Git workflow across multi-monitor developer environments."
        ],
        role: "Backend & GUI Developer at DND Next Gen Technology",
        learningOutcome: "Gained industrial experience with asynchronous UI responsiveness, robust exception architectures, API integration, and collaborative version control."
    },
    frontendcv: {
        title: "Professional CV & Digital Profile",
        category: "Accessible Web Resume & Portfolio",
        tags: ["HTML5", "CSS3 Flexbox", "Web Accessibility", "TTU ICT Project"],
        overview: "A clean, modern digital curriculum vitae engineered to present professional credentials, technical competencies, and contact details with semantic HTML and responsive CSS.",
        features: [
            "100% semantic HTML5 markup with Open Graph metadata for rich social sharing.",
            "Custom sticky navigation with fluid smooth scrolling across all screen sizes.",
            "Accessible color contrasts adhering to modern web design standards.",
            "Created under the direct mentorship of senior ICT professionals at TTU."
        ],
        role: "Frontend Web Developer (Intern)",
        learningOutcome: "Reinforced semantic page structure, responsive flexbox layout techniques, and clean modular stylesheet authoring."
    },
    algorithms: {
        title: "Algorithmic Foundations & I/O Suite",
        category: "Algorithms & Logic Evaluation",
        tags: ["Java", "Scanner I/O", "IntelliJ IDEA", "Computational Logic"],
        overview: "A collection of algorithmic challenges and input-processing pipelines authored in Java, showcasing algorithmic efficiency, conditional branching, and console I/O handling.",
        features: [
            "Optimized mathematical modulo evaluation pipelines (e.g. FizzBuzz benchmark).",
            "Interactive Scanner input readers with strict type safety and prompt loops.",
            "Structured loop iterators and performance benchmark measurements.",
            "Developed and debugged within JetBrains IntelliJ IDEA."
        ],
        role: "Software Developer",
        learningOutcome: "Sharpened core computational thinking, debugging techniques, and fundamental software logic."
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    if (!modal || !modalBody) return;

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const data = projectsData[projectId];

            if (data) {
                modalBody.innerHTML = `
                    <div class="modal-project-tags">
                        ${data.tags.map(t => `<span class="badge-available">${t}</span>`).join('')}
                    </div>
                    <h3 class="modal-project-title">${data.title}</h3>
                    <div class="modal-section">
                        <h4>Project Overview</h4>
                        <p>${data.overview}</p>
                    </div>
                    <div class="modal-section">
                        <h4>Key Engineering Features</h4>
                        <ul>
                            ${data.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-section">
                        <h4>My Role & Learning Outcome</h4>
                        <p><strong>${data.role}:</strong> ${data.learningOutcome}</p>
                    </div>
                    <div class="modal-actions">
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--small">
                            <i class="fa-brands fa-github"></i>
                            <span>View Source Code</span>
                        </a>
                        <button class="btn btn--secondary btn--small" id="close-modal-inline">Close</button>
                    </div>
                `;

                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';

                const inlineClose = document.getElementById('close-modal-inline');
                if (inlineClose) {
                    inlineClose.addEventListener('click', closeModal);
                }
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ===================================================================
   7. CV MODAL
   =================================================================== */
function initCVModal() {
    const cvModal = document.getElementById('cv-modal');
    const cvOverlay = document.getElementById('cv-modal-overlay');
    const cvClose = document.getElementById('cv-modal-close');
    const viewCvBtn = document.getElementById('view-cv-btn');

    if (!cvModal || !viewCvBtn) return;

    function openCV() {
        cvModal.classList.add('active');
        cvModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCV() {
        cvModal.classList.remove('active');
        cvModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    viewCvBtn.addEventListener('click', openCV);
    if (cvClose) cvClose.addEventListener('click', closeCV);
    if (cvOverlay) cvOverlay.addEventListener('click', closeCV);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.classList.contains('active')) {
            closeCV();
        }
    });
}

/* ===================================================================
   8. INTERACTIVE TERMINAL SHELL
   =================================================================== */
function initTerminalShell() {
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const helpBtn = document.getElementById('terminal-help-btn');
    const pills = document.querySelectorAll('.cmd-pill');

    if (!form || !input || !output) return;

    const commands = {
        help: () => `
            Available Commands:<br>
            - <span class="code-highlight">about</span> : Brief professional biography<br>
            - <span class="code-highlight">skills</span> : Summary of tech stack and proficiencies<br>
            - <span class="code-highlight">projects</span> : List of featured software systems<br>
            - <span class="code-highlight">experience</span> : Professional internships and roles<br>
            - <span class="code-highlight">education</span> : University credentials<br>
            - <span class="code-highlight">contact</span> : Email, phone, location & socials<br>
            - <span class="code-highlight">whoami</span> : Current session user<br>
            - <span class="code-highlight">clear</span> : Clear console screen
        `,
        about: () => `
            <strong>Ebenezer Opoku Boateng</strong><br>
            Software Developer based in Takoradi, Ghana.<br>
            Currently pursuing BTech Information Technology (Software Engineering) at Takoradi Technical University.<br>
            Interning at the Directorate of ICT Services, TTU.
        `,
        skills: () => `
            <strong>Core Technical Stack:</strong><br>
            • Frontend: HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+)<br>
            • Backend: Python (Tkinter/APIs), Java (OOP/Interfaces), PHP (XAMPP), SQL (MySQL)<br>
            • Tools: Git, GitHub, VS Code, IntelliJ, PyCharm, Bash<br>
            • Core: System Accountability, Fraud Prevention, Client Communication
        `,
        projects: () => `
            <strong>Featured Projects:</strong><br>
            1. <strong>Inventory Management System</strong> [PHP, MySQL, XAMPP]<br>
            2. <strong>Taskflow</strong> [HTML5, CSS3, JS, LocalStorage]<br>
            3. <strong>Bank Account OOP System</strong> [Java, OOP Interfaces]<br>
            4. <strong>Tkinter GUI & Backend API Bridge</strong> [Python, Tkinter, REST]<br>
            5. <strong>Professional CV Portfolio</strong> [Semantic HTML5, CSS3]
        `,
        experience: () => `
            <strong>Experience Highlights:</strong><br>
            • <strong>2026 - Present:</strong> Software Dev Intern @ TTU Directorate of ICT Services<br>
            • <strong>Aug 2025 - Oct 2025:</strong> Backend Developer @ DND Next Gen Technology<br>
            • <strong>2020 - 2024:</strong> Mobile Money Attendant & Junior Trainer @ Ransbecca & Dansyl
        `,
        education: () => `
            <strong>Academic Credentials:</strong><br>
            • <strong>Takoradi Technical University:</strong> BTECH Information Technology (Software Engineering) [2025 - 2028]<br>
            • <strong>St. Mary's Boys' Senior High School:</strong> Agricultural Science [2016 - 2019]
        `,
        contact: () => `
            <strong>Contact Info:</strong><br>
            • Email: <a href="mailto:ebenezerb619@gmail.com" class="code-highlight">ebenezerb619@gmail.com</a><br>
            • Phone/WhatsApp: <a href="https://wa.me/233593658166" target="_blank" class="code-highlight">+233 59 365 8166</a><br>
            • Location: Takoradi, Western Region, Ghana
        `,
        whoami: () => `guest@ebenezer-portfolio ~ Welcome visitor!`,
        date: () => new Date().toString(),
        clear: () => {
            output.innerHTML = '';
            return null;
        }
    };

    function executeCommand(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        // Print command prompt line
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-msg';
        cmdLine.innerHTML = `<span class="terminal-prompt">ebenezer@portfolio:~$</span> <span>${escapeHTML(rawCmd)}</span>`;
        output.appendChild(cmdLine);

        // Process command
        let response = '';
        if (commands[cmd]) {
            response = commands[cmd]();
        } else if (cmd.startsWith('echo ')) {
            response = escapeHTML(rawCmd.slice(5));
        } else {
            response = `<span style="color:#ef4444;">Command not found: '${escapeHTML(cmd)}'. Type <span class="code-highlight">help</span> for available commands.</span>`;
        }

        if (response !== null) {
            const respLine = document.createElement('div');
            respLine.className = 'terminal-msg';
            respLine.innerHTML = response;
            output.appendChild(respLine);
        }

        output.scrollTop = output.scrollHeight;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = input.value;
        executeCommand(value);
        input.value = '';
    });

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            const cmd = pill.getAttribute('data-cmd');
            executeCommand(cmd);
        });
    });

    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            executeCommand('help');
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
}

/* ===================================================================
   9. CONTACT FORM, WHATSAPP DIRECT & TOAST NOTIFICATION
   =================================================================== */
function initContactAndToast() {
    const contactForm = document.getElementById('contact-form');
    const whatsappDirectBtn = document.getElementById('whatsapp-direct-btn');
    const copyBtns = document.querySelectorAll('.copy-btn');

    // Copy to clipboard buttons
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied "${textToCopy}" to clipboard!`);
                }).catch(() => {
                    showToast(`Could not auto-copy, please copy manually.`);
                });
            }
        });
    });

    // Send via WhatsApp direct
    if (whatsappDirectBtn) {
        whatsappDirectBtn.addEventListener('click', () => {
            const name = document.getElementById('sender-name').value.trim();
            const email = document.getElementById('sender-email').value.trim();
            const subject = document.getElementById('sender-subject').value.trim();
            const message = document.getElementById('sender-message').value.trim();

            let fullMsg = `Hello Ebenezer! My name is ${name || 'a visitor'}.`;
            if (email) fullMsg += ` (Email: ${email})`;
            if (subject) fullMsg += `\nSubject: ${subject}`;
            if (message) fullMsg += `\nMessage: ${message}`;

            const encoded = encodeURIComponent(fullMsg);
            const waUrl = `https://wa.me/233593658166?text=${encoded}`;
            window.open(waUrl, '_blank');
        });
    }

    // Standard Form Submission simulation
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('sender-name').value;
            showToast(`Thank you, ${name}! Your message has been simulated sent.`, 4000);
            contactForm.reset();
        });
    }
}

// Global Toast Function
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/* ===================================================================
   10. SCROLL TO TOP
   =================================================================== */
function initScrollTop() {
    const scrollTop = document.getElementById('scroll-top');

    if (!scrollTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= 350) {
            scrollTop.classList.add('show-scroll');
        } else {
            scrollTop.classList.remove('show-scroll');
        }
    });

    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
