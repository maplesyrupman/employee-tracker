const db = require('../db/connection')
const cTable = require('console.table')
const queries = require('../db/queries')
const prompts = require('../prompts')

function viewHandler(action) {
    switch(action) {
        case ('view all departments'):
            return getAllDepartments()
        case ('view all roles'):
            return getAllRoles()
        case ('view all employees'):
            return getAllEmployees()
        case ('view employees by manager'):
            return prompts.selectManager()
            .then(({manager_name}) => getEmployeesByManager(manager_name))
    }
}

function getAllDepartments() {
    const sql = `SELECT * FROM departments`

    return db.query(sql)
    .then(results => {
        const [rows] = results
        console.table(rows)
    })
}

function getAllRoles() {
    const sql = `SELECT * FROM roles`

    return db.query(sql)
    .then(results => {
        const [rows] = results
        console.table(rows)
    })
}

function getAllEmployees() {
    const sql = `
    SELECT e.first_name, e.last_name, 
    r.title as 'Role', r.salary,
    CONCAT(m.first_name, ' ', m.last_name) as 'Manager' 
    FROM employees e 
    LEFT JOIN roles r 
    ON e.role_id = r.id 
    LEFT JOIN employees m 
    ON m.id = e.manager_id
    `

    return db.query(sql)
    .then(results => {
        const [rows] = results 
        console.table(rows)
    })
}

async function getEmployeesByManager(manager_name) {
    managerId = await queries.getEmployeeId(manager_name.split(' '))
    const sql = `
    SELECT first_name, last_name
    FROM employees
    WHERE manager_id = ?
    `

    return db.query(sql, managerId)
    .then(results => {
        const [rows] = results
        console.log(`${manager_name}'s subordinates:'`)
        console.table(rows)
    })
}

module.exports = viewHandler