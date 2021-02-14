import { Product } from "./Product.js";

export const Products = {
    components: {
        Product
    },
    data() {
        return {
            products: []
        }
    },
    mounted() {
        this.$root.getJson(`/api/products`)
            .then(data => {
                if (!data) {
                    return;
                }
                for (let product of data) {
                    this.products.push(product);
                }
            });
    },
    computed: {
        filtered() {
            return this.products.filter(product => this.$root.$refs.filter.regular.test(product.product_name));
        }
    },
    template: `<div class="products">
                    <Product v-for="el of filtered" :key="el.id_product" :img="$root.imgProd" :product="el"></Product>
                </div>`
};