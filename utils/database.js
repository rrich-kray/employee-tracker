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
    
    getAllEmployees = () => {
        const sql = `SELECT * 
                     FROM employee
                     LEFT JOIN role ON employee.role_id = role.id
                     LEFT JOIN department ON role.department_id = department.id
                     LEFT JOIN employee manager ON manager.manager_id = employee.id;
                      `
        return this.db.query(sql)
    }
    
    getAllRoles = () => {
        const sql = `SELECT * 
                     FROM role
                     LEFT JOIN department ON role.department_id = department.id
                    `
        return this.db.query(sql)
    }
    
    addEmployee = (...args) => {
        const sql = `INSERT INTO employee ("first_name", "last_name", "position", "department", "salary") VALUES (?,?,?,?,?)`
        const params = [args[0], args[1], args[2], args[3], args[4]]
    
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
}


module.exports = new DatabaseOps(db)

// dont need express

// Encapsulate all of this in a class and you can export the class