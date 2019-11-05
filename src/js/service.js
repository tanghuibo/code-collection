import uuid from "uuid";

function setId(list) {
  return list.map(data => ({
    ...data,
    id: data.id == null ? uuid() : data.id
  }));
}

export default {
  getData() {
    let functionInfoList = localStorage.getItem("functionList");
    if (
      functionInfoList != null &&
      functionInfoList != "" &&
      functionInfoList != "undefined" &&
      functionInfoList != "null"
    ) {
      try {
        let result = JSON.parse(functionInfoList);
        if (result == null || !(result instanceof Array)) {
          return [];
        }
        return setId(result);
      } catch (e) {
        console.error(e, functionInfoList);
        localStorage.setItem("functionList", "[]");
        return [];
      }
    }
    return [];
  },
  saveData(data) {
    localStorage.setItem("functionList", JSON.stringify(data));
  }
};
