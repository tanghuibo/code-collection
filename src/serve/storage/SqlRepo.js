module.exports = class SqlRepo {
  constructor({ tableName, fileds }) {
    this.tableName = tableName;
    this.fileds = fileds;
  }

  getCreateSql() {
    return `create table if not exists ${this.tableName}(id, ${this.fileds.join(
      ","
    )})`;
  }

  getInsertSql() {
    return `insert into ${this.tableName}(id, ${this.fileds.join(
      ","
    )}) values((SELECT ifnull(max(Id),0) FROM ${this.tableName}) + 1, ?, ?, ?)`;
  }
};
