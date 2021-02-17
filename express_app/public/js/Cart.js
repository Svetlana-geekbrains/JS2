import { CartItem } from "./CartItem.js";

export const Cart = {
    components: {
        CartItem
    },
    data() {
        return {
            isVisibleCart: false,
            productsInCart: []
        }
    },
    methods: {
        addProduct(product) {
            let find = this.productsInCart.find(el => el.id_product === product.id_product);
            if (find) {
                this.$root.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++
                        }
                    });
                return;
            }

            let prod = Object.assign({ quantity: 1 }, product);
            this.$root.postJson(`/api/cart`, prod) //обработчик по этому пути в server.js, в postJson файла main.js лежит название запроса (post) и инструкция - поместить передаваемый объект в тело post-запроса
                .then(data => {
                    if (data.result) {
                        this.productsInCart.push(prod);
                    }
                });
        },
        delProduct(product) {
            if (product.quantity > 1) {
                this.$root.putJson(`/api/cart/${product.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--
                        }
                    });
                return;
            }
            this.$root.deleteJson(`/api/cart/${product.id_product}`)
                .then(data => {
                    if (data.result) {
                        this.productsInCart.splice(this.productsInCart.indexOf(product), 1);
                    }
                });
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
        this.$root.getJson(`/api/cart`)
            .then(data => {
                if (!data) {
                    console.log("пусто")
                    return;
                }
                for (let product of data.contents) {
                    this.productsInCart.push(product);
                }
            });
    },
    template: `<button class="btn-cart" @click="isVisibleCart = !isVisibleCart">Корзина</button>
               <div class="cart-block" v-show="isVisibleCart">
                    <CartItem v-for="el of productsInCart" :key="el.id_product" :img="$root.imgProd" :item="el"></CartItem>
                    <div class="cart-sum">{{displaySum}}</div>
                </div>`
};