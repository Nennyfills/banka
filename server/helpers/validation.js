const Validate = {

  isEmail: (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  },
  isPhoneNumber: (phone) => {
    if ("^[0-9]*$".test(phone) || isNaN(parseInt(phone, 10) || !(phone.length === 14))) {
      return true;
    }
    return false;
  },

  isName: (name) => {
    if (-/^[A-Za-z ]+$/.test({ name })) {
      return true;
    }
    return false;
  },
};
export default Validate;
