import { CartItem } from "./CartItem.js";

export const Cart = {
    components: {
        CartItem
    },
    data() {
        return {
            basketUrl: '/getBasket.json',
            addUrl: '/addToBasket.json',
            removeUrl: '/deleteFromBasket.json',
            isVisibleCart: false,
            productsInCart: []
        }
    },
    methods: {
        addProduct(product) {
            this.$root.getJson(`${this.$root.API + this.addUrl}`)
                .then(data => {
                    if (data.result) {
                        let inArr = this.productsInCart.find(elem => elem.id_product === product.id_product);
                        if (inArr) {
                            inArr.quantity++;
                        }
                        else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.productsInCart.push(prod);
                        }
                    }
                })
        },
        delProduct(product) {
            this.$root.getJson(`${this.$root.API + this.removeUrl}`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--;
                        }
                        else {
                            this.productsInCart.splice(this.productsInCart.indexOf(product), 1);
                        }
                    }
                })
        },
        calcSum() {
            return this.productsInCart.reduce((accum, item) => accum += (item.price * item.quantity), 0);
        },
        visibleCart() {
            this.isVisibleCart = !this.isVisibleCart;
        }
    },
    computed: {
        displaySum() {
            return !this.productsInCart.length ? "Нет данных" : `Общая сумма товаров в корзине: ${this.calcSum()} р.`
        },
        // можно включить фильтрацию и для товаров в корзине (заменить productsInCart на filtered в v-for в template)
        // filtered() {
        //     return this.productsInCart.filter(product => this.$root.$refs.filter.regular.test(product.product_name));
        // }
    },
    mounted() {
        this.$root.getJson(`${this.$root.API + this.basketUrl}`)
            .then(data => {
                for (let cartProduct of data.contents) {
                    this.productsInCart.push(cartProduct);
                }
            })
    },
    template: `<button class="btn-cart" @click="isVisibleCart = !isVisibleCart">Корзина</button>
               <div class="cart-block" v-show="isVisibleCart">
                    <CartItem v-for="el of productsInCart" :key="el.id_product" :img="$root.imgProd" :item="el"></CartItem>
                    <div class="cart-sum">{{displaySum}}</div>
                </div>`
};