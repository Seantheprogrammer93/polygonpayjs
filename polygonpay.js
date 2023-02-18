        $(document).ready(function () {
            console.info('PolygonpayJS is ready!')

            $(".polygonpayjs").append(`
            <div class="modal-content">
                <span class="close">&times;</span>
                    <div class="cart-row">
                        <span class="cart-item cart-header cart-column">ITEM</span>
                        <span class="cart-price cart-header cart-column">PRICE</span>
                        <span class="cart-quantity cart-header cart-column">QUANTITY</span>
                        <span class="cart-url cart-header cart-column">URL</span>
                    </div>
                    <div class="cart-items"></div>
                    <div class="cart-total">
                        <strong class="cart-total-title">Total</strong>
                        <span class="cart-total-price">$0</span>
                    </div>
                    <button class="btn btn-primary btn-purchase" type="button">PURCHASE</button>
            </div>`)

            $(".polygonpayjs").hide();

            if ($("#polygonpay").length) {
                var API_Key = $("#polygonpay").attr("data-api-key");

                $.ajax({
                    url: `https://jsonplaceholder.typicode.com/posts/${API_Key}`,
                    type: 'GET',
                    success: function (data) {

                        if (data.id === 1) {
                            console.info('Valid API key detected!')
                            console.log(data)

                            function isCartEmpty() {
                                if ($(".cart-items").children().length === 0) {
                                    $(".polygonpayjs").hide();
                                } else {
                                    $(".polygonpayjs").show();
                                }
                            }

                            // create an onclick function to close the modal when the user clicks on <span> (x)
                            $(".close").click(function () {
                                $(".polygonpayjs").hide();
                            });

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
                                isCartEmpty();
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
                                var cartRowContents =`
                                <div class="cart-item cart-column">
                                    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                                    <span class="cart-item-title">${title}</span>
                                </div>
                                <span class="cart-price cart-column">${price}</span>
                                <span class="cart-url cart-column">${url}</span>
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
                        } else {
                            console.error("Initialization Error: Invalid API key detected!")
                        }
                    },
                    error: function (data) {
                        console.error(data);
                    }
                });
            } else {
                console.error('Initialization Error: Please make sure you have added <div hidden id="polygonpay" data-api-key="<YOUR_API_KEY>"></div> to the <body> of your HTML document.')
            }
        });
