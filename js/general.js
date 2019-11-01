let noscriptHidden = document.querySelectorAll('.noscript-hidden');

for (let i = 0; i < noscriptHidden.length; i++) {
    noscriptHidden[i].classList.remove('noscript-hidden');
}

/* Кнопка "Вниз" */
let scrollBtn = document.querySelector('.scroll-btn');

scrollBtn.addEventListener('click', function () {
    animate({
        duration: 600,
        timing: linear,
        draw: function (progress) {
            window.scrollBy(0, (document.documentElement.clientHeight - window.pageYOffset) * progress);
        }
    });
});


/* Калькулятор */
let calculatorForm = document.querySelector('.calculator-form'),
    rangeInputs = calculatorForm.querySelectorAll('.custom-range input'),
    numberInputs = calculatorForm.querySelectorAll('.unobvious-input');

function addRangeInputEvent (input) {
    let event;

    if (isIe()) {
        event = 'change';
    } else {
        event = 'input';
    }

    input.addEventListener(event, function () {
        console.log('move');

        let targetInput = document.getElementById(this.dataset.target),
            unit = '';

        if (this.dataset.unit) {
            unit = " " + this.dataset.unit;

            if (this.dataset.unit === 'лет') {
                if (this.value === '1') {
                    unit = " год";
                } else if (this.value > 1 && this.value < 5) {
                    unit = " года";
                }
            }
        }

        targetInput.value = Number(this.value).toLocaleString('ru') + unit;
    })
}

function addNumberInputEvent (input) {
    let differentLengthValue,
        inputLenght = input.value.length;

    input.addEventListener('input', function () {
        let targetInput = calculatorForm.querySelector('[data-target="' + this.id + '"]'),
            unit = '',
            start = this.selectionStart,
            numberValue = parseInt(this.value.replace( /\s/g, ''));

        if (targetInput.dataset.unit) {
            unit = " " + targetInput.dataset.unit;

            if (targetInput.dataset.unit === 'лет') {
                if (numberValue === 1) {
                    unit = " год";
                } else if (numberValue > 1 && numberValue < 5) {
                    unit = " года";
                }
            }
        }

        if (!numberValue) {
            numberValue = 0;
            start += 1;
        }

        targetInput.value = numberValue;
        this.value = numberValue.toLocaleString('ru') + unit;

        let currentFullLengthValue = this.value.length,
            currentShortLengthValue = this.value.replace( /\s/g, '').length,
            currentDifferentLengthValue = currentFullLengthValue - currentShortLengthValue;

        if (differentLengthValue && currentDifferentLengthValue !== differentLengthValue) {
            if (currentFullLengthValue > inputLenght) {
                start += 1;
            } else if (currentFullLengthValue < inputLenght) {
                start -= 1;
            }
        }

        inputLenght = currentFullLengthValue;

        differentLengthValue = currentDifferentLengthValue;

        this.selectionStart = this.selectionEnd = start;
    })
}

for (let i = 0; i < rangeInputs.length; i++) {
    addRangeInputEvent(rangeInputs[i]);
    addNumberInputEvent(numberInputs[i]);
}

let joinButton = document.getElementById('join-button');

animateAnchor(joinButton);

joinButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    for (let i = 0; i < numberInputs.length; i++) {
        let cloneInput = document.getElementById(numberInputs[i].dataset.clone);

        cloneInput.value = parseInt(numberInputs[i].value.replace( /\s/g, ''));
    }
});


function isIe() {
    let ua = window.navigator.userAgent,
        msie = ua.indexOf("MSIE ");

    return msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)
}



