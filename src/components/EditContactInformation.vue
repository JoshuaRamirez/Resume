<template>
  <md-card>
    <md-toolbar md-elevation="1">
      <h3 class="md-sub-title" style="flex: 1">Contact Information</h3>
    </md-toolbar>
    <transition name="fade">
      <md-progress-bar
        v-if="!Profile"
        class="progress-bar"
        md-mode="indeterminate"
      ></md-progress-bar>
    </transition>
    <md-card-content>
      <div v-if="Profile">
        <md-field>
          <label>Name</label>
          <md-input v-model="Profile.Name" />
        </md-field>
        <md-field>
          <label>Phone</label>
          <md-input v-model="Profile.Phone" />
        </md-field>
      </div>
    </md-card-content>
  </md-card>
</template>

<style lang="scss" scoped>
.progress-bar {
  margin-bottom: -5px;
}
.md-card {
  margin: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
import Runtime from "../Domain/Runtime";
export default {
  data() {
    return {
      Profile: null
    };
  },
  async created() {
    this.Profile = await Runtime.LoadProfile();
  },
};
</script>