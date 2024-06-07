// Evento de clique no botão "Adicionar ao Carrinho"
const addToCartButtons = document.querySelectorAll('[data-btn-action="add-btn-cart"]');
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        const productId = event.target.getAttribute('data-product-id');
        const productName = event.target.getAttribute('data-product-name');
        const productPrice = parseFloat(event.target.getAttribute('data-product-price'));
        addToCart(productId, productName, productPrice);
        openCartModalWithItems();
    });
});

// Função para adicionar um item ao carrinho
function addToCart(productId, productName, productPrice) {
    const modalList = document.querySelector('#jsModalCarrito .modal__list');
    let existingCartItem = modalList.querySelector(`.cart-item[data-product-id="${productId}"]`);

    if (existingCartItem) {
        const quantityElement = existingCartItem.querySelector('.item-quantity');
        quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    } else {
        // Criação do novo item no carrinho
        const cartItem = createCartItem(productId, productName, productPrice);
        modalList.appendChild(cartItem);
    }

    updateTotal();
    updateCartItemCount();
}

// Função para criar um novo item no carrinho
function createCartItem(productId, productName, productPrice) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.productId = productId;

    const cartItemInfo = document.createElement('div');
    cartItemInfo.classList.add('cart-item__info');
    const productNameElement = document.createElement('p');
    productNameElement.textContent = productName;
    cartItemInfo.appendChild(productNameElement);
    cartItem.appendChild(cartItemInfo);

    const productPriceElement = document.createElement('p');
    productPriceElement.classList.add('cart-item__price');
    productPriceElement.textContent = `R$ ${productPrice.toFixed(2)}`;
    cartItem.appendChild(productPriceElement);

    // Adicionar botões de quantidade
    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity-container');

    const decreaseButton = document.createElement('button');
    decreaseButton.classList.add('btn-quantity');
    decreaseButton.textContent = '-';
    decreaseButton.setAttribute('data-product-id', productId);
    decreaseButton.setAttribute('data-action', 'decrease');
    decreaseButton.addEventListener('click', adjustQuantity);
    quantityContainer.appendChild(decreaseButton);

    const quantityElement = document.createElement('span');
    quantityElement.classList.add('item-quantity');
    quantityElement.textContent = '1';
    quantityContainer.appendChild(quantityElement);

    const increaseButton = document.createElement('button');
    increaseButton.classList.add('btn-quantity');
    increaseButton.textContent = '+';
    increaseButton.setAttribute('data-product-id', productId);
    increaseButton.setAttribute('data-action', 'increase');
    increaseButton.addEventListener('click', adjustQuantity);
    quantityContainer.appendChild(increaseButton);

    cartItem.appendChild(quantityContainer);

    return cartItem;
}

// Função para abrir o modal do carrinho com os itens
function openCartModalWithItems() {
    const modal = document.querySelector('#jsModalCarrito');
    modal.classList.add('active');
}

// Função para ajustar a quantidade de itens no carrinho
function adjustQuantity(event) {
    const action = event.target.dataset.action;
    const productId = event.target.dataset.productId;
    const quantityElement = event.target.parentElement.querySelector('.item-quantity');
    let quantity = parseInt(quantityElement.textContent);

    if (action === 'increase') {
        quantity++;
    } else if (action === 'decrease' && quantity > 1) {
        quantity--;
    } else if (action === 'decrease' && quantity === 1) {
        removeCartItem(productId);
        return;
    }

    quantityElement.textContent = quantity;
    updateTotal();
    updateCartItemCount();
}

// Função para remover um item do carrinho
function removeCartItem(productId) {
    const modalList = document.querySelector('#jsModalCarrito .modal__list');
    const cartItem = modalList.querySelector(`.cart-item[data-product-id="${productId}"]`);
    if (cartItem) {
        cartItem.remove();
        updateTotal();
        updateCartItemCount();
    }
}

// Função para atualizar o preço total
function updateTotal() {
    const totalPriceElement = document.querySelector('.cart--totalfinal span:last-child');
    let totalPrice = 0;

    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(cartItem => {
        const productPrice = parseFloat(cartItem.querySelector('.cart-item__price').textContent.replace('R$ ', ''));
        const quantity = parseInt(cartItem.querySelector('.item-quantity').textContent);
        totalPrice += productPrice * quantity;
    });

    totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
}

// Função para atualizar a quantidade de itens no ícone do carrinho
function updateCartItemCount() {
    const cartItemCountElement = document.getElementById('cartItemCount');
    const cartItems = document.querySelectorAll('.cart-item');
    let itemCount = 0;
    cartItems.forEach(cartItem => {
        const quantity = parseInt(cartItem.querySelector('.item-quantity').textContent);
        itemCount += quantity;
    });
    cartItemCountElement.textContent = itemCount;
}

// Chamada inicial para atualizar a quantidade de itens no ícone do carrinho
updateCartItemCount();

// Função para fechar o modal do carrinho
const closeModalButton = document.querySelector('.jsModalClose');
closeModalButton.addEventListener('click', () => {
    const modal = document.querySelector('#jsModalCarrito');
    modal.classList.remove('active');
});

// Função para abrir o carrinho ao clicar no ícone do carrinho
const cartIcon = document.getElementById('cartIcon');
cartIcon.addEventListener('click', () => {
    const modal = document.querySelector('#jsModalCarrito');
    modal.classList.add('active');
});

const phoneNumber = "+5511992537206"; // Substitua "seu_numero" pelo número de WhatsApp desejado

function openWhatsAppWithCartItems() {
    const modalList = document.querySelector('#jsModalCarrito .modal__list');
    const cartItems = modalList.querySelectorAll('.cart-item');
    let message = "Olá, estou interessado nos seguintes itens:\n";

    cartItems.forEach(cartItem => {
        const productName = cartItem.querySelector('.cart-item__info p').textContent;
        const quantity = parseInt(cartItem.querySelector('.item-quantity').textContent);
        message += `${quantity}x ${productName}\n`;
    });

    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

// Evento de clique no botão "Comprar Agora"
const checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', () => {
    openWhatsAppWithCartItems();
});
