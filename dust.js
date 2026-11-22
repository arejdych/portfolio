(function () {
  if (window.__dust) return;
  window.__dust = true;
  var bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(function (v) {
    return (v + 0.5) / 16;
  });
  var cobalt = [[70, 116, 214, 0.3], [40, 92, 206, 0.42], [22, 70, 190, 0.52]];
  var azure = [[56, 138, 212, 0.3], [30, 116, 198, 0.42], [14, 94, 182, 0.52]];
  var violet = [[132, 108, 214, 0.28], [108, 78, 196, 0.4], [86, 54, 178, 0.5]];
  var indigo = [[92, 128, 220, 0.28], [70, 102, 210, 0.4], [48, 78, 198, 0.5]];
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function field(seed) {
    var state = seed >>> 0;
    var lattice = new Float32Array(256);
    var i;
    for (i = 0; i < 256; i++) {
      state = (1664525 * state + 1013904223) >>> 0;
      lattice[i] = state / 4294967296;
    }
    function cell(x, y) {
      return lattice[((y + 16) % 16) * 16 + ((x + 16) % 16)];
    }
    var table = new Float32Array(16384);
    for (var y = 0; y < 128; y++) {
      for (var x = 0; x < 128; x++) {
        var fx = (x / 128) * 16;
        var fy = (y / 128) * 16;
        var x0 = Math.floor(fx);
        var y0 = Math.floor(fy);
        var tx = fx - x0;
        var ty = fy - y0;
        tx = tx * tx * (3 - 2 * tx);
        ty = ty * ty * (3 - 2 * ty);
        var top = cell(x0, y0) + (cell(x0 + 1, y0) - cell(x0, y0)) * tx;
        var bot = cell(x0, y0 + 1) + (cell(x0 + 1, y0 + 1) - cell(x0, y0 + 1)) * tx;
        table[y * 128 + x] = top + (bot - top) * ty;
      }
    }
    return function (x, y) {
      var sx = (x % 128 + 128) % 128;
      var sy = (y % 128 + 128) % 128;
      var ix = sx | 0;
      var iy = sy | 0;
      var tx = sx - ix;
      var ix2 = (ix + 1) % 128;
      var iy2 = (iy + 1) % 128;
      var top = table[iy * 128 + ix] + (table[iy * 128 + ix2] - table[iy * 128 + ix]) * tx;
      var bot = table[iy2 * 128 + ix] + (table[iy2 * 128 + ix2] - table[iy2 * 128 + ix]) * tx;
      return top + (bot - top) * (sy - iy);
    };
  }

  var shape = field(11);
  var grain = field(29);
  var tint = field(47);

  function paint(canvas, time) {
    var cssW = canvas.clientWidth;
    var cssH = canvas.clientHeight;
    if (!cssW || !cssH) return;
    var dw = Math.max(1, Math.ceil(cssW / 2));
    var dh = Math.max(1, Math.ceil(cssH / 2));
    if (canvas.width !== dw || canvas.height !== dh) {
      canvas.width = dw;
      canvas.height = dh;
      canvas._dust = null;
    }
    var ctx = canvas.getContext("2d", { alpha: true });
    if (!canvas._dust) canvas._dust = ctx.createImageData(dw, dh);
    var data = canvas._dust.data;
    data.fill(0);
    var seconds = time / 1000;
    var at = Number(canvas.dataset.at || 70) / 100;
    var strength = Number(canvas.dataset.strength || 1);
    var fadeTop = canvas.dataset.fadeTop !== "0";
    var section = canvas.dataset.kind === "section";
    var foot = canvas.dataset.kind === "foot";
    var cx = at * dw + 0.045 * dw * Math.sin(0.21 * seconds);
    var cy = canvas.dataset.y ? (Number(canvas.dataset.y) / 100) * dh : 0.12 * dh;
    var hero = canvas.dataset.kind === "hero";
    var rx = hero ? Math.max(0.34 * dw, 140) : foot ? Math.max(0.4 * dw, 150) : section ? dw * 0.5 : Math.max(0.34 * dw, 130);
    var ry = hero ? Math.min(Math.max(0.52 * dh, 170), 360) : foot ? Math.min(Math.max(0.52 * dh, 170), 360) : section ? dh * 0.48 : Math.min(Math.max(0.5 * dh, 150), 310);
    var cool = foot ? violet : cobalt;
    var warm = foot ? indigo : azure;
    var fade = Math.max(0.38 * dh, 120);
    var pulse = 1 + 0.07 * Math.sin(0.45 * seconds);
    var scrollX = 1.7 * seconds;
    var scrollY = 0.65 * seconds;
    var sweep = cx + rx * (((seconds / 8) % 1) * 2.8 - 1.4);
    var sweepW = 0.22 * rx;
    var x0 = Math.max(0, Math.floor(cx - 1.3 * rx));
    var x1 = Math.min(dw, Math.ceil(cx + 1.3 * rx));
    var y0 = Math.max(0, Math.floor(cy - 1.3 * ry));
    var y1 = Math.min(dh, Math.ceil(cy + 1.3 * ry));
    for (var y = y0; y < y1; y += 2) {
      var ny = (y + 1 - cy) / (ry * pulse);
      var fadeY = Math.min(1, fadeTop ? y / fade : 1, (dh - y) / fade);
      var fadeCurve = fadeY * fadeY * fadeY * (fadeY * (fadeY * 6 - 15) + 10);
      for (var x = x0; x < x1; x += 2) {
        var nx = (x + 1 - cx) / (rx * pulse);
        var warp = 0.62 + 0.62 * shape(0.025 * x + 0.12 * scrollX, 0.025 * y * 1.3 - 0.2 * scrollY);
        var r2 = (nx * nx + ny * ny) * warp;
        if (r2 >= 1) continue;
        var edge = 1 - r2;
        edge = edge * edge * (3 - 2 * edge) * fadeCurve;
        var n = grain(0.09 * x + scrollX, 0.09 * y * 1.4 + scrollY);
        var dx = (x - sweep) / sweepW;
        var density = strength * edge * (0.36 + 0.5 * n) * 0.72 * (1 + 0.24 * Math.exp(-dx * dx));
        if (density * 3 < 0.04) continue;
        var mix = Math.min(1, Math.max(0, (tint(0.054 * x - 0.6 * scrollX, 0.054 * y + scrollY) - 0.35) * 2));
        var yEnd = Math.min(y + 2, y1);
        var xEnd = Math.min(x + 2, x1);
        for (var py = y; py < yEnd; py++) {
          for (var px = x; px < xEnd; px++) {
            var level = Math.min(3, (density * 3 + bayer[(py & 3) * 4 + (px & 3)]) | 0);
            if (level <= 0) continue;
            var c = cool[level - 1];
            var a = warm[level - 1];
            var p = (py * dw + px) * 4;
            data[p] = c[0] + (a[0] - c[0]) * mix;
            data[p + 1] = c[1] + (a[1] - c[1]) * mix;
            data[p + 2] = c[2] + (a[2] - c[2]) * mix;
            data[p + 3] = 255 * (c[3] + (a[3] - c[3]) * mix);
          }
        }
      }
    }
    ctx.putImageData(canvas._dust, 0, 0);
  }

  function start(canvas) {
    if (canvas.dataset.dustOn) return;
    canvas.dataset.dustOn = "1";
    var seen = false;
    var last = 0;
    var watch = new IntersectionObserver(function (entries) {
      seen = entries[0].isIntersecting;
    }, { rootMargin: "200px 0px" });
    watch.observe(canvas);
    function frame(now) {
      if (!canvas.isConnected) return;
      if (seen && (reduce || now - last >= 66)) {
        last = now;
        paint(canvas, reduce ? 4000 : now);
      }
      if (!reduce) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function scan() {
    var nodes = document.querySelectorAll("canvas.dust");
    for (var i = 0; i < nodes.length; i++) start(nodes[i]);
  }
  scan();
  var ticks = 0;
  var timer = setInterval(function () {
    scan();
    if (++ticks > 40) clearInterval(timer);
  }, 200);
})();
