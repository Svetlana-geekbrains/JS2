class Hamburger {
    constructor() {
        this.size = {};
        this.stuff = {};
        this.top = [];
        this.data = {
            size: {
                small: { price: 50, calories: 20 },
                big: { price: 100, calories: 40 }
            },
            stuff: {
                cheese: { price: 10, calories: 20 },
                salad: { price: 20, calories: 5 },
                potatoes: { price: 15, calories: 10 }
            },
            top: {
                sesoning: { price: 15, calories: 0, name: 'sesoning' },
                mayonnaise: { price: 20, calories: 5, name: 'mayonnaise' }
            }
        };
        this.price = 0;
        this.calories = 0;
        this.makeHamburger();
    }

    makeHamburger() {
        let input = prompt("Какой гамбургер хотите? 1-мал, 2-бол");
        this.askSize(input);
        input = prompt("С какой начиной? 1-сыр, 2-салат, 3-картофель");
        this.askStuff(input);
        input = prompt("Хотите топпинг? 1-да, 2-нет");
        if (input == 1) { this.addTop() }
        this.calculatePriceAndCalories();



    }

    askSize(input) {
        if (input == 1) {
            this.size = this.data.size.small;
        }
        else if (input == 2) {
            this.size = this.data.size.big;
        }
        else {
            alert("Вы не выбрали размер");
        }
    }

    askStuff(input) {
        if (input == 1) {
            this.stuff = this.data.stuff.cheese;
        }
        else if (input == 2) {
            this.stuff = this.data.stuff.salad;
        }
        else if (input == 3) {
            this.stuff = this.data.stuff.potatoes;
        }
        else {
            alert("Вы не выбрали начинку");
        }
    }

    addTop() {
        let input = '';
        while (true) {
            input = prompt("Какой топпинг добавить? 1-приправа, 2-майонез, 3-мне хватит, 4-удалить топпинг");
            if (input == 1) {
                this.top.push(this.data.top.sesoning);
            }
            else if (input == 2) {
                this.top.push(this.data.top.mayonnaise);
            }
            else if (input == 3) {
                break;
            }
            else {
                this.removeTop();
            }
        }
    }

    removeTop() {
        let countS = 0, countM = 0;
        let input = '';
        for (let i = 0; i < this.top.length; i++) {
            if (this.top[i].name == 'sesoning') {
                countS += 1;
            }
            else { countM += 1; }
        }


        while (true) {
            alert("У вас в заказе " + countS + " шт. приправы и " + countM + " шт. майонеза");
            input = prompt("Что удалить? 1-приправа, 2-майонез, 3-мне хватит, 4-добавить топпинг");

            if (input == 1 && countS > 0) {
                for (let i = 0; i < this.top.length; i++) {
                    if (this.top[i].name == 'sesoning') {
                        delete this.top[i];
                    }
                    countS -= 1;
                }
            }
            else if (input == 2 && countM > 0) {
                for (let i = 0; i < this.top.length; i++) {
                    if (this.top[i].name == 'mayonnaise') {
                        delete this.top[i];
                    }
                    countM -= 1;
                }
            }
            else if (input == 3) {
                break;
            }
            else {
                this.addTop();
            }
        }
    }

    calculatePriceAndCalories() {
        for (let i = 0; i < this.top.length; i++) {
            this.price += this.top[i].price;
            this.calories += this.top[i].calories;
        }
        this.price += this.size.price + this.stuff.price;
        this.calories += this.size.calories + this.stuff.calories;
        // this.price = this.size.price + this.stuff.price;
        alert("Общая сумма заказа: " + this.price);
        alert("Общая калорийность заказа: " + this.calories);
    }

    // calculateCalories() {

    // }


}

let humb = new Hamburger;