<template>
  <div>
    <md-card>
      <md-toolbar md-elevation="1">
        <h3 class="md-sub-title" style="flex: 1">Architectures</h3>
        <md-button
          v-on:click="onAddArchitectureButtonClicked()"
          class="md-icon-button md-raised"
        >
          <md-icon>add</md-icon>
        </md-button>
      </md-toolbar>
      <transition name="fade">
        <md-progress-bar
          v-if="!Architectures"
          class="progress-bar"
          md-mode="indeterminate"
        ></md-progress-bar>
      </transition>
      <md-card-content>
        <table v-if="Architectures" style="margin: auto">
          <tr
            v-for="(architecture, index) in Architectures.Items"
            v-bind:key="architecture.Id"
          >
            <td>
              <md-field>
                <label>Skill</label>
                <md-input v-model="architecture.Skill"></md-input>
              </md-field>
            </td>
            <td>
              <md-field>
                <label>Years</label>
                <md-input
                  class="number-field"
                  type="number"
                  v-model="architecture.Years"
                ></md-input>
              </md-field>
            </td>
            <td>
              <md-field>
                <label>Interest</label>
                <md-input
                  class="number-field"
                  type="number"
                  v-model="architecture.Interest"
                ></md-input>
              </md-field>
            </td>
            <td>
              <md-field>
                <label>Rating</label>
                <md-input
                  class="number-field"
                  type="number"
                  v-model="architecture.Rating"
                ></md-input>
              </md-field>
            </td>
            <td>
              <md-button
                v-on:click="onRemoveArchitectureButtonClicked(index)"
                class="md-icon-button md-raised"
              >
                <md-icon>clear</md-icon>
              </md-button>
            </td>
          </tr>
        </table>
      </md-card-content>
    </md-card>
  </div>
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
import Skill from "../Domain/Skill";
const onRemoveArchitectureButtonClicked = function (index) {
  this.Architectures.RemoveAt(index);
};
const onAddArchitectureButtonClicked = function () {
  const skill = Skill();
  this.Architectures.Add(skill);
};
export default {
  props: ["dataSource", "parentId"],
  data() {
    return {
      DataSource: this.dataSource,
      ParentId: this.parentId,
      Architectures: null,
    };
  },
  async created() {
    const profile = await Runtime.LoadProfile();
    if (this.DataSource === "Profile") {
      this.Architectures = profile.Architectures;
    }
    if (this.DataSource === "Project" && this.ParentId) {
      const project = profile.Projects.FindById(this.ParentId);
      this.Architectures = project.Architectures;
    }
    console.log(this.Architectures);
  },
  methods: {
    onAddArchitectureButtonClicked,
    onRemoveArchitectureButtonClicked,
  },
};
</script>