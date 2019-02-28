// Just in case it is required to save location coordinates in solidity.
// To save some data structure, we can combine coordinates in a single 'uint' of 22 length (i.e. a BigInteger) and can parse it back to lattitude and longitude.

function coordsToUint(_lat = 0, _lng = 0) {
  const lat = addPointZero(String(_lat));
  const lng = addPointZero(String(_lng));

  if (
    !lat || !lng ||
    lat.length < 3 || lng.length < 3 ||
    lat.indexOf(".") === -1 || lng.indexOf(".") === -1
  ) return "";

  const isLatNegative = (lat[0] === "-");
  const isLngNegative = (lng[0] === "-");

  const uLAT = isLatNegative ? lat.substr(1) : lat; // unsigned lattitude
  const uLNG = isLngNegative ? lng.substr(1) : lng; // unsigned longitude

  let integerPartLAT = uLAT.substr(0, uLAT.indexOf("."));
  let integerPartLNG = uLNG.substr(0, uLNG.indexOf("."));

  let fractionalPartLAT = uLAT.substr(uLAT.indexOf(".") + 1, 7);
  let fractionalPartLNG = uLNG.substr(uLNG.indexOf(".") + 1, 7);
  // https://en.wikipedia.org/wiki/Decimal_degrees


  integerPartLAT = prependZeros(integerPartLAT, 3);
  integerPartLNG = prependZeros(integerPartLNG, 3);

  fractionalPartLAT = appendZeros(fractionalPartLAT, 7);
  fractionalPartLNG = appendZeros(fractionalPartLNG, 7);

  // 1 means negative number
  // 2 means positive number
  const LATLNG =
    (isLatNegative ? "1" : "2") +
    integerPartLAT + fractionalPartLAT +

    (isLngNegative ? "1" : "2") +
    integerPartLNG + fractionalPartLNG;
  return LATLNG;
}

function uintToCoordsObject(coordsInUint = "") {
  const geoLocation = { lattitude: 0, longitude: 0 };
  if (!coordsInUint || typeof coordsInUint !== "string" || coordsInUint.length !== 22) {
    return geoLocation;
  }
  const integerPartLAT = coordsInUint.substr(1, 3);
  const fractionalPartLAT = coordsInUint.substr(4, 7);

  const integerPartLNG = coordsInUint.substr(12, 3);
  const fractionalPartLNG = coordsInUint.substr(15);

  let lat = parseFloat(integerPartLAT + "." + fractionalPartLAT);
  let lng = parseFloat(integerPartLNG + "." + fractionalPartLNG);
  lat *= coordsInUint.charAt(0) === "1" ? -1 : 1;
  lng *= coordsInUint.charAt(11) === "1" ? -1 : 1;

  geoLocation.lattitude = lat;
  geoLocation.longitude = lng;
  return geoLocation;
}

function prependZeros(str = "", zerosToPrepend) {
  for (let i = str.length; i < zerosToPrepend; i++) {
    str = "0" + str;
  }
  return str;
}
function appendZeros(str = "", zerosToAppend) {
  for (let i = str.length; i < zerosToAppend; i++) {
    str = str + "0";
  }
  return str;
}
function addPointZero(numeric = "") {
  if (!numeric || !numeric.length) {
    return "0.0";
  }
  if (numeric.length > 0 && numeric.indexOf(".") === -1) {
    return numeric + ".0";
  }
  return numeric;
}
module.exports = { coordsToUint, uintToCoordsObject };
