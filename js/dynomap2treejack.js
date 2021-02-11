const dynoJack = () => {
	const sitemap = document.getElementsByTagName("a");
	let linkList = "";
	for (let e of sitemap) { 
		let linkClass = e.getAttribute("class");
		let level = linkClass.match(/[0-9]{1,}/)[0];
		let linkName = e.innerText;
		linkList += `${level} ${linkName}\n`;
	}
	console.log(linkList);
}