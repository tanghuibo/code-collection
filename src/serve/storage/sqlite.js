var SqliteDB = require("../tools/easeSqlite").SqliteDB;
let SqlRepo = require("./SqlRepo");

var file = "T.db";

var sqliteDB = new SqliteDB(file);

let sqlRepo = new SqlRepo({
  tableName: "js_tool",
  fileds: ["name", "desc", "function_info"]
});

var createTileTableSql = sqlRepo.getCreateSql();

sqliteDB.createTable(createTileTableSql);

let insertTileSql = sqlRepo.getInsertSql();

let list = [];
for (let i = 0; i < 3; i++) {
  list.push(["gaga", null, "asdasd"]);
}

sqliteDB.insertData(insertTileSql, list);
sqliteDB.queryData("select * from js_tool", console.log);
