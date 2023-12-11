import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "./utils/message.plugin";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min.js";
import Loader from "@/components/app/Loader";

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCVA4kn_ufNUnCFpmC5ugBVycOP1jUdDoQ",
  authDomain: "vue-crm-b30f9.firebaseapp.com",
  databaseURL: "https://vue-crm-b30f9-default-rtdb.firebaseio.com",
  projectId: "vue-crm-b30f9",
  storageBucket: "vue-crm-b30f9.appspot.com",
  messagingSenderId: "282649093163",
  appId: "1:282649093163:web:97f8e0c9cd5585dc4d766e",
  measurementId: "G-540RYLDMR2",
};

// Initialize Firebase
let app;

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .component("Loader", Loader)
      .mount("#app");
  }
});
