const fs = require("fs"); 

const file = "./db/data.json"

const postDB = ( data ) => {
    fs.writeFileSync(file, JSON.stringify(data)); 
}

const getDB = () => {
    if(!fs.existsSync(file)){
        return null
    }
    const info = fs.readFileSync(file, { encoding: "utf-8" });
    const data = JSON.parse(info);
    return data; 
}

module.exports = {
    postDB,
    getDB
}