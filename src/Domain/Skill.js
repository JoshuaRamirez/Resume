export default function CreateSkill() {

  const HydrateIn = function (json) {
    me.Name = json.Name;
    me.Category = json.Category;
    me.Rating = json.Rating;
    me.Interest = json.Interest;
    me.Years = json.Years;
    me.Projects = json.Projects;
  };

  const HydrateOut = function () {
    return {
      Name: me.Name,
      Category: me.Category,
      Rating: me.Rating,
      Interest: me.Interest,
      Years: me.Years,
      Projects: me.Projects,
    }
  };

  const me = {
    Id: Date.now(),
    Name: "",
    Category: "",
    Rating: 0,
    Years: 0,
    Interest: 0,
    Projects: 0,
    PauseEvents: false,
    HydrateIn,
    HydrateOut
  };

  return me;
}