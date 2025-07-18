
//navbar mehanika scrool
let lastScrollY = window.scrollY;
  const navbar = document.getElementById('navbar1');

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      // Skroluješ dole - sakrij navbar
      navbar.classList.add('-translate-y-full');
    } else {
      // Skroluješ gore - prikaži navbar
      navbar.classList.remove('-translate-y-full');
    }
    lastScrollY = window.scrollY;
  });

const carousel = document.getElementById('carousel');
  const items = carousel.querySelectorAll('.carousel-item');
  let index = 0;

  function showSlide(i) {
    const slideWidth = items[i].offsetWidth;
    carousel.scrollTo({
      left: slideWidth * i,
      behavior: 'smooth'
    });
    index = i;
  }

  function goToSlide(i) {
    clearInterval(autoScroll);
    showSlide(i);
    startAutoScroll();
  }

  function startAutoScroll() {
    autoScroll = setInterval(() => {
      index = (index + 1) % items.length;
      showSlide(index);
    }, 3000);
  }

  let autoScroll = null;
  startAutoScroll();




