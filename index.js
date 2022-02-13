const inquirer = require('inquirer')
const db = require('./db/connection')
const databaseOps = require('./utils/database')

// TODO: add optionMenu() call after each choice that doesn't interfere with user action

const optionMenu = () => {
    inquirer.prompt([{
            type: 'list',
            name: 'options',
            message: 'Please select an action',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee']
        }])
        .then(answer => {
            switch (answer.options) {
                case 'View All Departments':
                    databaseOps.getAllDepartments()
                        .then(data => {
                            console.table(data[0])
                            optionMenu()
                        })
                    break;
                case 'View All Roles':
                    databaseOps.getAllRoles(db)
                        .then(data => {
                            console.table(data[0])
                            optionMenu()
                        })
                    break;
                case 'View All Employees':
                    databaseOps.getAllEmployees(db)
                        .then(data => {
                            console.table(data[0])
                            optionMenu()
                        })
                    break;
                case 'Add a Department':
                    promptDepartment();
                    break;
                case 'Add a Role':
                    promptRole();
                    break;
                case 'Add an Employee':
                    promptNewEmployee();
                    break;
                case 'Update an Employee':
                    promptUpdateEmployee();
                    break;
            }
        })
}


const promptNewEmployee = () => {
    inquirer.prompt([{
                type: 'input',
                name: 'first_name',
                message: "What is your employee's first name?",
                validate: name => {
                    if (!name) {
                        console.log("Please enter a valid name")
                        return false
                    } else return true
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is your employee's last name?",
                validate: name => {
                    if (!name) {
                        console.log("Please enter a valid name")
                        return false
                    } else return true
                }
            },
            {
                type: 'input',
                name: 'position',
                message: "What is your employee's position?",
                validate: name => {
                    if (!name) {
                        console.log("Please enter a valid name")
                        return false
                    } else return true
                }
            },
            {
                type: 'input',
                name: 'department',
                message: "What is your employee's department?",
                validate: name => {
                    if (!name) {
                        console.log("Please enter a valid name")
                        return false
                    } else return true
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is your employee's salary?",
                validate: name => {
                    if (!name) {
                        console.log("Please enter a valid name")
                        return false
                    } else return true
                }
            }
        ])
        .then(answers => databaseOps.addEmployee(
            db,
            [
                answers.first_name,
                answers.last_name,
                answers.position,
                answers.department,
                parseInt(answers.salary)
            ]
        ))
    optionMenu()
}

const promptDepartment = () => {
    inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Please enter the name of your department',
            validate: name => {
                if (!name) {
                    console.log('Please enter a valid department name')
                    return false
                } else return true
            }
        }])
        .then(answer => {
            databaseOps.addDepartment(answer.name)
            optionMenu()
        }) 
}

const promptRole = () => {
    inquirer.prompt([{
                type: 'input',
                name: 'title',
                message: 'Please enter the name of your new role.',
                validate: title => {
                    if (!title) {
                        console.log('Please enter a valid role name')
                        return false
                    } else return true
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the salary of your new role.',
                validate: salary => {
                    if (!salary) {
                        console.log('Please enter a valid role salary')
                        return false
                    } else return true
                }
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Please enter the department_id of your new role.',
                validate: department_id => {
                    if (!department_id) {
                        console.log('Please enter a valid role salary')
                        return false
                    } else return true
                }
            }
        ])
        .then(answers => {databaseOps.addRole(
            answers.title,
            answers.salary,
            answers.department_id
        )
        optionMenu()
    })
}

const promptUpdateEmployee = () => {
    const employeeNames = []
    databaseOps.getEmployeeData()
        .then(employeeData => {
            employeeData[0].map(employee => employeeNames.push(employee.first_name))
            console.log(employeeNames)
            inquirer.prompt([{
                        type: 'list',
                        name: 'employee',
                        message: "Which employee would you like to update?",
                        choices: [...employeeNames]
                    },
                    {
                        type: 'list',
                        name: 'property',
                        message: "Which property would you like to update?",
                        choices: ['First Name', 'Last Name', 'Role ID', 'Manager ID']
                    },
                ])
                .then(answers => {
                    const employee = employeeData[0].find(({
                        first_name
                    }) => first_name === answers.employee)
                    console.log(employee)
                    switch (answers.property) {
                        case 'First Name':
                            inquirer.prompt([{
                                    type: 'input',
                                    name: 'firstName',
                                    message: 'Please enter a new first name for your employee',
                                    validate: answer => {
                                        if (!answer) {
                                            console.log('Please enter a valid first name')
                                            return false
                                        }
                                        return true
                                    }
                                }])
                                .then(input => {
                                    databaseOps.updateEmployeeFirstName(input.firstName, employee.id)
                                    optionMenu()
                                })
                        case 'Last Name':
                            inquirer.prompt([{
                                    type: 'input',
                                    name: 'lastName',
                                    message: 'Please enter a new last name for your employee',
                                    validate: answer => {
                                        if (!answer) {
                                            console.log('Please enter a valid last name')
                                            return false
                                        }
                                        return true
                                    }
                                }])
                                .then(input => {
                                    databaseOps.updateEmployeeLastName(input.lastName, employee.id)
                                    optionMenu()
                                })
                        case 'Role ID':
                            inquirer.prompt([{
                                    type: 'input',
                                    name: 'roleId',
                                    message: "Please enter your employee's new role ID",
                                    validate: answer => {
                                        if (!answer || typeof answer !== 'number') {
                                            console.log('Please enter a valid role ID')
                                            return false
                                        }
                                        return true
                                    }
                                }])
                                .then(input => {
                                    databaseOps.updateEmployeeRoleId(input.roleId, employee.id)
                                    optionMenu()
                                })
                        case 'Manager ID':
                            inquirer.prompt([{
                                    type: 'input',
                                    name: 'managerId',
                                    message: "Please enter your employee's new manager ID",
                                    validate: answer => {
                                        if (!answer || typeof answer !== 'number') {
                                            console.log('Please enter a valid manager ID')
                                            return false
                                        }
                                        return true
                                    }
                                }])
                                .then(input => {
                                    databaseOps.updateEmployeeManagerId(input.managerId, employee.id)
                                    optionMenu()
                                })
                    }
                })
        })
}

optionMenu()