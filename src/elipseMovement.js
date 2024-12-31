function moveEllipse(ellipse) {
    const screenWidth = window.innerWidth - 50; // Subtract ellipse size to avoid overflow
    const screenHeight = window.innerHeight - 50;
  
    const randomX = Math.random() * screenWidth;
    const randomY = Math.random() * screenHeight;
  
    ellipse.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }
  
  function animateEllipses() {
    const ellipses = document.querySelectorAll(' .ellipse3');
  
    setInterval(() => {
      ellipses.forEach(ellipse => moveEllipse(ellipse));
    }, 2000); // Change position every 2 seconds
  }
  
  animateEllipses();
  