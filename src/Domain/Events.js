import Runtime from "./Runtime";

const SkillModified = (skill) => {
  const profile = Runtime.Profile;
  profile.OnSkillModified(skill);
};

const Events = {
  SkillModified,
};

export default Events;