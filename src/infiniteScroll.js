export const enableInfiniteScroll = () => {
  const grid = document.getElementById("projects-grid");

  if (!grid) return; // Exit if the grid doesn't exist

  // Function to duplicate content
  const duplicateContent = () => {
    const originalContent = grid.innerHTML; // Save the original content
    grid.innerHTML += originalContent; // Duplicate the content
  };

  // Function to handle seamless infinite scroll
  const setupScrollListener = () => {
    const contentWidth = grid.scrollWidth / 2; // Half the scroll width (original content size)

    grid.addEventListener("scroll", () => {
      if (grid.scrollLeft >= contentWidth) {
        // If we've scrolled past the original content, reset to the start
        grid.scrollLeft = grid.scrollLeft - contentWidth;
      } else if (grid.scrollLeft <= 0) {
        // If scrolling backwards past the start, jump to the end of the duplicate
        grid.scrollLeft = contentWidth + grid.scrollLeft;
      }
    });
  };

  // Function to initiate automatic scrolling
  const startAutoScroll = () => {
    const scrollSpeed = 1; // Speed of automatic scrolling (pixels per interval)
    const interval = 16; // Interval for smooth scrolling (ms)

    const scroll = () => {
      grid.scrollLeft += scrollSpeed;
      requestAnimationFrame(scroll); // Use requestAnimationFrame for smooth animations
    };

    scroll();
  };

  // Initialize the infinite scroll setup
  const initialize = () => {
    duplicateContent(); // Duplicate the content for seamless looping
    grid.scrollLeft = 0; // Start at the very beginning
    setupScrollListener(); // Set up scroll event listener for seamless looping
    startAutoScroll(); // Start the auto-scroll
  };

  initialize();
};
