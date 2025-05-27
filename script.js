document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality for schedule
  const tabButtons = document.querySelectorAll(".tab-btn");
  const scheduleContents = document.querySelectorAll(".schedule-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      scheduleContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      button.classList.add("active");
      const day = button.getAttribute("data-day");
      document.getElementById(day).classList.add("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('.top-header-nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Remove active class from all nav links immediately for responsiveness
        document.querySelectorAll(".top-header-nav a").forEach((navLink) => {
          navLink.classList.remove("active-section");
        });
        // Add active class to the clicked nav link immediately
        this.classList.add("active-section");

        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for the sticky header
          behavior: "smooth",
        });

        // Optionally, re-run updateActiveNav after scroll to ensure correctness if needed,
        // though the immediate class add should suffice for click.
        // setTimeout(updateActiveNav, 300); // Adjust delay as needed for scroll duration
      }
    });
  });

  // Function to update active section in nav on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".top-header-nav a");

  function updateActiveNav() {
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Adjust for sticky header height (approx 80-100px, depending on your .top-header final height)
      if (pageYOffset >= sectionTop - sectionHeight / 3 - 100) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-section");
      if (link.getAttribute("href") === "#" + currentSectionId) {
        link.classList.add("active-section");
      }
    });
  }

  // Add scroll listener for updating active nav, and call it once to set initial state
  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav(); // Set initial active link

  // Tab functionality for new schedule (if needed, otherwise remove or adapt)
  const newTabButtons = document.querySelectorAll(".schedule-tabs .tab-btn");
  const newScheduleContents = document.querySelectorAll(".schedule-content"); // Ensure these IDs match new HTML

  newTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      newTabButtons.forEach((btn) => btn.classList.remove("active"));
      newScheduleContents.forEach((content) =>
        content.classList.remove("active")
      );

      button.classList.add("active");
      const day = button.getAttribute("data-day");
      const scheduleContentElement = document.getElementById(day);
      if (scheduleContentElement) {
        scheduleContentElement.classList.add("active");
      }
    });
  });

  // Remove or adapt old schedule content generation if not used
  // const day2Content = document.getElementById('day2'); // Old ID
  // if (day2Content) day2Content.innerHTML = \`...\`; // Old content
  // const day3Content = document.getElementById('day3'); // Old ID
  // if (day3Content) day3Content.innerHTML = \`...\`; // Old content
});
