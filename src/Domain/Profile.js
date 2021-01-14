import CreateCollection from "./Collection";  


const Profile = () => {

  // Private Fields
  let categories;

  // Public Fields
  let Name;
  let Phone;
  let Projects;
  let Architectures;
  let Frameworks;
  let Languages;
  
  // Private Functions
  let initialize;
  let updateProjectSkillDurations;
  let updateSkill;
  let rollupSkills;

  // Public Functions
  let HydrateIn;
  let HydrateOut
  
  // Public Event Handlers
  let OnProjectDurationModified;
  let OnSkillsModified;

  initialize = () => {
    Projects = CreateCollection({HydrationOutEnabled: true});
    Architectures = בCreateCollection();
    Frameworks = בCreateCollection();
    Languages = בCreateCollection();
    categories = ["Architectures", "Frameworks", "Languages"];
    if (json) {
      Hydrate(json);
    }
  };
  
  HydrateIn = (json ) => {
    Name = json.Name;
    Phone = json.Phone;
    Projects = Projects.HydrateIn(json.Projects);
    Architectures.HydrateIn(json.Architectures)
    Projects.HydrateIn(json.Projects);
    Architectures.HydrateIn(json.Architectures);
    Frameworks.HydrateIn(json.Frameworks);
    Languages.HydrateIn(json.Languages);
  };
  
  HydrateOut = () => {
    return {
      Name, Phone,
      Projects: Projects.HydrateOut(),
      Architectures: Architectures.HydrateOut(),
      Frameworks: Frameworks.HydrateOut(),
      Languages: Languages.HydrateOut(),
    };
  };
 
  OnProjectDurationModified = (payload) => {
    updateProjectSkillDurations(payload.Project, payload.Change.OldValue, payload.Change.NewValue);
  };

  OnSkillsModified = (payload) => {
    updateSkill(payload.Project, payload.Category, payload.Item, payload.Change);
  };

  updateProjectSkillDurations = (project, oldValue, newValue) => {
    categories.forEach(category => {
      project[category].Items.forEach(skillName => {
        const skill = Profile[skillCategory].FindByName(skillName);
        if (skill) {
          skill.Years -= oldValue;
          skill.Years += newValue;
        }
      });
    });
  };
  
  updateSkillAfterAddition = (project, skillCategory, skillName) => {
    const skill = Profile[skillCategory].FindByName(skillName);
    skill.Years += project.Duration;
    skill.Projects += 1;
  };
  
  updateSkillAfterRemoval = (project, skillCategory, skillName) => {
    const affectedDuration = project.Calculate;
    const skill = Profile[skillCategory].FindByName(skillName);
    skill.Years -= project.Duration;
    skill.Projects -= 1;
  };

  rollupSkills = () => {
    const skillNames = new Set();
    Projects.Items.forEach(project => {
      categories.forEach(category => {
        project[category].Items.forEach(skillName => {
          skillNames.add(skillName);
        });
      });
    });
    for (let skillName of skills) {
      const skill = Profile[skillCategory].FindByName(skillName);
      skill.Projects = 0;
      skill.Years = 0;
      Projects.Items.forEach((project) => {
        categories.forEach(category => {
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

  return {
    Name, Phone,
    Projects, Architectures, Frameworks, Languages,
    OnProjectDurationModified, OnSkillsModified,
    HydrateIn, HydrateOut,
  };

};

export default Profile;