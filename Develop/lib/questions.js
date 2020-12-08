const questions = {
  employee: [
    {
      type: "input",
      message: "What is your name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is your employee ID?",
      name: "id",
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email",
    },
    {
      type: "list",
      message: "Select your role.",
      name: "role",
      choices: ["Manager", "Engineer", "Intern"],
    },
    {
      type: "input",
      message: "What is your office number?",
      name: "officeNumber",
      when: (answers) => answers.role === "Manager",
    },

    {
      type: "input",
      message: "What is your github?",
      name: "github",
      when: (answers) => answers.role === "Engineer",
    },
    {
      type: "input",
      message: "What is your school?",
      name: "school",
      when: (answers) => answers.role === "Intern",
    },
  ],
};

module.exports = questions;
