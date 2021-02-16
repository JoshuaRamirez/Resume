<template>
  <div>
    <EditContactInformation />
    <EditProjects />
    <EditSkills data-parent-type="Profile" data-property-name="Architectures" />
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import EditSkills from "./EditSkills.vue";
import EditContactInformation from "./EditContactInformation.vue";
import EditProjects from './EditProjects.vue';
export default {
  components: {
    EditSkills,
    EditContactInformation,
    EditProjects,
  },
};
</script>