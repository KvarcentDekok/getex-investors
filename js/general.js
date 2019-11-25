let noscriptHidden = document.querySelectorAll('.noscript-hidden'),
    noscriptReadonly = document.querySelectorAll('.noscript-readonly');

for (let i = 0; i < noscriptHidden.length; i++) {
    noscriptHidden[i].classList.remove('noscript-hidden');
}

for (let i = 0; i < noscriptReadonly.length; i++) {
    noscriptReadonly[i].readOnly = true;
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

for (let i = 0; i < numberInputs.length; i++) {
    let targetInput = calculatorForm.querySelector('[data-target="' + numberInputs[i].id + '"]'),
        unit = '';

    if (targetInput.dataset.unit) {
        unit = " " + targetInput.dataset.unit;

        if (targetInput.dataset.unit === 'лет') {
            if (Number(numberInputs[i].value) === 1) {
                unit = " год";
            } else if (Number(numberInputs[i].value) > 1 && Number(numberInputs[i].value) < 5) {
                unit = " года";
            }
        }
    }

    numberInputs[i].type = 'text';
    numberInputs[i].value = Number(numberInputs[i].value).toLocaleString("ru") + unit;
}

calcResults(rangeInputs[0].value, rangeInputs[1].value);

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
            } else if (this.dataset.unit === 'месяцев') {
                if (this.value[this.value.length - 1] === '1') {
                    if (this.value[this.value.length - 2] !== '1') {
                        unit = " месяц";
                    }
                } else if (
                    Number(this.value[this.value.length - 1]) > 1 &&
                    Number(this.value[this.value.length - 1]) < 5
                ) {
                    if (this.value[this.value.length - 2] !== '1') {
                        unit = " месяца";
                    }
                }
            }
        }

        targetInput.value = Number(this.value).toLocaleString('ru') + unit;

        calcResults(rangeInputs[0].value, rangeInputs[1].value);
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

        if (!numberValue || numberValue < 1) {
            numberValue = 1;
            start += 1;
        }

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

        calcResults(rangeInputs[0].value, rangeInputs[1].value);
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
        let cloneInputs = document.querySelectorAll('[id *= "' + numberInputs[i].dataset.clone + '"]');

        for (let k = 0; k < cloneInputs.length; k++) {
            cloneInputs[k].value = parseInt(numberInputs[i].value.replace( /\s/g, ''));
        }
    }
});

function calcResults (amount, time) {
    let resultsOut = {},
        results = {};

    resultsOut.interestRate = document.getElementById('result-interest-rate');
    resultsOut.income = document.getElementById('result-income');
    resultsOut.profit = document.getElementById('result-profit');

    if (Number(amount) <= 7500000) {
        results.interestRate = 15;
    } else if (Number(amount) <= 15000000) {
        results.interestRate = 16;
    } else {
        results.interestRate = 18
    }

    results.income = Number(amount) + ((amount * results.interestRate / 100) * time);
    results.profit = results.income - amount;

    resultsOut.interestRate.textContent = results.interestRate.toLocaleString('ru');
    resultsOut.income.textContent = results.income.toLocaleString('ru');
    resultsOut.profit.textContent = results.profit.toLocaleString('ru');
}


/* Партнёры */
let partners = document.querySelector('.partners'),
    partnersItems = partners.querySelectorAll('.partners-item'),
    morePartnersBtn = document.getElementById('more-partners');

for (let i = 3; i < partnersItems.length; i++) {
    partnersItems[i].classList.add('hide');
}

morePartnersBtn.addEventListener('click', function () {
    let hiddenItems = partners.querySelectorAll('.partners-item.hide'),
        numberOfHiddenItems = hiddenItems.length,
        numberToShowItems;

    if (numberOfHiddenItems >= 3) {
        numberToShowItems = 3;
    } else {
        numberToShowItems = numberOfHiddenItems;
    }

    for (let i = 0; i < numberToShowItems; i++) {
        hiddenItems[i].classList.add('show');
        numberOfHiddenItems -= 1;
    }

    if (numberOfHiddenItems === 0) {
        morePartnersBtn.classList.add('d-none');
    }

    setTimeout(function () {
        for (let i = 0; i < numberToShowItems; i++) {
            hiddenItems[i].classList.remove('hide');
            hiddenItems[i].classList.remove('show');
        }
    }, 500)
});


/* Формы обратной связи */
const blockChanger = document.querySelector('.block-changer'),
    requestForms = document.querySelectorAll('.request-form');

for (let i = 1; i < requestForms.length; i++) {
    requestForms[i].classList.add('d-none');
}

blockChanger.addEventListener('click', function (evt) {
    let target = evt.target;

    while (target !== this) {
        if (target.classList.contains('block-option'))  {
            if (!target.classList.contains('active')) {
                let blockOptions = blockChanger.querySelectorAll('.block-option'),
                    targetForm = document.getElementById(target.dataset.target);

                for (let i = 0; i < blockOptions.length; i++) {
                    blockOptions[i].classList.remove('active');
                }

                target.classList.add('active');

                for (let i = 0; i < requestForms.length; i++) {
                    requestForms[i].classList.add('d-none');
                }

                targetForm.classList.remove('d-none');
            }
        }

        target = target.parentNode;
    }
});


$("#company-inn").suggestions({
    token: "002eb8588b8af7978cfab46b1a943ccac119b706",
    type: "PARTY",
    count: 5,
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: function (suggestion) {
        console.log(suggestion);

        this.value = suggestion.data.inn;
    }
});

let bankNameInput = document.getElementById('bank-name'),
    corrAccountInput = document.getElementById('corr-account');

$("#bic").suggestions({
    token: "002eb8588b8af7978cfab46b1a943ccac119b706",
    type: "BANK",
    count: 5,
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: function(suggestion) {
        console.log(suggestion);

        this.value = suggestion.data.bic;
        bankNameInput.value = suggestion.data.name.payment;
        corrAccountInput.value = suggestion.data.correspondent_account;
    }
});


function isIe() {
    let ua = window.navigator.userAgent,
        msie = ua.indexOf("MSIE ");

    return msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)
}



