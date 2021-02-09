import Runtime from "./Runtime";

const SkillModified = (category, skillName, change) => {
  const profile = Runtime.Profile;
  profile.OnSkillModified(category, skillName, change);
};

const ProjectDurationModified = (payload) => {
  const profile = Runtime.Profile;
  profile.OnProjectDurationModified(payload);
};

const Events = {
  SkillModified,
  ProjectDurationModified,
};

export default Events;