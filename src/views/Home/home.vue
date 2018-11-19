<template>
    <div id="home">
        <p>Home Works!</p>
        <header-component></header-component>
    </div>
</template>
<script>
import HeaderComponent from "../../components/Header.vue";
export default {
  name: "Home",
  data() {
    return {
      msg: "Hi!"
    };
  },
  components: {
    HeaderComponent
  }
};
</script>
<style src="./home.css"></style>


