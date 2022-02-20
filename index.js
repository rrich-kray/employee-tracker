const inquirer = require('inquirer')
const db = require('./db/connection')
const { viewEmployeesByManager } = require('./utils/database')
const databaseOps = require('./utils/database')

// TODO: add optionMenu() call after each choice that doesn't interfere with user action

const optionMenu = () => {
    inquirer.prompt([{
            type: 'list',
            name: 'options',
            message: 'Please select an action',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee', 'View Employees by Manager', 'Delete a Role', 'Delete a Department', 'Delete an Employee']
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
                    databaseOps.getAllRoles()
                        .then(data => {
                            console.table(data[0])
                            optionMenu()
                        })
                    break;
                case 'View All Employees':
                    databaseOps.getAllEmployees()
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
                case 'View Employees by Manager':
                    promptViewEmployeesByManager();
                    break;
                case 'Delete a Role':
                    promptDeleteRole();
                    break;
                case 'Delete a Department':
                    promptDeleteDepartment();
                    break;
                case 'Delete an Employee':
                    promptDeleteEmployee();
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
                name: 'role_id',
                message: "What is your employee's role id?",
                validate: roleId => {
                    if (!roleId) {
                        console.log("Please enter a valid name")
                        return false
                    } else return true
                }
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "What is your employee's manager ID?",
                validate: managerId => {
                    if (!managerId) {
                        console.log("Plaese enter a valid name")
                        return false
                    } else return true
                }
            }
        ])
        .then(answers => {databaseOps.addEmployee(
                answers.first_name,
                answers.last_name,
                answers.role_id,
                answers.manager_id,
        )
        optionMenu()
    })
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
    const employeeIds = []
    databaseOps.getEmployeeData()
        .then(employeeData => {
            employeeData[0].map(employee => employeeIds.push(employee.id))
            console.table(employeeData[0])
            inquirer.prompt([{
                        type: 'list',
                        name: 'id',
                        message: "Which employee would you like to update?",
                        choices: [...employeeIds]
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
                        id
                    }) => id === answers.id)
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
                                break;
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
                                break;
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
                                break;
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
                                break;
                    }
                })
        })
}

const promptViewEmployeesByManager = () => {
    databaseOps.getManagers()
    .then(managers => {
        const managerIds = []
        managers[0].map(manager => managerIds.push(manager.id))
        console.table(managers[0])
        inquirer.prompt([
            {
                type: 'list',
                name: 'manager',
                message: 'Please select a manager by ID',
                choices: [...managerIds],
            }
        ])
        .then(managerId => {
            databaseOps.viewEmployeesByManager(managerId.manager)
            .then(employeesByManager => {
                console.log(employeesByManager[0])
                console.table(employeesByManager[0])
                optionMenu()
            })
        })
    })
}

const promptDeleteRole = () => {
    databaseOps.getRoleNames()
    .then(roles => {
        const roleIds = []
        roles[0].map(role => roleIds.push(role.role_id))
        console.table(roles[0])
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Please select a role for deletion',
                choices: [...roleIds]
            }
        ])
        .then(roleSelection => {
            databaseOps.deleteRole(roleSelection.role)
            optionMenu()
        })
    })
}

const promptDeleteDepartment = () => {
    databaseOps.getAllDepartments()
    .then(departments => {
        const departmentIds = []
        departments[0].map(department => departmentIds.push(department.department_id))
        console.table(departments[0])
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Please select a role for deletion',
                choices: [...departmentIds]
            }
        ])
        .then(departmentSelection => {
            console.log(departmentSelection)
            databaseOps.deleteDepartment(departmentSelection.role)
            optionMenu()
        })
    })
}

const promptDeleteEmployee = () => {
    databaseOps.getAllEmployees()
    .then(employees => {
        const employeeIds = []
        employees[0].map(employee => employeeIds.push(employee.id))
        console.table(employees[0])
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Please select a role for deletion',
                choices: [...employeeIds]
            }
        ])
        .then(employeeSelection => {
            console.log(employeeSelection)
            console.log(employeeSelection.role)
            databaseOps.deleteEmployee(employeeSelection.role)
            optionMenu()
        })
    })
}
   


optionMenu()