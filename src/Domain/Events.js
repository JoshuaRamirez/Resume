const Runtime = require("./Runtime");

const profile = Runtime.Profile;

const SkillsModified = (category, skillName, change) => {
  profile.OnSkillsModified(category, skillName, change);
};

const ProjectDurationModified = (payload) => {
  profile.OnProjectDurationModified(payload);
};

const Events = {
  SkillsModified,
  ProjectDurationModified,
};

export default Events;