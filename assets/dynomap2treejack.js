	/* 
	Parse DynoMap produced HTML sitemap and output indented text equivalent using comma delimiters
	to indicate levels in nav tree.
	*/

	document.querySelector(".get-sitemap").addEventListener("click", () => {
		const file = document.getElementById('fi').files[0];
		const reader = new FileReader();
		reader.onload = function(event) {
			const text = event.target.result;
			const sitemap = document.implementation.createHTMLDocument("Sitemap").documentElement;
			sitemap.innerHTML = text;
            // document.querySelector(".element_on_main_page").textContent = otherDoc.querySelector(".awesome_external_element").textContent;
            const siteLinks = sitemap.getElementsByTagName("a");
            const removeText = document.getElementById("remove-text").value;
            console.log(removeText);
            let linkList = "";
            for (let e of siteLinks) { 
            	let linkClass = e.getAttribute("class");
            	let level = linkClass.match(/[0-9]{1,}/)[0];
            	let linkIndent = "";
            	for (let i = 0; i < level; i++) {
            		linkIndent += "\t";
            	}
            	let linkName = e.innerText;
              if (removeText) {
                let rx = new RegExp(removeText);
                linkName = linkName.replace(rx, '');
              }
              linkList += `${linkIndent}${linkName}\n`;
            }
            document.getElementById("node-list").innerText = linkList;
            document.getElementById("copy-text").setAttribute("style", "visibility:visible");
          }
          reader.readAsText(file)
        });

  document.querySelector("#copy-text").addEventListener("click", () => {
    const copyToClipboard = str => {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      return str;
    };
    let str = document.getElementById("node-list").innerText;
    console.log(copyToClipboard(str));
  })