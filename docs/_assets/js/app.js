/** Initialize Docsify */
window.$docsify = {
  name: "Leader's Guide",
  title: "Leader's Guide",
  logo: "/_media/branding/favicon.svg",
  loadSidebar: true,
  maxLevel: 3,
  subMaxLevel: 2,
  auto2top: true,
  search: {
    placeholder: "Type to search",
    noData: "No results!",
    depth: 2,
    hideOtherSidebarContent: true
  },
  footer: {
    text: "Contribute to this page",
    repo: "hackclub/guide",
    cssClass: "footer",
    custom: `Made with <3 and :3 by <a href="https://github.com/whatbeato">@whatbeato</a>. Licensed <a href="https://github.com/hackclub/guide/blob/master/LICENSE.md">MIT</a>.`
  },
  notFoundPage: true
};

/** Register Service Worker */
if (typeof navigator.serviceWorker !== "undefined") {
  navigator.serviceWorker.register("sw.js");
}

function switchTheme() {

  var darkCss = document.getElementById("dark-theme");
  var lightCss = document.getElementById("light-theme");

  if (lightCss.disabled) {
    // switch to light theme
    lightCss.disabled = false;
    darkCss.disabled = true;
    localStorage.setItem("darkMode", "disabled");
    document.getElementById("switcher-icon").setAttribute("src", "/_media/moon.svg");
  } else {
    // switch to dark theme
    lightCss.disabled = true;
    darkCss.disabled = false;
    localStorage.setItem("darkMode", "enabled");
    document.getElementById("switcher-icon").setAttribute("src", "/_media/moon-full.svg");
  }

}
