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
      <md-progress-bar
        v-if="!Profile"
        class="progress-bar"
        md-mode="indeterminate"
      ></md-progress-bar>
      <md-card-content>
        <table v-if="Profile" style="margin: auto">
          <tr
            v-for="(architecture, index) in Profile.Architectures.Items"
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
</style>

<script>
import Runtime from "../Domain/Runtime";
const onRemoveArchitectureButtonClicked = function (index) {
  this.$data.Profile.Architectures.RemoveAt(index);
};
const onAddArchitectureButtonClicked = function () {
  this.$data.Profile.Architectures.Add({
    Skill: "",
    Years: "",
    Rating: "",
    Interest: "",
  });
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
    onAddArchitectureButtonClicked,
    onRemoveArchitectureButtonClicked,
  },
};
</script>