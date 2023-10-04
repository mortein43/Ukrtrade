class Order {
    orderedProducts;
    orderedProductsCount;
    totalSum;
    time;
    number;
    customerFullName;
    customerGmail;
    customerPhoneNumber;
    paymentUponReceipt;
}

let checkedPayNow = false;

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

const nameSurnameRegex = new RegExp("^(?:[a-zA-Z''`-]+|[А-Яа-яіІїЇєЄ''`-]+)$");
const cyrillicRegex = new RegExp("^[А-Яа-яіІїЇєЄ''`-]+$");
const emailRegex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);

let nameInput = document.getElementById("input_name");
let nameError = document.getElementById("error_input_name");

let surnameInput = document.getElementById("input_surname");
let surnameError = document.getElementById("error_input_surname");

let emailInput = document.getElementById("input_e-mail");
let emailError = document.getElementById("error_input_e-mail");

let phoneInput = document.getElementById("input_phone-number");
const phoneMaskOptions = {
    mask: "+38\\0 00 000 00 00",
    lazy: false,
    placeholderChar: ' ' 
};
const phoneMask = new IMask(phoneInput, phoneMaskOptions);
const correctPhoneBoolMask = [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1];
let currentPhoneBoolMask = [];
let phoneError = document.getElementById("error_input_phone-number");

let cardNumberInput = document.getElementById("input_card-number");
const cardNumberMaskOptions = {
    mask: "0000 0000 0000 0000"
};
const cardNumberMask = new IMask(cardNumberInput, cardNumberMaskOptions);
const correctCardNumberMask = [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1];
const currentCardNumberMask = [];
let cardNumberError = document.getElementById("error_input_card-number");

let cardValidityInput = document.getElementById("input_card-validity");
const cardValidityMaskOptions = {
    mask: "00/00"
};
const cardValidityMask = new IMask(cardValidityInput, cardValidityMaskOptions);
const correctCardValidityMask = [1, 1, 0, 1, 1];
const currentCardValidityMask = [];
let cardValidityError = document.getElementById("error_input_card-validity");

let cvvInput = document.getElementById("input_cvv");
const cvvMaskOptions = {
    mask: "000"
};
const cvvMask = new IMask(cvvInput, cvvMaskOptions);
const correctCvvMask = [1, 1, 1];
const currentCvvMask = [];
let cvvError = document.getElementById("error_input_cvv")

function showCardInputElements(shouldShow) {
    if (shouldShow) {
        cardNumberInput.style.display = "none";
        cardNumberError.style.display = "none";
        cardValidityInput.style.display = "none";
        cardValidityError.style.display = "none";
        cvvInput.style.display = "none";
        cvvError.style.display = "none";
        document.getElementById("credit_card_img").style.display = "none";
        checkedPayNow = false;
    } else {
        cardNumberInput.style.display = "block";
        cardValidityInput.style.display = "block";
        cvvInput.style.display = "block";
        cardValidityError.style.display = "block";
        cardNumberError.style.display = "block";
        cvvError.style.display = "block";
        document.getElementById("credit_card_img").style.display = "block";
        checkedPayNow = true;
    }
}

function validateName() {
    if (surnameInput.value.length > 1 && nameInput.value.length > 1) {
        if (cyrillicRegex.test(nameInput.value) != cyrillicRegex.test(surnameInput.value)) {
            nameError.innerHTML = "* ім'я та прізвище написані різними мовами";
            nameError.style.display = "block";
            return false;
        }
        nameError.innerHTML = "";
        nameError.style.display = "none";
        surnameError.innerHTML = "";
        surnameError.style.display = "none";
    }
    if (nameInput.value.length == 0) {
        nameError.innerHTML = "* введіть ім'я";
        nameError.style.display = "block";
        return false;
    }
    if (!nameSurnameRegex.test(nameInput.value) || nameInput.value.length == 1) {
        nameError.innerHTML = "* введіть ім'я правильно";
        nameError.style.display = "block";
        return false;
    }
    if (nameError.style.display != "none") {
        nameError.innerHTML = "";
        nameError.style.display = "none";
        return true;
    }
    return true;
}

function validateSurname() {
    if (nameInput.value.length > 1 && surnameInput.value.length > 1) {
        if (cyrillicRegex.test(nameInput.value) != cyrillicRegex.test(surnameInput.value)) {
            surnameError.innerHTML = "* ім'я та прізвище написані різними мовами";
            surnameError.style.display = "block";
            return false;
        }
        nameError.innerHTML = "";
        nameError.style.display = "none";
        surnameError.innerHTML = "";
        surnameError.style.display = "none";
    }
    if (surnameInput.value.length == 0) {
        surnameError.innerHTML = "* введіть прізвище";
        surnameError.style.display = "block";
        return false;
    }
    if (!nameSurnameRegex.test(surnameInput.value) || surnameInput.value.length == 1) {
        surnameError.innerHTML = "* введіть прізвище правильно";
        surnameError.style.display = "block";
        return false;
    }
    if (surnameError.style.display != "none") {
        surnameError.innerHTML = "";
        surnameError.style.display = "none";
        return true;
    }
    return true;
}

