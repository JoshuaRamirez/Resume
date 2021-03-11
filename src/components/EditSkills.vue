<template>
  <div>
    <md-card>
      <md-toolbar md-elevation="1">
        <h3 class="md-sub-title" style="flex: 1">{{DataPropertyName}}</h3>
        <md-button
          v-on:click="onAddClicked()"
          class="md-icon-button md-raised"
        >
          <md-icon>add</md-icon>
        </md-button>
      </md-toolbar>
      <transition name="fade">
        <md-progress-bar
          v-if="!Skills"
          class="progress-bar"
          md-mode="indeterminate"
        ></md-progress-bar>
      </transition>
      <md-card-content>
        <table v-if="Skills" style="margin: auto">
          <tr
            v-for="(skill, index) in Skills.Items"
            v-bind:key="skill.Id"
          >
            <td>
              <md-field>
                <label>Name</label>
                <md-input
                  v-model="skill.Name"
                  @change="onChanged(skill)"
                ></md-input>
              </md-field>
            </td>
            <td v-if="DataParentType === 'Profile'">
              <md-field>
                <label>Years</label>
                <md-input
                  class="number-field"
                  type="number"
                  v-model="skill.Years"
                  @change="onChanged(skill)"
                ></md-input>
              </md-field>
            </td>
            <td>
              <md-field>
                <label>Interest</label>
                <md-input
                  class="number-field"
                  type="number"
                  v-model="skill.Interest"
                  @change="onChanged(skill)"
                ></md-input>
              </md-field>
            </td>
            <td>
              <md-field>
                <label>Rating</label>
                <md-input
                  class="number-field"
                  type="number"
                  v-model="skill.Rating"
                  @change="onChanged(skill)"
                ></md-input>
              </md-field>
            </td>
            <td>
              <md-button
                v-on:click="onRemoveClicked(index)"
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
import Events from "../Domain/Events";
const onChanged = function(skill) {
  Events.SkillModified(skill);
}
const onRemoveClicked = function (index) {
  const itemToRemove = this.Skills.Items[index];
  this.Skills.RemoveAt(index);
  if (this.DataParentType === "Project") {
    Events.SkillModified(itemToRemove);
  }
};
const onAddClicked = function () {
  const skill = Skill();
  skill.Category = this.DataPropertyName;
  this.Skills.Add(skill);
  if (this.DataParentType === "Project") {
    Events.SkillModified(skill);
  }
};
export default {
  props: ["dataParentType", "dataPropertyName",  "dataParentId"],
  data() {
    return {
      DataParentId: this.dataParentId,
      DataParentType: this.dataParentType,
      DataPropertyName: this.dataPropertyName,
      Skills: null,
    };
  },
  async created() {
    const profile = await Runtime.LoadProfile();
    const dataPropertyName = this.DataPropertyName;
    if (this.DataParentType === "Profile") {
      this.Skills = profile[dataPropertyName];
    }
    if (this.DataParentType === "Project") {
      const project = profile.Projects.FindById(this.DataParentId);
      this.Skills = project[dataPropertyName];
    } 
  },
  methods: {
    onAddClicked,
    onRemoveClicked,
    onChanged,
  },
};
</script>