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
  },

  timeFormat(time, fmStr) {
    const weekCN = "一二三四五六日";
    const weekEN = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let milliSeconds = time.getMilliseconds();
    let week = time.getDay();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    hours = hours >= 10 ? hours : "0" + hours;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = seconds >= 10 ? seconds : "0" + seconds;

    if (fmStr.indexOf("yyyy") !== -1) {
      fmStr = fmStr.replace("yyyy", year);
    } else {
      fmStr = fmStr.replace("yy", (year + "").slice(2));
    }
    fmStr = fmStr.replace("mm", month);
    fmStr = fmStr.replace("dd", day);
    fmStr = fmStr.replace("hh", hours);
    fmStr = fmStr.replace("MM", minutes);
    fmStr = fmStr.replace("ss", seconds);
    fmStr = fmStr.replace("SSS", milliSeconds);
    fmStr = fmStr.replace("W", weekCN[week - 1]);
    fmStr = fmStr.replace("ww", weekEN[week - 1]);
    fmStr = fmStr.replace("w", week);

    return fmStr;
  },

  /**
   * 是否部分相等
   * @param {*} o1
   * @param {*} o2
   * @param {*} keyList
   */
  someEquals(o1, o2, keyList) {
    for (let key of keyList) {
      if (typeof o1[key] != typeof o2[key]) {
        return false;
      }
      if (typeof o1[key] == "object") {
        if (JSON.stringify(o1[key]) != JSON.stringify(o2[key])) {
          return false;
        }
      } else if (o1[key] != o2[key]) {
        return false;
      }
    }
    return true;
  }
};
