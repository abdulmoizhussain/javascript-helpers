
function filterReadableCharacters(INPUT="") {
	let FILTERED = "";
	for(let i = 0; i < INPUT.length; i++) {
		const CODE = INPUT.charCodeAt(i);
		if (CODE > 31 && CODE < 127) {
			FILTERED += INPUT[i];
		}
	}
	return FILTERED;
}
