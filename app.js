require("colors");

const { inquirerMenu, pause, readInput, listDelete, confirm, checkList } = require("./helpers/inquirer");
const { postDB, getDB } = require("./helpers/savefield");
const Tasks = require("./models/tasks");

const main = async() => {

    let option = ""; 

    const tasks = new Tasks(); 

    const listTasksDB = getDB(); 

    if (listTasksDB){
        tasks.loadTaskFromArray(listTasksDB); 
    }

    do {
        option = await inquirerMenu();
        
        switch(option) {
            case "1":
                const desc = await readInput("Description:"); 
                tasks.createTask(desc);
            break;
            case "2": 
                tasks.completeList(); 
            break;
            case "3": 
                tasks.doneList(true); 
            break; 
            case "4": 
                tasks.doneList(false); 
            break;
            case "5": 
                const ids = await checkList(tasks.listArr); 
                tasks.changeStatus(ids); 
            break; 
            case "6": 
                const id = await listDelete(tasks.listArr);
                if(!(id === "0")){
                    const askToConfirm = await confirm("Are you sure?"); 
                    if(askToConfirm){
                        tasks.deleteTask(id);
                        console.log(" Task deleted!")
                    }
                }
            break; 

        }

        postDB(tasks.listArr); 

        await pause();

    } while (option !== "0");

}

main(); 