import { Products } from './Products.js';
import { Cart } from './Cart.js';
import { Filter } from './Filter.js';
import { Error } from "./Error.js";

const Shop = {
    components: {
        Products,
        Cart,
        Filter,
        Error
    },
    data() {
        return {
            imgProd: 'img/no-photo.jpg'
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        delJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        }
    }
};

Vue.createApp(Shop).mount('#app');