const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");
async function sqliteConnection(){
 const database =  await sqlite.open({
  filename: path.resolve(__dirname,"..","database.db"),
  driver: sqlite3.Database
 });

  return database
}
//this file allows the rest of the code to acess the sqlite3 database

module.exports = sqliteConnection