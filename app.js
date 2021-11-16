const prompts = require('./prompts')
const actionHandler = require('./handlers')
const cTable = require('console.table')

function main() {
    return prompts.main()
    .then(actionHandler)
    .then(main)
}

main()

// actionHandler({action: 'add a department'})

// prompts.addDepartment()
// .then(console.log)

// prompts.addRole()
// .then(console.log)