function checkMultiples(source='', delim='\n') {
	const lines = source.split(delim);
	for (var i=0; i< lines.length; i++) {
		for(var j=0; j< lines.length; j++) {
			if (lines[i] === lines[j]) {
				if (i === j) continue;
				return "'" + lines[i] + "' found second time !";
			}
		}
	}
	return "";
}
/*
Example usage:
> checkMultiples(`Susan Hayes
Sydney Williams
Terry Herrera
Theodore Wells
Toni Smith
Tracy Ellis
Valerie Garza
William Bean
William Bean
Veronica Cortez`, '\n');
> "'William Bean' found second time !"
*/
