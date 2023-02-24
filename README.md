# ⚠️ WARNING ⚠️
**PolygonPay and polygonpay.js are highly experimental pre-release alpha versions and not ready to be implemented in a production environment in any way, shape, or form yet.**

---

### PolygonPay Installation

**Please go to our [documentation](https://docs.polygonpay.com) for more detailed installation and usage instructions**

1) The first step is to sign up for a [PolygonPay](https://app.polygonpay.com/signup) account and obtain an API key.

2) The second step is to include the following `<script>` tags in your HTML `<head>`. In order to optimize performance you should implement the minified versions of jQuery and polygonpayJS just like the ones below.
```html
<script src="https://cdn.jsdelivr.net/gh/jquery/jquery/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Seantheprogrammer93/polygonpayjs@v2.0.0-alpha/polygonpay.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Seantheprogrammer93/polygonpayjs@v2.0.0-alpha/style.css">
```

3) The last step is to include the following `<div>` tag in the `<body>` of your HTML document.
```html
<div id="polygonpay" class="polygonpayjs" data-api-key="<YOUR_API_KEY>"></div>
```
*Note: Replace `<YOUR_API_KEY>` with your PolygonPay API key, it can be found [here](https://docs.polygonpay.com/dashboard). Also, we strongly recommend using the hidden attributte in your `<div>` for security purposes.*

After you complete steps 1, 2 and 3 your HTML document should look like the example code below. Please, feel free to copy the code below if you want a simple starting point for your HTML document.
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/jquery/jquery/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/Seantheprogrammer93/polygonpayjs@v1.0.2-alpha/polygonpay.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Seantheprogrammer93/polygonpayjs@v1.0.2-alpha/style.css">
</head>

<body>
    <div id="polygonpay" class="polygonpayjs" data-api-key="1"></div>

    <button class="polygonpay-add-item" data-title="Hat" data-description="This is a hat" data-price="15.79"
        data-url="https://example.com/hat" data-imageSrc="https://example.com/hat.png">
        Add to Cart
    </button>

    <button class="polygonpay-add-item" data-title="Shirt" data-description="This is a shirt" data-price="18.79"
        data-url="https://example.com/shirt" data-imageSrc="https://example.com/shirt.png">
        Add to Cart
    </button>
</body>

</html>
```

🎉 **Congratulations!** 🎉

You have successfully installed PolygonPay and you will now be able to create your eCommerce store quickly and easily.

---

### How to Use PolygonPay

After you install PolygonPay you will be able to implement a `<button>` in your HTML code to add a product to the PolygonPay cart and checkout. The following `<button>` tag is an example.

```html
<button class="polygonpay-add-item"
        data-title="Hat" 
        data-description="This is a hat"
        data-price="15.79" 
        data-url="https://example.com/hat" 
        data-imageSrc="https://example.com/hat.png">
        Add to Cart
</button>
```
---

### FAQ
- **Where can I use PolygonPay?** - You can use PolygonPay wherever you have direct access to HTML code, this includes frameworks like React and Next.js or WordPress. **If you have direct access to HTML code then you can use PolygonPay**.
- **Is PolygonPay free?** - PolygonPay charges a small fee of 2% on your monthly revenue.
