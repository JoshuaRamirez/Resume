<template>
  <div>
    <md-card>
      <md-toolbar md-elevation="1">
        <h3 class="md-sub-title" style="flex: 1">
          Project <span v-if="Project">{{ Project.Id }}</span>
        </h3>
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
          <md-autocomplete v-model="Project.Location" :md-options="Locations">
            <label>Location</label>
          </md-autocomplete>
          <md-field>
            <label>Start Date</label>
            <md-input
              v-model="Project.StartDate"
              @change="onDurationChanged()"
            />
          </md-field>
          <md-field>
            <label>End Date</label>
            <md-input v-model="Project.EndDate" @change="onDurationChanged()" />
          </md-field>
          <md-field>
            <label>Duration</label>
            <md-input readonly v-model="Project.Duration" />
          </md-field>
        </div>
      </md-card-content>
    </md-card>
    <EditSkills
      v-if="Project"
      data-parent-type="Project"
      v-bind:dataParentId="Project.Id"
      data-property-name="Architectures"
    ></EditSkills>
    <EditSkills
      v-if="Project"
      data-parent-type="Project"
      v-bind:dataParentId="Project.Id"
      data-property-name="Frameworks"
    ></EditSkills>
    <EditSkills
      v-if="Project"
      data-parent-type="Project"
      v-bind:dataParentId="Project.Id"
      data-property-name="Languages"
    ></EditSkills>
  </div>
</template>

<style lang="sass" scoped>
.number-field
  width: 60px

.progress-bar
  margin-bottom: -5px

.md-card
  margin: 20px

.fade-enter-active,
.fade-leave-active
  transition: opacity 1s

.fade-leave-to
  opacity: 0
</style>

<script>
import Runtime from "../Domain/Runtime";
import EditSkills from "./EditSkills";
import Events from "../Domain/Events";
import States from "../Domain/States";
function onDurationChanged() {
  Events.ProjectDurationModified(this.Project);
}
const findProject = function (context) {
  const id = context.$route.params.id;
  const profile = Runtime.Profile;
  const project = profile.Projects.FindById(id);
  return project;
};
export default {
  data() {
    return {
      Project: null,
      Locations: States
    };
  },
  async created() {
    await Runtime.LoadProfile();
    this.Project = findProject(this);
  },
  watch: {
    $route() {
      this.Project = findProject(this);
    },
  },
  components: {
    EditSkills,
  },
  methods: {
    onDurationChanged,
  },
};
</script>