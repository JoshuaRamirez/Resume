<template>
  <div>
    <EditContactInformation />
    <EditArchitectures />
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import EditArchitectures from "./EditArchitectures.vue";
import EditContactInformation from "./EditContactInformation.vue";
export default {
  components: {
    EditArchitectures,
    EditContactInformation,
  },
};
</script>