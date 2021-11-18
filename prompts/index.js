const inquirer = require('inquirer')
const queries = require('../db/queries')

const prompts = (() => {
    const main = () => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'view all departments',
                    'view all roles',
                    'view all employees', 
                    'view employees by manager',
                    'view employees by department',
                    'add a department',
                    'add a role',
                    'add an employee',
                    'update an employee role',
                    'update an employee manager'
                ]
            }
        ])
    }

    const addDepartment = () => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'dept_name',
                message: 'Enter the name of the new department:'
            }
        ])
    }

    const addRole = async () => {
        const deptNames = await queries.getDepartmentNames()

        return inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the new role:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary of the new role:'
            },
            {
                type: 'list',
                name: 'dept_name',
                message: 'To which department does this role belong:',
                choices: deptNames
            }
        ])
    }

    const addEmployee = async () => {
        const roleNames = await queries.getRoleNames()
        const employeeNames = await queries.getEmployeeNames()
        return inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the new Employee\'s first name:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the new Employee\'s last name:'
            },
            {
                type: 'list',
                name: 'role_title', 
                message: 'Select the new Employee\'s role:',
                choices: roleNames
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Select the new Employee\'s manager:',
                choices: employeeNames
            }
        ])
    }

    const updateEmployeeRole = async () => {
        const employeeNames = await queries.getEmployeeNames()
        const roleNames = await queries.getRoleNames()
        return inquirer.prompt([
            {
                type: 'list',
                name: 'employee_name',
                message: 'Which employee\'s role would you like to update:',
                choices: employeeNames
            },
            {
                type: 'list',
                name: 'new_role',
                message: 'Which role would you like to assign them:',
                choices: roleNames
            }
        ])
    }

    const updateEmployeeManager = async () => {
        const employeeNames = await queries.getEmployeeNames()
        return inquirer.prompt([
            {
                type: 'list',
                name: 'employee_name',
                message: 'Which employee\'s manager would you like to update:',
                choices: employeeNames
            },
            {
                type: 'list',
                name: 'new_manager',
                message: 'Who is their new manager:',
                choices: employeeNames
            }
        ])
    }

    const selectManager = async () => {
        const employeeNames = await queries.getEmployeeNames()
        return inquirer.prompt([
            {
                type: 'list',
                name: 'manager_name',
                message: 'Which manager\'s subordinates would you like to view:',
                choices: employeeNames
            }
        ])
    }

    const selectDepartment = async () => {
        const departmentNames = await queries.getDepartmentNames()
        return inquirer.prompt([
            {
                type: 'list',
                name: 'dept_name',
                message: 'Which department\'s members would you like to view:',
                choices: departmentNames
            }
        ])
    }

    return {
        main,
        addDepartment,
        addRole,
        addEmployee,
        updateEmployeeRole,
        updateEmployeeManager,
        selectManager,
        selectDepartment
    }
})()

module.exports = prompts