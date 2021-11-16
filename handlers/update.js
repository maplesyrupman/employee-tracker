const db = require('../db/connection')
const cTable = require('console.table')
const prompts = require('../prompts')
const queries = require('../db/queries')

function updateHandler(action) {
    switch (action) {
        case ('update an employee role'):
            return prompts.updateEmployeeRole()
            .then(({employee_name, new_role}) => {
                updateRole(employee_name, new_role)
            })
    }
}

async function updateRole(employee_name, new_role) {
    const employeeId = await queries.getEmployeeId(employee_name.split(' '))
    const roleId = await queries.getRoleId(new_role)
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?;`
    db.query(sql, [roleId, employeeId])
    .then(console.log(`${employee_name}'s role changed to ${new_role}`))
}


module.exports = updateHandler