const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const render = require("./lib/htmlRender");
const questions = require("./lib/questions");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const employees = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//const render = require(".Develop/lib/htmlRenderer");
//onst { inherits } = require("util");

//Manager Created
// const employmentType = [
//   {
//     type: "list",
//     name: "role",
//     choices: ["Manager", "Engineer", "Intern", "Done adding staff"],
//   },
// ];

// const allStaffQuestions = [
//   {
//     type: "input",
//     message: "What is your name?",
//     name: "name",
//   },
//   {
//     type: "input",
//     message: "What is your id number?",
//     name: "id",
//   },
//   {
//     type: "input",
//     message: "What is your email address?",
//     name: "email",
//   },
// ];

// const engineerQuestion = [
//   {
//     type: "input",
//     message: "What is your GitHub username?",
//     name: "github",
//   },
// ];

// const internQuestion = [
//   {
//     type: "input",
//     message: "What school do you go to?",
//     name: "school",
//   },
// ];

// const managerQuestion = [
//   {
//     type: "input",
//     message: "What is your office number?",
//     name: "officeNumber",
//   },
// ];

//

function runAgain() {
  inquirer
    .prompt({
      type: "confirm",
      name: "again",
      message: "Would you like to add another employee?",
    })
    .then(function (addAnother) {
      console.log(addAnother);
      if (addAnother.again == true) {
        init();
      }

      if (addAnother.again == false) {
        fs.writeFileSync(outputPath, render(employees), (err) =>
          err ? console.log(err) : console.log(`Generated ${outputPath}`)
        );
        console.log("fileGenerated");
      }
    });
}

function init() {
  inquirer.prompt(questions.employee).then(function (answers) {
    if (answers.role == "Manager") {
      employees.push(
        new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        )
      );
    }
    if (answers.role == "Engineer") {
      employees.push(
        new Engineer(answers.name, answers.id, answers.email, answers.github)
      );
    }
    if (answers.role == "Intern") {
      employees.push(
        new Intern(answers.name, answers.id, answers.email, answers.school)
      );
    }
    runAgain();
  });
}

init();
