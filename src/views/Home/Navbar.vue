<template>
  <b-navbar
    class="text-white shadow-sm bg-solid py-1 justify-content-between"
    fixed="top"
  >
    <b-navbar-brand>
      Sharing
    </b-navbar-brand>
    <div>
      <div class="notifs close">
        <eva-icon
          name="bell-outline"
          fill="white"
          width="25px"
          height="25px"
        ></eva-icon>
      </div>
    </div>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar"
};
</script>
<style>
.navbar {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
}
.notifs {
  cursor: pointer;
}
</style>
