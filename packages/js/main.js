/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== PRELOADER ====================*/
let preloader = document.getElementById("loading");
function preLoader() {
  preloader.style.display = "none";
}

/*==================== END EMAIL VIA emailJs ====================*/
const sendEmail = (params) => {
  const serviceID = "service_embce24";
  const templateID = "template_cci0niw";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";

      document.getElementById("email-submit").innerHTML = `
          Send message
          <i class="uil uil-message button__icon"></i>`;

      alert("Your message send susscessfully!");
      return;
    })
    .catch((err) => {
      document.getElementById("email-submit").innerHTML = `
          Send message
          <i class="uil uil-message button__icon"></i>`;
      console.error(err);
    });
};

/*==================== EMAIL VALIDATION API ====================*/
const validateEmail = (email, params) => {
  const apiKey = "cf7383198f5a4c8a8b282a00c50dd08b"; // Replace if needed
  const apiUrl = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data); // Debugging log

      if (data && data.deliverability) {
        if (data.deliverability === "DELIVERABLE") {
          sendEmail(params);
        } else {
          alert(`Invalid email address (${data.deliverability}). Please check your email.`);
        }
      } else {
        alert("Email validation failed. API did not return expected data.");
        console.error("Unexpected API response format:", data);
      }

      document.getElementById("email-submit").innerHTML = `
        Send message
        <i class="uil uil-message button__icon"></i>`;
    })
    .catch((error) => {
      console.error("API Error:", error);
      alert("Email validation service is unavailable. Proceeding with form submission.");
      sendEmail(params);
    });
};

/*==================== FORM SUBMIT ====================*/
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(email);

  if (!isEmailValid) {
    alert("Invalid email format. Please enter a valid email.");
    return;
  }

  const params = { name, email, message };
  document.getElementById("email-submit").innerText = "Sending...";

  validateEmail(email, params);
});


document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".project-img").forEach((project) => {
    const slider = project.querySelector(".image-slider");
    const slides = slider.querySelectorAll("img");
    const prevBtn = project.querySelector(".prev-btn");
    const nextBtn = project.querySelector(".next-btn");
    let index = 0;

    function showSlide(newIndex) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        slide.style.display = "none"; // Hide all images
      });
      slides[newIndex].classList.add("active");
      slides[newIndex].style.display = "block"; // Show active image
    }

    prevBtn.addEventListener("click", () => {
      index = (index === 0) ? slides.length - 1 : index - 1;
      showSlide(index);
    });

    nextBtn.addEventListener("click", () => {
      index = (index === slides.length - 1) ? 0 : index + 1;
      showSlide(index);
    });

    // Initialize first image as active
    showSlide(index);
  });
});
