const Task = require("./task"); 
const getDB = require("../helpers/savefield")

class Tasks {

    _list = {};

    get listArr() {
        const taksList = [];
        Object.keys(this._list).forEach(key => {
            taksList.push(this._list[key]) 
        }); 
        return taksList
    }

    constructor() {
        this._list = {};
    }

    deleteTask(id) {
        if(this._list[id]){
            delete this._list[id];
        }
    }

    loadTaskFromArray( tasks ){
        tasks.forEach(task => {
            this._list[task.id] = task
        })
    }

    createTask(desc) {
        const task = new Task(desc); 
        this._list[task.id] = task; 
    }   

    completeList() {
        const list = Object.values(this.listArr); 
        console.log();
        for(let i = 0; i < list.length; i++){
            let indice = `${(i + 1)}.`;
            let task = ` ${indice.green} ${list[i].desc} :: ${list[i].done? "Done".green : "Pending".red}`;
            console.log(task); 
        }
    }

    doneList(completed) {
        const list = Object.values(this.listArr); 
        console.log();
        let indice = 0
        if(completed){
            for(let i = 0; i < list.length; i++){
                if(list[i].done != null){
                    indice += 1
                    let taskDone = ` ${(indice + ".").green} ${list[i].desc} :: ${list[i].done.green}`;
                    console.log(taskDone);
                } 
            }
        } else {
            for(let i = 0; i < list.length; i++){
                if(list[i].done == null){  
                    indice += 1 
                    let taskPending = ` ${(indice + ".").green} ${list[i].desc} :: ${"Pending".red}`;
                    console.log(taskPending);
                }
            }
        }
    }

    changeStatus(ids) {
        ids.forEach(id => {
            const task = this._list[id];
            if(!task.done){
                task.done = new Date().toISOString(); 
            }
        })
        this.listArr.forEach(task => {
            if(!ids.includes(task.id)){
                this._list[task.id].done = null; 
            }
        })
    }
}

module.exports = Tasks; 