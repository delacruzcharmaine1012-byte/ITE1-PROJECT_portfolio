// Update the copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const navbar = document.querySelector(".navbar");

if (navbar) {
    const themeToggle = document.createElement("button");
    themeToggle.className = "theme-toggle";
    themeToggle.type = "button";
    themeToggle.setAttribute("aria-pressed", "false");
    themeToggle.title = "Switch to dark mode";
    navbar.append(themeToggle);

    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("velario-theme") || "light";
    } catch (error) {
        savedTheme = "light";
    }

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        const isDark = theme === "dark";

        themeToggle.textContent = isDark ? "☀" : "☾";
        themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.title = `Switch to ${isDark ? "light" : "dark"} mode`;

        try {
            localStorage.setItem("velario-theme", theme);
        } catch (error) {
        }
    }

    applyTheme(savedTheme === "dark" ? "dark" : "light");

    themeToggle.addEventListener("click", function () {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
    });
}

const currentDateTime = document.createElement("time");
currentDateTime.className = "current-date-time";
currentDateTime.setAttribute("aria-label", "Current date and time");
document.body.append(currentDateTime);

function updateCurrentDateTime() {
    const now = new Date();

    currentDateTime.dateTime = now.toISOString();
    currentDateTime.textContent = new Intl.DateTimeFormat("en-PH", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }).format(now);
}

updateCurrentDateTime();
window.setInterval(updateCurrentDateTime, 1000);

const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.type = "button";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.title = "Back to top";
backToTop.textContent = "↑";
document.body.append(backToTop);

function updateBackToTopVisibility() {
    backToTop.classList.toggle("is-visible", window.scrollY > 300);
}

window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
updateBackToTopVisibility();

backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const emailForm = document.getElementById("emailForm");

if (emailForm) {
    emailForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const subject = document.getElementById("emailSubject").value.trim();
        const message = document.getElementById("emailMessage").value.trim();
        const query = new URLSearchParams({ subject: subject, body: message });

        window.location.href = `mailto:delacruzcharmaine1012@gmail.com?${query.toString()}`;
    });
}

// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("show");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Close the menu when clicking outside it
    document.addEventListener("click", function (event) {
        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navLinks.classList.remove("show");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}