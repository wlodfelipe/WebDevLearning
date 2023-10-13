document.querySelector('.switcher-btn').onclick = () => {
    document.querySelector('.color-switcher').classList.toggle('active');
};

let themeButtons = document.querySelectorAll('.theme-buttons');

themeButtons.forEach(color => {

    color.addEventListener('click', () => {
        let dataColor = color.getAttribute('data-color');
        document.querySelector(':root').style.setProperty('--main-color', dataColor);
    });
});