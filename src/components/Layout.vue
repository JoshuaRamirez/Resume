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
          <md-button v-on:click="onSaveButtonClicked()">
            <md-icon>save</md-icon> Publish
          </md-button>
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
        <edit-profile />
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app {
  border: 1px solid rgba(#000, 0.12);
  height: 100vh;
}
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
import EditProfile from "./EditProfile.vue";
const profile = Runtime.Profile;
const created = async function () {
  const json = await Data.ReadProfile(1);
  profile.HydrateIn(json);
};
const onSaveButtonClicked = async function () {
  const json = profile.HydrateOut();
  await Data.UpdateProfile(json);
};
export default {
  components: {
    EditProfile,
  },
  data: function () {
    return {
      VM: {
        menuVisible: false,
      },
    };
  },
  methods: {
    onSaveButtonClicked,
  },
  created,
};
</script>