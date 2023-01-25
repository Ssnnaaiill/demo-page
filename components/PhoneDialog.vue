<template>
  <div>
    <v-dialog
      v-model="$store.state.dialog"
      persistent
      width="400"
    >
      <v-card>
        <v-card-title>
          팝업 제목
        </v-card-title>
        <v-card-text>
          안내 문구를 이곳에 작성합니다.<br>
          안내 문구를 이곳에 작성합니다.<br>
          안내 문구를 이곳에 작성합니다.
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
import db from "@/plugins/firebaseConfig";

// const punycode = require("punycode/");

export default {
  name: "PhoneDialog",
  data: () => ({
    phoneNumber: "",
    phoneNumberRules: [
      v => !!v || "전화번호 입력",
      v => /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(v) || "올바른 전화번호 형식이 아닙니다."
    ],
    valid: false,
    disabled: true,
    dataset: []
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
  mounted () {
    this.getFirebaseData();
  },
  methods: {
    closeDialog () {
      if (!this.$store.commit("ifSubmitted")) {
        this.$store.commit("savePhoneNumber", this.phoneNumber);
        this.$store.commit("setCookie", "y");
        this.writeFirebaseData();
        this.$store.commit("closePhoneDialog");
      }
    },
    changeSubmitButtonStatus () {
      this.disabled = !this.valid;
    },
    getFirebaseData () {
      db.ref("phoneNumbers").child("data").get().then((snapshot) => {
        if (snapshot.exists()) {
          this.dataset = snapshot.val();
        }
      });
    },
    writeFirebaseData () {
      const newDataset = this.dataset.slice();
      newDataset.push({
        phoneNumber: this.phoneNumber,
        source: window.location.hostname,
        // source: punycode.decode(window.location.hostname),
        createdAt: new Date().toLocaleString("en-us")
      });
      db.ref("phoneNumbers").child("data").set(newDataset);
    }
  }
};
</script>
