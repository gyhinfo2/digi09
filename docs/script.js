// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    let progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'progress-bar fixed top-0 left-0 z-50';
        document.body.prepend(progressBar);
    }
    progressBar.style.width = scrolled + '%';
});

// Accordion Functionality (for module pages)
function initAccordions() {
    const accordionButtons = document.querySelectorAll('.accordion-btn');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('.accordion-icon');
            
            // Toggle current accordion
            content.classList.toggle('active');
            
            // Rotate icon
            if (content.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Initialize accordions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
});

// Interactive Quiz System (for module pages)
function initQuizzes() {
    const quizContainers = document.querySelectorAll('.quiz-container');
    
    quizContainers.forEach(container => {
        const submitBtn = container.querySelector('.quiz-submit');
        const resultDiv = container.querySelector('.quiz-result');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const questions = container.querySelectorAll('.quiz-question');
                let score = 0;
                let total = questions.length;
                
                questions.forEach(question => {
                    const selected = question.querySelector('input[type="radio"]:checked');
                    if (selected && selected.dataset.correct === 'true') {
                        score++;
                        question.classList.add('correct');
                    } else if (selected) {
                        question.classList.add('incorrect');
                    }
                });
                
                const percentage = (score / total) * 100;
                let message = '';
                let color = '';
                
                if (percentage >= 80) {
                    message = 'Kiváló! 🎉';
                    color = 'text-green-600';
                } else if (percentage >= 60) {
                    message = 'Jó munka! 👍';
                    color = 'text-blue-600';
                } else {
                    message = 'Gyakorolj még! 💪';
                    color = 'text-orange-600';
                }
                
                resultDiv.innerHTML = `
                    <div class="p-4 rounded-lg bg-gray-100 mt-4">
                        <p class="text-xl font-bold ${color}">${message}</p>
                        <p class="text-gray-700">Eredmény: ${score}/${total} (${percentage.toFixed(0)}%)</p>
                    </div>
                `;
                resultDiv.classList.remove('hidden');
            });
        }
    });
}

// Initialize quizzes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initQuizzes();
});

// Interactive Code Editor (simple version)
function initCodeEditors() {
    const codeEditors = document.querySelectorAll('.code-editor');
    
    codeEditors.forEach(editor => {
        const textarea = editor.querySelector('textarea');
        const runBtn = editor.querySelector('.run-code');
        const output = editor.querySelector('.code-output');
        
        if (runBtn && textarea && output) {
            runBtn.addEventListener('click', () => {
                const code = textarea.value;
                output.innerHTML = '<div class="text-gray-600">Kód futtatva! (Csak demonstrációs célokra)</div>';
                output.classList.remove('hidden');
            });
        }
    });
}

// Initialize code editors when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCodeEditors();
});

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'fixed bottom-8 right-8 bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition opacity-0 pointer-events-none z-40';
backToTopBtn.setAttribute('aria-label', 'Vissza a tetejére');
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Resource Filter (for resources page)
function initResourceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards
            resourceCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize resource filters when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initResourceFilters();
});

// Progress Tracking (localStorage)
function updateProgress(moduleId, lessonId) {
    const progress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    
    if (!progress[moduleId]) {
        progress[moduleId] = [];
    }
    
    if (!progress[moduleId].includes(lessonId)) {
        progress[moduleId].push(lessonId);
    }
    
    localStorage.setItem('learningProgress', JSON.stringify(progress));
    updateProgressDisplay();
}

function updateProgressDisplay() {
    const progress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    const progressElements = document.querySelectorAll('.module-progress');
    
    progressElements.forEach(element => {
        const moduleId = element.dataset.moduleId;
        const totalLessons = parseInt(element.dataset.totalLessons);
        const completedLessons = progress[moduleId] ? progress[moduleId].length : 0;
        const percentage = (completedLessons / totalLessons) * 100;
        
        element.querySelector('.progress-bar-fill').style.width = percentage + '%';
        element.querySelector('.progress-text').textContent = `${completedLessons}/${totalLessons} lecke befejezve`;
    });
}

// Initialize progress display when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateProgressDisplay();
});

// Mark lesson as complete
function markLessonComplete(moduleId, lessonId) {
    updateProgress(moduleId, lessonId);
    
    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed top-20 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    message.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Lecke befejezve!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }
            
            // Simple search implementation (can be enhanced)
            const modules = document.querySelectorAll('.module-card');
            const results = [];
            
            modules.forEach(module => {
                const title = module.querySelector('h3').textContent.toLowerCase();
                const description = module.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(query) || description.includes(query)) {
                    results.push({
                        title: module.querySelector('h3').textContent,
                        link: module.querySelector('a').href
                    });
                }
            });
            
            if (results.length > 0) {
                searchResults.innerHTML = results.map(result => `
                    <a href="${result.link}" class="block p-3 hover:bg-gray-100 rounded">
                        <i class="fas fa-search mr-2 text-purple-600"></i>${result.title}
                    </a>
                `).join('');
                searchResults.classList.remove('hidden');
            } else {
                searchResults.innerHTML = '<div class="p-3 text-gray-600">Nincs találat</div>';
                searchResults.classList.remove('hidden');
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
});

console.log('Digitális Kultúra Platform - Interaktív funkciók betöltve ✓');