<template>
  <div>
    {{ JSON.stringify(Project) }}
  </div>
</template>

<style lang="sass" scoped>
</style>

<script>
import Runtime from "../Domain/Runtime";
const findProject = function(id) {
  const profile = Runtime.CachedProfile;
  const project = profile.Projects.FindById(id);
  return project;
}
export default {
  data() {
    const id = this.$route.params.id;
    const project = findProject(id);
    return {
      Project: project,
    };
  },
  watch: {
    $route() {
      const id = this.$route.params.id;
      const project = findProject(id);
      this.$data.Project = project;
    },
  },
};
</script>