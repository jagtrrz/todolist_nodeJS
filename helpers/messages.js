require("colors");

const showMenu = () => {

    return new Promise ( resolve => {

        console.clear();

        console.log("====================".green);
        console.log("  Select an option".green);
        console.log("====================\n".green);

        console.log(`${"1.-".green} Add task`);
        console.log(`${"2.-".green} Show tasks`);
        console.log(`${"3.-".green} Show completed tasks`);
        console.log(`${"4.-".green} Show pending tasks`);
        console.log(`${"5.-".green} Completed task(s)`);
        console.log(`${"6.-".green} Delete task`);
        console.log(`${"0.-".green} Exit \n`);

        const readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout, 
        });

        readLine.question("Select an option: ", option => {
            readLine.close();
            resolve(option)
        });
    })

    
}

const pause = () => {

    return new Promise ( resolve => {
        const readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout, 
        });
    
        readLine.question(`\nPress ${"ENTER".green} to continue\n`, () => {
            readLine.close();
            resolve(); 
        });
    })
    
}

module.exports = {
    showMenu,
    pause
}
