<template>
  <md-card>
    <md-toolbar md-elevation="1">
      <h3 class="md-sub-title" style="flex: 1">Project {{ Project.Id }}</h3>
    </md-toolbar>
    <transition name="fade">
      <md-progress-bar
        v-if="!Project"
        class="progress-bar"
        md-mode="indeterminate"
      ></md-progress-bar>
    </transition>
    <md-card-content>
      <div v-if="Project">
        <md-field>
          <label>Title</label>
          <md-input v-model="Project.Title" />
        </md-field>
        <md-field>
          <label>Company</label>
          <md-input v-model="Project.Company" />
        </md-field>
        <md-field>
          <label>Start Date</label>
          <md-input v-model="Project.StartDate" />
        </md-field>
        <md-field>
          <label>End Date</label>
          <md-input v-model="Project.EndDate" />
        </md-field>
      </div>
    </md-card-content>
  </md-card>
</template>

<style lang="sass" scoped>
</style>

<script>
import Runtime from "../Domain/Runtime";
const findProject = function (id) {
  const profile = Runtime.CachedProfile;
  const project = profile.Projects.FindById(id);
  return project;
};
export default {
  data() {
    return {
      Project: null,
    };
  },
  async created() {
    this.Profile = await Runtime.LoadProfile();
  },
  watch: {
    $route() {
      const id = this.$route.params.id;
      const project = findProject(id);
      this.Project = project;
    },
  },
};
</script>