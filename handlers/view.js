const db = require('../db/connection')
const cTable = require('console.table')

function viewHandler(action) {
    switch(action) {
        case ('view all departments'):
            return getAllDepartments()
        case ('view all roles'):
            return getAllRoles()
        case ('view all employees'):
            return getAllEmployees()
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
    const sql = `SELECT * FROM employees`

    return db.query(sql)
    .then(results => {
        const [rows] = results 
        console.table(rows)
    })
}

module.exports = viewHandler