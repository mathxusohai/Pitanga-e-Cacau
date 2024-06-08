
// Alteracoes do Matt

$(document).ready(function(){
    $('.portfolio-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.prev-arrow'),
        nextArrow: $('.next-arrow'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentPosition = 0;

    function showItem(position) {
        portfolioItems.forEach((item, index) => {
            if (index >= position && index < position + 3) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    prevArrow.addEventListener('click', function() {
        if (currentPosition > 0) {
            currentPosition--;
            showItem(currentPosition);
        }
    });

    nextArrow.addEventListener('click', function() {
        if (currentPosition < portfolioItems.length - 3) {
            currentPosition++;
            showItem(currentPosition);
        }
    });
});