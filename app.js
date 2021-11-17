const prompts = require('./prompts')
const actionHandler = require('./handlers')
const cTable = require('console.table')

function main() {
    prompts.main()
    .then(action => actionHandler(action))
    .then(message => {
        if (message) {
            console.log(message)
        }
    })
    .then(main)
}

main()

// actionHandler({action: 'add a department'})

// prompts.addEmployee()
// .then(console.log)