	/* 
	Parse DynoMap produced HTML sitemap and output indented text equivalent using comma delimiters
	to indicate levels in nav tree.
	*/

	document.querySelector(".get-sitemap").addEventListener("click", () => {
		const file = document.getElementById('fi').files[0];
		const reader = new FileReader();
		reader.onload = function(event) {
      const getLevel = (link) => {
        const rx = new RegExp(/[0-9]{1,}/);
        const className = link.getAttribute("class");
        const thisLevel = className.match(rx)[0];
        return thisLevel;
      }
      const text = event.target.result;
      const sitemap = document.implementation.createHTMLDocument("Sitemap").documentElement;
      sitemap.innerHTML = text;

      const lowLinks = sitemap.querySelectorAll("a.l5bg + ul");
      for (let ll of lowLinks) {
        while (ll.hasChildNodes()) { ll.removeChild(ll.firstChild) };
      }
      const siteLinks = sitemap.getElementsByTagName("a");
      const removeText = document.getElementById("remove-text").value;
      let linkList = "";
      const maxLevel = document.getElementById("levels").value;

      for (let e of siteLinks) { 
       let level = getLevel(e);
       if (level <= maxLevel) {
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