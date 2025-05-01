// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations and interactive elements
  initAnimations();
  initScrollEffects();
  initSparkles();
  initHoverEffects();
  initMobileMenu();
});

// Initialize animations for elements with animated-text class
function initAnimations() {
  // Stagger the animations for a nice effect
  const animatedElements = document.querySelectorAll(".animated-text");

  animatedElements.forEach((element, index) => {
    // Check if element already has a delay class
    if (!element.classList.contains("delay-1")) {
      element.style.animationDelay = `${0.2 * index}s`;
    }
  });
}

// Add scroll-triggered animations
function initScrollEffects() {
  // Fade in elements as they scroll into view
  const scrollElements = document.querySelectorAll(
    ".category-card, .product-card, .section-title, .cake-image, .ingredients-content, .image-container"
  );

  // Function to check if element is in viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  };

  // Function to handle scroll animation
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (isElementInViewport(el) && !el.classList.contains("animated")) {
        el.classList.add("animated");
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";

        // Use setTimeout to create a staggered effect
        setTimeout(() => {
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 150);
      }
    });
  };

  // Add scroll event listener
  window.addEventListener("scroll", handleScrollAnimation);

  // Trigger once on load
  handleScrollAnimation();
}

// Add sparkle effects on hover
function initSparkles() {
  const sparkleElements = document.querySelectorAll(
    ".category-btn, .primary-btn, .product-btn"
  );

  sparkleElements.forEach((element) => {
    element.addEventListener("mouseover", createSparkles);
  });

  function createSparkles(e) {
    const numSparkles = 10;
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();

    for (let i = 0; i < numSparkles; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";

      // Random position around the button
      const size = Math.random() * 8 + 2; // Size between 2px and 10px
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;

      // Position sparkle around the button
      sparkle.style.left = `${
        buttonRect.left + Math.random() * buttonRect.width
      }px`;
      sparkle.style.top = `${
        buttonRect.top + Math.random() * buttonRect.height
      }px`;

      // Add some color variation
      const hue = Math.random() * 60 + 20; // Golden/yellow hues
      sparkle.style.backgroundColor = `hsl(${hue}, 100%, 75%)`;

      // Append to body
      document.body.appendChild(sparkle);

      // Animate and remove
      setTimeout(() => {
        sparkle.style.transition = "transform 0.6s ease, opacity 0.6s ease";
        sparkle.style.transform = `translate(${
          (Math.random() - 0.5) * 100
        }px, ${(Math.random() - 0.5) * 100}px)`;
        sparkle.style.opacity = "1";

        setTimeout(() => {
          sparkle.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(sparkle);
          }, 600);
        }, 200);
      }, i * 50);
    }
  }
}

// Add hover effects for cards and images
function initHoverEffects() {
  // Add parallax effect to featured images
  const cards = document.querySelectorAll(".category-card, .product-card");

  cards.forEach((card) => {
    const image = card.querySelector("img");

    if (image) {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the card
        const y = e.clientY - rect.top; // y position within the card

        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20; // Adjust divisor for more/less rotation
        const rotateY = (centerX - x) / 20;

        // Apply transform to card and image
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        image.style.transform = `translateZ(20px) scale(1.05)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
        image.style.transform = "translateZ(0) scale(1)";
        card.style.transition = "transform 0.5s ease";
        image.style.transition = "transform 0.5s ease";
      });
    }
  });

  // Add hover effect to hero image
  const heroImage = document.querySelector(".hero-image img");
  if (heroImage) {
    heroImage.parentElement.addEventListener("mousemove", (e) => {
      const rect = heroImage.parentElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate movement based on mouse position
      const moveX = (x - rect.width / 2) / 20;
      const moveY = (y - rect.height / 2) / 20;

      heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    heroImage.parentElement.addEventListener("mouseleave", () => {
      heroImage.style.transform = "translate(0, 0)";
      heroImage.style.transition = "transform 0.5s ease";
    });
  }
}

// Mobile menu functionality
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.classList.toggle("no-scroll"); // Prevent scrolling when menu is open
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.classList.remove("no-scroll");
      });
    });
  }
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");

    // Only proceed if the target exists
    if (targetId !== "#") {
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Scroll smoothly to the target
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Close mobile menu if open
        const nav = document.querySelector("header nav");
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

        if (nav && nav.classList.contains("active")) {
          nav.classList.remove("active");
          if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove("active");
          }
        }
      }
    }
  });
});

// Simple cart functionality
(function initCart() {
  const cartBtn = document.querySelector(".cart-button .btn");
  const productBtns = document.querySelectorAll(".product-btn");
  let cartCount = 0;

  if (cartBtn) {
    // Update cart display
    const updateCart = () => {
      cartBtn.textContent = `Cart (${cartCount})`;

      // Add animation
      cartBtn.classList.add("pulse");
      setTimeout(() => {
        cartBtn.classList.remove("pulse");
      }, 300);
    };

    // Add CSS for cart animation
    const style = document.createElement("style");
    style.textContent = `
            .pulse {
                animation: pulse 0.3s ease;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
    document.head.appendChild(style);

    // Add click event to product buttons
    productBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        cartCount++;
        updateCart();

        // Show added to cart notification
        const productCard = btn.closest(".product-card");
        if (productCard) {
          const notification = document.createElement("div");
          notification.className = "add-to-cart-notification";
          notification.textContent = "Added to cart!";
          productCard.appendChild(notification);

          // Add CSS for notification
          notification.style.position = "absolute";
          notification.style.top = "10px";
          notification.style.right = "10px";
          notification.style.backgroundColor = "var(--primary-color)";
          notification.style.color = "white";
          notification.style.padding = "5px 10px";
          notification.style.borderRadius = "5px";
          notification.style.opacity = "0";
          notification.style.transform = "translateY(-10px)";
          notification.style.transition =
            "opacity 0.3s ease, transform 0.3s ease";

          // Show notification
          setTimeout(() => {
            notification.style.opacity = "1";
            notification.style.transform = "translateY(0)";

            // Hide and remove notification
            setTimeout(() => {
              notification.style.opacity = "0";
              notification.style.transform = "translateY(-10px)";

              setTimeout(() => {
                productCard.removeChild(notification);
              }, 300);
            }, 2000);
          }, 10);
        }
      });
    });

    // Add click event to cart button
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Shopping cart functionality would go here in a real application.");
    });
  }
})();

