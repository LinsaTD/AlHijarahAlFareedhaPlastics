document.addEventListener("DOMContentLoaded", () => {
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    const homeSection = document.getElementById("home");
    if (homeSection) {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
        window.scrollTo(0, 0);
    }

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });

        document.querySelectorAll(".nav-link, .nav-btn").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
            });
        });

        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink && homeSection) {
            homeLink.addEventListener("click", event => {
                event.preventDefault();
                history.replaceState(null, document.title, window.location.pathname + window.location.search);
                homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }
    }

    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.style.boxShadow = window.scrollY > 40
                ? "0 4px 15px rgba(0,0,0,0.06)"
                : "none";
        });
    }

    const heroVideo = document.querySelector(".hero-video-wrapper video");
    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.playsInline = true;

        const startHeroVideo = () => {
            const playPromise = heroVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Autoplay prevented by browser:", error);
                });
            }
        };

        heroVideo.addEventListener("canplay", startHeroVideo, { once: true });
        heroVideo.load();
        startHeroVideo();
    }

    const galleryLightbox = document.getElementById("gallery-lightbox");
    const galleryLightboxImage = document.getElementById("gallery-lightbox-image");
    const galleryClose = document.querySelector(".gallery-close");

    if (galleryLightbox && galleryLightboxImage && galleryClose) {
        const closeGallery = () => {
            galleryLightbox.classList.remove("is-open");
            galleryLightbox.setAttribute("aria-hidden", "true");
            galleryLightboxImage.src = "";
            document.body.style.overflow = "";
        };

        document.querySelectorAll(".gallery-item").forEach(item => {
            item.addEventListener("click", event => {
                event.preventDefault();
                const image = item.querySelector("img");

                galleryLightboxImage.src = item.href;
                galleryLightboxImage.alt = image.alt;
                galleryLightbox.classList.add("is-open");
                galleryLightbox.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
                galleryClose.focus();
            });
        });

        galleryClose.addEventListener("click", closeGallery);

        galleryLightbox.addEventListener("click", event => {
            if (event.target === galleryLightbox) {
                closeGallery();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && galleryLightbox.classList.contains("is-open")) {
                closeGallery();
            }
        });
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("cname").value;
    const phone = document.getElementById("cphone").value;
    const msg = document.getElementById("form-message");

    if (name && phone) {
        msg.style.color = "#16a34a";
        msg.innerText = "Thank you, " + name + "! Your consultation request has been submitted. Our team will contact you shortly.";
        document.getElementById("hero-form").reset();
    } else {
        msg.style.color = "#dc2626";
        msg.innerText = "Please complete all required fields.";
    }
}