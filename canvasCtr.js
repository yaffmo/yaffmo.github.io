var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;

function init(nowCutN) { // 吹氣男
  // i = 0
  // // createjs.Ticker._inited = false;
  // // createjs.Ticker.init();
  // // createjs.Ticker.reset()
  if (nowCutN == 0) {
    setTimeout(function () {
      createjs.Ticker.paused = 1
      // createjs.Ticker.reset()
    }, 1000 / 30 * 2)
  }
  canvas = document.getElementById("blowMan_canvas");
  anim_container = document.getElementById("blowMan");
  dom_overlay_container = document.getElementById("blowMan_container");
  var comp = AdobeAn.getComposition("C8A043064CED9B43A39BB816E5FB3600");
  var lib = comp.getLibrary();
  handleComplete({}, comp);
}

function handleComplete(evt, comp) {
  //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
  var lib = comp.getLibrary();
  var ss = comp.getSpriteSheet();
  exportRoot = new lib.character();
  stage = new lib.Stage(canvas);
  stage.addChild(exportRoot);
  //Registers the "tick" event listener.
  fnStartAnimation = function () {
    createjs.Ticker.setFPS(lib.properties.fps);
    // createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick);

    function tick(e) {
      // createjs.Ticker._inited = false;
      // createjs.Ticker.init();
      // console.log(e)
      if (e.paused !== 1) {
        //处理
        stage.update(); //刷新舞台
      } else {}
    }
  }
  //Code to support hidpi screens and responsive scaling.
  function makeResponsive(isResp, respDim, isScale, scaleType) {
    var lastW, lastH, lastS = 1;
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function resizeCanvas() {
      var w = lib.properties.width,
        h = lib.properties.height;
      var iw = window.innerWidth,
        ih = window.innerHeight;
      var pRatio = window.devicePixelRatio || 1,
        xRatio = iw / w,
        yRatio = ih / h,
        sRatio = 1;
      if (isResp) {
        if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
          sRatio = lastS;
        } else if (!isScale) {
          if (iw < w || ih < h)
            sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 1) {
          sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 2) {
          sRatio = Math.max(xRatio, yRatio);
        }
      }
      canvas.width = w * pRatio * sRatio;
      canvas.height = h * pRatio * sRatio;
      canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
      canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * sRatio + 'px';
      stage.scaleX = pRatio * sRatio;
      stage.scaleY = pRatio * sRatio;
      lastW = iw;
      lastH = ih;
      lastS = sRatio;
    }
  }
  makeResponsive(true, 'both', true, 1);
  AdobeAn.compositionLoaded(lib.properties.id);
  fnStartAnimation();
}