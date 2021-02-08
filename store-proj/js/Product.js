export const Product = {
    props: ['img', 'product'],
    template: `<div class="product-item">
                    <img class="product-img" :src="img" :alt="product.product_name">
                    <h3 class="product-title">{{ product.product_name }}</h3>
                    <p class="product-price">{{ product.price }} р.</p>
                    <button class="product-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
            </div>`

}