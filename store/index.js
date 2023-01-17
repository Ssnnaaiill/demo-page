import Cookies from "js-cookie";

export const state = () => ({
  responsive: false,
  phoneNumber: null,
  dialog: true
});

export const getters = {
  getPhoneNumber (state) {
    return state.phoneNumber;
  }
};

export const mutations = {
  openPhoneDialog (state) {
    state.dialog = true;
  },
  closePhoneDialog (state) {
    state.dialog = false;
  },
  savePhoneNumber (state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  setCookie (state, value) {
    Cookies.set("phoneNumberSubmitted", value);
  },
  ifSubmitted (state) {
    return Cookies.get("phoneNumberSubmitted") === "y";
  }
};

export const actions = {
};
