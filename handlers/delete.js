const db = require('../db/connection')
const cTable = require('console.table')
const queries = require('../db/queries')
const prompts = require('../prompts')

function deleteHandler(action) {
    switch (action) {
        case 'remove an employee':
            return prompts.deleteEmployee()
            .then(({employee_name}) => deleteEmployee(employee_name))
        case 'remove a role':
            return prompts.deleteRole()
            .then(({role_name}) => deleteRole(role_name))
        case 'remove a department':
            return prompts.deleteDepartment()
            .then(({dept_name}) => deleteDepartment(dept_name))
    }
}

async function deleteEmployee(employee_name) {
    const employeeId = await queries.getEmployeeId(employee_name.split(' '))
    const sql = `
    DELETE FROM employees
    WHERE id = ?
    `
    db.query(sql, employeeId)
    return `Removed employee ${employee_name}`
}

async function deleteRole(role_title) {
    roleId = await queries.getRoleId(role_title)
    const sql = `
    DELETE FROM roles
    WHERE id = ?
    `
    db.query(sql, roleId)
    return `Removed role ${role_title}`
}

async function deleteDepartment(dept_name) {
    const deptId = await queries.getDepartmentId(dept_name)
    const sql = `
    DELETE FROM departments
    WHERE id = ?
    `
    db.query(sql, deptId)
    return `Removed department ${dept_name}`
}

module.exports = deleteHandler