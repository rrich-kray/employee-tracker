const db = require('../db/connection')

// TODO: write join queries where needed, write functions to update each proprty

class DatabaseOps {
    constructor(db) {
        this.db = db
    }

    getAllDepartments = () => {
        const sql = `SELECT * FROM department`
        return this.db.query(sql)
    }
    
    getAllEmployees = () => { // priority of the * was the problem
        const sql = `SELECT * FROM employee
                     LEFT JOIN role ON employee.role_id = role.role_id
                     LEFT JOIN department ON role.department_id = department.department_id;`
                     
        return this.db.query(sql)
    }

    getEmployeeTable = () => {
        return this.db.query(`SELECT * FROM employee`)
    }
    
    getAllRoles = () => {
        const sql = `SELECT * 
                     FROM role
                     LEFT JOIN department ON role.department_id = department.department_id
                    `
        return this.db.query(sql)
    }

    getRoleNames = () => {
        return this.db.query(`SELECT * FROM role`)
    }
    
    addEmployee = (firstName, lastName, roleId, managerId ) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
        const params = [firstName, lastName, roleId, managerId]
    
        this.db.query(sql, params)
    }
    
    addDepartment = (name) => {
        const sql = `INSERT INTO department (name) VALUES (?)`
    
        this.db.query(sql, name)
    }
    
    addRole = (title, salary, departmentId) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`
        const params = [title, salary, departmentId]
    
        this.db.query(sql, params)
    }
    
    getEmployeeData = () => {
        const sql = `SELECT * FROM employee`
        return this.db.query(sql)
    }
    
    updateEmployeeFirstName = (firstName, id) => {
        const sql = `UPDATE employee SET first_name = ? WHERE id = ?`
        const params = [firstName, id]
        return this.db.query(sql, params)
    }
    
    updateEmployeeLastName = (lastName, id) => {
        const sql = `UPDATE employee SET last_name = ? WHERE id = ?`
        const params = [lastName, id]
        return this.db.query(sql, params)
    }
    
    updateEmployeeRoleId = (roleId, id) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
        const params = [roleId, id]
        return this.db.query(sql, params)
    }
    
    updateEmployeeManagerId = (managerId, id) => {
        const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`
        const params = [managerId, id]
        return this.db.query(sql, params)
    }

    getManagers = () => {
        const sql = `SELECT * FROM employee WHERE manager_id IS NULL`
        return this.db.query(sql)
    }

    viewEmployeesByManager = (id) => {
        const sql = `SELECT *
                     FROM employee
                     WHERE employee.manager_id = ?;
                      `
        const params = [id]
        return this.db.query(sql, params)
    }

    deleteRole = (id) => {
        const sql = `
            DELETE FROM role
            WHERE id = ?
        `
        const params = [id]

        return this.db.query(sql, params)
    }

    deleteDepartment = (id) => {
        const sql = `
            DELETE FROM department
            WHERE department_id = ?
        `
        const params = [id]

        return this.db.query(sql, params)
    }

    deleteEmployee = (id) => {
        const sql = `
            DELETE FROM employee
            WHERE id = ?
        `
        const params = [id]

        return this.db.query(sql, params)
    }
}


module.exports = new DatabaseOps(db)

// dont need express

// Encapsulate all of this in a class and you can export the class