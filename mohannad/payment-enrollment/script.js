//  global root element to access from anywhere in the code
const root = document.documentElement;
document.getElementById('currency').value = 'none'; //make default selection

// to validate fields 
const numericInput2 = document.querySelectorAll('.visa-2-input');
const numericInput3 = document.querySelector('.visa-3-input');
const numericInput4 = document.querySelectorAll('.visa-4-input');
numericInput3.addEventListener('input', function(event) {
    // keeps only digits
    const sanitizedValue = this.value.replace(/\D/g, ''); 
    const truncatedValue = sanitizedValue.slice(0, 3);
    this.value = truncatedValue;
});
for (let i = 0; i<2; i++){
    field = numericInput2[i];
    field.addEventListener('input', function(event) {
        // keeps only digits
        const sanitizedValue = this.value.replace(/\D/g, ''); 
        const truncatedValue = sanitizedValue.slice(0, 2);
        this.value = (this.classList.contains('month') ? (truncatedValue > 12 ? 12 :
                (truncatedValue < 0 ? 0 : truncatedValue)) : truncatedValue);
        // if the user deletes and it's the start of the field, go to the prev field
        if (
            ((event.code === "ArrowLeft" || (event.inputType === "deleteContentBackward") &&
            event.target.selectionStart === 0))
            ) {
                const previousSibling = event.target.previousElementSibling;
                if (previousSibling && previousSibling.classList.contains('visa-2-input')) {
                    previousSibling.focus();
                    previousSibling.select();
                }
            }
            // if it's the end of the field move to the next one
            if (
                (event.target.value.length === 2 && !(event.key <= "0" || "9" <= event.key)) ||
                (event.code === "ArrowRight" &&
                    event.target.selectionEnd === event.target.value.length)
                ) {
                const nextSibling = event.target.nextElementSibling;
                if (nextSibling && nextSibling.classList.contains('visa-2-input')) {
                    nextSibling.focus();
                    nextSibling.select();
                }
                else {
                    numericInput3.focus();
                    numericInput3.select();

                }
        }
    });
}
for (let i = 0; i<numericInput4.length; i++){
    const field = numericInput4[i];
    field.addEventListener('input', function(event) {
        // keeps only digits
        const sanitizedValue = this.value.replace(/\D/g, ''); 
        const truncatedValue = sanitizedValue.slice(0, 4);
        this.value = truncatedValue;
        // if the user deletes and it's the start of the field, go to the prev field
        if (
            ((event.code === "ArrowLeft" || (event.inputType === "deleteContentBackward") &&
            event.target.selectionStart === 0))
            ) {
                const previousSibling = event.target.previousElementSibling;
                if (previousSibling && previousSibling.classList.contains('visa-4-input')) {
                    previousSibling.focus();
                    previousSibling.select();
            }
        }
        // if the user adds and it's the end of the field, go to the next field
        if (
            (event.target.value.length === 4 && !(event.key <= "0" || "9" <= event.key)) ||
            (event.code === "ArrowRight" &&
                event.target.selectionEnd === event.target.value.length)
            ) {
            const nextSibling = event.target.nextElementSibling;
            if (nextSibling && nextSibling.classList.contains('visa-4-input')) {
                nextSibling.focus();
                nextSibling.select();
            }
        }
    });
}

// get the element to be changed (the card)
const card = document.getElementById('card');
function cardStyle(event) {
    const mode = event.target.value;
    const brand = document.querySelector('.card .brand');
    // perform different actions based on the selected mode
    switch (mode) {
        case 'visa':
            // change primary, secondary card color
            card.style.opacity = '0';
            // change the opacity then wait .3s seconds before changing other attributes
            setTimeout(() => {
                root.style.setProperty('--border-dark',  '#552594');
                root.style.setProperty('--border-light', '#55259430');
                brand.src = 'media/visa-logo.png'
                card.style.opacity = '1';
                card.style.backgroundImage = 'url(media/visa-bg.webp)';
            }, 300);
            break;
        case 'misa':
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
                brand.src = 'media/misa-logo.png'
                root.style.setProperty('--border-dark',  '#500778');
                root.style.setProperty('--border-light', '#9a00ec5e');
                card.style.backgroundImage = 'url(media/misa-bg.webp)';
            }, 300);
            break;
        case 'master':
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.backgroundImage = 'url(media/master-bg.webp)';
                card.style.opacity = '1';
                root.style.setProperty('--border-dark',  '#5a2608');
                root.style.setProperty('--border-light', '#c97901');
                brand.src = 'media/master-logo.png'
            }, 300);
            break;
            case 'bankmisr':
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.backgroundImage = 'url(media/bankmisr-bg.webp)';
                    card.style.opacity = '1';
                    root.style.setProperty('--border-dark',  '#024631');
                    root.style.setProperty('--border-light', '#007bff30');
                    brand.src = 'media/bankmisr-logo.png'
                }, 300);
                break;
            case 'paypal':
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.backgroundImage = 'url(media/paypal-bg.jpg)';
                card.style.opacity = '1';
                root.style.setProperty('--border-dark',  '#00457C');
                root.style.setProperty('--border-light', '#0079C140');
                brand.src = 'media/paypal-logo.png'
            }, 300);
            break;
    }
}

