<template>
  <div>
    <h3>Joshua Ramirez</h3>
    <div><label>Name</label><input /></div>
    <div><label>Phone</label><input /></div>
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
  </div>
</template>

<script>
import Runtime from "../Domain/Runtime";
const profile = Runtime.Profile;
console.log(profile);
const created = function () {};
const onRemoveArchitectureButtonClicked = (index) => {
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
  return { Architectures: profile.Architectures };
};
const methods = {
  onAddArchitectureButtonClicked,
  onRemoveArchitectureButtonClicked,
};
export default { data, methods, created };
</script>