(function () {
    const toggler = document.querySelector('.js-toggler');
    const menu = document.querySelector('.js-menu')

    toggler.addEventListener('click', function (event) {
        menu.classList.toggle('expanded')
    })
})()