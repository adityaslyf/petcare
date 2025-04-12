// Booking and checkout functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeBookingSystem();
    initializeCheckoutSystem();
});

// Initialize the booking system
function initializeBookingSystem() {
    const bookingButtons = document.querySelectorAll('.btn.primary-btn');
    
    bookingButtons.forEach(button => {
        // Check if this is a booking-related button
        if (button.textContent.includes('Book') || button.innerHTML.includes('calendar')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openBookingModal();
            });
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('booking-modal');
        if (modal && e.target === modal) {
            closeBookingModal();
        }
    });

    // Add event for emergency care buttons
    const emergencyButtons = document.querySelectorAll('.btn.secondary-btn');
    emergencyButtons.forEach(button => {
        if (button.textContent.includes('Emergency') || button.innerHTML.includes('first-aid')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                alert('For pet emergencies, please call our 24/7 emergency line: (123) 555-9999');
            });
        }
    });

    // Check if booking form exists on the page
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmission);
    }
}

// Create booking modal dynamically
function createBookingModal() {
    // Check if modal already exists
    if (document.getElementById('booking-modal')) {
        return;
    }
    
    const modalHtml = `
        <div id="booking-modal" class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2><i class="far fa-calendar-alt"></i> Book an Appointment</h2>
                <form id="booking-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="owner-name"><i class="fas fa-user"></i> Your Name</label>
                            <input type="text" id="owner-name" class="input-field" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <label for="pet-name-booking"><i class="fas fa-paw"></i> Pet's Name</label>
                            <input type="text" id="pet-name-booking" class="input-field" placeholder="Pet's Name" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="booking-email"><i class="fas fa-envelope"></i> Email Address</label>
                            <input type="email" id="booking-email" class="input-field" placeholder="Email" required>
                        </div>
                        <div class="form-group">
                            <label for="booking-phone"><i class="fas fa-phone"></i> Phone Number</label>
                            <input type="tel" id="booking-phone" class="input-field" placeholder="Phone" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="booking-service"><i class="fas fa-concierge-bell"></i> Service Type</label>
                            <select id="booking-service" class="input-field" required>
                                <option value="" disabled selected>Select a service</option>
                                <option value="vet-checkup">Regular Checkup</option>
                                <option value="vaccination">Vaccination</option>
                                <option value="grooming">Grooming</option>
                                <option value="dental">Dental Cleaning</option>
                                <option value="surgery">Surgery Consultation</option>
                                <option value="boarding">Boarding</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="booking-date"><i class="fas fa-calendar-day"></i> Preferred Date</label>
                            <input type="date" id="booking-date" class="input-field" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="booking-time"><i class="fas fa-clock"></i> Preferred Time</label>
                            <select id="booking-time" class="input-field" required>
                                <option value="" disabled selected>Select a time</option>
                                <option value="9:00">9:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="13:00">1:00 PM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="15:00">3:00 PM</option>
                                <option value="16:00">4:00 PM</option>
                                <option value="17:00">5:00 PM</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="booking-pet-type"><i class="fas fa-paw"></i> Pet Type</label>
                            <select id="booking-pet-type" class="input-field" required>
                                <option value="" disabled selected>Select pet type</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="bird">Bird</option>
                                <option value="small-animal">Small Animal</option>
                                <option value="reptile">Reptile</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="booking-notes"><i class="fas fa-comment"></i> Notes/Special Requirements</label>
                        <textarea id="booking-notes" class="textarea-field" placeholder="Any special requirements or concerns"></textarea>
                    </div>
                    
                    <button type="submit" class="btn primary-btn"><i class="fas fa-check-circle"></i> Confirm Booking</button>
                </form>
            </div>
        </div>
    `;
    
    // Append to document body
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
    
    // Add close button event
    document.querySelector('.close-button').addEventListener('click', closeBookingModal);
    
    // Set minimum date to today
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const todayStr = yyyy + '-' + mm + '-' + dd;
        dateInput.min = todayStr;
    }
}

// Open booking modal
function openBookingModal() {
    createBookingModal();
    const modal = document.getElementById('booking-modal');
    modal.style.display = 'block';
    
    // Add animation class
    setTimeout(() => {
        document.querySelector('.modal-content').classList.add('show-modal');
    }, 10);
}

