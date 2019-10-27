function like(str, keyWord) {
  if (str == null) {
    return false;
  }
  if (typeof str != "string") {
    str = JSON.stringify(str);
  } 
  return str.toLowerCase().indexOf(keyWord.toLowerCase()) >= 0;
}
export default {
  likes(strs, keyWord) {
    if (keyWord == null || keyWord.trim() == "") {
      return true;
    }
    for (let str of strs) {
      if (like(str, keyWord)) {
        return true;
      }
    }
    return false;
  }
};
