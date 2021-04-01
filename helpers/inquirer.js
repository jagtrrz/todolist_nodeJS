const inquirer = require("inquirer");
require("colors");

const questions = [
    {
        type: "list",
        name: 'options',
        message: "what do you want to do?",
        choices: [
            {
                value: "1", 
                name: `${"1.".green} Create task`
            },
            {
                value: "2", 
                name: `${"2.".green} Show task(s)`
            },
            {
                value: "3", 
                name: `${"3.".green} Show completed tasks`
            },
            {
                value: "4", 
                name: `${"4.".green} Show pending tasks`
            },
            {
                value: "5", 
                name: `${"5.".green} Completed task(s)`
            },
            {
                value: "6", 
                name: `${"6.".green} Delete task`
            },
            {
                value: "0", 
                name: `${"0.".red} Exit`
            },
        ]
    }
]
    

const inquirerMenu = async () => {

    console.clear();
    console.log("====================".green);
    console.log("  Select an option");
    console.log("====================\n".green);

    const { options } = await inquirer.prompt(questions); 

    return options
}


const pause = async() => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Pres ${`ENTER`.green} to continue`
        }
    ]
    console.log("\n");
    await inquirer.prompt(question); 
}

const readInput = async(message) => {
    const question = [
        {
            type: "input", 
            name: "desc", 
            message,
            validate( value ){
                if(value.length === 0){
                    return "Please enter a value";
                }
                return true; 
            }
        }
    ];
    const {desc} = await inquirer.prompt(question); 
    return desc; 
}

const listDelete = async(tasks) => {
    const choices = tasks.map((task, index) => {
        const indice = `${index + 1}.`.green; 
        return {
            value: task.id,
            name: `${indice} ${task.desc}`,
        }
    })
    choices.unshift({
        value: "0",
        name: "0.".green + " Cancel"
    })
    const questions = [
        {
            type: "list", 
            name: "id", 
            message: "delete", 
            choices
        }
    ]
    const { id } = await inquirer.prompt(questions); 
    return id; 
}

const confirm = async(message) => {
    const question = [
        {
            type: "confirm",
            name: "OK", 
            message
        }
    ]
    const ok = await inquirer.prompt(question);
    return ok; 
}

const checkList = async(tasks) => {
    const choices = tasks.map((task, index) => {
        const indice = `${index + 1}.`.green; 
        return {
            value: task.id,
            name: `${indice} ${task.desc}`,
            checked: task.done ? true : false, 
        }
    })
    const question = [
        {
            type: "checkbox", 
            name: "ids", 
            message: "Select", 
            choices
        }
    ]
    const { ids } = await inquirer.prompt(question); 
    return ids; 
}

module.exports = {
    inquirerMenu,
    pause, 
    readInput, 
    listDelete,
    confirm,
    checkList
}