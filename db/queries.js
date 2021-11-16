const db = require('./connection')
const cTable = require('console.table')

const queries = (() => {
    function getDepartmentNames() {
        const sql = `SELECT dept_name FROM departments`
        return db.query(sql)
        .then(results => {
            const [rows] = results
            //results array doesn't have .map
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
            //results array doesn't have .map
            return Array.from(rows).map(row => row.title)
        })
    }

    function getRoleId(role_title) {
        const sql = `SELECT id FROM roles WHERE title = ?`
        return db.query(sql, role_title)
        .then(results => {
            const [row] = results
            return row[0].id
        })
    }

    function getEmployeeNames() {
        const sql = `SELECT first_name, last_name FROM employees`
        return db.query(sql)
        .then(results => {
            const [rows] = results
            //results array doesn't have .map
            return Array.from(rows).map(row => row.first_name + ' ' + row.last_name)
        })
    }

    function getEmployeeId(firstLastArray) {
        const sql = `SELECT id FROM employees WHERE first_name = ? AND last_name = ?`
        return db.query(sql, firstLastArray)
        .then(results => {
            const [row] = results
            return row[0].id
        })
        .catch(console.log)
    }

    return {
        getDepartmentNames,
        getDepartmentId,
        getRoleNames,
        getRoleId,
        getEmployeeNames,
        getEmployeeId
    }
})()

module.exports = queries