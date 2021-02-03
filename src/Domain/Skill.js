export default function CreateSkill() {

  const HydrateIn = function(json) {
    me.Name = json.Name;
    me.Category = json.Category;
    me.Rating = json.Rating;
    me.Interest = json.Interest;
    me.Years = json.Years;
    me.Projects = json.Projects;
    me.Skill = json.Skill;
  };

  const HydrateOut = function(json) {
    return {
      Name: json.Name,
      Category: json.Category,
      Rating: json.Rating,
      Interest: json.Interest,
      Years: json.Years,
      Projects: json.Projects,
      Skill: json.Skill,
    }
  };

  const me = {
    Name: "",
    Category: "",
    Rating: 0,
    Years: 0,
    Interest: 0,
    Projects: 0,
    HydrateIn,
    HydrateOut
  };

  return me;
}