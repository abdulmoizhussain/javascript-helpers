
function filterReadableCharacters(input = "") {
	return input.split("")
  .filter(c => { const code = c.charCodeAt(); return code > 31 && code < 127; })
  .join("");
}
