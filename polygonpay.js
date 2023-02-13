$(document).ready(function () {
    console.info('PolygonPayJS is ready!')

    var API_Key = $("#polygonpay").attr("data-api-key");

    $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts/${API_Key}`,
        type: 'GET',
        success: function (data) {

            if (data.userId === 1) {
                console.info('Valid API key detected!')

                // Update cart total
                function updateCartTotal() {
                    var cartItemContainer = $(".cart-items");
                    var cartRows = cartItemContainer.children(".cart-row");
                    var total = 0;
                    for (var i = 0; i < cartRows.length; i++) {
                        var cartRow = cartRows[i];
                        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
                        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
                        var price = parseFloat(priceElement.innerText.replace("$", ""));
                        var quantity = quantityElement.value;
                        total = total + (price * quantity);
                    }
                    total = Math.round(total * 100) / 100;
                    $(".cart-total-price").text("$" + total);
                }

                // Add an item to cart
                function addItemToCart(price, url, description, imageSrc, title) {
                    var cartRow = $("<div class='cart-row'></div>");
                    var cartItems = $(".cart-items");
                    var cartItemNames = cartItems.find(".cart-item-title");
                    for (var i = 0; i < cartItemNames.length; i++) {
                        if (cartItemNames[i].innerText == title) {
                            alert("This item is already added to the cart");
                            return;
                        }
                    }
                    var cartRowContents = `
                            <div class="cart-item cart-column">
                                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                                <span class="cart-item-title">${title}</span>
                                </div>
                                <span class="cart-price cart-column">${price}</span>
                                <span class="cart-price cart-column">${url}</span>
                                <div class="cart-quantity cart-column">
                                    <input class="cart-quantity-input" type="number" value="1">
                                    <button class="btn btn-danger" type="button">REMOVE</button>
                                    </div>`;
                    cartRow.append(cartRowContents);
                    cartItems.append(cartRow);
                    cartRow.find(".btn-danger").click(function () {
                        cartRow.remove();
                        updateCartTotal();
                    });
                    cartRow.find(".cart-quantity-input").change(function () {
                        var quantity = $(this).val();
                        if (quantity <= 0) {
                            $(this).closest(".cart-row").remove();
                        }
                        updateCartTotal();
                    });
                }

                // Add an item to cart
                $(".polygonpay-add-item").click(function () {
                    var title = $(this).data("title");
                    var price = $(this).data("price");
                    var description = $(this).data("description");
                    var url = $(this).data("url");
                    var imageSrc = $(this).data("image-src");
                    addItemToCart(price, url, description, imageSrc, title);
                    updateCartTotal();
                });

                // Remove an item from cart
                $(".btn-danger").click(function () {
                    $(this).closest(".cart-row").remove();
                    updateCartTotal();
                });

                // Change the quantity of an item in the cart
                $(".cart-quantity-input").change(function () {
                    var quantity = $(this).val();
                    if (quantity <= 0) {
                        $(this).closest(".cart-row").remove();
                    }
                    updateCartTotal();
                });

                // Purchase
                $(".btn-purchase").click(function () {
                    alert("Thank you for your purchase!");
                    var cartItems = $(".cart-items");
                    cartItems.empty();
                    updateCartTotal();
                });
            }
        },
        error: function (data) {
            console.error(data);
        }
    });
});
