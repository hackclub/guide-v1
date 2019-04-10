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
      `
      <div class="wrap-collabsible" id="feedback-form">
        <input id="collapsible" class="toggle" type="checkbox">
        <label for="collapsible" class="lbl-toggle">Finding page guide helpful? Help us improve by sharing your thoughts!</label>
        <div class="collapsible-content">
          <div class="content-inner">
            <textarea name="feedback" id="feedback" class="feedback" placeholder="I want to see information about ..." /></textarea>
            <div style="text-align: center">
              <a class="btn submit" id="feedback-submit" onclick="submitFeedback()">Submit</a>
            </div>
          </div>
        </div>
      </div>
      ` +
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

/** Ajax form Submission */
function submitFeedback() {
  if (document.getElementById("feedback").value != "") {
    var xhr = new XMLHttpRequest();
    var url = "https://usebasin.com/f/be3a90fcc3dd.json";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json.feedback + ", " + json.pageUrl);
        document.getElementById("feedback-form").innerHTML = `
          <h4 style="color: #d3d3d3">Thanks for your feedback! We‘ll keep improving this leadership guide. In the mean time, if you have more questions or suggestions, 
          feel free to chat with us in <a href="https://hackclub.slack.com/messages/C0C78SG9L/">#hq</a>!</h4>
        `;
      }
    };
    var data = JSON.stringify({
      feedback: document.getElementById("feedback").value,
      pageUrl: window.location.hash
    });
    xhr.send(data);
  }
}
