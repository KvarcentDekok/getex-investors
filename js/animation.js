function animate(_ref) { /*for IE*/
    let timing = _ref.timing,
        draw = _ref.draw,
        duration = _ref.duration,
        start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}

function linear(timeFraction) {
    return timeFraction;
}

function animateAnchor(link) {
    link.addEventListener('click', function (evt) {
        if (link.getAttribute('href')[0] === "#") {
            evt.preventDefault();

            navbar.classList.remove('expand');

            let anchorElem = document.querySelector(link.getAttribute('href'));

            animate({
                duration: 600,
                timing: linear,
                draw: function(progress) {
                    window.scrollBy(
                        0,
                        ((anchorElem.getBoundingClientRect().top + pageYOffset) - window.pageYOffset) * progress
                    );
                }
            });
        }
    })
}