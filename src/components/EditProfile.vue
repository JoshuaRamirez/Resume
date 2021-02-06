<template>
  <div>
    <EditContactInformation />
    <EditProjects />
    <EditArchitectures />
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import EditArchitectures from "./EditArchitectures.vue";
import EditContactInformation from "./EditContactInformation.vue";
import EditProjects from './EditProjects.vue';
export default {
  components: {
    EditArchitectures,
    EditContactInformation,
    EditProjects,
  },
};
</script>