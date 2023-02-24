$(document).ready(function () {

    // Add the cart to the page.
    var content = (`
    <div class="polygon-pay-cart">
        <span class="close-polygon-pay-cart">
            <i class="fas fa-window-close">
                <svg width="24px" height="24px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
            </i>
        </span>
        <h2>Your Cart</h2>
        <h3 class="duplicate-item-in-cart">Item already in cart!</h3>
        <div class="polygon-pay-cart-content"></div>
        <div class="polygon-pay-cart-footer">
            <h3 class="cart-total-price"></h3>
            <button class="checkout-button banner-btn">Checkout</button>
        </div>
    </div>
    `);

    $(".polygonpayjs").append(content);
    $(".duplicate-item-in-cart").hide();

    // Close the cart when the escape key is pressed.
    $(document).keydown(function (e) {
        if (e.key === "Escape") {
            $(".polygon-pay-cart").removeClass("showpolygon-pay-cart");
        }
    });

    // Open the cart when the button is clicked.
    function addItemToCart(price, url, description, imageSrc, title, quantity) {
        var cartRowContents = `
        <div class="polygon-pay-cart-item">
            <img class="item-image" src="${imageSrc}" alt="product">
            <div>
                <h4 class="item-title">${title}</h4>
                <h5 class="item-price">$${price}</h5>
                <span class="remove-item">
                    <svg width="14px" height="14px" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" stroke-width="2"></path> <path d="M19.5 5H4.5" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" stroke-width="2"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                    Remove
                </span>
            </div>
            <div>
                <i class="fas fa-chevron-up">
                    <svg width="18px" height="18px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>
                </i>
                <p class="item-amount">${quantity ? quantity : 1}</p>
                <i class="fas fa-chevron-down">
                    <svg width="18px" height="18px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                </i>
            </div>
        </div>
        `

        if ($(`.polygon-pay-cart-item:contains(${title})`).length) {
            $(".duplicate-item-in-cart").show();
            setTimeout(function () {
                $(".duplicate-item-in-cart").hide();
            }, 2000);
            updateCartTotal();
        } else {
            $(".polygon-pay-cart-content").append(cartRowContents);
            updateCartTotal();
        }
    }

    // Close the cart when the close button is clicked on the cart
    $(".polygon-pay-cart").on("click", ".close-polygon-pay-cart", function () {
        $(".polygon-pay-cart").removeClass("showpolygon-pay-cart");
    });

    // Remove an item from the cart when the remove button is clicked on the item in the cart
    $(".polygon-pay-cart-content").on("click", ".remove-item", function () {
        $(this).closest(".polygon-pay-cart-item").remove();
        removeItemLocalStorage($(this).closest(".polygon-pay-cart-item").find(".item-title").html());
        updateCartTotal();

        if ($(".polygon-pay-cart-content").children().length === 0) {
            $(".polygon-pay-cart").removeClass("showpolygon-pay-cart");
        }
    });

    // Increase or decrease the amount of an item in the cart when the up or down arrow is clicked on the item in the cart
    $(".polygon-pay-cart-content").on("click", ".fa-chevron-up, .fa-chevron-down", function () {
        var $this = $(this);
        var $input = $this.closest("div").find("p");
        var value = parseInt($input.html());
        if ($this.hasClass("fa-chevron-up")) {
            value = value + 1;
            updateLocalStorageQuantity($this.closest(".polygon-pay-cart-item").find(".item-title").html(), value);
        } else {
            value = value - 1;
            if (value < 1) {
                value = 1;
            }
            updateLocalStorageQuantity($this.closest(".polygon-pay-cart-item").find(".item-title").html(), value);
        }
        $input.html(value);
        updateCartTotal();
    });

    // Update the cart total when an item is added to the cart.
    function updateCartTotal() {
        var total = 0;
        $(".polygon-pay-cart-content .polygon-pay-cart-item").each(function () {
            var price = $(this).find(".item-price").html();
            var quantity = $(this).find(".item-amount").html();
            price = parseFloat(price.replace("$", ""));
            total = total + (price * quantity);
        });
        total = Math.round(total * 100) / 100;
        $(".cart-total-price").html("Total: $" + total);
        saveCart();
    }

    $(".button-add").click(function () {
        var price = $(this).data("price");
        var url = $(this).data("url");
        var description = $(this).data("description");
        var imageSrc = $(this).data("imagesrc");
        var title = $(this).data("title");
        $(".polygon-pay-cart").addClass("showpolygon-pay-cart");
        addItemToCart(price, url, description, imageSrc, title);
        saveCart();
    });

    $(".checkout-button").click(function () {
        $(".polygon-pay-cart-content .polygon-pay-cart-item").each(function () {
            var price = $(this).find(".item-price").html();
            var quantity = $(this).find(".item-amount").html();
            var title = $(this).find(".item-title").html();
            var description = $(this).find(".item-description").html();
            var imageSrc = $(this).find(".item-image").attr("src");
            var item = {
                price: price,
                quantity: quantity,
                title: title,
                description: description,
                imageSrc: imageSrc,
            };
            console.log(item);
        });
    });

    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "[]") {
        var cartArray = JSON.parse(localStorage.getItem("cart"));
        for (var i = 0; i < cartArray.length; i++) {
            var price = cartArray[i].price;
            var price = parseFloat(price.replace("$", ""));
            var url = cartArray[i].url;
            var description = cartArray[i].description;
            var imageSrc = cartArray[i].imageSrc;
            var title = cartArray[i].title;
            var quantity = cartArray[i].quantity;
            addItemToCart(price, url, description, imageSrc, title, quantity);
        }
        // Show the cart when the page loads if there are items in the cart
        $(".polygon-pay-cart").addClass("showpolygon-pay-cart");
    }

    // Remove an item from local storage when the remove button is clicked on the item in the cart
    function removeItemLocalStorage(title) {
        var cartArray = JSON.parse(localStorage.getItem("cart"));
        for (var i = 0; i < cartArray.length; i++) {
            if (cartArray[i].title === title) {
                cartArray.splice(i, 1);
            }
        }
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }

    function updateLocalStorageQuantity(title, quantity) {
        var cartArray = JSON.parse(localStorage.getItem("cart"));
        for (var i = 0; i < cartArray.length; i++) {
            if (cartArray[i].title === title) {
                cartArray[i].quantity = quantity;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }

    // Save each item in the cart to local storage as an array of objects
    function saveCart() {
        var cartArray = [];
        $(".polygon-pay-cart-content .polygon-pay-cart-item").each(function () {
            var price = $(this).find(".item-price").html();
            var quantity = $(this).find(".item-amount").html();
            var title = $(this).find(".item-title").html();
            var description = $(this).find(".item-description").html();
            var imageSrc = $(this).find(".item-image").attr("src");
            var item = {
                price: price,
                quantity: quantity,
                title: title,
                description: description,
                imageSrc: imageSrc,
            };
            cartArray.push(item);
        });
        localStorage.setItem("cart", JSON.stringify(cartArray));
        console.log(cartArray);
    }

});
