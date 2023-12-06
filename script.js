// Sample product data for fruits category (you can replace this with your own data)
const products = [
    {
      id: 1,
      title: 'Apple',
      price: 1.0,
      image: 'images/apple.jpg',
    },
    {
      id: 2,
      title: 'Banana',
      price: 0.5,
      image: 'images/banana.jpg',
    },
    {
      id: 3,
      title: 'Orange',
      price: 0.75,
      image: 'images/orange.jpg',
    },
    // Add more products as needed
  ];
  
  // Array to store cart items
  let cartItems = [];
  
  // Function to add a product to the cart
  function addToCart(productTitle, quantity) {
    // Find the product in the products array
    const product = products.find((p) => p.title === productTitle);
  
    // Check if the product already exists in the cart
    const existingCartItem = cartItems.find((item) => item.product.title === product.title);
  
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cartItems.push({ product, quantity });
    }
  
    // Save the cartItems to Local Storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    // Update the cart count in the navigation bar
    updateCartCount();
  
    // Log the cart items (you can remove this and implement your own cart functionality)
    console.log(cartItems);
  }
  
  // Function to increase the quantity of a product in the cart
  function increaseQuantity(productTitle) {
    const cartItem = cartItems.find((item) => item.product.title === productTitle);
    if (cartItem) {
      cartItem.quantity += 1;
      renderBillingPage();
    }
  }
  
  // Function to decrease the quantity of a product in the cart
  function decreaseQuantity(productTitle) {
    const cartItem = cartItems.find((item) => item.product.title === productTitle);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      renderBillingPage();
    }
  }
  
  // Function to update the cart count in the navigation bar
  function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.innerText = cartCount;
  }
  
  // Function to render the billing page
  function renderBillingPage() {
    const billingContainer = document.querySelector('.billing-container');
    billingContainer.innerHTML = ''; // Clear previous content
  
    for (const item of cartItems) {
      const billingProduct = document.createElement('div');
      billingProduct.classList.add('billing-product');
  
      const billingProductImage = document.createElement('img');
      billingProductImage.classList.add('billing-product-image');
      billingProductImage.src = item.product.image;
      billingProductImage.alt = item.product.title;
  
      const billingProductInfo = document.createElement('div');
      billingProductInfo.classList.add('billing-product-info');
  
      const billingProductTitle = document.createElement('div');
      billingProductTitle.classList.add('billing-product-title');
      billingProductTitle.innerText = item.product.title;
  
      const billingProductPrice = document.createElement('div');
      billingProductPrice.classList.add('billing-product-price');
      billingProductPrice.innerText = `$${(item.product.price * item.quantity).toFixed(2)}`;
  
      const billingProductQuantity = document.createElement('div');
      billingProductQuantity.classList.add('billing-product-quantity');
  
      const decreaseButton = document.createElement('button');
      decreaseButton.innerText = '-';
      decreaseButton.classList.add('quantity-btn');
      decreaseButton.classList.add('minus-btn');
      decreaseButton.addEventListener('click', () => decreaseQuantity(item.product.title));
  
      const quantityInput = document.createElement('input');
      quantityInput.type = 'text';
      quantityInput.classList.add('quantity-input');
      quantityInput.value = item.quantity;
      quantityInput.readOnly = true;
  
      const increaseButton = document.createElement('button');
      increaseButton.innerText = '+';
      increaseButton.classList.add('quantity-btn');
      increaseButton.classList.add('plus-btn');
      increaseButton.addEventListener('click', () => increaseQuantity(item.product.title));
  
      billingProductQuantity.appendChild(decreaseButton);
      billingProductQuantity.appendChild(quantityInput);
      billingProductQuantity.appendChild(increaseButton);
  
      billingProductInfo.appendChild(billingProductTitle);
      billingProductInfo.appendChild(billingProductPrice);
      billingProductInfo.appendChild(billingProductQuantity);
  
      billingProduct.appendChild(billingProductImage);
      billingProduct.appendChild(billingProductInfo);
      billingContainer.appendChild(billingProduct);
    }
  
    const totalAmountElement = document.getElementById('total-amount');
    const totalPrice = calculateTotalPrice();
    totalAmountElement.innerText = totalPrice.toFixed(2);
  }
  
  // Function to calculate the total price in the billing page
  function calculateTotalPrice() {
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += item.product.price * item.quantity;
    }
    return totalAmount;
  }
  
  // Function to handle the payment
  function payNow() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (selectedPayment) {
      // Perform payment processing and redirect to a success page
      console.log('Payment successful!');
      // Clear cartItems and Local Storage after successful payment
      cartItems = [];
      localStorage.removeItem('cartItems');
      updateCartCount();
      renderBillingPage();
    } else {
      alert('Please select a payment option.');
    }
  }
  
  // Function to initialize the page
  function initializePage() {
    // Retrieve cart items from Local Storage if available
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
    }
    updateCartCount();
    renderBillingPage();
  }
  
  // Function to generate product cards for fruits category
  function generateProductCards() {
    const fruitsCategory = document.querySelector('.fruits-category');
  
    for (const product of products) {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.title;
      productCard.appendChild(productImage);
  
      const productTitle = document.createElement('h3');
      productTitle.innerText = product.title;
      productCard.appendChild(productTitle);
  
      const productPrice = document.createElement('p');
      productPrice.classList.add('price');
      productPrice.innerText = `$${product.price.toFixed(2)}`;
      productCard.appendChild(productPrice);
  
      const quantityDiv = document.createElement('div');
      quantityDiv.classList.add('quantity');
  
      const minusBtn = document.createElement('button');
      minusBtn.classList.add('quantity-btn', 'minus-btn');
      minusBtn.innerText = '-';
      minusBtn.addEventListener('click', () => decreaseQuantity(product.title));
  
      const quantityInput = document.createElement('input');
      quantityInput.type = 'text';
      quantityInput.classList.add('quantity-input');
      quantityInput.value = 1;
      quantityInput.readOnly = true;
  
      const plusBtn = document.createElement('button');
      plusBtn.classList.add('quantity-btn', 'plus-btn');
      plusBtn.innerText = '+';
      plusBtn.addEventListener('click', () => increaseQuantity(product.title));
  
      quantityDiv.appendChild(minusBtn);
      quantityDiv.appendChild(quantityInput);
      quantityDiv.appendChild(plusBtn);
  
      productCard.appendChild(quantityDiv);
  
      const addToCartBtn = document.createElement('button');
      addToCartBtn.classList.add('add-to-cart-btn');
      addToCartBtn.innerText = 'Add to Cart';
      addToCartBtn.addEventListener('click', () => addToCart(product.title, parseInt(quantityInput.value)));
  
      const buyNowBtn = document.createElement('button');
      buyNowBtn.classList.add('buy-now-btn');
      buyNowBtn.innerText = 'Buy Now';
  
      productCard.appendChild(addToCartBtn);
      productCard.appendChild(buyNowBtn);
  
      fruitsCategory.appendChild(productCard);
    }
  }
  
  // Call the function to generate product cards and initialize the page when the page loads
  window.onload = function () {
    initializePage();
    generateProductCards();
  };
  
