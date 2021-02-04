<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button
          class="md-icon-button"
          @click="VM.menuVisible = !VM.menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Resume</span>
        <div class="md-toolbar-section-end">
          <md-button v-on:click="onSaveButtonClicked()"
            ><md-icon>save</md-icon> Publish</md-button
          >
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="VM.menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0"
          >Navigation</md-toolbar
        >

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <md-card>
          <md-toolbar md-elevation="1">
              <h3 class="md-sub-title" style="flex: 1">Contact Information</h3>
            </md-toolbar>
          <md-card-content>
            <md-field
              ><label>Name</label><md-input v-model="Domain.Name"
            /></md-field>
            <md-field
              ><label>Phone</label><md-input v-model="Domain.Phone"
            /></md-field>
          </md-card-content>
        </md-card>

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
                    <md-input v-model="architecture.Years"></md-input>
                  </md-field>
                </td>
                <td>
                  <md-field>
                    <label>Interest</label>
                    <md-input v-model="architecture.Interest"></md-input>
                  </md-field>
                </td>
                <td>
                  <md-field>
                    <label>Rating</label>
                    <md-input v-model="architecture.Rating"></md-input>
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
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app {
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-card {
  margin: 20px;
}
</style>

<script>
import Runtime from "../Domain/Runtime";
import Data from "../Data";
const profile = Runtime.Profile;
const created = async function () {
  const json = await Data.ReadProfile(1);
  profile.HydrateIn(json);
};
const onSaveButtonClicked = async function () {
  const json = profile.HydrateOut();
  await Data.UpdateProfile(json);
};
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
    VM: {
      menuVisible: false,
    },
  };
};
const methods = {
  onAddArchitectureButtonClicked,
  onRemoveArchitectureButtonClicked,
  onSaveButtonClicked,
};
export default { data, methods, created };
</script>