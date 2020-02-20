<template>
  <b-navbar
    class="text-white shadow-sm bg-solid py-1 justify-content-between"
    fixed="top"
  >
    <b-navbar-brand class="text-white">
      WeGive
      <b-badge variant="secondary" style="text-size: x-small;" pill
        >alpha v0.6.4</b-badge
      >
    </b-navbar-brand>

    <div class="d-flex">
      <div class="notifs nav-icon opacity" @click="goTo('/events')">
        <b-badge v-if="events.length > 0" variant="light">{{
          events.length
        }}</b-badge>
        <eva-icon
          v-b-tooltip.hover
          title="Events"
          name="bell-outline"
          fill="white"
          width="25px"
          height="25px"
        ></eva-icon>
      </div>

      <div class="notifs nav-icon opacity ml-3" @click="goTo('/posts')">
        <b-badge v-if="events.length > 0" variant="light">{{
          events.length
        }}</b-badge>
        <eva-icon
          v-b-tooltip.hover
          title="Posts"
          name="message-square-outline"
          fill="white"
          width="25px"
          height="25px"
        ></eva-icon>
      </div>

      <div class="notifs nav-icon ml-2">
        <b-dropdown size="sm" variant="link" :toggle-class="classes" no-caret>
          <template v-slot:button-content>
            <eva-icon
              name="more-vertical-outline"
              fill="white"
              width="25px"
              height="25px"
            ></eva-icon>
          </template>
          <!-- <b-dropdown-item class="button" @click="goTo('/posts')"
            >Your Posts</b-dropdown-item
          > -->
          <b-dropdown-item @click="goTo('/help/about')"
            >WTF is this</b-dropdown-item
          >
        </b-dropdown>
      </div>
    </div>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      classes: ["text-decoration-none", "p-0", "opacity"]
    };
  },
  computed: {
    events() {
      return this.$store.getters.NEW_EVENTS;
    }
  },
  methods: {
    goTo(where) {
      this.$router.push(where);
    },
    notif() {
      this.$notif();
    }
  }
};
</script>
<style>
.navbar {
  font-family: "Poppins", sans-serif;
}
.notifs {
  cursor: pointer;
}

.nav-icon-set {
  float: right;
}

.nav-icon {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
}

.nav-icon:hover,
.nav-icon:active {
  opacity: 1 !important;
  transition: opacity 0.2s ease-in;
}

.opacity-normal {
  opacity: 1 !important;
}

.opacity {
  opacity: 0.5 !important;
}
</style>
