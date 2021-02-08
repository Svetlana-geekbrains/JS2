export const CartItem = {
    props: ['img', 'item'],
    template: `<div class="cart-item">
                    <img class="cart-item-img" :src="img" :alt="item.product_name">
                    <div class="cart-item-text">
                        <h3 class="cart-item-title">{{ item.product_name }}</h3>
                            <p class="cart-item-count">Количество: {{ item.quantity }} шт.</p>
                            <p class="cart-item-price">Общая сумма: {{ item.quantity * item.price}} р.</p>
                    </div>
                    <button class="delete-btn" @click="$parent.delProduct(item)">Удалить</button>
            </div>`

}