import axios from "../plugins/axiosPlugins";

export default {
  async getData() {
    let result = await axios.get("codeCollection/getAll");
    return result.data;
  },
  saveData(list) {
    return axios.post("codeCollection/importAll", list);
  },
  addOne(data) {
    return axios.post("codeCollection/addOne", data);
  },
  updateById(data) {
    return axios.post("codeCollection/updateById", data);
  },
  deleteByIds(ids) {
    return axios.post("codeCollection/deleteByIds", ids);
  },
  async upload(list) {
    let result = await axios.post("codeCollection/upload", list);
    return result.data;
  },
  uploadAll(list) {
    return axios.post("codeCollection/uploadAll", list);
  },
  uploadForced(list) {
    return axios.post("codeCollection/uploadForced", list);
  }
};
