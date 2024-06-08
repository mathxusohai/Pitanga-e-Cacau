// Função para fechar o modal do carrinho
const closeModalButton = document.querySelector('.jsModalClose');
closeModalButton.addEventListener('click', () => {
    const modal = document.querySelector('#jsModalCarrito');
    modal.classList.remove('active');
});

// Função para adicionar um item ao carrinho
function addToCart(productId, productName, productPrice) {
    const modalList = document.querySelector('#jsModalCarrito .modal__list');
    const totalPriceElement = document.querySelector('.cart--totalfinal span:last-child');
    const totalPrice = parseFloat(totalPriceElement.textContent.replace('R$ ', ''));
    const newTotalPrice = totalPrice + productPrice;
    totalPriceElement.textContent = `R$ ${newTotalPrice.toFixed(2)}`;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const cartItemThumb = document.createElement('div');
    cartItemThumb.classList.add('cart-item__thumb');
    const productImg = document.createElement('img');
    productImg.src = `img/${productName}.webp`;
    productImg.alt = productName;
    cartItemThumb.appendChild(productImg);
    cartItem.appendChild(cartItemThumb);

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

    modalList.appendChild(cartItem);
}

// Evento de clique nos botões "Remover"
const removeButtons = document.querySelectorAll('.btn-remove');
removeButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productId = parseInt(event.target.parentElement.getAttribute('data-product-id'));
        removeFromCart(productId);
    });
});

