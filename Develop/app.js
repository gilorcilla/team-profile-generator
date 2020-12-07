const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const employees = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/html");

//Manager Created
const employmentType = [
  {
    type: "list",
    name: "role",
    choices: ["Manager", "Engineer", "Intern", "Done adding staff"],
  },
];

const allStaffQuestions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your id number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email address?",
    name: "email",
  },
];

const engineerQuestion = [
  {
    type: "input",
    message: "What is your GitHub username?",
    name: "github",
  },
];

const internQuestion = [
  {
    type: "input",
    message: "What school do you go to?",
    name: "school",
  },
];

const managerQuestion = [
  {
    type: "input",
    message: "What is your office number?",
    name: "officeNumber",
  },
];

function init() {
  inquirer.prompt(
    [...employmentType].then((data) => {
      if (data.role === "Manager") {
        addManager();
      } else if (data.role === "Intern") {
        addIntern();
      } else if (data.role === "Engineer") {
        addEngineer();
      } else {
        console.log(employees);
        console.log("No more employees");
        writToFile("./output/team.html", render(employees));
      }
    })
  );
}

function addManager() {
  inquirer
    .prompt([...allStaffQuestions, ...managerQuestion])
    .then(({ name, id, email, oficeNumber }) => {
      let manager = new Manager(name, id, email, officeNumber);
      if (
        name === "" &&
        id === "" &&
        officeNumber === "" &&
        !isNaN(officeNumber)
      ) {
        console.log("please enter the correct information");
        addManager();
      } else {
        employees.push(manager);
        init();
      }
    });
}

function addIntern() {
  inquirer
    .prompt([...allStaffQuestions, ...internQuestion])
    .then(({ name, id, email, school }) => {
      let intern = new Intern(name, id, email, school);
      if (name === "" && id === "" && email === "" && school === "") {
        console.log("please enter the correct information");
        addIntern();
      } else {
        employees.push(intern);
        init();
      }
    });
}

function addEngineer() {
  inquirer
    .prompt([...allStaffQuestions, ...engineerQuestion])
    .then(({ name, id, email, github }) => {
      let engineer = new Engineer(name, id, email, github);
      if (name === "" && id === "" && email === "" && github === "") {
        console.log("please enter the correct information");
        addEngineer();
      } else {
        employees.push(engineer);
        init();
      }
    });
}

function writToFile(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      throw err;
    }
    console.log("Successful!!");
  });
}

init();
