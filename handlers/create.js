const db = require('../db/connection')
const cTable = require('console.table')
const prompts = require('../prompts')
const queries = require('../db/queries')


function createHandler(action) {
    switch (action) {
        case ('add a department'):
            return prompts.addDepartment()
            .then(({dept_name}) => {
                return createDepartment(dept_name)
            })
        case ('add a role'):
            return prompts.addRole()
            .then(async ({title, salary, dept_name}) => {
                const dept_id = await queries.getDepartmentId(dept_name)
                return createRole(title, salary, dept_id)
            })
        case ('add an employee'):
            return prompts.addEmployee()
            .then(async ({first_name, last_name, role_title, manager}) => {
                const role_id = await queries.getRoleId(role_title)
                const manager_id = await queries.getEmployeeId(manager.split(' '))
                return createEmployee(first_name, last_name, role_id, manager_id)
            })
    }
}

function createDepartment(dept_name) {
    const sql = `INSERT INTO departments (dept_name) VALUE (?)`

    db.query(sql, dept_name)
    .catch(err => console.log(err))

    return 'New Department added!'
}

function createRole(title, salary, dept_id) {
    const sql = `INSERT INTO roles (title, salary, dept_id) VALUE (?,?,?)`

    db.query(sql, [title, salary, dept_id])
    .catch(console.log)

    return 'New roll added!'
}

function createEmployee(first_name, last_name, role_id, manager_id) {
    const sql = `
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUE (?,?,?,?)`

    db.query(sql, [first_name, last_name, role_id, manager_id])
    .catch(console.log)

    return 'New Employee added!'
}

module.exports = createHandler 