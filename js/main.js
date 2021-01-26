
class Product {
    constructor(product) {
        let { title = 'Имя товара', price = 0, id = 0, img = 'no-photo' } = product;
        this.title = title;
        this.img = img;
        this.price = price;
        this._id = id;
    }

    render() {
        return `<div class="product-item">
                  <img class="product-img" src="img/${this.img}.jpg" alt="${this.title}">
                  <h3 class="product-title">${this.title}</h3>
                  <p class="product-price">${this.price} $</p>
                  <button class="product-btn">Купить</button>
              </div>`
    }


}

class ProductsList {
    constructor(container = '.products') {
        this.data = [];
        this.products = [];
        this.container = document.querySelector(container);
        this._fetchData();
        this._render();
    }

    // метод подсчета суммарной стоимости всех товаров
    calcSum() {
        let sum = 0;
        for (let item of this.products) {
            sum += item.price;
        }
        return sum;
    }

    _fetchData() {
        this.data = [
            { id: 1, title: 'Ноутбук', price: 1000, img: 'Notebook' },
            { id: 2, title: 'Клавиатура', price: 50, img: 'Keyboard' },
            { id: 3, title: 'Мышь', price: 10, img: 'Mouse' },
            { id: 4, title: 'Джойстик', price: 87, img: 'Gamepad' },
            { id: 5, title: 'Ноутбук', price: 1000, img: 'Notebook' },
            { id: 6, title: 'Клавиатура', price: 50, img: 'Keyboard' },
            { id: 7, title: 'Мышь' },
            { id: 8, title: 'Джойстик', price: 87, img: 'Gamepad' },
        ];
    }

    _render() {
        for (let dataEl of this.data) {
            const product = new Product(dataEl);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }
}


class Cart {
    constructor() {
        //this.data = []; - для _fetchData()
        //this.productsInCart = []; - массив для хранения элементов корзины

        //this._addListeners(); - навесить обработчик событий на все кнопки товаров
        //this._addListenerCart(); - навесить обработчик событий на кнопку "Корзина" в верхнем меню
        //this._fetchData(); - аналогично с классом ProductsList - получить массив всех элементов из БД (либо как-то получить массив products из ProductsList)

    }

    //addToCart() - метод добавляет товар в корзину, т.е. добавляет элемент из data (копирует) в массив productsInCart (срабатывает при нажатии на кнопку "Купить")
    //removeFromCart() - метод удаляет товар из корзины, т.е. удаляет из массива productsInCart (срабатывает при нажатии на кнопку "Удалить") и вызывает метод _contentDisplay() чтобы перерендерить с учетом удаленного элемента
    //openCart() - метод для обработчика в _addListenersCart() (должен включать вызов _render())

    // _addListeners() {
    //     const listeners = document.querySelectorAll('.product-btn');
    //     for (elem in listeners) {
    //         elem.onclick = addToCart();
    //     }
    // }

    //_addListenersCart()
    //_fetchData()
    //_contentDisplay() - метод отрисовки содержимого корзины для метода _render() (как метод _render() в классе ProductsList через for создает экземпляры класса CartElement, рендерит их через метод в классе CartElement)
    //_calcCost() - метод для подсчета стоимости корзины для метода _render() (суммировать поля price всех объектов в productsInCart)
    //_render(); - метод для отображения корзины  (как всплывающего окна/ другой страницы) и ее содержимого и общей стоимости - по нажатию кнопки "Корзина" в верхнем меню
}

class CartElement {
    constructor() {
        //я бы сделала все как в классе Product с чуть измененным render (чтобы вставить другие классы) или наследовала CartElement от Product с переопределением render
    }
}

const list = new ProductsList();
const cart = new Cart();














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