class ImageCarousel {
  constructor() {
      this.currentIndex = 0;
      this.totalSlides = 4;
      this.autoScrollInterval = 4000; // 4 seconds for images
      this.isPlaying = true;
      this.progressInterval = null;
      this.progressWidth = 0;
      
      this.track = document.getElementById('carouselTrack');
      this.progressBar = document.getElementById('progressBar');
      this.pauseOverlay = document.getElementById('pauseOverlay');
      
      this.init();
  }
  
  init() {
      this.setupImageLoading();
      this.updateSlide();
      this.startAutoScroll();
      this.setupEventListeners();
  }

  setupImageLoading() {
      const images = document.querySelectorAll('.carousel-slide img');
      images.forEach((img, index) => {
          // Create placeholder while loading
          const placeholder = document.createElement('div');
          placeholder.className = 'image-placeholder loading';
          placeholder.textContent = 'Loading...';
          
          img.style.display = 'none';
          img.parentNode.appendChild(placeholder);
          
          img.onload = () => {
              img.style.display = 'block';
              if (placeholder.parentNode) {
                  placeholder.parentNode.removeChild(placeholder);
              }
          };
          
          img.onerror = () => {
              placeholder.textContent = 'Image not available';
              placeholder.className = 'image-placeholder';
          };
      });
  }
  
  updateSlide() {
      // Move carousel track
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      
      // Preload next image
      this.preloadNextImage();
  }

  preloadNextImage() {
      const nextIndex = (this.currentIndex + 1) % this.totalSlides;
      const nextImg = document.querySelectorAll('.carousel-slide img')[nextIndex];
      if (nextImg && !nextImg.complete) {
          // Force loading of next image
          nextImg.loading = 'eager';
      }
  }
  
  nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
      this.updateSlide();
      this.resetAutoScroll();
  }
  
  prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
      this.updateSlide();
      this.resetAutoScroll();
  }
  
  goToSlide(index) {
      this.currentIndex = index;
      this.updateSlide();
      this.resetAutoScroll();
  }
  
  startAutoScroll() {
      this.isPlaying = true;
      this.pauseOverlay.classList.remove('show');
      this.progressWidth = 0;
      
      this.progressInterval = setInterval(() => {
          this.progressWidth += (100 / (this.autoScrollInterval / 50));
          this.progressBar.style.width = this.progressWidth + '%';
          
          if (this.progressWidth >= 100) {
              this.nextSlide();
          }
      }, 50);
  }
  
  stopAutoScroll() {
      this.isPlaying = false;
      this.pauseOverlay.classList.add('show');
      clearInterval(this.progressInterval);
  }
  
  resetAutoScroll() {
      clearInterval(this.progressInterval);
      this.progressWidth = 0;
      this.progressBar.style.width = '0%';
      if (this.isPlaying) {
          this.startAutoScroll();
      }
  }
  
  setupEventListeners() {
      // Mouse enter/leave for pause/resume
      const carousel = document.querySelector('.image-carousel');
      carousel.addEventListener('mouseenter', () => this.stopAutoScroll());
      carousel.addEventListener('mouseleave', () => this.startAutoScroll());
      
      // Touch events for mobile
      let touchStartX = 0;
      let touchStartY = 0;
      
      carousel.addEventListener('touchstart', (e) => {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          this.stopAutoScroll();
      });
      
      carousel.addEventListener('touchend', (e) => {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const diffX = touchStartX - touchEndX;
          const diffY = Math.abs(touchStartY - touchEndY);
          
          // Only trigger if horizontal swipe is dominant
          if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
              if (diffX > 0) {
                  this.nextSlide();
              } else {
                  this.prevSlide();
              }
          }
          
          setTimeout(() => this.startAutoScroll(), 1000);
      });
      
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
          if (e.key === ' ') {
              e.preventDefault();
              if (this.isPlaying) {
                  this.stopAutoScroll();
              } else {
                  this.startAutoScroll();
              }
          }
      });

      // Visibility change handling
      document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
              this.stopAutoScroll();
          } else if (this.isPlaying) {
              this.startAutoScroll();
          }
      });
  }
}

// Initialize carousel
let carousel;

// Global functions for button clicks
function nextSlide() {
  carousel.nextSlide();
}

function prevSlide() {
  carousel.prevSlide();
}

function goToSlide(index) {
  carousel.goToSlide(index);
}

// Start when page loads
document.addEventListener('DOMContentLoaded', () => {
  carousel = new ImageCarousel();
});
