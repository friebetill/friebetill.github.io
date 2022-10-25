(function () {
  "use strict";

  activateMobileNavigationMenu();
  activateNavigation();
  loadInitialSection();
  activatePortfolioFilters();

  GLightbox({ selector: ".portfolio-lightbox" });
  GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: { delay: 5e3, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
  });
})();

function activateMobileNavigationMenu() {
  addListener("click", ".mobile-nav-toggle", function (t) {
    getElement("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });
}

function activateNavigation() {
  addListener(
    "click",
    "#navbar .nav-link",
    function (event) {
      // Gets the part of the URL beginning with #
      const hash = this.hash;
      const element = getElement(hash);
      if (element == null) {
        return;
      }

      event.preventDefault();
      const navBar = getElement("#navbar");
      const header = getElement("#header");
      const sections = getElement("section", true);
      const navLinks = getElement("#navbar .nav-link", true);

      navLinks.forEach((e) => e.classList.remove("active"));
      this.classList.add("active");

      if (navBar.classList.contains("navbar-mobile")) {
        navBar.classList.remove("navbar-mobile");
        const navToggle = getElement(".mobile-nav-toggle");
        navToggle.classList.toggle("bi-list");
        navToggle.classList.toggle("bi-x");
      }

      if ("#header" == this.hash) {
        return (
          header.classList.remove("header-top"),
          void sections.forEach((e) => e.classList.remove("section-show"))
        );
      }

      if (header.classList.contains("header-top")) {
        sections.forEach((e) => e.classList.remove("section-show"));
        element.classList.add("section-show");
      } else {
        header.classList.add("header-top");
        setTimeout(function () {
          sections.forEach((e) => e.classList.remove("section-show"));
          element.classList.add("section-show");
        }, 350);
      }
      scrollToTop();
    },
    true
  );
}

function loadInitialSection() {
  window.addEventListener("load", () => {
    // Gets the part of the URL beginning with #
    const hash = window.location.hash;
    if (hash === "") {
      return;
    }

    const section = getElement(hash);
    if (section == null) {
      return;
    }

    const header = getElement("#header");
    const navLinks = getElement("#navbar .nav-link", true);

    header.classList.add("header-top");
    navLinks.forEach((navLink) =>
      navLink.getAttribute("href") == `index.html${hash}`
        ? navLink.classList.add("active")
        : navLink.classList.remove("active")
    );
    setTimeout(() => section.classList.add("section-show"), 300);
    scrollToTop();
  });
}

function activatePortfolioFilters() {
  window.addEventListener("load", () => {
    const portfolioContainer = getElement(".portfolio-container");
    if (portfolioContainer == null) {
      return;
    }

    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    let o = getElement("#portfolio-filters li", true);
    addListener(
      "click",
      "#portfolio-filters li",
      function (e) {
        e.preventDefault();
        o.forEach((e) => e.classList.remove("filter-active"));
        this.classList.add("filter-active");
        portfolioIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        });
      },
      true
    );
  });
}

/** Returns the element with the given id.
 *
 *  Returns all elements with the given id, if selectAll is true.
 */
function getElement(id, selectAll = false) {
  return selectAll
    ? [...document.querySelectorAll(id)]
    : document.querySelector(id);
}

/** Adds the event [listener] of [type] to the element [id]. */
function addListener(type, id, listener, selectAll = false) {
  const element = getElement(id, selectAll);
  if (element == null) {
    return;
  }

  selectAll
    ? element.forEach((e) => e.addEventListener(type, listener))
    : element.addEventListener(type, listener);
}

/** Trigger a smooth scrolls to the top. */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
