const db = require('../db/connection')
const cTable = require('console.table')
const prompts = require('../prompts')
const queries = require('../db/queries')


function createHandler(action) {
    switch (action) {
        case ('add a department'):
            return prompts.addDepartment()
            .then(({dept_name}) => {
                createDepartment(dept_name)
            })
        case ('add a role'):
            return prompts.addRole()
            .then(async ({title, salary, dept_name}) => {
                const dept_id = await queries.getDepartmentId(dept_name)
                createRole(title, salary, dept_id)
            })
        case ('add an employee'):
            return 
    }
}

function createDepartment(dept_name) {
    const sql = `INSERT INTO departments (dept_name) VALUE (?)`

    db.query(sql, dept_name)
    .then(console.log('New Department added!'))
    .catch(err => console.log(err))
}

function createRole(title, salary, dept_id) {
    const sql = `INSERT INTO roles (title, salary, dept_id) VALUE (?,?,?)`

    db.query(sql, [title, salary, dept_id])
    .then(console.log('New roll added!'))
    .catch(console.log)
}

function createEmployee(first_name, last_name, role_id, manager_id) {
    const sql = `
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUE (?,?,?,?)`

    db.query(sql, [first_name, last_name, role_id, manager_id])
    .then(console.log('New Employee added!'))
    .catch(console.log)
}

module.exports = createHandler 