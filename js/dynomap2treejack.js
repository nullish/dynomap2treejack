const dynoJack = () => {
	/* 
	Parse DynoMap produced HTML sitemap and output indented text equivalent using comma delimiters
	to indicate levels in nav tree.
	*/
	const sitemap = document.getElementsByTagName("a");
	let linkList = "";
	for (let e of sitemap) { 
		let linkClass = e.getAttribute("class");
		let level = linkClass.match(/[0-9]{1,}/)[0];
		let linkIndent = "";
		for (let i = 0; i < level; i++) {
			linkIndent += ",";
		}
		let linkName = e.innerText;
		linkList += `${linkIndent}${linkName}\n`;
	}
	console.log(linkList);
}