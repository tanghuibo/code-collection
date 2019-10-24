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
        return JSON.parse(functionInfoList);
      } catch (e) {
        console.error(e, functionInfoList);
        localStorage.setItem("functionList", "[]");
        return [];
      }
    }
  },
  saveData(data) {
    localStorage.setItem("functionList", JSON.stringify(data));
  }
};
