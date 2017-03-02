document.addEventListener('DOMContentLoaded', function(e) {
    console.log(window.innerWidth);
    document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
}, false);
