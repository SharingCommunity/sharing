<template>
  <div id="signup" class="container">
    <b-alert variant="danger" show class="mt-2 p-1 mx-2 d-block"
      >Everyone on Sharing is anonymous, so be rest assured that your personal
      information like your name will never be public.</b-alert
    >
    <b-card class="p-3 shadow-sm mt-5 mb-5 mx-auto form">
      <h3 class="text-bold">
        Join Sharing!
      </h3>
      <b-alert
        :show="dismissCountdown"
        :variant="variant"
        @dismissed="dismissCountdown = 0"
        @dismiss-count-down="dismissCountChanged"
      >
        {{ message }}
      </b-alert>
      <b-card-body>
        <b-form @submit="submit" class="p-1" ref="form">
          <!-- First Name -->
          <b-form-group id="fname-fg" label="First Name" label-for="fname">
            <b-input
              id="fname"
              v-model="form.FirstName"
              type="text"
              placeholder="Enter Firstname"
              required
            ></b-input>
          </b-form-group>
          <!-- First Name -->

          <!-- Last Name -->
          <b-form-group id="lname-fg" label="Last Name" label-for="lname">
            <b-input
              id="lname"
              v-model="form.LastName"
              type="text"
              placeholder="Enter Lastname"
              required
            ></b-input>
          </b-form-group>
          <!-- Last Name -->

          <!-- Email -->
          <b-form-group
            id="email-fg"
            label="Email"
            label-for="email"
            description="AUN email please :)"
          >
            <b-input
              id="email"
              v-model="form.Email"
              type="text"
              placeholder="Enter Email"
              required
            ></b-input>
          </b-form-group>
          <!-- Email -->

          <!-- Password -->
          <b-form-group
            id="password-fg"
            label="Password"
            label-for="password"
            class="mt-3"
          >
            <b-input
              id="password"
              type="password"
              placeholder="Enter Password"
              v-model="form.Password"
              required
            ></b-input>
          </b-form-group>
          <!-- Password -->

          <!-- Confirm Password -->
          <b-form-group
            id="confirm-password-fg"
            label="Confirm Password"
            label-for="confirmPassword"
            class="mt-3"
          >
            <b-input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              :state="passwordMatch"
              v-model="confirmPassword"
              required
            ></b-input>
          </b-form-group>
          <!-- Confirm Password -->

          <!-- Submit buttons -->
          <b-button
            type="submit"
            variant="info"
            class="bg-dark-peach text-white p-2 w100"
          >
            Start sharing
          </b-button>
          <p class="mt-3">
            <router-link class="mx-auto text-muted text-center" to="login"
              >Login instead</router-link
            >
          </p>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
// import Axios from 'axios';
import API from "../../config.js";
import { setTimeout } from "timers";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: ""
      },
      confirmPassword: "",
      disabled: false,
      message: "",
      dismissCountdown: 0,
      dismissSeconds: 5,
      variant: "primary"
    };
  },
  methods: {
    submit(evt) {
      evt.preventDefault();
      this.disabled = true;
      axios
        .post(`${API}/app/join`, { data: this.form }, { withCredentials: true })
        .then(response => {
          setTimeout(() => {
            this.disabled = false;
            this.clearForm();
            this.showAlert(response.data.message, response.data.error);
            // this.$session.start();
            // this.$session.set("sharing", response.result);
            window.localStorage.getItem("Sharing");
            this.$store.dispatch("SET_USER", response.data.u);
            this.$router.push("/main");
          }, 2000);
        })
        .catch(err => {
          setTimeout(() => {
            this.disabled = false;
            this.clearForm();
          }, 2000);
          if (err.response) {
            this.showAlert(err.message, err.error);
          } else if (err.request) {
            console.log(err.request);
            this.showAlert("Unexpected Error :( please try again");
          } else {
            console.log("Error => ", err);
            this.showAlert("Unexpected Error :( please try again");
          }
        });
    },
    clearForm() {
      this.$refs.form.reset();
      this.form.FirstName = "";
      this.form.LastName = "";
      this.form.Email = "";
      this.form.Password = "";
      this.confirmPassword = "";
    },
    showAlert(message, error) {
      this.message = message;
      this.alertVariant(error);
      this.dismissCountdown = this.dismissSeconds;
      this.$bvToast.toast("Hello Hello!", {
        title: "Yo YO YO",
        variant: "Success"
      });
    },
    alertVariant(error) {
      this.variant = error ? "danger" : "success";
    },
    dismissCountChanged(secs) {
      this.dismissCountdown = secs;
    }
  },
  computed: {
    passwordMatch: function() {
      return this.confirmPassword === ""
        ? null
        : this.form.Password === this.confirmPassword
        ? true
        : false;
    }
  }
};
</script>
<style scoped>
.form {
  background-color: palegreen;
  color: #2c3e50;
  width: 40%;
}
.form label {
  text-align: left !important;
}
.form button {
  color: #d1ecf1 !important;
  background-color: palevioletred;
}
.form-control {
  border-color: rgba(0, 0, 0, 0.125) !important;
}
</style>
