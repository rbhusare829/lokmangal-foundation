/**
 * Lokmangal Foundation — Custom Mobile Navigation
 * Clean hamburger menu with slide-down panel
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('lf-hamburger-btn');
    var mobileNav = document.getElementById('lf-mobile-nav');

    if (!hamburger || !mobileNav) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = mobileNav.classList.toggle('lf-open');
      hamburger.classList.toggle('lf-active', isOpen);
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('lf-open');
        hamburger.classList.remove('lf-active');
      }
    });

    // Sub-menu toggles on mobile
    var subItems = mobileNav.querySelectorAll('.lf-m-has-sub > a');
    subItems.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var parent = this.parentElement;
        var wasOpen = parent.classList.contains('lf-sub-open');
        // Close all
        mobileNav.querySelectorAll('.lf-m-has-sub').forEach(function (el) {
          el.classList.remove('lf-sub-open');
        });
        // Open this one if it was closed
        if (!wasOpen) {
          parent.classList.add('lf-sub-open');
        }
      });
    });

    // Desktop hover dropdowns — keep existing behavior via CSS
    // Sticky navbar on scroll
    var navbar = document.getElementById('site-navbar');
    if (navbar) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
          navbar.classList.add('lf-sticky');
        } else {
          navbar.classList.remove('lf-sticky');
        }
      });
    }
  });
})();
