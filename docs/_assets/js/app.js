/** Initialize Docsify */
window.$docsify = {
  name: "Leadership Guide",
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
    text: "Contribute to This Page",
    repo: "hackclub/guide",
    cssClass: "footer",
    custom: `Made with 💖 by <a href="https://github.com/itsmingjie">@itsmingjie</a>.`
  },
  notFoundPage: true
};

/** Register Service Worker */
if (typeof navigator.serviceWorker !== "undefined") {
  navigator.serviceWorker.register("sw.js");
}