// event listeners to each radio button
const radioButtons = document.querySelectorAll('.con input');
radioButtons.forEach(radio => {
    radio.addEventListener('change', cardStyle);
});

// to allow only digits in coupon field
const coupon = document.getElementById('coupon');
coupon.addEventListener('input', function(even) {
    this.value = this.value.replace(/\D/g, '');
    this.value = this.value.slice(0, 6);
});

const form = document.querySelector('.payment-container');
const inputFields = form.querySelectorAll('input[type="text"][required]');
const progressBar = document.getElementById('progress-barv');
const captcha = document.getElementById('captcha');
const submitButton = document.querySelector('.submit-button')
const allset = document.querySelector('.allset');
function updateProgress() {
    //array to store the completed fields that don't contain spaces only
    const completedInputs = Array.from(inputFields).filter(input => input.value.trim() !== '');
    const progressPercentage = (completedInputs.length / inputFields.length) * 100;
    if (progressPercentage == '100'){
        allset.classList.add('show');
        captcha.classList.add('show');
        submitButton.disabled = false;
    } else {
        allset.classList.remove('show');
        captcha.classList.remove('show');
        submitButton.disabled = true;
    }
    // updated the progress bar's width based on that
    progressBar.style.width = progressPercentage + '%';
}
inputFields.forEach(input => {
    input.addEventListener('input', updateProgress);
});

// to display the rest of the form
const currencySelect = document.getElementById('currency');
currencySelect.addEventListener('change', function() {
    if (this.value != 'none'){
        document.querySelector('.hidden-by-default').classList.add('show');
    } else {
        //hide all if none currency is selected
        document.querySelector('.hidden-by-default').classList.remove('show');
        allset.classList.remove('show');
        captcha.classList.remove('show');
        // console.log(captcha.classList);
        submitButton.disabled = true;
    }
});

const Captcha = document.getElementById('captcha-input');    
submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // to prevent default button behavior
    const CaptchaInput = Captcha.value.trim(); // get trimmed value of the captcha input
    // check captcha input conditions and set custom validity messages
    if (CaptchaInput === '') {
        Captcha.setCustomValidity("Please don't skip the Captcha");
    } else if (CaptchaInput.length !== 6) {
        Captcha.setCustomValidity('Please enter exactly 6 digits');
    } else if (isNaN(Number(CaptchaInput))) {
        Captcha.setCustomValidity('Please enter digits only');
    } else if (CaptchaInput !== '123456') {
        Captcha.setCustomValidity('Incorrect Captcha. Please try again.');
    } else {
        // now captcha is valid, submit the form
        const form = document.getElementById('form');
        // one last check that the user will pay
        if (confirm("You'll be charged $29.99. Confirm?")){
            // form.submit();
            alert('You have added the course successfully!\n Happy Learning <3;')
            window.location.href = '../../yara/my-learning.html';
        }
    }
    // to display custom validity message
    Captcha.reportValidity();
});

const scrollToTopButton = document.getElementById('scroll-to-top');
scrollToTopButton.onclick = () => {
    document.body.scrollIntoView({behavior: 'smooth'})
}

const toDark =  [document.querySelector('.darkmode-button'), 
                document.querySelector('.darkmode-button .sun'), 
                document.querySelector('.darkmode-button .moon'),
                document.querySelectorAll('.darkmode-button .lines')];

const darkmodeButton = document.querySelector('.darkmode-button');
let isDark = 0;
const darkStyle = document.getElementById('dark-style'); // the link for the stylesheet
darkmodeButton.addEventListener('click', () => {
    for (let i = 0; i<toDark.length-1; i++){
        toDark[i].classList.toggle('dark');
        // console.log(toDark[i].classList);
    }
    for (let i = 0; i<toDark[3].length; i++){
        toDark[3][i].classList.toggle('dark');
    }
    if (isDark)
    darkStyle.href = 'style.css';
    else 
        darkStyle.href = 'style-dark.css';
    isDark = !isDark;
});