// Close booking modal
function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        document.querySelector('.modal-content').classList.remove('show-modal');
        
        // Delay removal to allow animation to complete
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Handle booking form submission
function handleBookingSubmission(e) {
    e.preventDefault();
    
    // Get form values
    const ownerName = document.getElementById('owner-name').value;
    const petName = document.getElementById('pet-name-booking').value;
    const email = document.getElementById('booking-email').value;
    const phone = document.getElementById('booking-phone').value;
    const service = document.getElementById('booking-service').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    
    // Simple validation
    if (!ownerName || !petName || !email || !phone || !service || !date || !time) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show success message
    document.querySelector('.modal-content').innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle success-icon"></i>
            <h2>Booking Confirmed!</h2>
            <p>Thank you, ${ownerName}. Your appointment for ${petName} has been scheduled for ${date} at ${time}.</p>
            <p>We've sent a confirmation email to ${email}.</p>
            <p class="reminder">Please arrive 10 minutes before your scheduled time.</p>
            <button class="btn primary-btn close-success"><i class="fas fa-times"></i> Close</button>
        </div>
    `;
    
    // Add event listener to close button
    document.querySelector('.close-success').addEventListener('click', closeBookingModal);
    
    // In a real application, this would send the data to a server
    console.log('Booking submission:', {
        ownerName,
        petName,
        email,
        phone,
        service,
        date,
        time
    });
}

// Initialize the checkout system for the e-store
function initializeCheckoutSystem() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.btn');
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product information from parent card
                const card = this.closest('.product-card');
                if (card) {
                    const productName = card.querySelector('h3').textContent;
                    const productPrice = card.querySelector('.product-price').textContent;
                    
                    addToCart(productName, productPrice);
                    updateCartCount();
                    
                    // Show confirmation
                    showNotification(`${productName} added to cart`);
                }
            });
        }
    });
    
    // View cart button
    const viewCartButton = document.getElementById('view-cart-button');
    if (viewCartButton) {
        viewCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            openCartModal();
        });
    }
    
    // Add cart button to e-store page if it doesn't exist
    const eStorePage = window.location.pathname.includes('e-store');
    if (eStorePage) {
        const container = document.querySelector('.container');
        
        // Check if cart elements already exist
        if (!document.querySelector('.cart-container')) {
            const cartHtml = `
                <div class="cart-container">
                    <div class="cart-icon" id="cart-icon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">0</span>
                    </div>
                    <div class="cart-button">
                        <button id="view-cart-button" class="btn primary-btn">
                            <i class="fas fa-shopping-cart"></i> View Cart
                        </button>
                    </div>
                </div>
            `;
            
            // Create and insert before the first child
            const cartElement = document.createElement('div');
            cartElement.innerHTML = cartHtml;
            
            if (container && container.firstChild) {
                container.insertBefore(cartElement, container.firstChild);
            }
            
            // Add event listener to new button
            document.getElementById('view-cart-button').addEventListener('click', function(e) {
                e.preventDefault();
                openCartModal();
            });
            
            // Add event listener to cart icon
            document.getElementById('cart-icon').addEventListener('click', function(e) {
                e.preventDefault();
                openCartModal();
            });
        }
        
        // Update cart count on page load
        updateCartCount();
    }
}

// Add product to cart
function addToCart(productName, productPrice) {
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('petcare-cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex >= 0) {
        // Increment quantity if product already in cart
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('petcare-cart', JSON.stringify(cart));
}

// Update cart count display
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        // Get current cart from localStorage
        const cart = JSON.parse(localStorage.getItem('petcare-cart')) || [];
        
        // Calculate total quantity
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update display
        cartCountElement.textContent = totalItems;
        
        // Add active class if there are items
        if (totalItems > 0) {
            cartCountElement.classList.add('active');
        } else {
            cartCountElement.classList.remove('active');
        }
    }
}

// Create and open cart modal
function openCartModal() {
    // Get current cart from localStorage
    const cart = JSON.parse(localStorage.getItem('petcare-cart')) || [];
    
    // Calculate total price
    let totalPrice = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        totalPrice += price * item.quantity;
    });
    
    // Create modal HTML
    const modalHtml = `
        <div id="cart-modal" class="modal">
            <div class="modal-content cart-modal-content">
                <span class="close-button">&times;</span>
                <h2><i class="fas fa-shopping-cart"></i> Your Shopping Cart</h2>
                ${cart.length === 0 ? 
                    `<div class="empty-cart">
                        <i class="fas fa-shopping-cart empty-cart-icon"></i>
                        <p>Your cart is empty</p>
                        <a href="e-store.html" class="btn secondary-btn">Continue Shopping</a>
                    </div>` : 
                    `<div class="cart-items">
                        <div class="cart-header">
                            <span class="cart-header-item">Product</span>
                            <span class="cart-header-item">Price</span>
                            <span class="cart-header-item">Quantity</span>
                            <span class="cart-header-item">Total</span>
                            <span class="cart-header-item"></span>
                        </div>
                        ${cart.map((item, index) => {
                            const price = parseFloat(item.price.replace('$', ''));
                            const itemTotal = price * item.quantity;
                            
                            return `
                                <div class="cart-item" data-index="${index}">
                                    <span class="cart-item-name">${item.name}</span>
                                    <span class="cart-item-price">${item.price}</span>
                                    <div class="cart-item-quantity">
                                        <button class="quantity-btn minus-btn"><i class="fas fa-minus"></i></button>
                                        <span class="quantity-value">${item.quantity}</span>
                                        <button class="quantity-btn plus-btn"><i class="fas fa-plus"></i></button>
                                    </div>
                                    <span class="cart-item-total">$${itemTotal.toFixed(2)}</span>
                                    <button class="remove-item-btn"><i class="fas fa-trash"></i></button>
                                </div>
                            `;
                        }).join('')}
                        
                        <div class="cart-summary">
                            <div class="cart-total">
                                <span>Total:</span>
                                <span class="total-price">$${totalPrice.toFixed(2)}</span>
                            </div>
                            <div class="cart-actions">
                                <button class="btn secondary-btn clear-cart-btn">
                                    <i class="fas fa-trash"></i> Clear Cart
                                </button>
                                <button class="btn primary-btn checkout-btn">
                                    <i class="fas fa-credit-card"></i> Checkout
                                </button>
                            </div>
                        </div>
                    </div>`
                }
            </div>
        </div>
    `;
    
    // Add modal to document
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
    
    // Show modal
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
    
    // Add animation class
    setTimeout(() => {
        document.querySelector('.cart-modal-content').classList.add('show-modal');
    }, 10);
    
    // Add event listeners
    document.querySelector('.close-button').addEventListener('click', closeCartModal);
    
    // Close when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCartModal();
        }
    });
    
    if (cart.length > 0) {
        // Add event listeners for cart actions
        // Plus button
        document.querySelectorAll('.plus-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemIndex = parseInt(this.closest('.cart-item').dataset.index);
                incrementQuantity(itemIndex);
            });
        });
        
        // Minus button
        document.querySelectorAll('.minus-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemIndex = parseInt(this.closest('.cart-item').dataset.index);
                decrementQuantity(itemIndex);
            });
        });
        
        // Remove button
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemIndex = parseInt(this.closest('.cart-item').dataset.index);
                removeCartItem(itemIndex);
            });
        });
        
        // Clear cart button
        document.querySelector('.clear-cart-btn').addEventListener('click', clearCart);
        
        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', proceedToCheckout);
    }
}

// Close cart modal
function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        document.querySelector('.cart-modal-content').classList.remove('show-modal');
        
        // Delay removal to allow animation to complete
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Increment item quantity
function incrementQuantity(index) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('petcare-cart')) || [];
    
    // Increment quantity
    if (cart[index]) {
        cart[index].quantity += 1;
    }
    
    // Save updated cart
    localStorage.setItem('petcare-cart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
}

// Decrement item quantity
function decrementQuantity(index) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('petcare-cart')) || [];
    
    // Decrement quantity
    if (cart[index] && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    
    // Save updated cart
    localStorage.setItem('petcare-cart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
}

// Remove item from cart
function removeCartItem(index) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('petcare-cart')) || [];
    
    // Remove item
    if (cart[index]) {
        cart.splice(index, 1);
    }
    
    // Save updated cart
    localStorage.setItem('petcare-cart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
    updateCartCount();
    
    // If cart is empty, close modal
    if (cart.length === 0) {
        closeCartModal();
        setTimeout(() => {
            openCartModal();
        }, 300);
    }
}

// Clear all items from cart
function clearCart() {
    // Clear cart in localStorage
    localStorage.setItem('petcare-cart', JSON.stringify([]));
    
    // Update display
    updateCartCount();
    
    // Close and reopen modal
    closeCartModal();
    setTimeout(() => {
        openCartModal();
    }, 300);
}

// Update cart display
function updateCartDisplay() {
    // Get current cart
    const cart = JSON.parse(localStorage.getItem('petcare-cart')) || [];
    
    // Calculate total price
    let totalPrice = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        totalPrice += price * item.quantity;
    });
    
    // Update quantity display for each item
    cart.forEach((item, index) => {
        const itemElement = document.querySelector(`.cart-item[data-index="${index}"]`);
        if (itemElement) {
            const quantityValue = itemElement.querySelector('.quantity-value');
            
            if (quantityValue) {
                quantityValue.textContent = item.quantity;
            }
            
            // Update item total
            const price = parseFloat(item.price.replace('$', ''));
            const itemTotal = price * item.quantity;
            
            const totalElement = itemElement.querySelector('.cart-item-total');
            if (totalElement) {
                totalElement.textContent = `$${itemTotal.toFixed(2)}`;
            }
        }
    });
    
    // Update total price
    const totalElement = document.querySelector('.total-price');
    if (totalElement) {
        totalElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
    
    // Update cart count
    updateCartCount();
}

// Proceed to checkout
function proceedToCheckout() {
    // Get current cart
    const cart = JSON.parse(localStorage.getItem('petcare-cart')) || [];
    
    // Calculate total price
    let totalPrice = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        totalPrice += price * item.quantity;
    });
    
    // Replace modal content with checkout form
    document.querySelector('.cart-modal-content').innerHTML = `
        <span class="close-button">&times;</span>
        <h2><i class="fas fa-credit-card"></i> Checkout</h2>
        <div class="checkout-container">
            <div class="checkout-summary">
                <h3>Order Summary</h3>
                <div class="checkout-items">
                    ${cart.map(item => {
                        const price = parseFloat(item.price.replace('$', ''));
                        const itemTotal = price * item.quantity;
                        
                        return `
                            <div class="checkout-item">
                                <span class="checkout-item-name">${item.name} x${item.quantity}</span>
                                <span class="checkout-item-total">$${itemTotal.toFixed(2)}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="checkout-total">
                    <span>Total:</span>
                    <span class="total-price">$${totalPrice.toFixed(2)}</span>
                </div>
            </div>
            
            <form id="checkout-form">
                <h3>Shipping Information</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="checkout-name"><i class="fas fa-user"></i> Full Name</label>
                        <input type="text" id="checkout-name" class="input-field" required>
                    </div>
                    <div class="form-group">
                        <label for="checkout-email"><i class="fas fa-envelope"></i> Email</label>
                        <input type="email" id="checkout-email" class="input-field" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="checkout-address"><i class="fas fa-map-marker-alt"></i> Address</label>
                        <input type="text" id="checkout-address" class="input-field" required>
                    </div>
                    <div class="form-group">
                        <label for="checkout-city"><i class="fas fa-city"></i> City</label>
                        <input type="text" id="checkout-city" class="input-field" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="checkout-state"><i class="fas fa-map"></i> State</label>
                        <input type="text" id="checkout-state" class="input-field" required>
                    </div>
                    <div class="form-group">
                        <label for="checkout-zip"><i class="fas fa-map-pin"></i> ZIP Code</label>
                        <input type="text" id="checkout-zip" class="input-field" required>
                    </div>
                </div>
                
                <h3>Payment Information</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="checkout-card-name"><i class="fas fa-user"></i> Name on Card</label>
                        <input type="text" id="checkout-card-name" class="input-field" required>
                    </div>
                    <div class="form-group">
                        <label for="checkout-card-number"><i class="fas fa-credit-card"></i> Card Number</label>
                        <input type="text" id="checkout-card-number" class="input-field" placeholder="**** **** **** ****" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="checkout-expiry"><i class="fas fa-calendar"></i> Expiration Date</label>
                        <input type="text" id="checkout-expiry" class="input-field" placeholder="MM/YY" required>
                    </div>
                    <div class="form-group">
                        <label for="checkout-cvv"><i class="fas fa-lock"></i> CVV</label>
                        <input type="text" id="checkout-cvv" class="input-field" placeholder="***" required>
                    </div>
                </div>
                
                <div class="checkout-actions">
                    <button type="button" class="btn secondary-btn back-to-cart-btn">
                        <i class="fas fa-arrow-left"></i> Back to Cart
                    </button>
                    <button type="submit" class="btn primary-btn place-order-btn">
                        <i class="fas fa-check-circle"></i> Place Order
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Add event listeners
    document.querySelector('.close-button').addEventListener('click', closeCartModal);
    document.querySelector('.back-to-cart-btn').addEventListener('click', function() {
        closeCartModal();
        setTimeout(() => {
            openCartModal();
        }, 300);
    });
    
    // Add event listener for checkout form
    document.getElementById('checkout-form').addEventListener('submit', completeOrder);
}

// Complete order
function completeOrder(e) {
    e.preventDefault();
    
    // Replace modal content with order confirmation
    document.querySelector('.cart-modal-content').innerHTML = `
        <div class="order-confirmation">
            <i class="fas fa-check-circle success-icon"></i>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order. A confirmation email has been sent to your email address.</p>
            <p>Order #: PET-${Math.floor(Math.random() * 100000)}</p>
            <button class="btn primary-btn close-order-btn">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
    `;
    
    // Add event listener for close button
    document.querySelector('.close-order-btn').addEventListener('click', function() {
        // Clear cart
        localStorage.setItem('petcare-cart', JSON.stringify([]));
        
        // Update cart count
        updateCartCount();
        
        // Close modal
        closeCartModal();
    });
}

// Show notification
function showNotification(message) {
    // Check if notification element already exists
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        // Create notification element
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set notification message
    notification.textContent = message;
    
    // Show notification
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
} 