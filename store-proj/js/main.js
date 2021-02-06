const Shop = {
    data() {
        return {
            API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
            catalogUrl: '/catalogData.json',
            basketUrl: '/getBasket.json',
            addUrl: '/addToBasket.json',
            removeUrl: '/deleteFromBasket.json',
            isVisibleCart: false,
            products: [],
            productsInCart: [],
            filtered: [],
            imgCatalog: 'img/no-photo.jpg',  // значение по умолчанию, если от сервера пришли объекты, не содержащие название картинки
            searchLine: ''
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        addProduct(product) {
            this.getJson(`${this.API + this.addUrl}`)
                .then(data => {
                    if (data.result) {
                        if (this.productsInCart.length) {
                            let inArr = this.productsInCart.find(elem => elem.id_product === product.id_product);
                            (inArr) ? inArr.quantity++ : this.addNewProduct(product);
                        }
                        else this.addNewProduct(product);
                    }
                })
        },
        addNewProduct(product) {
            let prod = Object.assign({ quantity: 1 }, product);
            this.productsInCart.push(prod);
        },
        delProduct(product) {
            this.getJson(`${this.API + this.removeUrl}`)
                .then(data => {
                    if (data.result) {
                        (product.quantity > 1) ? product.quantity-- : this.productsInCart.slice(this.productsInCart.indexOf(product), 1); //не работает .remove, как удалить объект напрямую, без поиска его по id и др. полям?
                    }
                })
        },
        filter(value) {
            const regexp = new RegExp(value, 'i');
            console.log(value);
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            console.log(this.filtered);
            this.products.forEach(product => {
                const block = document.querySelector(`.product-item[data-id="${product.id_product}"]`); // можно как-то получить данные из :key?
                console.log(block);
                if (this.filtered.includes(product)) {
                    block.classList.remove('invisible');
                } else {
                    block.classList.add('invisible');//класс добавляется, но элемент не пропадает (возможно надо как-то переренделить его)
                }
            })
        },
        calcSum() {
            return this.productsInCart.reduce((accum, item) => accum += (item.price * item.quantity), 0);
        }
    },
    computed: {
        displaySum() {
            let res;
            (!this.productsInCart.length) ? res = "Нет данных" : res = `Общая сумма товаров в корзине: ${this.calcSum()} р.`
            return res
        }
    },
    mounted() {
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });

        this.getJson(`${this.API + this.basketUrl}`)
            .then(data => {
                for (let cartProduct of data.contents) {
                    this.productsInCart.push(cartProduct);
                }
            });
        //почему-то выдает Fetch API cannot load file:///C:/Users/Admin/Documents/GitHub/JS2/store-proj/getProducts.json. URL scheme must be "http" or "https" for CORS request.
        //это можно как-то исправить? может надо поставить какое-то расширение для VScode или поможет только поместить этот файл где-то не на локалке?
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });
    }
};

Vue.createApp(Shop).mount('#app');



// метод без промис
// let getData = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     }
// };

// метод с промис
// let getData = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     reject('error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         }
//     });
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// class Item {
//     constructor(product) {
//         let { product_name = 'Имя товара', price = 0, id_product = 0, img = 'no-photo' } = product;
//         this.title = product_name;
//         this.img = img;
//         this.price = price;
//         this.id = id_product;
//         this.rendered = false;
//     }

//     render() {
//         this.rendered = true;
        // return `<div class="product-item"  data-id="${this.id}">
        //           <img class="product-img" src="img/${this.img}.jpg" alt="${this.title}">
        //           <h3 class="product-title">${this.title}</h3>
        //           <p class="product-price">${this.price} р.</p>
        //           <button class="product-btn" data-id="${this.id}">Купить</button>
        //       </div>`
//     }
// }

// class Product extends Item { }

// class CartElement extends Item {
//     constructor(product) {
//         super(product)
//         this.count = product.quantity;
//     }

    // changeCount(n) {
    //     this.count += n;
    //     this._updateItem();
    // }

//     remove() {
//         document.querySelector(`.cart-item[data-id="${this.id}"]`).remove();
//     }

//     render() {
//         this.rendered = true;
//         return `<div class="cart-item" data-id="${this.id}">
//                   <img class="cart-item-img" src="img/${this.img}.jpg" alt="${this.title}">
//                   <div class="cart-item-text"
//                     <h3 class="cart-item-title">${this.title}</h3>
//                     <p class="cart-item-count">Количество: ${this.count} шт.</p>
//                     <p class="cart-item-price">Общая сумма: ${this.count * this.price} р.</p>
//                   </div>  
//                   <button class="delete-btn" data-id="${this.id}">Удалить</button>
//                 </div>`
//     }

//     _updateItem() {
//         const block = document.querySelector(`.cart-item[data-id="${this.id}"]`);
//         block.querySelector('.cart-item-count').textContent = `Количество: ${this.count} шт.`;
//         block.querySelector('.cart-item-price').textContent = `Общая сумма: ${this.count * this.price} р.`;
//     }

// }

