<template>
  <md-card>
    <md-toolbar md-elevation="1">
      <h3 class="md-sub-title" style="flex: 1">Projects</h3>
      <md-button
        v-on:click="onAddProjectButtonClicked()"
        class="md-icon-button md-raised"
      >
        <md-icon>add</md-icon>
      </md-button>
    </md-toolbar>
    <md-progress-bar
      v-if="!Profile"
      class="progress-bar"
      md-mode="indeterminate"
    ></md-progress-bar>
    <md-card-content>
      <table v-if="Profile" style="margin: auto">
        <tr
          v-for="(project, index) in Profile.Projects.Items"
          v-bind:key="project.Id"
        >
          <td>
            <md-button
              v-on:click="onEditProjectButtonClicked(project.Id)"
              class="md-icon-button md-raised"
            >
              <md-icon>source</md-icon>
            </md-button>
          </td>
          <td>
            <md-field>
              <label>Title</label>
              <md-input v-model="project.Title"></md-input>
            </md-field>
          </td>
          <td>
            <md-field>
              <label>Company</label>
              <md-input v-model="project.Company"></md-input>
            </md-field>
          </td>
          <td>
            <md-field>
              <label>StartDate</label>
              <md-input v-model="project.StartDate"></md-input>
            </md-field>
          </td>
          <td>
            <md-field>
              <label>EndDate</label>
              <md-input v-model="project.EndDate"></md-input>
            </md-field>
          </td>
          <td>
            <md-button
              v-on:click="onRemoveProjectButtonClicked(index)"
              class="md-icon-button md-raised"
            >
              <md-icon>clear</md-icon>
            </md-button>
          </td>
        </tr>
      </table>
    </md-card-content>
  </md-card>
</template>

<style lang="scss" scoped>
.number-field {
  width: 60px;
}
.progress-bar {
  margin-bottom: -5px;
}
.md-card {
  margin: 20px;
}
</style>

<script>
import Runtime from "../Domain/Runtime";
import Project from "../Domain/Project";
import Profile from "../Domain/Profile";
let profile = Profile();
const onRemoveProjectButtonClicked = function (index) {
  profile.Projects.RemoveAt(index);
};
const onAddProjectButtonClicked = function () {
  const newProject = Project();
  profile.Projects.Add(newProject);
};
const onEditProjectButtonClicked = function (id) {
  this.$router.push({ path: `/project/${id}` });
};
export default {
  data() {
    return {
      Profile: null,
    };
  },
  async created() {
    this.$data.Profile = await Runtime.Profile();
  },
  methods: {
    onAddProjectButtonClicked,
    onEditProjectButtonClicked,
    onRemoveProjectButtonClicked,
  },
};
</script>