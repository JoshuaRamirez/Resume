import Events from "./Events";
import Collection from "./Collection";
import Skill from "./Skill";

const Project = () => {

  let _startDate;
  let _endDate;
  let _duration;

  const getDuration = () => {
    return _duration;
  };

  const setDuration = (startDate, endDate) => {
    const change = {};
    change.oldValue = _duration;
    _duration = Math.floor(_endDate - _startDate) / (1000 * 60 * 60 * 24 * 365);
    change.newValue = _duration;
    _startDate = startDate;
    _endDate = endDate;    
    Events.ProjectDurationModified({Project, Change: change});
  };

  const getStartDate = () => {
    return _startDate;
  };

  const setStartDate = (value) => {
    _startDate = value;
    setDuration(_startDate, _endDate);
  };

  const getEndDate = () => {
    return _endDate;
  };

  const setEndDate = (value) => {
    _endDate = value;
    setDuration(_startDate, _endDate);
  };
  
  const HydrateIn = (json) => {    
    _startDate = json.StartDate,
    _endDate = json.EndDate,
    _duration = json.Duration;
    me.Id = json.Id;
    me.Title = json.Title;
    me.Company = json.Company;
    me.Architectures.HydrateIn(json.Architectures, Skill);
    me.Frameworks.HydrateIn(json.Frameworks, Skill);
    me.Languages.HydrateIn(json.Languages, Skill);
  };
  
  const HydrateOut = () => {
    return {
      Id: me.Id,
      StartDate: _startDate,
      EndDate: _endDate,
      Duration: _duration,
      Title: me.Title,
      Company: me.Company,
      Architectures: me.Architectures.HydrateOut(),
      Frameworks: me.Frameworks.HydrateOut(),
      Languages: me.Languages.HydrateOut(),
    }
  };

  const createSkillCollectionOptions = (category) => {
    return {
      ModifiedEventPublisher: (payload) => Events.SkillModified(payload),
      ModifiedEventPayload: {Category: category, Project: Project},
    };
  };
  
  const me = {
    Id: Date.now(),
    Architectures: Collection(createSkillCollectionOptions("Architectures")),
    Frameworks: Collection(createSkillCollectionOptions("Frameworks")),
    Languages: Collection(createSkillCollectionOptions("Languages")),
    Title: "",
    Company: "",
    get Duration() {return getDuration();},
    get StartDate() {return getStartDate();},
    get EndDate() {return getEndDate();},
    set StartDate(value) {return setStartDate(value);},
    set EndDate(value) {return setEndDate(value);},
    HydrateOut,
    HydrateIn,
  };

  return me;

};

export default Project;