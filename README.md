# ⚠️ WARNING ⚠️
**PolygonPay and polygonpay.js are highly experimental pre-release alpha versions and not ready to be implemented in a production environment in any way, shape, or form yet.**

---

### Thesis
Picking the right commerce solution is not easy and dpends on what you're selling and how you want to sell it, you should take some time to explore the pros and cons of as many commerce solutions as possible. Whether you're a professional or hobbyist developer you probably want something that's fast and easy to integrate, that's where PolygonPay comes in. PolygonPay is a customizable headless commerce solution for developers and is designed to be a fast and easy to integrate.

---

### PolygonPay Installation

**Please go to our [documentation](https://docs.polygonpay.com) for more detailed installation and usage instructions**

1) The first step is to sign up for a [PolygonPay](https://app.polygonpay.com/signup) account.

2) The second step is to include the following `<script>` tags in your HTML `<head>`. In order to optimize performance you should implement the minified versions of jQuery and polygonpayJS.
```html
<script src="https://cdn.jsdelivr.net/gh/jquery/jquery/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Seantheprogrammer93/polygonpayjs@v1.0.1-alpha/polygonpay.min.js"></script>
```

3) The last step is to include the following `<div>` tag in the `<body>` of your HTML document.
```html
<div hidden id="polygonpay" data-api-key="<YOUR_API_KEY>"></div>
```
*Note: Replace `<YOUR_API_KEY>` with your PolygonPay API key, it can be found [here](https://docs.polygonpay.com/dashboard). Also, we strongly recommend using the hidden attributte in your `<div>` for security purposes.*

🎉 **Congratulations** 🎉

You have successfully installed PolygonPay. Next, be sure to sign up for a PolygonPay account at https://polygonpay.com to get an API key and start using PolygonPay to collect payments for your eCommerce store.

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