function validatePhoneNumber() {
    for (let i = 0; i < 17; i++) {
        currentPhoneBoolMask[i] = Number.isInteger(Number.parseInt(phoneInput.value[i]));
    }

    let isCorrect = (function() {
        for (let i = 0; i < 17; i++) {
            if (currentPhoneBoolMask[i] != correctPhoneBoolMask[i]) {
                return false;
            }
        }
        return true;
    })();

    if (!isCorrect) {
        phoneError.innerHTML = "* введіть повний номер телефону";
        phoneError.style.display = "block";
        return false;
    }
    if (phoneError.style.display != "none") {
        phoneError.innerHTML = "";
        phoneError.style.display = "none";
        return true;
    }
    return true;
}

function validateEmail() {
    if (emailInput.value.length == 0) {
        emailError.innerHTML = "* введіть ел. адресу";
        emailError.style.display = "block";
        return false;
    }
    if (!emailRegex.test(emailInput.value)) {
        emailError.innerHTML = "* введіть ел. адресу правильно";
        emailError.style.display = "block";
        return false;
    }
    if (emailError.style.display != "none") {
        emailError.innerHTML = "";
        emailError.style.display = "none";
        return true;
    }
    return true;
}

function validateCardNumber() {
    for (let i = 0; i < 19; i++) {
        currentCardNumberMask[i] = Number.isInteger(Number.parseInt(cardNumberInput.value[i]));
    }

    let isCorrect = (function() {
        for (let i = 0; i < 19; i++) {
            if (currentCardNumberMask[i] != correctCardNumberMask[i]) {
                return false;
            }
        }
        return true;
    })();

    if (!isCorrect) {
        cardNumberError.innerHTML = "* заповніть поле";
        cardNumberError.style.display = "block";
        return false;
    }
    if (cardNumberError.style.display != "none") {
        cardNumberError.innerHTML = "";
        cardNumberError.style.display = "none";
        return true;
    }
    return true;
}

function validateCardValidity() {
    for (let i = 0; i < 5; i++) {
        currentCardValidityMask[i] = Number.isInteger(Number.parseInt(cardValidityInput.value[i]));
    }

    let isCorrect = (function() {
        for (let i = 0; i < 5; i++) {
            if (currentCardValidityMask[i] != correctCardValidityMask[i]) {
                return false;
            }
        }
        return true;
    })();

    if (!isCorrect) {
        cardValidityError.innerHTML = "* заповніть поле";
        cardValidityError.style.display = "block";
        return false;
    }
    
    let cardExpiryMonth = parseInt(cardValidityInput.value.substring(0, 2));
    let cardExpiryYear = parseInt(cardValidityInput.value.substring(3, 5));

    if (cardExpiryMonth > 12) {
        cardValidityError.innerHTML = "* дані вказані неправильно";
        cardValidityError.style.display = "block";
        return false;
    }
    
    if (cardExpiryYear < currentYear % 100 || 
       (cardExpiryYear == currentYear % 100 && cardExpiryMonth < currentMonth)) {
        cardValidityError.innerHTML = "* термін дії картки минув";
        cardValidityError.style.display = "block";
        return false;
    }
    if (cardValidityError.style.display != "none") {
        cardValidityError.innerHTML = "";
        cardValidityError.style.display = "none";
        return true;
    }
    return true;
}

function validateCVV() {
    for (let i = 0; i < 3; i++) {
        currentCvvMask[i] = Number.isInteger(Number.parseInt(cvvInput.value[i]));
    }

    let isCorrect = (function() {
        for (let i = 0; i < 3; i++) {
            if (currentCvvMask[i] != correctCvvMask[i]) {
                return false;
            }
        }
        return true;
    })();

    if (!isCorrect) {
        cvvError.innerHTML = "* заповніть поле";
        cvvError.style.display = "block";
        return false;
    }
    if (cvvError.style.display != "none") {
        cvvError.innerHTML = "";
        cvvError.style.display = "none";
        return true;
    }
    return true;
}

function checkAndConfirm() {
    if (!checkedPayNow) {
        if (validateName() && validateSurname() && validatePhoneNumber() && validateEmail()) {
            console.log("succesful");
        }
    }
    else {
        if (validateName() && validateSurname() && validatePhoneNumber() && validateEmail() && validateCardNumber() && validateCardValidity() && validateCVV()) {
            console.log("succesful");
        }
    }
}