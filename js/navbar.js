let navbar = document.querySelector('.navbar'),
    navLinks = navbar.querySelectorAll('.nav-link'),
    toggler = navbar.querySelector('.toggler'),
    navHeight = navbar.clientHeight;

for (let i = 0; i < navLinks.length; i++) {
    animateAnchor(navLinks[i]);
}


window.addEventListener('scroll', function () {
    if (window.pageYOffset >= document.documentElement.clientHeight - navHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


toggler.addEventListener('click', function () {
    navbar.classList.toggle('expand');
});

/*for IE*/
if (isIe()) {
    let line1 = toggler.querySelector('line:nth-child(1)'),
        line2 = toggler.querySelector('line:nth-child(2)'),
        line3 = toggler.querySelector('line:nth-child(3)');

    toggler.addEventListener('click', function () {
        if (navbar.classList.contains('expand')) {
            line1.setAttribute('transform', 'translate(15 -2) rotate(45)');

            line2.setAttribute('transform', 'transform: translateX(100)');

            line3.setAttribute('transform', 'translate(-13 14) rotate(-45)');
        } else {
            line1.removeAttribute('transform');
            line2.removeAttribute('transform');
            line3.removeAttribute('transform');
        }
    })
}
