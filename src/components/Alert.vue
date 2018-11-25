<template>
    <b-alert
        :show="show"
        dismissible
        fade
        variant="warning"
        @dismissed="alertDismissed"
        @dismiss-count-down="countDownChanged"
    >
        <p>{{message}}</p>
    </b-alert>
</template>

<script>
export default {
  name: "AlertComponent",
  props: ["message", "show"],
  methods: {
    alertDismissed: function() {
      this.$emit("alert_dismissed");
    },
    countDownChanged: function(seconds) {
      this.$emit("count_down_changed", seconds);
    }
  }
};
</script>

<style>
</style>
