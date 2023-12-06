// Sample product data (you can replace this with actual product data from a database)
const products = [
    {
      id: 1,
      title: 'Onion',
      price: 1.0,
      image: 'vegetables/images/onion.jpeg',
    },

    {
        id: 2,
        title: 'Potato',
        price: 2.0,
        image: 'vegetables/images/potato.jpeg',
      },
      {
        id: 3,
        title: 'Tomato',
        price: 5.0,
        image: 'vegetables/images/tomato.jpeg',
      },
      {
        id: 4,
        title: 'Capsicum',
        price: 3.0,
        image: 'vegetables/images/capsicum.jpeg',
      },
      {
        id: 5,
        title: 'Carrot',
        price: 1.0,
        image: 'vegetables/images/carrot.jpeg',
      },
      {
        id: 6,
        title: 'Carrot',
        price: 1.0,
        image: 'vegetables/images/carrot.jpeg',
      },
    // Add more products as needed
  ];

  // Array to store selected products
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
  
    // Log the cart items (you can remove this and implement your own cart functionality)
    console.log(cartItems);
  }
  
  // Rest of the JavaScript code remains the same
  
  // Function to display products on the fruits category page
  function displayFruits() {
    const fruitsCategory = document.querySelector('.products-category');
  
    products.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.title;
  
      const productTitle = document.createElement('h3');
      productTitle.innerText = product.title;
  
      const productPrice = document.createElement('p');
      productPrice.classList.add('price');
      productPrice.innerText = `$${product.price.toFixed(2)}`;
  
      const quantityDiv = document.createElement('div');
      quantityDiv.classList.add('quantity');
  
      const minusBtn = document.createElement('button');
      minusBtn.classList.add('quantity-btn', 'minus-btn');
      minusBtn.innerText = '-';
      minusBtn.addEventListener('click', () => decreaseQuantity(product));
  
      const quantityInput = document.createElement('input');
      quantityInput.type = 'text';
      quantityInput.classList.add('quantity-input');
      quantityInput.value = 1;
      quantityInput.addEventListener('input', () => updateTotalPrice(product, quantityInput.value));
  
      const plusBtn = document.createElement('button');
      plusBtn.classList.add('quantity-btn', 'plus-btn');
      plusBtn.innerText = '+';
      plusBtn.addEventListener('click', () => increaseQuantity(product));
  
      const addToCartBtn = document.createElement('button');
      addToCartBtn.classList.add('add-to-cart-btn');
      addToCartBtn.innerText = 'Add to Cart';
      addToCartBtn.addEventListener('click', () => addToCart(product, quantityInput.value));
  
      const buyNowBtn = document.createElement('button');
      buyNowBtn.classList.add('buy-now-btn');
      buyNowBtn.innerText = 'Buy Now';
      buyNowBtn.addEventListener('click', () => buyNow(product, quantityInput.value));
  
      quantityDiv.appendChild(minusBtn);
      quantityDiv.appendChild(quantityInput);
      quantityDiv.appendChild(plusBtn);
  
      productCard.appendChild(productImage);
      productCard.appendChild(productTitle);
      productCard.appendChild(productPrice);
      productCard.appendChild(quantityDiv);
      productCard.appendChild(addToCartBtn);
      productCard.appendChild(buyNowBtn);
  
      fruitsCategory.appendChild(productCard);
    });
  }
  
  // Function to add a product to the cart
  function addToCart(product, quantity) {
    // Implement cart functionality here (you may use local storage or a state management library)
    console.log(`Added ${quantity} ${product.title}(s) to cart!`);
  }
  
  // Function to handle the "Buy Now" button
  function buyNow(product, quantity) {
    // Redirect to the billing page and pass the selected product data
    window.location.href = `billing.html?productId=${product.id}&quantity=${quantity}`;
  }
  
  // Function to increase quantity
  function increaseQuantity(product) {
    const quantityInput = event.target.parentElement.querySelector('.quantity-input');
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotalPrice(product, quantityInput.value);
  }
  
  // Function to decrease quantity
  function decreaseQuantity(product) {
    const quantityInput = event.target.parentElement.querySelector('.quantity-input');
    const newValue = parseInt(quantityInput.value) - 1;
    quantityInput.value = newValue >= 1 ? newValue : 1;
    updateTotalPrice(product, quantityInput.value);
  }
  
  // Function to update the total price based on quantity
  function updateTotalPrice(product, quantity) {
    const totalPrice = product.price * parseInt(quantity);
    const productCard = event.target.closest('.product-card');
    const priceElement = productCard.querySelector('.price');
    priceElement.innerText = `$${totalPrice.toFixed(2)}`;
  }
  
  // Display products on the fruits category page
  displayFruits();
  
