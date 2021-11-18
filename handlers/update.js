const db = require('../db/connection')
const cTable = require('console.table')
const prompts = require('../prompts')
const queries = require('../db/queries')

function updateHandler(action) {
    switch (action) {
        case ('update an employee role'):
            return prompts.updateEmployeeRole()
            .then(({employee_name, new_role}) => {
                return updateRole(employee_name, new_role)
            })
            

        case ('update an employee manager'):
            return prompts.updateEmployeeManager()
            .then(({employee_name, new_manager}) => {
                return updateManager(employee_name, new_manager)
            })
    }
}

async function updateRole(employee_name, new_role) {
    const employeeId = await queries.getEmployeeId(employee_name.split(' '))
    const roleId = await queries.getRoleId(new_role)
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?;`
    db.query(sql, [roleId, employeeId])
    return `${employee_name}'s role changed to ${new_role}`
}

async function updateManager(employee_name, new_manager) {
    const employeeId = await queries.getEmployeeId(employee_name.split(' '))
    const managerId = await queries.getEmployeeId(new_manager.split(' '))
    const sql = `UPDATE employees SET manager_id = ? WHERE id = ?;`
    db.query(sql, [managerId, employeeId])
    return `${employee_name}'s manager changed to ${new_manager}`
}


module.exports = updateHandler