<template>
  <div id="login" class="container">
    <b-card class="p-3 shadow-sm mt-5 mx-auto form">
      <h3 class="text-bold">
        Login
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
        <b-form @submit="submit" id="form" class="p-1 text-left">
          <b-form-group id="email-fg" label="Email" label-for="email">
            <b-input
              id="email"
              v-model="form.Email"
              type="text"
              placeholder="Enter thine Email address"
              :disabled="disabled"
              required
            ></b-input>
          </b-form-group>
          <!-- Password -->
          <b-form-group id="password-fg" label="Password" label-for="password">
            <b-input
              id="password"
              type="password"
              placeholder="Enter Password"
              v-model="form.Password"
              :disabled="disabled"
              required
            ></b-input>
          </b-form-group>
          <!-- Submit buttons -->
          <b-button
            block
            type="submit"
            variant="info"
            :disabled="disabled"
            class="bg-dark-peach p-2 mt-4 w100"
          >
            Login
          </b-button>
          <p class="mt-3 text-center" style="color: peach">
            <router-link class="mx-auto text-muted mt-3 text-center" to="join"
              >Signup instead</router-link
            >
          </p>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import axios from "axios";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      form: {
        Email: "",
        Password: ""
      },
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
        .post(
          "http://localhost:3000/api/user/login",
          { data: this.form },
          { withCredentials: true }
        )
        .then(response => {
          this.disabled = false;
          this.clearForm();
          this.showAlert(response.data.message, response.data.error);
          setTimeout(() => {
            // Yaa

            this.$session.start();
            this.$session.set("sharing", response.data.result);
            this.$store.dispatch("SET_USER", response.data.user);
            this.$router.push("/home");
          }, 2000);
        })
        .catch(err => {
          setTimeout(() => {
            this.disabled = false;
            this.clearForm();
          }, 2000);
          if (err.response) {
            // const error = JSON.parse(err.response.data);
            this.showAlert(
              err.response.data.message + ".\n \n Please try again",
              err.response.data.error
            );
            console.log(err.response.status);
          } else if (err.request) {
            console.log(err.request);
            this.showAlert("Unexpected Error :( please try again");
          } else {
            console.log("Error => ", err);
            this.showAlert("Unexpected Error :( please try again");
          }
        });
      // console.log("Axios => ", this.axios);
      console.log("Form => ", JSON.stringify(this.form));
    },
    clearForm() {
      this.form.Email = "";
      this.form.Password = "";
      document.getElementById("form").reset();
    },
    showAlert(message, error) {
      this.message = message;
      this.alertVariant(error);
      this.dismissCountdown = this.dismissSeconds;
    },
    alertVariant(error) {
      this.variant = error ? "danger" : "success";
    },
    dismissCountChanged(secs) {
      this.dismissCountdown = secs;
    }
  }
};
</script>
<style scoped>
.form {
  background-color: peachpuff;
  color: #2c3e50;
  width: 40%;
}
.form label {
  text-align: left !important;
}
.form button {
  color: #ffffff !important;
  background-color: palevioletred;
}
.text-center {
  text-align: center !important;
}
</style>
