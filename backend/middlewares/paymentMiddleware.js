// Функция для проверки номера карты по алгоритму Луна
const validateCreditCard = (cardNumber) => {
    const cardNumberStr = cardNumber.toString().replace(/\s/g, '');
    if (!/^\d+$/.test(cardNumberStr)) {
        return false;
    }

    let sum = 0;
    let doubleUp = false;

    for (let i = cardNumberStr.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumberStr.charAt(i));

        if (doubleUp) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;

        doubleUp = !doubleUp;
    }

    return sum % 10 === 0;
};

const validateExpiryDate = (date) => {
    const [month, year] = date.split('/').map(Number);
    if (isNaN(month) || isNaN(year)) {
        return false;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (month < 1 || month > 12) {
        return false;
    }

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
    }

    return true;
};

const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
};

const validateCreditCardMiddleware = (req, res, next) => {
    const { cardNumber, date, cvv } = req.body;

    if (!validateCreditCard(cardNumber)) {
        return res.status(400).json({ error: 'Invalid credit card number' });
    }

    if (!validateExpiryDate(date)) {
        return res.status(400).json({ error: 'Invalid expiry date' });
    }

    if (!validateCVV(cvv)) {
        return res.status(400).json({ error: 'Invalid CVV' });
    }

    next();
};

module.exports={
    validateCreditCardMiddleware
}