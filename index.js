const inquirer = require("inquirer");
const queries = require("./db");
require("console.table");
const {
  getEmployees,
  createEmployee,
  getDepartments,
  createDepartment,
  getRoles,
  createRole,
} = require("./db/index");

baseQuestions();

function baseQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do:",
        choices: [
          {
            name: "View All Employees",
            value: "viewAllEmployees",
          },
          {
            name: "Add Employee",
            value: "addEmployee",
          },
          // {
          //   name: "Update an Employee's Role",
          //   value: "updateEmployeeRole",
          // },
          {
            name: "View Departments",
            value: "viewDept",
          },
          {
            name: "Add Department",
            value: "addDept",
          },
          {
            name: "View Roles",
            value: "viewRoles",
          },
          {
            name: "Add Role",
            value: "addRole",
          },
          {
            name: "Exit",
            value: "exit",
          },
        ],
      },
    ])
    .then((response) => {
      let choice = response.choice;
      switch (choice) {
        case "viewAllEmployees":
          viewEmployees();
          break;
        case "addEmployee":
          addEmployee();
          break;
        // case "updateEmployeeRole":
        //   updateEmployeeRole();
        //   break;
        case "viewDept":
          viewDept();
          break;
        case "addDept":
          addDepartment();
          break;
        case "viewRoles":
          viewRoles();
          break;
        case "addRole":
          addRole();
          break;
        case "exit":
          exit();
      }
    });
}

function viewEmployees() {
  getEmployees()
    .then(([rowsArray]) => {
      let employees = rowsArray;
      console.log("\n--------------------------");
      console.table(employees);
    })
    .then(() => baseQuestions());
}

// function addEmployee() {
//   getRoles().then(([rows]) => {
//     let roles = rows;
//     const promptRoles = rows.map(({ row }) => {
//       row.title;
//     });
//   });
//   // .then(() => {
//   console.log(promptRoles);
//   // const promptManagers = getManagers();
//   inquirer
//     .prompt([
//       {
//         name: "first_name",
//         message: "Employee's first name?",
//       },
//       {
//         name: "last_name",
//         message: "Employee's last name?",
//       },
//       {
//         type: "list",
//         name: "roleId",
//         message: "Employee's role?",
//         choices: promptRoles,
//       },
//       {
//         type: "list",
//         name: "managerId",
//         message: "Employee's manager?",
//         choices: ["yes", "no"],
//       },
//     ])
//     .then((res) => {
//       let employee = {
//         manager_id: res.managerId,
//         role_id: res.roleId,
//         first_name: res.first_name,
//         last_name: res.last_name,
//       };
//     });
//   // });
// }

function viewDept() {
  getDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n--------------------------");
      console.table(departments);
    })
    .then(() => baseQuestions());
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Add a department:",
      },
    ])
    .then((res) => {
      let dept = res;
      createDepartment(dept)
        .then(() => console.log(`Added ${dept.name} department`))
        .then(() => baseQuestions());
    });
}

function viewRoles() {
  getRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n--------------------------");
      console.table(roles);
    })
    .then(() => baseQuestions());
}

function addRole() {
  getDepartments().then(([rows]) => {
    let dept = rows;
    const promptDepartments = dept.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          name: "title",
          message: "Name of the role:",
        },
        {
          name: "salary",
          message: "Salary of the role:",
        },
        {
          type: "list",
          name: "department_id",
          message: "Select department:",
          choices: promptDepartments,
        },
      ])
      .then((role) => {
        createRole(role)
          .then(() => console.log(`Added ${role.title} role`))
          .then(() => baseQuestions());
      });
  });
}

function exit() {
  console.log("Bye");
  process.exit();
}
