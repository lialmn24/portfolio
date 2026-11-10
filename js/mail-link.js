/* Click-to-email: any <a data-mail> opens a pre-filled email to the owner.
   - Phones/tablets: normal mailto: (opens the Mail / Gmail app)
   - Desktop: opens Gmail compose in a new tab (works even with no default mail app) */
(function () {
  var TO = "cassandraalemania@gmail.com";
  var SUBJECT = "Hello Julia, I saw your portfolio";
  var BODY = "Hi Julia,\n\nI visited your portfolio and I'd like to get in touch.\n\n";

  var q = function (s) { return encodeURIComponent(s); };
  var mailto = "mailto:" + TO + "?subject=" + q(SUBJECT) + "&body=" + q(BODY);
  var gmail = "https://mail.google.com/mail/?view=cm&fs=1&to=" + q(TO) +
              "&su=" + q(SUBJECT) + "&body=" + q(BODY);
  var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  document.querySelectorAll("a[data-mail]").forEach(function (a) {
    a.setAttribute("href", mailto);
    a.addEventListener("click", function (e) {
      if (isMobile) return;
      e.preventDefault();
      var w = window.open(gmail, "_blank", "noopener");
      if (!w) window.location.href = mailto;
    });
  });
})();
