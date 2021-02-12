	/* 
	Parse DynoMap produced HTML sitemap and output indented text equivalent using comma delimiters
	to indicate levels in nav tree.
	*/

	document.querySelector(".get-sitemap").addEventListener("click", () => {
    fetch("https://gist.githubusercontent.com/nullish/753bf8b435a84681d12a786b4696911c/raw/9b0e902bcb8d52922189e22bb18f8e133cbe389e/dynomap-test.html")
        .then((response) => response.text())
        .then((text) => {
        	console.log(text);
            const sitemap = document.implementation.createHTMLDocument("Sitemap").documentElement;
            sitemap.innerHTML = text;
            // document.querySelector(".element_on_main_page").textContent = otherDoc.querySelector(".awesome_external_element").textContent;
            const siteLinks = sitemap.getElementsByTagName("a");
            console.log(sitemap);
	let linkList = "";
	for (let e of siteLinks) { 
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
        });
});

	

	/* ******* TODO

	- Import sitemap HTML rather than 'this' document
	- Run throgh interface at index.html
	- Option to limit level depth
	- Export to CSV
	
	createHTMLDocument: https://stackoverflow.com/questions/48759219/access-dom-from-a-different-html-file-with-js
	Fetch: https://developers.google.com/web/updates/2015/03/introduction-to-fetch

	*/