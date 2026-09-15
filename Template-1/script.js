/* =========================================================
   AUREX — JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileClose = document.getElementById("mobileClose");
    const backTop = document.getElementById("backTop");

    const mobileLinks = document.querySelectorAll(".mobile-menu a");
    const navLinks = document.querySelectorAll(".desktop-nav a");

    const faqItems = document.querySelectorAll(".faq-item");

    const contactForm = document.getElementById("contactForm");


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    function updateHeader() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function openMenu() {

        mobileMenu.classList.add("open");

        document.body.style.overflow = "hidden";

    }


    function closeMenu() {

        mobileMenu.classList.remove("open");

        document.body.style.overflow = "";

    }


    if (menuBtn) {
        menuBtn.addEventListener("click", openMenu);
    }


    if (mobileClose) {
        mobileClose.addEventListener("click", closeMenu);
    }


    mobileLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                10;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveNav() {

        const scrollPosition = window.scrollY + 180;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

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


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");


            /* Close all other FAQ items */

            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

            });


            /* Open selected item */

            if (!isOpen) {
                item.classList.add("active");
            }

        });

    });


    /* =====================================================
       WHATSAPP CONTACT FORM
       ===================================================== */

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const business =
                document.getElementById("business").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const service =
                document.getElementById("service").value;

            const message =
                document.getElementById("message").value.trim();


            if (!name || !business || !email) {

                alert(
                    "Please fill in your name, business name and email."
                );

                return;

            }


            /*
                =================================================
                IMPORTANT

                Replace this number with the buyer's WhatsApp
                number.

                Use international format WITHOUT + or spaces.

                Example:

                Ghana:
                233201234567

                USA:
                12125551234

                UK:
                447911123456

                =================================================
            */

            const whatsappNumber = "233000000000";


            const whatsappMessage =
                `Hello AUREX,%0A%0A` +
                `Name: ${encodeURIComponent(name)}%0A` +
                `Business: ${encodeURIComponent(business)}%0A` +
                `Email: ${encodeURIComponent(email)}%0A` +
                `Service: ${encodeURIComponent(service)}%0A%0A` +
                `Project details:%0A` +
                `${encodeURIComponent(message || "No additional details provided.")}`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    function updateBackTop() {

        if (window.scrollY > 600) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }


    window.addEventListener("scroll", updateBackTop);


    if (backTop) {

        backTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       IMAGE ERROR PROTECTION
       ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("error", () => {

            image.style.background =
                "linear-gradient(135deg, #161b14, #273021)";

            image.style.objectFit = "cover";

        });

    });


    /* =====================================================
       BUTTON MICRO INTERACTION
       ===================================================== */

    const buttons =
        document.querySelectorAll(".btn, .price-btn, .nav-btn");


    buttons.forEach(button => {

        button.addEventListener("mousedown", () => {

            button.style.transform = "scale(0.97)";

        });


        button.addEventListener("mouseup", () => {

            button.style.transform = "";

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

});