import Collection from "./Collection";
import Project from "./Project";
import Skill from "./Skill";

const Profile = function() {

  const categories = ["Architectures", "Frameworks", "Languages"];

  const HydrateIn = (json) => {
    me.Id = json.Id;
    me.Name = json.Name;
    me.Phone = json.Phone;
    me.Projects.HydrateIn(json.Projects, Project);
    me.Architectures.HydrateIn(json.Architectures, Skill);
    me.Frameworks.HydrateIn(json.Frameworks, Skill);
    me.Languages.HydrateIn(json.Languages, Skill);
  };

  const HydrateOut = function() {
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

  const OnProjectDurationModified = (payload) => {
    updateProjectSkillDurations(payload.Project, payload.Change.OldValue, payload.Change.NewValue);
  };

  const OnSkillsModified = (payload) => {
    //updateSkill(payload.Project, payload.Category, payload.Item, payload.Change);
  };

  const updateProjectSkillDurations = (project, oldValue, newValue) => {
    categories.forEach(skillCategory => {
      project[skillCategory].Items.forEach(skillName => {
        const skill = Profile[skillCategory].FindByName(skillName);
        if (skill) {
          skill.Years -= oldValue;
          skill.Years += newValue;
        }
      });
    });
  };

  const updateSkillAfterAddition = (project, skillCategory, skillName) => {
    const skill = Profile[skillCategory].FindByName(skillName);
    skill.Years += project.Duration;
    skill.Projects += 1;
  };

  const updateSkillAfterRemoval = (project, skillCategory, skillName) => {
    const affectedDuration = project.Calculate;
    const skill = Profile[skillCategory].FindByName(skillName);
    skill.Years -= project.Duration;
    skill.Projects -= 1;
  };

  const rollupSkills = () => {
    const skillNames = new Set();
    me.Projects.Items.forEach(project => {
      categories.forEach(skillCategory => {
        project[skillCategory].Items.forEach(skillName => {
          skillNames.add(skillName);
        });
      });
    });
    for (let skillName of skillNames) {
      categories.forEach(skillCategory => {
        const skill = Profile[skillCategory].FindByName(skillName);
        skill.Projects = 0;
        skill.Years = 0;
        me.Projects.Items.forEach((project) => {
          project[skillCategory].Items.forEach(skillItem => {
            if (skillName === skillItem) {
              skill.Projects += 1;
              skill.Years += project.CaluclateDurationInYears();
            }
          });
        })
      });
    }
  };

  const me = {
    Id: 1,
    Name: "Joshua Ramirez",
    Phone: "",
    Architectures: Collection(),
    Frameworks: Collection(),
    Languages: Collection(),
    Projects: Collection({ IsComplexObjectArray: true }),
    OnProjectDurationModified,
    OnSkillsModified,
    HydrateIn,
    HydrateOut,
  };

  return me;

};

export default Profile;