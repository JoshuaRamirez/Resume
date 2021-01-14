import Events from "./Events";
import CreateCollection from "./Collection";

const CreateProject = () => {

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
    Architectures = CreateCollection(createSkillCollectionOptions("Architectures"));
    Frameworks = CreateCollection(skillCollectionOptions("Frameworks"));
    Languages = CreateCollection(skillCollectionOptions("Languages"));
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
    Architectures.Hydrate(json.Architectures);
    Frameworks.Hydrate(json.Frameworks);
    Languages.Hydrate(json.Languages);
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
  
 
  const Project = {
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
  
  initialize();
  
  return Project;

}

export default CreateProject;