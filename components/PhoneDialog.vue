<template>
  <div>
    <v-dialog
      v-model="$store.state.dialog"
      persistent
      width="400"
    >
      <!-- <template #activator="{ }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          Privacy Policy
        </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="phoneNumber"
            :rules="phoneNumberRules"
            label="전화번호"
            required
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="disabled"
            color="primary"
            text
            @click="closeDialog()"
          >
            동의하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "PhoneDialog",
  data: () => ({
    phoneNumber: "",
    phoneNumberRules: [
      // Check if string has been typed
      v => !!v || "전화번호 입력",
      // Check if number has proper form
      v => /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(v) || "올바른 전화번호 형식이 아닙니다."
      // Check if number is valid
    ],
    valid: false,
    disabled: true
  }),
  watch: {
    phoneNumber () {
      if (this.phoneNumber && /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(this.phoneNumber)) {
        this.valid = true;
      } else {
        this.valid = false;
      }
      this.changeSubmitButtonStatus();
    }
  },
  beforeMount () {
    if (Cookies.get("phoneNumberSubmitted") === "y") {
      this.$store.commit("closePhoneDialog");
    }
  },
  methods: {
    closeDialog () {
      if (!this.$store.commit("ifSubmitted")) {
        this.$store.commit("savePhoneNumber", this.phoneNumber);
        this.$store.commit("setCookie", "y");
        this.$store.commit("closePhoneDialog");
      }
    },
    changeSubmitButtonStatus () {
      this.disabled = !this.valid;
    }
  }
};
</script>
