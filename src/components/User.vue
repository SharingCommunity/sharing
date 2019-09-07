<template>
  <div
    id="user-component"
    class="alert d-flex justify-content-between mb-0 p-1 sharing-blue-style"
  >
    <div class="d-flex user-block align-items-center">
      <div class="avatar bg-red"></div>
      <span class="ml-1 text-bold">{{ username }}</span>
    </div>

    <!-- Dropdown! -->
    <b-dropdown
      class="p-0"
      dropleft
      offset="10px"
      size="sm"
      variant="link"
      no-caret
    >
      <template v-slot:button-content>
        <span class="user-menu-button badge text-secondary">
          &#8801;
        </span>
      </template>
      <b-dropdown-item>
        &#x1F44B; Logout
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>
export default {
  props: ["username"]
};
</script>
<style scoped>
.avatar {
  position: relative;
  display: inline-block;
  width: 35px;
  height: 35px;
  border: 1px transparent;
  border-radius: 50%;
}

.bg-red {
  background-color: coral;
}

.user-block {
  font-size: 18px;
  font-weight: bold;
}

.user-menu-button {
  font-size: 34px;
  font-weight: bold;
  cursor: pointer;
}
.user-menu-button:hover {
  color: #1b2228;
  transition: 0.2s ease;
}
</style>