// class List {
//     static API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//     static itemsMap = {
//         Cart: CartElement,
//         ProductsList: Product
//     };
//     constructor(url, container = '.products') {
//         this.url = url;
//         this.products = [];
//         this.filtered = [];
//         this.container = document.querySelector(container);
//         this.init();
//     }

//     init() {
//         return false;
//     }

//     getJson(url) {
//         return fetch(url ? url : `${List.API + this.url}`)
//             .then(result => result.json())
//             .catch(error => console.log(error));
//     }

//     handleData(data) {
//         for (let dataEl of data) {
//             const product = new List.itemsMap[this.constructor.name](dataEl);
//             this.products.push(product);
//         }
//         this._render();
//     }

//     getItem(id) {
//         return this.products.find(product => product.id === id);
//     }

    // filter(value) {
    //     const regexp = new RegExp(value, 'i');
    //     this.filtered = this.products.filter(product => regexp.test(product.title));
    //     this.products.forEach(product => {
    //         const block = document.querySelector(`.product-item[data-id="${product.id}"]`);

    //         if (this.filtered.includes(product)) {
    //             block.classList.remove('invisible');
    //         } else {
    //             block.classList.add('invisible');
    //         }
    //     })
    // }

//     _render() {
//         for (let product of this.products) {
//             if (product.rendered) {
//                 continue;
//             }
//             this.container.insertAdjacentHTML('beforeend', product.render());
//         }
//     }
// }

// class ProductsList extends List {
//     constructor(cart, url = '/catalogData.json', container) {
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then((data) => this.handleData(data))
//     }

//     init() {
//         this.container.addEventListener('click', e => {
//             if (e.target.classList.contains('product-btn')) {
//                 const id = +e.target.dataset['id'];
//                 this.cart.addProduct(this.getItem(id));
//             }
//         });

//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector(`.search-field`).value);
//         })
//     }
// }

// class Cart extends List {
//     constructor(url = '/getBasket.json', container = '.cart-block') {
//         super(url, container);
//         this.getJson()
//             .then((data) => {
//                 this.handleData(data.contents);
//                 this.displaySum();
//             });
//     }

//     init() {
//         this.container.addEventListener('click', e => {
//             if (e.target.classList.contains('delete-btn')) {
//                 const id = +e.target.dataset['id'];
//                 this.removeProduct(this.getItem(id));
//             }
//         });
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             this.container.classList.toggle('invisible');
//         })
//     }

//     addProduct(product) {
//         this.getJson(`${List.API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result) {
//                     let find = this.products.find(el => el.id === product.id);
//                     if (find) {
//                         find.changeCount(1);
//                     } else {
//                         let prod = Object.assign({ quantity: 1, product_name: product.title, id_product: product.id }, product);
//                         this.handleData([prod]);
//                     } this.displaySum();
//                 } else {
//                     console.log('error');
//                 }
//             })
//     }

//     removeProduct(product) {
//         this.getJson(`${List.API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result) {
//                     if (product.count > 1) {
//                         product.changeCount(-1)
//                     } else {
//                         this.products.splice(this.products.indexOf(product), 1);
//                         product.remove();
//                     } this.displaySum();
//                 } else {
//                     console.log('error');
//                 }
//             })
//     }

    // displaySum() {
    //     document.querySelector('.cart-sum').innerText = `Общая сумма товаров в корзине: ${this._calcSum()}`;
    // }

    // _calcSum() {
    //     return this.products.reduce((accum, item) => accum += (item.price * item.count), 0);
    // }

// }

// const cart = new Cart();
// const list = new ProductsList(cart);
// //list.getJson('getProducts.json').then(data => list.handleData(data));














//////////////////////////////////////////////////////////////////////////////////////////////////////

// const products = [
//     { id: 1, title: 'Notebook', name: 'Ноутбук', price: 1000 },
//     { id: 2, title: 'Keyboard', name: 'Клавиатура', price: 50 },
//     { id: 3, title: 'Mouse', name: 'Мышь', price: 10 },
//     { id: 4, title: 'Gamepad', name: 'Джойстик', price: 87 },
//     { id: 5, title: 'Notebook', name: 'Ноутбук', price: 1000 },
//     { id: 6, title: 'Keyboard', name: 'Клавиатура', price: 50 },
//     { id: 7, title: 'Mouse', name: 'Мышь', price: 10 },
//     { id: 8, title: 'Gamepad', name: 'Джойстик', price: 87 },
// ];

// const renderProduct = (title, name = 'Имя товара', price = 0) => {
//     return `<div class="product-item">
//                 <img class="product-img" src="img/${title}.jpg">
//                 <h3 class="product-title">${name}</h3>
//                 <p class="product-price">${price} $</p>
//                 <button class="product-btn">Купить</button>
//             </div>`
// };

// const render = productsList => {
//     const productsElements = productsList.map(item => renderProduct(item.title, item.name, item.price));

//     for (let i = 0; i < productsElements.length; i++) {
//         document.querySelector('.products').innerHTML += productsElements[i]; //через insertAdjacentHTML
//     }
// };

// render(products);

