const carouselSection = document.getElementById('carouselExampleIndicators');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const carousel = new bootstrap.Carousel(carouselSection, {
        interval: 2000,
        ride: 'carousel'
      });
      carousel.cycle();
      observer.unobserve(carouselSection);
    }
  });
}, { threshold: 0.5 });

observer.observe(carouselSection);
