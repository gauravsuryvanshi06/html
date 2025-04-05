// Wait until DOM is loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links (in addition to CSS)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== "#") {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Modal functionality for gallery images
  document.querySelectorAll('.scrollable-gallery img').forEach(function(img) {
    img.addEventListener('click', function() {
      var src = this.src;
      document.getElementById('gray20').src = src;
      document.getElementById('gray40').src = src;
      document.getElementById('gray60').src = src;
      document.getElementById('gray80').src = src;
      document.getElementById('image-modal').style.display = "block";
    });
  });

  // Close modal when the close button is clicked
  document.querySelector('.close').addEventListener('click', function(){
    document.getElementById('image-modal').style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', function(event) {
    var modal = document.getElementById('image-modal');
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Toggle dark mode functionality
  document.getElementById('dark-mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
  });

  // Auto-scroll gallery (infinite loop effect)
  setInterval(function () {
    const gallery = document.querySelector('.scrollable-gallery');
    if (!gallery) return;
  
    const firstImage = gallery.firstElementChild;
    if (!firstImage) return;
  
    const style = window.getComputedStyle(gallery);
    const gap = parseInt(style.gap || "10", 10);
    const scrollDistance = firstImage.offsetWidth + gap;
  
    gallery.scrollTo({
      left: scrollDistance,
      behavior: 'smooth'
    });
  
    setTimeout(function () {
      gallery.appendChild(firstImage);
      gallery.scrollLeft = 0;
    }, 800);
  }, 800);

  // Show/hide scroll-to-top button based on scroll position
  const scrollButton = document.getElementById('scroll-to-top');
  window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollButton.style.display = 'block';
    } else {
      scrollButton.style.display = 'none';
    }
  });

  // Scroll to top when the button is clicked
  scrollButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // *** Load dynamic content from JSON ***
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const jsonContainer = document.getElementById('json-content');
      data.forEach(item => {
        const article = document.createElement('article');
        // Use item.title as id for navigation (convert to lowercase, replace spaces)
        const sectionId = item.title.toLowerCase().replace(/\s+/g, '-');
        article.setAttribute('id', sectionId);

        const h2 = document.createElement('h2');
        h2.textContent = item.title;

        const p = document.createElement('p');
        p.textContent = item.info;

        article.appendChild(h2);
        article.appendChild(p);
        jsonContainer.appendChild(article);
      });
    })
    .catch(error => console.error('Error loading JSON:', error));
});
