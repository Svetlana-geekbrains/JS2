let addListenerCart = () => {
    const listener = document.querySelector('.btn-cart');
    listener.onclick = Cart.openCart;
}

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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


class Item {
    constructor(product) {
        let { product_name = 'Имя товара', price = 0, id_product = 0, img = 'no-photo' } = product;
        this.title = product_name;
        this.img = img;
        this.price = price;
        this.id = id_product;
        this.rendered = false;
    }

    render() {
        this.rendered = true;
        return `<div class="product-item"  data-id="${this.id}">
                  <img class="product-img" src="img/${this.img}.jpg" alt="${this.title}">
                  <h3 class="product-title">${this.title}</h3>
                  <p class="product-price">${this.price} р.</p>
                  <button class="product-btn" data-id="${this.id}">Купить</button>
              </div>`
    }
}

class List {
    constructor(container = '.products') {
        this.data = [];
        this.products = [];
        this.container = document.querySelector(container);
        this._fetchData()
            .then(() => this._render())
            .then(() => this._addListeners());
        // .then(() => console.log(this.calcSum()));
    }

    // метод подсчета суммарной стоимости всех товаров
    // calcSum() {
    //     let sum = 0;
    //     for (let i = 0; i < this.products.length; i++) {
    //         sum += this.products[i].price;
    //     }
    //     return sum;
    // }
    //                      ИЛИ
    // calcSum() {
    //     return this.products.reduce((accum, item) => accum += item.price, 0);
    // }



    _fetchData() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = data;
                for (let dataEl of this.data) {
                    const product = new Product(dataEl);
                    this.products.push(product);
                }
            })
    }

    _render() {
        for (let product of this.products) {
            if (product.rendered) {
                continue;
            }
            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    }

    _addListeners() {
        const listeners = document.querySelectorAll('.product-btn');
        for (let i = 0; i < listeners.length; i++) {
            listeners[i].onclick = this._addToCart;
        }
        console.log(this.products); // правильный массив с двумя продуктами
    }

    _addToCart(eventObj) {
        let product_id = eventObj.path[1].getAttribute("Id");
        console.log(this.products); // undefind
        for (let i = 0; i < this.products.length; i++) { // ошибка из-за undefind
            if (this.products[i].id == product_id) {
                Cart.addToCart(this.products[elem]);
            }
        }
    }
}

class Product extends Item { }

class ProductsList extends List { }

class Cart {
    constructor() {
        this.productsInCart = []; //массив для хранения элементов корзины
    }

    static addToCart(elem) {
        const cartElem = new CartElement(elem);
        this.productsInCart.push(cartElem);
    }

    static openCart(evobj) {
        alert('Клик по корзине!');
        console.log(evobj)
        //должен включать вызов _render()
    }

    //removeFromCart() - метод удаляет товар из корзины, т.е. удаляет из массива productsInCart (срабатывает при нажатии на кнопку "Удалить") и вызывает внутренний метод remove() класса CartElement
    //_contentRender() - метод отрисовки содержимого корзины для метода _render() (как метод _render() в классе ProductsList через for проходим элементы массива productsInCart (они же экземпляры класса CartElement), рендерим через метод в классе CartElement)
    //_calcCost() - метод для подсчета стоимости корзины для метода _render() (суммировать поля price всех объектов в productsInCart)
    //_render() - метод для отображения корзины (как всплывающего окна/ другой страницы) и ее содержимого и общей стоимости (методы _contentRender() и _calcCost()) - по нажатию кнопки "Корзина" в верхнем меню
    //_addListenersDelete() - навесить обработчик на кнопки "Удалить" (будет вызывать метод removeFromCart())
}

class CartElement extends Item {
    constructor(product) {
        super(product)
        this.count = 0;
    }

    increaseCount() {
        this.count += 1;
        this._updateItem();
    }

    remove() {
        document.querySelector(`.cart-item[data-id="${this.id}"]`).remove();
    }

    render() {
        this.rendered = true;
        return `<div class="cart-item" data-id="${this.id}">
                  <img class="cart-item-img" src="img/${this.img}.jpg" alt="${this.title}">
                  <div class="cart-item-text"
                    <h3 class="cart-item-title">${this.title}</h3>
                    <p class="cart-item-count">Количество: ${this.count} шт.</p>
                    <p class="cart-item-price">Общая сумма: ${this.count * this.price} р.</p>
                  </div>  
                  <button class="delete-btn" data-id="${this.id}">Удалить</button>
                </div>`
    }

    _updateItem() {
        const block = document.querySelector(`.cart-item[data-id="${this.id}"]`);
        block.querySelector('.cart-item-count').textContent = `Количество: ${this.count} шт.`;
        block.querySelector('.cart-item-price').textContent = `Общая сумма: ${this.count * this.price} р.`;
    }

}

const list = new ProductsList();
const cart = new Cart();
addListenerCart();














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