// Newsletter form submission
(function initNewsletter() {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        // Show success message
        const formContainer = newsletterForm.parentElement;
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for subscribing to our newsletter!</p>
                `;

        // Style success message
        successMessage.style.display = "flex";
        successMessage.style.alignItems = "center";
        successMessage.style.justifyContent = "center";
        successMessage.style.color = "var(--primary-color)";
        successMessage.style.fontWeight = "bold";
        successMessage.style.marginTop = "20px";
        successMessage.style.opacity = "0";
        successMessage.style.transform = "translateY(20px)";
        successMessage.style.transition =
          "opacity 0.5s ease, transform 0.5s ease";

        // Add icon styling
        const icon = successMessage.querySelector("i");
        if (icon) {
          icon.style.fontSize = "1.5rem";
          icon.style.marginRight = "10px";
        }

        // Replace form with success message
        formContainer.appendChild(successMessage);
        newsletterForm.style.opacity = "1";
        newsletterForm.style.transform = "translateY(0)";
        newsletterForm.style.transition =
          "opacity 0.5s ease, transform 0.5s ease";

        // Animate transition
        setTimeout(() => {
          newsletterForm.style.opacity = "0";
          newsletterForm.style.transform = "translateY(-20px)";

          setTimeout(() => {
            newsletterForm.style.display = "none";
            successMessage.style.opacity = "1";
            successMessage.style.transform = "translateY(0)";
          }, 500);
        }, 100);
      } else {
        // Highlight email input if empty
        emailInput.style.boxShadow = "0 0 0 2px var(--primary-color)";
        emailInput.style.transition = "box-shadow 0.3s ease";

        setTimeout(() => {
          emailInput.style.boxShadow = "none";
        }, 2000);
      }
    });
  }
})();

// Create an interactive wave effect for the decorative waves
(function createWaveEffect() {
  // Function to create wave animation
  const addWaveAnimation = (selector) => {
    const section = document.querySelector(selector);
    if (!section) return;

    // Create a wave canvas element
    const waveCanvas = document.createElement("canvas");
    waveCanvas.className = "wave-canvas";
    waveCanvas.style.position = "absolute";
    waveCanvas.style.bottom = "0";
    waveCanvas.style.left = "0";
    waveCanvas.style.width = "100%";
    waveCanvas.style.height = "80px";
    waveCanvas.style.pointerEvents = "none";

    // Append to section
    section.appendChild(waveCanvas);

    // Set up canvas
    const ctx = waveCanvas.getContext("2d");
    let width = (waveCanvas.width = waveCanvas.offsetWidth);
    let height = (waveCanvas.height = waveCanvas.offsetHeight);

    // Wave properties
    const waves = [
      {
        color: "rgba(255, 255, 255, 0.3)",
        amplitude: 15,
        frequency: 0.02,
        speed: 0.01,
      },
      {
        color: "rgba(255, 255, 255, 0.2)",
        amplitude: 10,
        frequency: 0.03,
        speed: 0.015,
      },
    ];

    let time = 0;

    // Animation function
    function animate() {
      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave) => {
        drawWave(wave, time);
      });

      time += 0.05;
      requestAnimationFrame(animate);
    }

    // Draw wave function
    function drawWave(wave, time) {
      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x < width; x++) {
        const y =
          Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
          height / 2;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
    }

    // Handle resize
    window.addEventListener("resize", () => {
      width = waveCanvas.width = waveCanvas.offsetWidth;
      height = waveCanvas.height = waveCanvas.offsetHeight;
    });

    // Start animation
    animate();
  };

  // Add wave effect to sections
  addWaveAnimation(".hero");
  addWaveAnimation(".delicious-cake");
  addWaveAnimation(".soup-section");
})();

// Parallax scrolling effect for background elements
(function initParallax() {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;

    // Apply parallax to various sections
    const parallaxElements = document.querySelectorAll(
      ".hero, .delicious-cake, .ingredients, .soup-section"
    );

    parallaxElements.forEach((element) => {
      const elementPosition = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Check if element is in view
      if (
        scrollPosition + viewportHeight > elementPosition &&
        scrollPosition < elementPosition + elementHeight
      ) {
        // Calculate parallax offset
        const offset =
          (scrollPosition + viewportHeight - elementPosition) * 0.1;

        // Apply transform
        element.style.backgroundPositionY = `${offset}px`;
      }
    });
  });
})();
