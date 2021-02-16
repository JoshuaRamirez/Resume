import Runtime from "./Runtime";

const SkillModified = (skill) => {
  const profile = Runtime.Profile;
  profile.OnSkillModified(skill);
};

const ProjectDurationModified = (project) => {
  const profile = Runtime.Profile;
  profile.OnProjectDurationModified(project);
}

const Events = {
  SkillModified,
  ProjectDurationModified
};

export default Events;