import Events from "./Events";
import Collection from "./Collection";
import Skill from "./Skill";

const Project = () => {

  // Private Fields
  let _startDate;
  let _endDate;

  // Public Fields
  let Architectures;
  let Frameworks;
  let Languages;
  
  // Private Functions
  let initialize;
  let createSkillCollectionOptions;
  
  // Public Functions
  let SetDuration;
  let CalculateDurationInYears;

  initialize = () => {
    Architectures = Collection(createSkillCollectionOptions("Architectures"));
    Frameworks = Collection(skillCollectionOptions("Frameworks"));
    Languages = Collection(skillCollectionOptions("Languages"));
  };

  createSkillCollectionOptions = (category) => {
    return {
      ModifiedEventPublisher: (payload) => Events.SkillModified(payload),
      ModifiedEventPayload: {Category: category, Project: Project},
    };
  };

  SetDuration = (startDate, endDate) => {
    const change = {};
    change.oldValue = _duration;
    _duration = Math.floor(_endDate - _startDate) / (1000 * 60 * 60 * 24 * 365);
    change.newValue = _duration;
    _startDate = startDate;
    _endDate = endDate;    
    Events.ProjectDurationModified({Project, Change: change});
  };
  
  HydrateIn = (json) => {    
    _startDate = json.Start;ate,
    _endDate = json.End;ate,
    _duration = json.Duration;
    Architectures.HydrateIn(json.Architectures, Skill);
    Frameworks.HydrateIn(json.Frameworks, Skill);
    Languages.HydrateIn(json.Languages, Skill);
  };
  
  HydrateOut = () => {
    return {
      StartDate: _startDate,
      EndDate: _endDate,
      Duration: _duration,
      Architectures: Architectures.HydrateOut(),
      Frameworks: Frameworks.HydrateOut(),
      Languages: Languages.HydrateOut(),
    }
  };

  initialize();

  return {
    SetDuration,
    get Duration() {
      return _duration;
    },
    get StartDate() {
      return _startDate;
    },
    get EndDate() {
      return _endDate;
    },
    Architectures,
    Frameworks,
    Languages,
  };

};

console.log("Project");

export default Project;