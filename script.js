document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle functionality
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const topHeaderNav = document.querySelector(".top-header-nav");

  if (mobileMenuToggle && topHeaderNav) {
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenuToggle.classList.toggle("active");
      topHeaderNav.classList.toggle("active");
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".top-header-nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenuToggle.classList.remove("active");
        topHeaderNav.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !mobileMenuToggle.contains(e.target) &&
        !topHeaderNav.contains(e.target)
      ) {
        mobileMenuToggle.classList.remove("active");
        topHeaderNav.classList.remove("active");
      }
    });
  }

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
  document
    .querySelectorAll('.top-header-nav a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Remove active class from all nav links immediately for responsiveness
          document.querySelectorAll(".top-header-nav a").forEach((navLink) => {
            navLink.classList.remove("active"); // Changed from active-section
          });
          // Add active class to the clicked nav link immediately
          this.classList.add("active"); // Changed from active-section

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
      link.classList.remove("active"); // Changed from active-section
      if (link.getAttribute("href") === "#" + currentSectionId) {
        link.classList.add("active"); // Changed from active-section
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

  // =====================================
  // FLOATING NAVIGATION FUNCTIONALITY
  // =====================================

  const floatingNav = document.querySelector(".floating-nav");
  const floatingNavToggle = document.querySelector(".floating-nav-toggle");
  const floatingNavPanels = document.querySelectorAll(".floating-nav-section");
  const floatingNavLinks = document.querySelectorAll(".floating-nav-section a");

  // Define sections that should show the floating navigation
  const sectionsWithFloatingNav = ["about", "logistics", "organizers"];

  // Mapping of sections to their corresponding navigation panels
  const sectionPanelMap = {
    about: "about-nav",
    logistics: "logistics-nav",
    organizers: "organizers-nav",
  };

  // Get all subsection elements for active link tracking
  const subsections = document.querySelectorAll(
    '[id^="about-"], [id^="logistics-"], [id^="organizers-"]'
  );

  // Toggle floating navigation menu
  if (floatingNavToggle) {
    floatingNavToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      floatingNav.classList.toggle("expanded");
    });
  }

  // Close floating nav when clicking outside
  document.addEventListener("click", function (e) {
    if (floatingNav && !floatingNav.contains(e.target)) {
      floatingNav.classList.remove("expanded");
    }
  });

  // Enhanced smooth scrolling for floating nav links with dynamic link detection
  function attachFloatingNavListeners() {
    // Always select currently visible links
    const floatingNavLinks = document.querySelectorAll(
      ".floating-nav-section.active a"
    );
    floatingNavLinks.forEach((link) => {
      link.onclick = function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        // Only handle valid hash links
        if (targetId && targetId.startsWith("#")) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Calculate offset: sticky header + extra buffer
            const stickyHeaderHeight = 100; // Height of .top-header
            const additionalBuffer = 15; // Small buffer to ensure heading is fully visible

            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition =
              window.pageYOffset +
              elementPosition -
              stickyHeaderHeight -
              additionalBuffer;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
            floatingNav.classList.remove("expanded");
          }
        }
      };
    });
  }

  // Call this whenever the floating nav panel changes
  function updateFloatingNavVisibility() {
    const currentSection = getCurrentSection();
    if (currentSection && sectionsWithFloatingNav.includes(currentSection)) {
      if (!floatingNav.classList.contains("show")) {
        floatingNav.classList.remove("hide", "fade-out");
        floatingNav.classList.add("show", "fade-in");
      }
      floatingNavPanels.forEach((panel) => {
        panel.classList.remove("active");
        panel.style.display = "none";
      });
      const activePanelId = sectionPanelMap[currentSection];
      const activePanel = document.getElementById(activePanelId);
      if (activePanel) {
        activePanel.classList.add("active");
        activePanel.style.display = "block";
        attachFloatingNavListeners(); // Attach listeners to visible links only
      }
    } else {
      if (floatingNav.classList.contains("show")) {
        floatingNav.classList.remove("show", "fade-in", "expanded");
        floatingNav.classList.add("hide", "fade-out");
      }
    }
  }

  // Function to determine current section
  function getCurrentSection() {
    let currentSection = null;
    const scrollPosition = window.pageYOffset + 150; // Account for header offset

    sectionsWithFloatingNav.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = sectionId;
        }
      }
    });

    return currentSection;
  }

  // Function to determine current subsection
  function getCurrentSubsection() {
    let currentSubsection = null;
    const scrollPosition = window.pageYOffset + 150; // Account for header offset

    subsections.forEach((subsection) => {
      const subsectionTop = subsection.offsetTop;
      const subsectionBottom = subsectionTop + subsection.offsetHeight;

      if (
        scrollPosition >= subsectionTop &&
        scrollPosition < subsectionBottom
      ) {
        currentSubsection = subsection.id;
      }
    });

    return currentSubsection;
  }

  // Function to show/hide floating navigation based on current section
  function updateFloatingNavVisibility() {
    const currentSection = getCurrentSection();

    if (currentSection && sectionsWithFloatingNav.includes(currentSection)) {
      // Show floating navigation
      if (!floatingNav.classList.contains("show")) {
        floatingNav.classList.remove("hide", "fade-out");
        floatingNav.classList.add("show", "fade-in");
      }

      // Show the appropriate panel
      floatingNavPanels.forEach((panel) => {
        panel.classList.remove("active");
        panel.style.display = "none";
      });

      const activePanelId = sectionPanelMap[currentSection];
      const activePanel = document.getElementById(activePanelId);
      if (activePanel) {
        activePanel.classList.add("active");
        activePanel.style.display = "block";
        attachFloatingNavListeners(); // Ensure listeners are attached to newly visible links
      }
    } else {
      // Hide floating navigation
      if (floatingNav.classList.contains("show")) {
        floatingNav.classList.remove("show", "fade-in", "expanded");
        floatingNav.classList.add("hide", "fade-out");
      }
    }
  }

  // Function to update active subsection link
  function updateActiveSubsectionLink() {
    const currentSubsection = getCurrentSubsection();

    // Remove active class from all floating nav links
    floatingNavLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to current subsection link
    if (currentSubsection) {
      const activeLink = document.querySelector(
        `.floating-nav-section a[href="#${currentSubsection}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }

  // Combined scroll handler for floating navigation
  function handleFloatingNavScroll() {
    updateFloatingNavVisibility();
    updateActiveSubsectionLink();
  }

  // Throttle scroll events for better performance
  let scrollTimeout;
  function throttledScrollHandler() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        handleFloatingNavScroll();
        scrollTimeout = null;
      }, 16); // ~60fps
    }
  }

  // Add scroll listener for floating navigation
  window.addEventListener("scroll", throttledScrollHandler);

  // Initial call to set up floating navigation state
  updateFloatingNavVisibility();

  // Handle window resize to ensure proper positioning
  window.addEventListener("resize", () => {
    // Close expanded nav on resize to avoid positioning issues
    if (floatingNav) {
      floatingNav.classList.remove("expanded");
    }
  });
});
