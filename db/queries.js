const db = require('./connection')
const cTable = require('console.table')

const queries = (() => {
    function getDepartmentNames() {
        const sql = `SELECT dept_name FROM departments`
        return db.query(sql)
        .then(results => {
            const [rows] = results
            return Array.from(rows).map(row => row.dept_name)
        })
    }
    
    function getDepartmentId(dept_name) {
        const sql = `SELECT id FROM departments WHERE dept_name = ?`
        return db.query(sql, dept_name)
        .then(results => {
            const [row] = results
            return row[0].id
        })
    }

    function getRoleNames() {
        const sql= `SELECT title FROM roles`
        return db.query(sql)
        .then(results => {
            const [rows] = results
            console.log(Array.from(rows).map(row => row.title))
            return Array.from(rows).map(row => row.title)
        })
    }

    function getEmployeeNames() {
        const sql = `SELECT first_name, last_name FROM employees`
        return db.query(sql)
        .then(results => {
            const [rows] = results
            console.log(Array.from(rows).map(row => row.first_name + ' ' + row.last_name))
        })
    }

    return {
        getDepartmentNames,
        getDepartmentId,
        getRoleNames,
        getEmployeeNames
    }
})()

queries.getEmployeeNames()


module.exports = queries