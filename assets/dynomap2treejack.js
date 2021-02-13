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
        }
        reader.readAsText(file)
    });

    document.querySelector(".copy-text").addEventListener("click", () => {
    	/* Get the text field */
  const copyText = document.getElementById("node-list");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
    })

/*


*/

	/* ******* TODO

	- Import sitemap HTML rather than 'this' document
	- Run throgh interface at index.html
	- Option to limit level depth
	- Export to CSV
	
	createHTMLDocument: https://stackoverflow.com/questions/48759219/access-dom-from-a-different-html-file-with-js
	Fetch: https://developers.google.com/web/updates/2015/03/introduction-to-fetch

	*/