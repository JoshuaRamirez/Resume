<template>
  <md-card>
    <md-toolbar md-elevation="1">
      <h3 class="md-sub-title" style="flex: 1">Contact Information</h3>
    </md-toolbar>
    <md-card-content>
      <md-field><label>Name</label><md-input v-model="Domain.Name" /></md-field>
      <md-field
        ><label>Phone</label><md-input v-model="Domain.Phone"
      /></md-field>
    </md-card-content>
  </md-card>
</template>

<style lang="scss" scoped>
</style>

<script>
import Runtime from "../Domain/Runtime";
const profile = Runtime.Profile;
const data = function () {
  return {
    Domain: profile,
  };
};
export default {
  data,
};
</script>