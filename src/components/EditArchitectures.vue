<template>
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
    <md-card-content>
      <table style="margin: auto">
        <tr
          v-for="(architecture, index) in Domain.Architectures.Items"
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
</template>

<style lang="scss" scoped>
.number-field {
  width: 60px;
}
</style>

<script>
import Runtime from "../Domain/Runtime";
const profile = Runtime.Profile;
const onRemoveArchitectureButtonClicked = function (index) {
  profile.Architectures.Items.splice(index, 1);
};
const onAddArchitectureButtonClicked = function () {
  profile.Architectures.Add({
    Skill: "",
    Years: "",
    Rating: "",
    Interest: "",
  });
};
const data = function () {
  return {
    Domain: profile,
  };
};
const methods = {
  onAddArchitectureButtonClicked,
  onRemoveArchitectureButtonClicked,
};
export default { data, methods };
</script>