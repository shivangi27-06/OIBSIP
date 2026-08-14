/* =========================================================
   NEXVERSE 2026
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================
   1. PAGE LOADER
   ========================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("loaded");
        }, 2000);
    }

});



/* =========================
   2. MOBILE NAVIGATION
   ========================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            menuBtn.setAttribute(
                "aria-label",
                "Close navigation"
            );

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuBtn.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    });


    /* Close menu after clicking a link */

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("show");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });

}



/* =========================
   3. HEADER ON SCROLL
   ========================= */

const header = document.querySelector("header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();



/* =========================
   4. ACTIVE NAVIGATION
   ========================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks =
    document.querySelectorAll(".nav-links a");

function updateActiveNav() {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

updateActiveNav();



/* =========================
   5. COUNTDOWN
   ========================= */

/*
   NexVerse event:
   July 18-20, 2027

   Change this date anytime
   if your internship project
   requires a different event date.
*/

const eventDate =
    new Date("Sep 18, 2026 10:00:00").getTime();


const daysElement =
    document.getElementById("countdown-days");

const hoursElement =
    document.getElementById("countdown-hours");

const minutesElement =
    document.getElementById("countdown-minutes");

const secondsElement =
    document.getElementById("countdown-seconds");


function updateCountdown() {

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    const now =
        new Date().getTime();

    const difference =
        eventDate - now;


    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference /
                1000) % 60
        );


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);



/* =========================
   6. FAQ ACCORDION
   ========================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");


    question.addEventListener(
        "click",
        () => {

            const isActive =
                item.classList.contains("active");


            /* Close all FAQ items */

            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

                const otherButton =
                    otherItem.querySelector(
                        ".faq-question"
                    );

                if (otherButton) {

                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });


            /* Open selected item */

            if (!isActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );

});



/* =========================
   7. TICKET SELECTION
   ========================= */

const ticketButtons =
    document.querySelectorAll(".ticket-select");

const passSelect =
    document.getElementById("reg-pass");


ticketButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const selectedPass =
                button.dataset.pass;


            if (passSelect && selectedPass) {

                passSelect.value =
                    selectedPass;

            }

        }
    );

});



/* =========================
   8. REGISTRATION FORM
   ========================= */

const registrationForm =
    document.getElementById(
        "registration-form"
    );


const registrationSuccess =
    document.getElementById(
        "registration-success"
    );


if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(
                    registrationForm
                );


            const name =
                formData.get("name");

            const email =
                formData.get("email");

            const phone =
                formData.get("phone");

            const selectedPass =
                formData.get("pass");


            if (
                !name ||
                !email ||
                !phone ||
                !selectedPass
            ) {

                return;

            }


            /* Show success message */

            if (registrationSuccess) {

                registrationSuccess.hidden =
                    false;

                registrationSuccess.innerHTML = `
                    <i class="fa-solid fa-circle-check"></i>
                    Thanks ${name}! Your ${selectedPass}
                    pass registration has been received.
                `;

            }


            /* Disable submit button */

            const submitButton =
                registrationForm.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.innerHTML = `
                    <i class="fa-solid fa-check"></i>
                    Registration Complete
                `;

                submitButton.disabled =
                    true;

            }

        }
    );

}



/* =========================
   9. NEWSLETTER
   ========================= */

const newsletterForm =
    document.getElementById(
        "newsletter-form"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const emailInput =
                document.getElementById(
                    "newsletter-email"
                );


            if (!emailInput.value.trim()) {

                return;

            }


            const button =
                newsletterForm.querySelector(
                    "button"
                );


            button.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Subscribed
            `;


            button.disabled = true;

            emailInput.value = "";

        }
    );

}



/* =========================
   10. SCROLL REVEAL
   ========================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================
   11. CURSOR GLOW
   ========================= */

const cursorGlow =
    document.querySelector(
        ".cursor-glow"
    );


if (cursorGlow) {

    window.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}



/* =========================
   12. BACK TO TOP
   ========================= */

const backToTop =
    document.getElementById(
        "back-to-top"
    );


if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        },
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}



/* =========================
   13. STAT COUNTER
   ========================= */

const statNumbers =
    document.querySelectorAll(
        ".stat-box h2"
    );


const animateStat =
    element => {

        const originalText =
            element.textContent.trim();

        const numericValue =
            parseInt(
                originalText.replace(
                    /\D/g,
                    ""
                )
            );


        if (isNaN(numericValue)) {
            return;
        }


        const suffix =
            originalText.includes("+")
                ? "+"
                : "";


        let current = 0;

        const duration = 1200;

        const startTime =
            performance.now();


        function updateNumber(
            currentTime
        ) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            current =
                Math.floor(
                    progress * numericValue
                );


            element.textContent =
                current + suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    updateNumber
                );

            }

        }


        requestAnimationFrame(
            updateNumber
        );

    };


const statObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateStat(
                        entry.target
                    );

                    statObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.7
        }
    );


statNumbers.forEach(stat => {

    statObserver.observe(stat);

});



/* =========================
   14. BUTTON RIPPLE
   ========================= */

document
    .querySelectorAll(
        ".btn-primary, .primary-btn, .register-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement(
                        "span"
                    );


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;

                ripple.classList.add(
                    "ripple"
                );


                this.appendChild(
                    ripple
                );


                setTimeout(
                    () => ripple.remove(),
                    600
                );

            }
        );

    });



/* =========================
   15. CONSOLE MESSAGE
   ========================= */

console.log(
    "%cNexVerse 2026 🚀",
    "color:#58c7ff;font-size:20px;font-weight:bold;"
);

console.log(
    "Welcome to the future of AI."
);