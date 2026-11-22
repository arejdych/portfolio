(function () {
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var css = document.createElement("style");
  css.textContent =
    ".hl-w{display:inline-block;white-space:nowrap}" +
    ".hl-c{display:inline-block;opacity:0;filter:blur(10px);transform:translateY(.12em);" +
    "transition:opacity .55s ease,filter .6s ease,transform .6s cubic-bezier(.2,.7,.2,1);" +
    "transition-delay:calc(var(--i)*26ms)}" +
    ".hl-in .hl-c{opacity:1;filter:blur(0);transform:none}";
  document.head.appendChild(css);

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      requestAnimationFrame(function () {
        e.target.classList.add("hl-in");
      });
    });
  }, { threshold: 0.2 });

  function split(el) {
    var text = el.textContent;
    el.dataset.hl = "1";
    el.setAttribute("aria-label", text);
    el.textContent = "";
    var i = 0;
    text.split(" ").forEach(function (word, wi, all) {
      var w = document.createElement("span");
      w.className = "hl-w";
      w.setAttribute("aria-hidden", "true");
      for (var k = 0; k < word.length; k++) {
        var c = document.createElement("span");
        c.className = "hl-c";
        c.style.setProperty("--i", i++);
        c.textContent = word[k];
        w.appendChild(c);
      }
      el.appendChild(w);
      if (wi < all.length - 1) {
        el.appendChild(document.createTextNode(" "));
        i++;
      }
    });
    io.observe(el);
  }

  function scan() {
    var list = document.querySelectorAll("h1.h1:not([data-hl]), h2.h1:not([data-hl])");
    for (var i = 0; i < list.length; i++) split(list[i]);
  }

  var t;
  new MutationObserver(function () {
    clearTimeout(t);
    t = setTimeout(scan, 60);
  }).observe(document.body, { childList: true, subtree: true });
  scan();
})();
