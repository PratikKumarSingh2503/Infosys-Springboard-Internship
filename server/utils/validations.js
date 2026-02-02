const registrationValidation = (fullname, email, password, phoneNumber, address) => {
    const emailRegExp = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (fullname.length >= 3 && emailRegExp.test(email) && password.length >= 6 && phoneNumber.length == 10 && address.length >= 3) {
        return true;
    } else {
        return false;
    }
};

const loginValidation = (email, password) => {
    const emailRegExp = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (emailRegExp.test(email) && password.length >= 6) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    registrationValidation,
    loginValidation
};