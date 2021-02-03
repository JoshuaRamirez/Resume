const Profile = {
  Id: 1,
  Name: "Joshua Ramirez",
  Phone: "3104359182",
  Email: "joshua.ramirez@me.com",
  Languages: [...Languages],
  Frameworks: [...Frameworks],
  Architectures: [...Architectures],
  Projects: [...Projects],
};

const Projects = [
  {
    Title: "Senior Web Developer",
    Company: "BCBSA",
    StartDate: "1/1/20",
    EndDate: "1/10/20",
    Frameworks: [],
    Languages: [],
    Architectures: [],
  }
];

const Languages = [
  {
    Name: "C#",
    Rating: 8,
    Years: 10,
    Interest: 3,
    Projects: 10,
  }
];

const Frameworks = [
  {
    Name: ".NET",
    Rating: 8,
    Years: 15,
    Interest: 2,
    Projects: 0,
  }
];

const Architectures = [
  {
    Name: "Application Architecture",
    Rשating: 10,
    Years: 15,
    Interest: "Very Interested",
    Projects: 0,
  }
];

const InterestDescribers = [
  [
    {0: "Not Interested"},
    {1: "Somewhat Interested"},
    {2: "Interested"},
    {3: "Very Interested"},
  ]
]; 

export default Profile;