/**
 * Modified from https://github.com/cyrilf/docsify-edit-link
 */

function normalizeGithubUrl(url) {
  if (!url) {
    return null;
  }

  var isAlias = !/\/\//.test(url); // no protocol in the url, we assume it's an alias
  url = isAlias
    ? "https://github.com/" + url + "/edit/master/docs/"
    : url.replace(/^git\+/, "");

  return url;
}

function install(hook, vm) {
  var footerConfig = vm.config.footer || {};
  var text = footerConfig.text || "Edit this page";
  var cssClass = footerConfig.cssClass || "edit-link";
  var repoUrl = normalizeGithubUrl(footerConfig.repo || vm.config.repo);
  var custom = footerConfig.custom;

  if (!repoUrl) {
    throw Error("$docsify.editLink.repo is required. Fix your config.");
  }

  hook.afterEach(function(html) {
    var editLink =
      '<p class="' +
      cssClass +
      '">' +
      custom +
      "<br />" +
      '<a href="' +
      repoUrl +
      vm.route.file +
      '" target="_blank">' +
      text +
      "</a></p>";

    return html + editLink;
  });
}

$docsify.plugins = [].concat(install, $docsify.plugins);
