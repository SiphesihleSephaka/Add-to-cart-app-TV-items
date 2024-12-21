const swipeContainer = document.querySelector(".swipe-container");
let startX;

swipeContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX;
});

swipeContainer.addEventListener("touchmove", (e) => {
  const deltaX = startX - e.touches[0].pageX;
  swipeContainer.scrollLeft += deltaX;
  startX = e.touches[0].pageX;
});
