var canvas_fire, stage_fire, exportRoot_fire, anim_container_fire, dom_overlay_container_fire, fnStartAnimation_fire;

function init_fire(item) { // 不滅火

  if (item == 0) {
    canvas_fire = document.getElementById("fire_canvas");
    anim_container_fire = document.getElementById("fire");
    dom_overlay_container_fire = document.getElementById("fire_container");
    var comp = AdobeAn.getComposition("41C42613A88201469BBE0E7CCB5DE16D");

  }else if(item == 1) {
    canvas_fire = document.getElementById("fire_canvas02");
    anim_container_fire = document.getElementById("fire02");
    dom_overlay_container_fire = document.getElementById("fire_container02");
    var comp = AdobeAn.getComposition("41C42613A88201469BBE0E7CCB5DE16D");

  }

  var lib = comp.getLibrary();
  handleComplete_fire({}, comp, item);
}

function handleComplete_fire(evt, comp, item) {
  //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
  var lib = comp.getLibrary();
  var ss = comp.getSpriteSheet();

  exportRoot_fire = new lib.ClelightLoop();
  stage_fire = new lib.Stage(canvas_fire);
  stage_fire.addChild(exportRoot_fire);
  
  //Registers the "tick" event listener.
  fnStartAnimation_fire = function () {
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener("tick", stage_fire);

    // createjs.Ticker.addEventListener("tick", tick_fire);

    // function tick_fire(e) {
    //   // createjs.Ticker._inited = false;
    //   // createjs.Ticker.init();
    //   // console.log(e)
    //   if (e.paused !== 1) {
    //     //处理
    //     stage_fire.update(); //刷新舞台
    //   } else {}
    // }
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
      canvas_fire.width = w * pRatio * sRatio;
      canvas_fire.height = h * pRatio * sRatio;
      canvas_fire.style.width = dom_overlay_container_fire.style.width = anim_container_fire.style.width = w * sRatio + 'px';
      canvas_fire.style.height = anim_container_fire.style.height = dom_overlay_container_fire.style.height = h * sRatio + 'px';
      stage_fire.scaleX = pRatio * sRatio;
      stage_fire.scaleY = pRatio * sRatio;
      lastW = iw;
      lastH = ih;
      lastS = sRatio;
    }
  }
  makeResponsive(false, 'both', false, 1);
  AdobeAn.compositionLoaded(lib.properties.id);
  fnStartAnimation_fire();
}