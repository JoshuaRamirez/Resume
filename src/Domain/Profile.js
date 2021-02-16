import Collection from "./Collection";
import Project from "./Project";
import Skill from "./Skill";

const Profile = function () {

  const categories = ["Architectures", "Frameworks", "Languages"];

  const HydrateIn = (json) => {
    me.Id = json.Id;
    me.Name = json.Name;
    me.Phone = json.Phone;
    me.Projects.HydrateIn(json.Projects, Project);
    me.Architectures.HydrateIn(json.Architectures, Skill);
    me.Frameworks.HydrateIn(json.Frameworks, Skill);
    me.Languages.HydrateIn(json.Languages, Skill);
    categories.forEach(updateCategory);
  };

  const HydrateOut = function () {
    return {
      Id: me.Id,
      Name: me.Name,
      Phone: me.Phone,
      Projects: me.Projects.HydrateOut(),
      Architectures: me.Architectures.HydrateOut(),
      Frameworks: me.Frameworks.HydrateOut(),
      Languages: me.Languages.HydrateOut(),
    };
  };

  const OnProjectDurationModified = (project) => {
    [
      "Architectures", 
      "Frameworks", 
      "Languages"
    ].forEach(updateCategory);
  }

  const OnSkillModified = (skill) => {
    const modifiedCategory = skill.Category;
    updateCategory(modifiedCategory);
  };

  function updateCategory(modifiedCategory) {
    const newProfileSkills = [];
    me.Projects.Items.forEach((project) => {
      project[modifiedCategory].Items.forEach((projectSkill) => {
        let existingNewProfileSkill = newProfileSkills.find(x => x.Name === projectSkill.Name);
        if (!existingNewProfileSkill) {
          const projectSkillJson = projectSkill.HydrateOut();
          const newProfileSkill = Skill();
          newProfileSkill.HydrateIn(projectSkillJson);
          newProfileSkill.PauseEvents = true;
          newProfileSkill.Id = Date.now();
          newProfileSkill.Projects = 0;
          newProfileSkill.Years = 0;
          newProfileSkills.push(newProfileSkill);
          existingNewProfileSkill = newProfileSkill;
        }
      });
    });
    newProfileSkills.forEach((newProfileSkill) => {
      me.Projects.Items.forEach((project) => {
        project[modifiedCategory].Items.forEach((projectSkill) => {
          if (newProfileSkill.Name === projectSkill.Name) {
            newProfileSkill.Projects += 1;
            newProfileSkill.Years += project.Duration;
          }
        });
      });
    });
    me[modifiedCategory].Reset(newProfileSkills);
  }

  const me = {
    Id: 1,
    Name: "Joshua Ramirez",
    Phone: "",
    Architectures: Collection(),
    Frameworks: Collection(),
    Languages: Collection(),
    Projects: Collection(),
    OnSkillModified,
    OnProjectDurationModified,
    HydrateIn,
    HydrateOut,
  };

  return me;

};

export default Profile;