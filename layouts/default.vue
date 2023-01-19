<template>
  <v-app dark>
    <PhoneDialog />
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    > -->
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    > -->
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <!-- <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Cookies from "js-cookie";
import PhoneDialog from "~/components/PhoneDialog.vue";

export default {
  name: "DefaultLayout",
  components: { PhoneDialog },
  data: () => ({
    // clipped: false,
    drawer: false,
    fixed: false,
    items: [
      {
        icon: "mdi-apps",
        title: "Welcome",
        to: "/"
      },
      {
        icon: "mdi-chart-bubble",
        title: "Inspire",
        to: "/inspire"
      }
    ],
    // miniVariant: false,
    // right: true,
    title: "Demo Page",
    isLeaveSite: false
  }),
  created () {
    if (Cookies.get("phoneNumberSubmitted") === "y") {
      this.$store.commit("closePhoneDialog");
    }
  },
  mounted () {
    // if (this.$store.state.phoneNumber === null) {
    //   Cookies.set("phoneNumberSubmitted", "n");
    // }
    // window.addEventListener("beforeunload", this.unLoadEvent);

    // Initial cookie setting
    if (Cookies.get("phoneNumberSubmitted") !== "y") {
      // add some database magic code
      this.$store.commit("setCookie", "n");
    }
    if (this.$store.commit("ifSubmitted")) {
      this.$store.commit("closePhoneDialog");
    }
    window.onpopstate = () => {
      if (Cookies.get("phoneNumberSubmitted") === "n") {
        window.history.go(1);
      } else {
        window.history.go(-1);
      }
    };
  },
  beforeUnmount () {
    window.history.go(1);
    if (Cookies.get("phoneNumberSubmitted") === "n") {
      window.history.go(1);
      this.$store.commit("openPhoneDialog");
    } else {
      window.history.go(-1);
    }
    // window.addEventListener("beforeunload", this.unLoadEvent);
  },
  methods: {
    // unLoadEvent (e) {
    //   window.onbeforeunload = null;
    //   this.$router.go(-1);
    //   // if (this.$store.state.phoneNumber === null) {
    //   //   this.$store.commit("openPhoneDialog");
    //   // }
    //   if (Cookies.get("phoneNumberSubmitted") !== "y") {
    //     this.$store.commit("openPhoneDialog");
    //   }
    //   if (this.isLeaveSite) {
    //     return;
    //   }

    //   e.preventDefault();
    //   e.returnValue = "";
    // }
  }
};
</script>
