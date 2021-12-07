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
        case ('view employees by department'):
            return prompts.selectDepartment()
            .then(({dept_name}) => getEmployeesByDepartment(dept_name))
    }
}

function getAllDepartments() {
    const sql = `
    SELECT * FROM departments
    `

    return db.query(sql)
    .then(results => {
        const [rows] = results
        console.table(rows)
    })
}

function getAllRoles() {
    const sql = `
    SELECT roles.*, 
    departments.dept_name as 'Department'
    FROM roles
    LEFT JOIN departments
    on roles.dept_id = departments.id`

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
    const managerId = await queries.getEmployeeId(manager_name.split(' '))
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

async function getEmployeesByDepartment(dept_name) {
    const deptId = await queries.getDepartmentId(dept_name)
    const sql = `
    SELECT id 
    FROM roles
    WHERE dept_id = ?
    `

    function questionmarks(roleIds) {
        let sql = `?`
        for (let i = 1; i < roleIds.length; i++) {
            sql = sql + `,?`
        }
        return sql;
    }

    return db.query(sql, deptId)
    .then(([rows]) => {
        const roleIds = Array.from(rows).map(row => row.id)
        return roleIds
    })
    .then(roleIds => {
        const sql = `
        SELECT employees.first_name, employees.last_name, roles.title
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        WHERE role_id IN(${questionmarks(roleIds)})
        `
        return db.query(sql, roleIds)
    })
    .then(results => {
        const [rows] = results
        console.log(`${dept_name} employees:`)
        console.table(rows)
    })
    .catch(err => {
        console.log('There are no employees working in this department at the moment.')
    })
}

module.exports = viewHandler