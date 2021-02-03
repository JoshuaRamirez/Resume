<template>
  <div>
    <h3>Joshua Ramirez</h3>
    <div><label>Name</label><input v-model="Name" /></div>
    <div><label>Phone</label><input v-model="Phone" /></div>
    <h3>Architectures</h3>
    <table style="margin: auto">
      <tr>
        <th>+/-</th>
        <th>Skill</th>
        <th>Years</th>
        <th>Interest</th>
        <th>Rating</th>
      </tr>
      <tr
        v-for="(architecture, index) in Architectures.Items"
        v-bind:key="architecture.Id"
      >
        <td>
          <button v-on:click="onRemoveArchitectureButtonClicked(index)">
            -
          </button>
        </td>
        <td><input v-model="architecture.Skill" /></td>
        <td><input v-model="architecture.Years" /></td>
        <td><input v-model="architecture.Interest" /></td>
        <td><input v-model="architecture.Rating" /></td>
      </tr>
      <tr>
        <td>
          <button v-on:click="onAddArchitectureButtonClicked()">+</button>
        </td>
      </tr>
    </table>
    <button v-on:click="onSaveButtonClicked()">Save</button>
  </div>
</template>

<script>
import Runtime from "../Domain/Runtime";
import Data from "../Data";
const profile = Runtime.Profile;
const created = async function () {
  const json = await Data.ReadProfile(1);
  profile.HydrateIn(json);
};
const onSaveButtonClicked = async function() {
  const json = profile.HydrateOut();
  await Data.UpdateProfile(json);
};
const onRemoveArchitectureButtonClicked = function(index) {
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
  return profile;
};
const methods = {
  onAddArchitectureButtonClicked,
  onRemoveArchitectureButtonClicked,
  onSaveButtonClicked,
};
export default { data, methods, created };
</script>