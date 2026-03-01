// Wait for DOM to be fully loaded
$(document).ready(function() {
    
    // ==================== Global Variables ====================
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Sample Products Data
    const products = [
        {
            id: 1,
            name: "Samsung 4K Smart TV 55-inch",
            category: "Electronics",
            price: 599.99,
            originalPrice: 799.99,
            rating: 4.5,
            reviews: 234,
            image: "images/p-1 tv.jpg",
            badge: "Deal",
            stock: 15
        },
        {
            id: 2,
            name: "Nike Air Max Running Shoes",
            category: "Fashion",
            price: 89.99,
            originalPrice: 129.99,
            rating: 4.3,
            reviews: 567,
            image: "images/p-2 shoes.webp",
            badge: "New",
            stock: 25
        },
        {
            id: 3,
            name: "Dyson Vacuum Cleaner",
            category: "Home & Kitchen",
            price: 299.99,
            originalPrice: 399.99,
            rating: 4.8,
            reviews: 123,
            image: "https://via.placeholder.com/300x300/146eb4/ffffff?text=Dyson",
            badge: "Top Rated",
            stock: 8
        },
        {
            id: 4,
            name: "iPhone 15 Pro Max",
            category: "Electronics",
            price: 1199.99,
            originalPrice: 1299.99,
            rating: 5,
            reviews: 456,
            image: "images/p-4 iphone2.webp",
            badge: "New",
            stock: 10
        },
        {
            id: 5,
            name: "Leather Jacket Men",
            category: "Fashion",
            price: 149.99,
            originalPrice: 249.99,
            rating: 4.2,
            reviews: 89,
            image: "https://via.placeholder.com/300x300/ff9900/ffffff?text=Jacket",
            badge: "Sale",
            stock: 12
        },
        {
            id: 6,
            name: "Coffee Maker Machine",
            category: "Home & Kitchen",
            price: 79.99,
            originalPrice: 149.99,
            rating: 4.4,
            reviews: 67,
            image: "images/p-6 coffee.webp",
            badge: "Deal",
            stock: 20
        },
        {
            id: 7,
            name: "The Great Gatsby Book",
            category: "Books",
            price: 12.99,
            originalPrice: 19.99,
            rating: 4.6,
            reviews: 345,
            image: "images/p-7 book.webp",
            badge: "Bestseller",
            stock: 50
        },
        {
            id: 8,
            name: "Yoga Mat Premium",
            category: "Sports",
            price: 29.99,
            originalPrice: 49.99,
            rating: 4.5,
            reviews: 178,
            image: "images/p-8 yogamate.jpg",
            badge: "Hot",
            stock: 30
        }
    ];

    // ==================== Initialize Functions ====================
    updateCartBadge();
    loadProducts();
    initCountdown();
    stickyNavbar();
    handleSearch();
    handleNewsletter();
    
    // ==================== Load Products by Section ====================
    function loadProducts() {
        // Best Deals (first 4 products)
        loadProductSection('#bestDealsProducts', products.slice(0, 4));
        
        // Top Rated (sorted by rating)
        const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
        loadProductSection('#topRatedProducts', topRated);
        
        // New Arrivals (last 4 products)
        loadProductSection('#newArrivalsProducts', products.slice(4, 8));
    }

    // ==================== Load Product Section ====================
    function loadProductSection(selector, productsArray) {
        let html = '';
        productsArray.forEach(product => {
            html += createProductCard(product);
        });
        $(selector).html(html);
    }

    // ==================== Create Product Card ====================
    function createProductCard(product) {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        const stars = getStarRating(product.rating);
        
        return `
            <div class="col-md-3 col-sm-6">
                <div class="product-card">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <span class="wishlist-icon" data-product-id="${product.id}">
                        <i class="${wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i>
                    </span>
                    <div class="product-image">
                        <a href="product.html?id=${product.id}">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid">
                        </a>
                    </div>
                    <div class="product-details">
                        <h6 class="product-title">
                            <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">
                                ${product.name}
                            </a>
                        </h6>
                        <div class="product-rating">
                            <span class="stars">${stars}</span>
                            <span class="rating-count">(${product.reviews})</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">$${product.price}</span>
                            <span class="original-price">$${product.originalPrice}</span>
                            <span class="discount">(${discount}% off)</span>
                        </div>
                        <button class="btn-add-to-cart" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ==================== Get Star Rating HTML ====================
    function getStarRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    // ==================== Flash Sale Countdown ====================
    function initCountdown() {
        // Set the date we're counting down to (24 hours from now)
        const countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
        
        // Update the countdown every 1 second
        const countdownTimer = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            $('.days').text(days < 10 ? '0' + days : days);
            $('.hours').text(hours < 10 ? '0' + hours : hours);
            $('.minutes').text(minutes < 10 ? '0' + minutes : minutes);
            $('.seconds').text(seconds < 10 ? '0' + seconds : seconds);
            
            // If the countdown is over, display expired
            if (distance < 0) {
                clearInterval(countdownTimer);
                $('.days, .hours, .minutes, .seconds').text('00');
                $('.flash-sale .btn').text('Sale Expired').prop('disabled', true);
            }
        }, 1000);
    }

    // ==================== Sticky Navbar on Scroll ====================
    function stickyNavbar() {
        const navbar = $('.navbar');
        const sticky = navbar.offset().top;
        
        $(window).scroll(function() {
            if ($(window).scrollTop() >= sticky) {
                navbar.addClass('sticky');
            } else {
                navbar.removeClass('sticky');
            }
        });
    }

    // ==================== Update Cart Badge ====================
    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        $('.cart-badge').text(totalItems);
    }

    // ==================== Add to Cart Functionality ====================
    $(document).on('click', '.btn-add-to-cart', function(e) {
        e.preventDefault();
        const productId = $(this).data('product-id');
        const product = products.find(p => p.id === productId);
        
        if (product) {
            addToCart(product);
            
            // Animation feedback
            $(this).html('<i class="fas fa-check me-2"></i>Added!');
            setTimeout(() => {
                $(this).html('<i class="fas fa-shopping-cart me-2"></i>Add to Cart');
            }, 1000);
        }
    });

    // ==================== Add to Cart Function ====================
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        
        // Show success message
        showNotification('Product added to cart!', 'success');
    }

    // ==================== Wishlist Toggle ====================
    $(document).on('click', '.wishlist-icon', function(e) {
        e.preventDefault();
        const productId = $(this).data('product-id');
        const icon = $(this).find('i');
        
        if (wishlist.includes(productId)) {
            wishlist = wishlist.filter(id => id !== productId);
            icon.removeClass('fas').addClass('far');
            showNotification('Removed from wishlist', 'info');
        } else {
            wishlist.push(productId);
            icon.removeClass('far').addClass('fas');
            showNotification('Added to wishlist!', 'success');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    });

    // ==================== Show Notification ====================
    function showNotification(message, type) {
        // Create notification element if it doesn't exist
        if ($('#notification').length === 0) {
            $('body').append('<div id="notification" class="position-fixed top-0 end-0 p-3" style="z-index: 9999;"></div>');
        }
        
        const alertClass = type === 'success' ? 'alert-success' : 'alert-info';
        const notification = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        $('#notification').append(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            $('#notification .alert').first().alert('close');
        }, 3000);
    }

    // ==================== Search Functionality ====================
    function handleSearch() {
        $('#searchForm').submit(function(e) {
            e.preventDefault();
            const searchTerm = $(this).find('input').val();
            const category = $('#searchCategory').val();
            
            if (searchTerm) {
                // Redirect to shop page with search parameters
                window.location.href = `shop.html?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`;
            }
        });
    }

    // ==================== Newsletter Subscription ====================
    function handleNewsletter() {
        $('#newsletterForm').submit(function(e) {
            e.preventDefault();
            const email = $(this).find('input[type="email"]').val();
            
            if (email) {
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
                $(this).find('input[type="email"]').val('');
            }
        });
    }

    // ==================== Smooth Scrolling ====================
    $('a[href*="#"]').on('click', function(e) {
        if ($(this).attr('href').startsWith('#')) {
            e.preventDefault();
            const target = $(this.hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
            }
        }
    });

    // ==================== Quantity Update in Cart ====================
    $(document).on('click', '.qty-plus', function() {
        const input = $(this).siblings('input');
        const currentVal = parseInt(input.val());
        input.val(currentVal + 1).trigger('change');
    });

    $(document).on('click', '.qty-minus', function() {
        const input = $(this).siblings('input');
        const currentVal = parseInt(input.val());
        if (currentVal > 1) {
            input.val(currentVal - 1).trigger('change');
        }
    });

    // ==================== Remove from Cart ====================
    $(document).on('click', '.btn-remove', function() {
        const row = $(this).closest('tr');
        const productId = row.data('product-id');
        
        // Remove from cart array
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Remove row with animation
        row.fadeOut(400, function() {
            $(this).remove();
            updateCartBadge();
            updateCartSummary();
            
            // Show empty cart message if cart is empty
            if ($('.cart-table tbody tr').length === 0) {
                $('.cart-table').after('<div class="alert alert-info text-center">Your cart is empty!</div>');
                $('.cart-table').remove();
            }
        });
    });

    // ==================== Update Cart Summary ====================
    function updateCartSummary() {
        let subtotal = 0;
        $('.cart-table tbody tr').each(function() {
            const price = parseFloat($(this).find('.cart-price').data('price'));
            const quantity = parseInt($(this).find('.cart-quantity input').val());
            const total = price * quantity;
            subtotal += total;
            $(this).find('.cart-total').text('$' + total.toFixed(2));
        });
        
        const shipping = subtotal > 50 ? 0 : 5.99;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;
        
        $('.summary-subtotal').text('$' + subtotal.toFixed(2));
        $('.summary-shipping').text(shipping === 0 ? 'Free' : '$' + shipping.toFixed(2));
        $('.summary-tax').text('$' + tax.toFixed(2));
        $('.summary-total').text('$' + total.toFixed(2));
    }

    // ==================== Form Validation ====================
    function validateForm(formId) {
        let isValid = true;
        $(formId + ' [required]').each(function() {
            if (!$(this).val()) {
                $(this).addClass('error');
                isValid = false;
                
                // Add error message
                if (!$(this).next('.error-message').length) {
                    $(this).after('<span class="error-message">This field is required</span>');
                }
            } else {
                $(this).removeClass('error');
                $(this).next('.error-message').remove();
            }
        });
        
        return isValid;
    }

    // ==================== Login Form Validation ====================
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        if (validateForm('#loginForm')) {
            // Simulate login
            showNotification('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    });

    // ==================== Register Form Validation ====================
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        if (validateForm('#registerForm')) {
            const password = $('#password').val();
            const confirmPassword = $('#confirmPassword').val();
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            // Simulate registration
            showNotification('Registration successful! Redirecting to login...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }
    });

    // ==================== Contact Form Submission ====================
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        if (validateForm('#contactForm')) {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            $(this).trigger('reset');
        }
    });

    // ==================== Load Product Details Page ====================
    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === productId);
        
        if (product) {
            loadProductDetails(product);
        }
    }

    // ==================== Load Product Details ====================
    function loadProductDetails(product) {
        // Update page title
        $('title').text(product.name + ' | ShopEase');
        
        // Update product info
        $('.product-info h1').text(product.name);
        $('.current-price').text('$' + product.price);
        $('.original-price').text('$' + product.originalPrice);
        
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        $('.discount').text('(' + discount + '% off)');
        
        $('.stars').html(getStarRating(product.rating));
        $('.rating-count').text('(' + product.reviews + ' reviews)');
        
        if (product.stock > 0) {
            $('.stock-status').html('<span class="in-stock"><i class="fas fa-check-circle me-2"></i>In Stock</span>');
        } else {
            $('.stock-status').html('<span class="out-of-stock"><i class="fas fa-times-circle me-2"></i>Out of Stock</span>');
        }
        
        // Set main image
        $('.main-image img').attr('src', product.image).attr('alt', product.name);
        
        // Load thumbnails (using same image for demo)
        for (let i = 1; i <= 4; i++) {
            $('.thumbnail-gallery').append(`
                <div class="thumbnail ${i === 1 ? 'active' : ''}">
                    <img src="${product.image}" alt="Thumbnail ${i}">
                </div>
            `);
        }
        
        // Set product ID on add to cart button
        $('#addToCartBtn').data('product-id', product.id);
        $('#buyNowBtn').data('product-id', product.id);
    }

    // ==================== Thumbnail Gallery ====================
    $(document).on('click', '.thumbnail', function() {
        $('.thumbnail').removeClass('active');
        $(this).addClass('active');
        const imgSrc = $(this).find('img').attr('src');
        $('.main-image img').attr('src', imgSrc);
    });

    // ==================== Load Shop Page ====================
    if (window.location.pathname.includes('shop.html')) {
        loadShopPage();
    }

    // ==================== Load Shop Page Content ====================
    function loadShopPage() {
        let html = '';
        products.forEach(product => {
            html += createProductCard(product);
        });
        $('#productsGrid').html(html);
        
        // Initialize price range slider
        initPriceRange();
    }

    // ==================== Price Range Slider ====================
    function initPriceRange() {
        const minPrice = 0;
        const maxPrice = 2000;
        
        $('#priceRange').slider({
            range: true,
            min: minPrice,
            max: maxPrice,
            values: [0, 1000],
            slide: function(event, ui) {
                $('#minPrice').val(ui.values[0]);
                $('#maxPrice').val(ui.values[1]);
                filterProducts();
            }
        });
        
        $('#minPrice').val($('#priceRange').slider('values', 0));
        $('#maxPrice').val($('#priceRange').slider('values', 1));
    }

    // ==================== Filter Products ====================
    function filterProducts() {
        const minPrice = parseFloat($('#minPrice').val());
        const maxPrice = parseFloat($('#maxPrice').val());
        const selectedCategories = [];
        const selectedRating = $('input[name="rating"]:checked').val();
        
        $('.category-filter input:checked').each(function() {
            selectedCategories.push($(this).val());
        });
        
        const filteredProducts = products.filter(product => {
            // Price filter
            if (product.price < minPrice || product.price > maxPrice) return false;
            
            // Category filter
            if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
            
            // Rating filter
            if (selectedRating && product.rating < parseFloat(selectedRating)) return false;
            
            return true;
        });
        
        // Update products grid
        let html = '';
        filteredProducts.forEach(product => {
            html += createProductCard(product);
        });
        $('#productsGrid').html(html);
        
        // Update results count
        $('#resultsCount').text(filteredProducts.length + ' results found');
    }

    // ==================== Sort Products ====================
    $('#sortBy').change(function() {
        const sortBy = $(this).val();
        let sortedProducts = [...products];
        
        switch(sortBy) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Default sorting (by id)
                sortedProducts.sort((a, b) => a.id - b.id);
        }
        
        let html = '';
        sortedProducts.forEach(product => {
            html += createProductCard(product);
        });
        $('#productsGrid').html(html);
    });

    // ==================== Filter Events ====================
    $('.category-filter input, input[name="rating"]').change(filterProducts);
    $('#minPrice, #maxPrice').on('input', function() {
        const min = parseFloat($('#minPrice').val());
        const max = parseFloat($('#maxPrice').val());
        $('#priceRange').slider('values', [min, max]);
        filterProducts();
    });

    // ==================== Apply Filters Button ====================
    $('#applyFilters').click(filterProducts);

    // ==================== Clear Filters ====================
    $('#clearFilters').click(function() {
        $('.category-filter input').prop('checked', false);
        $('input[name="rating"]').prop('checked', false);
        $('#priceRange').slider('values', [0, 1000]);
        $('#minPrice').val(0);
        $('#maxPrice').val(1000);
        filterProducts();
    });
});