const initSlider = () => {
  const courseContainers = document.querySelectorAll(".slider-wrapper .course-container");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".courses .slider-scrollbar");
  const scrollbarThumb = document.querySelector(".slider-scrollbar .scrollbar-thumb");
  const maxScrollLeft = courseContainers[0].scrollWidth - courseContainers[0].clientWidth;

  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      courseContainers.forEach(container => container.scrollLeft = scrollPosition);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  slideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = courseContainers[0].clientWidth * direction;

      courseContainers.forEach(container => container.scrollBy({ left: scrollAmount, behavior: "smooth" }));
    });
  });

  const handleSlideButtons = () => {
    slideButtons[0].style.display = courseContainers[0].scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display = courseContainers[0].scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  const updateScrollThumbPosition = () => {
    const scrollPosition = courseContainers[0].scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);

    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  courseContainers.forEach(container => {
    container.addEventListener("scroll", () => {
      handleSlideButtons();
      updateScrollThumbPosition();
    });
  });
};

window.addEventListener("load", initSlider);
