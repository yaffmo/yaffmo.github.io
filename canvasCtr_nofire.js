var canvas_nofire, stage_nofire, exportRoot_nofire, anim_container_nofire, dom_overlay_container_nofire, fnStartAnimation_nofire;

function init_nofire(nowCutN) { // 吹熄火
	
	canvas_nofire = document.getElementById("nofire_canvas");
	anim_container_nofire = document.getElementById("nofire");
	dom_overlay_container_nofire = document.getElementById("nofire_container");
	var comp=AdobeAn.getComposition("42C42613A88201469BBE0E7CCB5DE16D");
	var lib=comp.getLibrary();
	handleComplete_nofire({},comp);
}
function handleComplete_nofire(evt,comp) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	exportRoot_nofire = new lib.Candlelight();
	stage_nofire = new lib.Stage(canvas_nofire);
	stage_nofire.addChild(exportRoot_nofire);	
	//Registers the "tick" event listener.
	fnStartAnimation_nofire = function() {
		createjs.Ticker.setFPS(lib.properties.fps);
		// createjs.Ticker.addEventListener("tick", stage_nofire);

		createjs.Ticker.addEventListener("tick", tick_nofire);

    function tick_nofire(e) {
      // createjs.Ticker._inited = false;
      // createjs.Ticker.init();
      // console.log(e)
      if (e.paused !== 1) {
        //处理
        stage_nofire.update(); //刷新舞台
      } else {}
    }
	}	    
	//Code to support hidpi screens and responsive scaling.
	function makeResponsive(isResp, respDim, isScale, scaleType) {		
		var lastW, lastH, lastS=1;		
		window.addEventListener('resize', resizeCanvas);		
		resizeCanvas();		
		function resizeCanvas() {			
			var w = lib.properties.width, h = lib.properties.height;			
			var iw = window.innerWidth, ih=window.innerHeight;			
			var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
			if(isResp) {                
				if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
					sRatio = lastS;                
				}				
				else if(!isScale) {					
					if(iw<w || ih<h)						
						sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==1) {					
					sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==2) {					
					sRatio = Math.max(xRatio, yRatio);				
				}			
			}			
			canvas_nofire.width = w*pRatio*sRatio;			
			canvas_nofire.height = h*pRatio*sRatio;
			canvas_nofire.style.width = dom_overlay_container_nofire.style.width = anim_container_nofire.style.width =  w*sRatio+'px';				
			canvas_nofire.style.height = anim_container_nofire.style.height = dom_overlay_container_nofire.style.height = h*sRatio+'px';
			stage_nofire.scaleX = pRatio*sRatio;			
			stage_nofire.scaleY = pRatio*sRatio;			
			lastW = iw; lastH = ih; lastS = sRatio;		
		}
	}
	makeResponsive(false,'both',false,1);	
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation_nofire();
}