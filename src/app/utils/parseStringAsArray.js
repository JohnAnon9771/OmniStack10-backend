export default function parseStringAsArray(stringAsArray) {
  return stringAsArray.split(',').map(string => string.trim());
}
