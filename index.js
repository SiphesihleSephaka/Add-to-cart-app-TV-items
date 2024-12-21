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

// Initialize cart as an empty array
let cart = [];

// Modal elements
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalPrice = document.getElementById("modalPrice");
const addToCart = document.getElementById("addToCart");
const closeModal = document.getElementById("closeModal");

// Open modal when a column is clicked
document.querySelectorAll(".column").forEach((column) => {
  column.addEventListener("click", () => {
    const imageSrc = column.getAttribute("data-image");
    const price = column.getAttribute("data-price");

    modal.style.display = "flex"; // Show modal
    modalImage.src = imageSrc; // Set modal image
    modalPrice.textContent = price; // Set modal price
  });
});

// Close modal when the close button is clicked
closeModal.addEventListener("click", () => {
  modal.style.display = "none"; // Hide modal
});

// Add item to cart when "Add to Cart" button is clicked
addToCart.onclick = () => {
  const priceText = modalPrice.textContent;
  const price = parseFloat(priceText.replace("$", "").trim()); // Get the price from text

  // Get the image source for the added item
  const imageSrc = modalImage.src;

  // Add the item to the cart array
  cart.push({ image: imageSrc, price: price });

  // Store the cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count on the icon
  updateCartCount();

  // Close modal
  modal.style.display = "none";
};

// Function to update the cart count on the icon
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = storedCart.length;
}

// Initial cart count update when the page loads
updateCartCount();

// Redirect to cart page when the cart icon is clicked
document.getElementById("cartIcon").addEventListener("click", () => {
  window.location.href = "cart.html"; // Navigate to the cart page
});
