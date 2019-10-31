function fakeClick(obj) {
  let ev = document.createEvent("MouseEvents");
  ev.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  obj.dispatchEvent(ev);
}

export default function(name, data) {
  let urlObject = window.URL || window.webkitURL || window;
  let export_blob = new Blob([data]);
  let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  fakeClick(save_link);
}
