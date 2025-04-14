document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for schedule
    const tabButtons = document.querySelectorAll('.tab-btn');
    const scheduleContents = document.querySelectorAll('.schedule-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            scheduleContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const day = button.getAttribute('data-day');
            document.getElementById(day).classList.add('active');
        });
    });
    
    // Sticky navigation
    const navbar = document.getElementById('navbar');
    const navbarOffset = navbar.offsetTop;
    
    function handleScroll() {
        if (window.pageYOffset >= navbarOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add some sample content to Day 2 and Day 3 schedule
    const day2Content = document.getElementById('day2');
    day2Content.innerHTML = `
        <div class="schedule-item">
            <div class="time">9:00 AM - 10:30 AM</div>
            <div class="details">
                <h3>Keynote: AI Models for Drug Discovery</h3>
                <p>Dr. Maria Garcia, BioAI Research</p>
            </div>
        </div>
        <div class="schedule-item">
            <div class="time">11:00 AM - 12:30 PM</div>
            <div class="details">
                <h3>Panel: Ethical Considerations in Scientific AI</h3>
                <p>Discussion on responsible AI development for scientific applications</p>
            </div>
        </div>
        <div class="schedule-item">
            <div class="time">2:00 PM - 5:00 PM</div>
            <div class="details">
                <h3>Workshop: Fine-tuning Foundation Models for Scientific Domains</h3>
                <p>Hands-on technical session with practical examples</p>
            </div>
        </div>
    `;
    
    const day3Content = document.getElementById('day3');
    day3Content.innerHTML = `
        <div class="schedule-item">
            <div class="time">9:00 AM - 10:30 AM</div>
            <div class="details">
                <h3>Keynote: The Future of AI-Driven Scientific Discovery</h3>
                <p>Prof. David Johnson, Institute for AI in Physics</p>
            </div>
        </div>
        <div class="schedule-item">
            <div class="time">11:00 AM - 12:30 PM</div>
            <div class="details">
                <h3>Research Showcase: Novel Applications</h3>
                <p>Presentations of cutting-edge research projects</p>
            </div>
        </div>
        <div class="schedule-item">
            <div class="time">2:00 PM - 3:30 PM</div>
            <div class="details">
                <h3>Closing Panel: The Road Ahead</h3>
                <p>Discussion on future directions and opportunities</p>
            </div>
        </div>
        <div class="schedule-item">
            <div class="time">4:00 PM - 5:00 PM</div>
            <div class="details">
                <h3>Closing Ceremony</h3>
                <p>Final remarks and announcement of next year's conference</p>
            </div>
        </div>
    `;
});