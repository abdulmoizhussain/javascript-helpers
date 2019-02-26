// https://stackoverflow.com/questions/2631001/test-for-existence-of-nested-javascript-object-key

function checkNested(obj = {}, props = "") {
  const propsArray = props.split('.');
  for (let i = 0; i < propsArray.length; i++) {
    if (!obj || typeof obj !== "object" || !(propsArray[i] in obj)) return false;
    obj = obj[propsArray[i]];
  }
  return true;
}
module.exports = checkNested;

// usage:
// checkNested({ a: { b: { c: "" } } }, "a.b.c");
