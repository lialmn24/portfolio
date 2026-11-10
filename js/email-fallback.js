/* "Copy email" buttons. Works with or without the Clipboard API. */
(function () {
  "use strict";
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy]");
    if (!btn) return;
    var text = btn.getAttribute("data-copy");
    var original = btn.getAttribute("data-label") || btn.textContent;
    btn.setAttribute("data-label", original);
    function done(ok) {
      btn.textContent = ok ? "Copied!" : "Press Ctrl+C: " + text;
      setTimeout(function () { btn.textContent = original; }, 2000);
    }
    function legacy() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (err) {}
      document.body.removeChild(ta);
      done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, legacy);
    } else { legacy(); }
  });
})();

/* Main "Email me" buttons open Gmail's compose window automatically.
   The href stays a normal mailto: link, so it still works if JavaScript is off. */
(function () {
  "use strict";
  var TO = "cassandraalemania@gmail.com";
  var GMAIL = "https://mail.google.com/mail/?view=cm&fs=1&to=" + TO +
              "&su=" + encodeURIComponent("Opportunity for Julia Alemania");
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="mailto:' + TO + '"]');
    if (!a || a.hasAttribute("data-native")) return;
    if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    var w = window.open(GMAIL, "_blank");   // (not "noopener": that makes open() return null)
    if (w) { try { w.opener = null; } catch (err) {} }
    else { window.location.href = GMAIL; }  // popup blocked: open in this tab
  });
})();
