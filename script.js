// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Typed.js Animation
    const typed = new Typed('.typed-text', {
        strings: ['Full Stack Developer', 'Web Designer', 'Open Source Contributor', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
    
    // Animate skills bars on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach(item => {
            const percent = item.getAttribute('data-percent');
            const progressBar = item.querySelector('.skill-progress');
            
            if (isElementInViewport(item)) {
                progressBar.style.width = percent + '%';
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on page load
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 50 && 
                window.pageYOffset < sectionTop + sectionHeight - headerHeight - 50) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Run once on page load
    
    // Scroll Reveal Animations
    ScrollReveal().reveal('.hero-text, .hero-image', {
        delay: 300,
        distance: '50px',
        origin: 'bottom',
        easing: 'ease-in-out',
        reset: true
    });
    
    ScrollReveal().reveal('.about-text, .about-image', {
        delay: 300,
        distance: '50px',
        origin: 'bottom',
        interval: 200,
        easing: 'ease-in-out',
        reset: true
    });
    
    ScrollReveal().reveal('.skills-category', {
        delay: 300,
        distance: '50px',
        origin: 'bottom',
        interval: 200,
        easing: 'ease-in-out',
        reset: true
    });
    
    ScrollReveal().reveal('.project-card', {
        delay: 300,
        distance: '50px',
        origin: 'bottom',
        interval: 200,
        easing: 'ease-in-out',
        reset: true
    });
  // Load projects from JSON
fetch('project.json')
.then(response => response.json())
.then(projects => {
    const projectContainer = document.getElementById('project-list');
    
    projects.forEach(project => {
        // Determine category based on project description or title
        let category = 'fullstack';
        const title = project.title.toLowerCase();
        const description = project.description.toLowerCase();
        
        if (description.includes('clone') || title.includes('clone')) {
            category = 'frontend';
        } else if (description.includes('blockchain') || description.includes('ether') || 
                  description.includes('crypto')) {
            category = 'blockchain';
        } else if (description.includes('ai') || description.includes('ml') || 
                  description.includes('machine learning')) {
            category = 'ai';
        } else if (description.includes('php') || description.includes('mysql')) {
            category = 'backend';
        }
        
        // Create project card
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        projectElement.setAttribute('data-category', category);
        
        // Generate tags based on technologies used
        const tags = [];
        if (description.includes('react') || title.includes('next.js')) tags.push('React');
        if (description.includes('node')) tags.push('Node.js');
        if (description.includes('php')) tags.push('PHP');
        if (description.includes('blockchain') || description.includes('ether')) tags.push('Blockchain');
        if (description.includes('ai') || description.includes('ml')) tags.push('AI/ML');
        if (description.includes('socket')) tags.push('Socket.io');
        if (description.includes('mysql')) tags.push('MySQL');
        
        // Default image if not specified
        const imagePath = project.image ? `resources/site/${project.image}` : 'resources/site/web.jpg';
        
        projectElement.innerHTML = `
            <div class="project-image">
                <img src="${imagePath}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    ${!tags.length ? '<span class="project-tag">Web</span>' : ''}
                </div>
                <div class="project-links">
                   ${project.url ? `
    <a href="${project.url}" target="_blank" class="project-link">
        <i class="fas fa-external-link-alt"></i>
        <span>Live Demo</span>
    </a>
` : ''}

${project.github ? `
    <a href="${project.github}" target="_blank" class="project-link">
        <i class="fab fa-github"></i>
        <span>Code</span>
    </a>
` : `
    <a href="https://github.com/girdharagrawalbro" target="_blank" class="project-link">
        <i class="fab fa-github"></i>
        <span>Code</span>
    </a>
`}

                </div>
            </div>
        `;
        
        projectContainer.appendChild(projectElement);
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Add blockchain filter button if there are blockchain projects
    const blockchainProjects = document.querySelectorAll('.project-card[data-category="blockchain"]');
    if (blockchainProjects.length > 0) {
        const filtersContainer = document.querySelector('.projects-filter');
        const blockchainBtn = document.createElement('button');
        blockchainBtn.className = 'filter-btn';
        blockchainBtn.setAttribute('data-filter', 'blockchain');
        blockchainBtn.textContent = 'Blockchain';
        filtersContainer.appendChild(blockchainBtn);
        
        // Re-select all filter buttons after adding new one
        const allFilterButtons = document.querySelectorAll('.filter-btn');
        
        allFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                allFilterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const projects = document.querySelectorAll('.project-card');
                
                projects.forEach(project => {
                    if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    } else {
        // Original filter functionality if no blockchain projects
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const projects = document.querySelectorAll('.project-card');
                
                projects.forEach(project => {
                    if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Initialize Masonry layout for projects grid
    imagesLoaded(projectContainer, function() {
        new Masonry(projectContainer, {
            itemSelector: '.project-card',
            columnWidth: '.project-card',
            percentPosition: true,
            transitionDuration: '0.4s'
        });
    });
})
.catch(error => console.error('Error loading projects:', error));

// Load GitHub repositories
const username = 'girdharagrawalbro';
const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`;

fetch(reposUrl)
.then(response => {
    if (!response.ok) {
        throw new Error('GitHub API limit exceeded or user not found');
    }
    return response.json();
})
.then(repos => {
    const reposContainer = document.getElementById('repo-list');
    
    // Filter out forked repositories
    const ownedRepos = repos.filter(repo => !repo.fork);
    
    if (ownedRepos.length === 0) {
        reposContainer.innerHTML = `
            <div class="no-repos">
                <i class="fas fa-code-branch"></i>
                <p>No public repositories found</p>
                <a href="https://github.com/${username}" target="_blank" class="btn btn-secondary">
                    View GitHub Profile
                </a>
            </div>
        `;
        return;
    }
    
    ownedRepos.slice(0, 6).forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.className = 'repo-card';
        
        // Determine primary language with fallback
        const language = repo.language || 'Multiple';
        const languageColor = getLanguageColor(repo.language);
        
        repoElement.innerHTML = `
            <h3 class="repo-name">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </h3>
            <p class="repo-description">${repo.description || 'No description provided'}</p>
            <div class="repo-meta">
                <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                <span>
                    <i class="fas fa-circle" style="color: ${languageColor}"></i> 
                    ${language}
                </span>
                ${repo.homepage ? `
                <a href="${repo.homepage}" target="_blank" class="repo-demo-link">
                    <i class="fas fa-external-link-alt"></i> Demo
                </a>
                ` : ''}
            </div>
        `;
        
        reposContainer.appendChild(repoElement);
    });
})
.catch(error => {
    console.error('Error fetching GitHub repos:', error);
    const reposContainer = document.getElementById('repo-list');
    reposContainer.innerHTML = `
        <div class="api-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Couldn't load GitHub repositories</p>
            <a href="https://github.com/${username}" target="_blank" class="btn btn-secondary">
                View GitHub Profile
            </a>
        </div>
    `;
});

// Helper function to get color for programming languages
function getLanguageColor(language) {
if (!language) return '#ccc';

const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'React': '#61dafb',
    'Vue': '#41b883',
    'Shell': '#89e051',
    'Dockerfile': '#384d54',
    'Swift': '#ffac45',
    'Kotlin': '#A97BFF',
    'Go': '#00ADD8',
    'Rust': '#dea584'
};

return colors[language] || '#6c63ff';
}

// Initialize tooltips for tech icons
tippy('[data-tooltip]', {
content(reference) {
    return reference.getAttribute('data-tooltip');
},
placement: 'top',
animation: 'shift-away',
theme: 'light'
});
    // Load GitHub repositories
 
    fetch(reposUrl)
        .then(response => response.json())
        .then(repos => {
            const reposContainer = document.getElementById('repo-list');
            
            repos.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.className = 'repo-card';
                
                repoElement.innerHTML = `
                    <h3 class="repo-name">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </h3>
                    <p class="repo-description">${repo.description || 'No description provided'}</p>
                    <div class="repo-meta">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <span><i class="fas fa-circle" style="color: ${repo.language ? '#6c63ff' : '#ccc'}"></i> ${repo.language || 'Text'}</span>
                    </div>
                `;
                
                reposContainer.appendChild(repoElement);
            });
        })
        .catch(error => console.error('Error fetching GitHub repos:', error));
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
});
