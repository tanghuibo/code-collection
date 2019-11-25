
var SqliteDB = require('../tools/easeSqlite').SqliteDB;
 
 
 
var file = "T.db";
 
var sqliteDB = new SqliteDB(file);

var createTileTableSql = "create table if not exists js_tool(name TEXT, desc TEXT, function_info TEXT);";

sqliteDB.createTable(createTileTableSql);

 
let insertTileSql = "insert into js_tool(name, desc, function_info) values(?, ?, ?)";
 
let list = [];
for(let i = 0; i < 3; i ++) {
    list.push(['gaga', 'xx', 'asdasd']);
}

sqliteDB.insertData(insertTileSql, list);
sqliteDB.queryData("select * from js_tool", console.log);







