<template>
    <div id="main-view" class="my-2 p-2">
        <div>
          <b-card class="post">
            Stuff
          </b-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "Main"
};
</script>
<style scoped>
#main-view {
  border-radius: 8px;
  height: auto;
  /* background-color: #d1ecf1; */
}
.post {
  background-color: #d1ecf1;
  width: 100px;
  overflow: hidden;
  border-radius: 8px !important;
  height: auto;
}
</style>
