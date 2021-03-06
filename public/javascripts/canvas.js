function Banner(){
	
  var keyword = "DIGITAL DOJO";
	var canvas;
	var context;
	
	var bgCanvas;
	var bgContext;
	
	
	
	//Each particle/icon
	var parts = [];
	
	var mouse = {x:-100,y:-100};
	var mouseOnScreen = false;
	
	var itercount = 0;
	var itertot = 40;
	
	this.initialize = function(canvas_id){
		canvas = document.getElementById(canvas_id);
		context = canvas.getContext('2d');
		
		canvas.width = window.innerWidth;
		canvas.height = 250;
		
		bgCanvas = document.createElement('canvas');
		bgContext = bgCanvas.getContext('2d');
		
		bgCanvas.width = window.innerWidth;
		bgCanvas.height = window.innerHeight;
		denseness = 4;
		canvas.addEventListener('mousemove', MouseMove, false);
		canvas.addEventListener('mouseout', MouseOut, false);
			
		start();
	}
	
	var start = function(){
		background = new Image();
		background.src = "../images/top_line_bg.png"; 
		bgContext.fillStyle = "#ccc";
		

		bgContext.font = '100px texas_ledregular';
		bgContext.textAlign = 'center';
		bgContext.fillText(keyword, canvas.width/2, 120);
		console.log(canvas.width/2)
		clear();	
		getCoords();
	}
	
	var getCoords = function(){
		var imageData, pixel, height, width;
		
		imageData = bgContext.getImageData(0, 0, canvas.width, canvas.height);
		
		// quickly iterate over all pixels - leaving density gaps
	    for(height = 0; height < bgCanvas.height; height += denseness){
            for(width = 0; width < bgCanvas.width; width += denseness){   
               pixel = imageData.data[((width + (height * bgCanvas.width)) * 4) - 1];
                  //Pixel is black from being drawn on. 
                  if(pixel == 255) {
                    drawCircle(width, height);
                  }
            }
        }
        
        setInterval( update, 40 );
	}
	
	var drawCircle = function(x, y){
		
		var startx = (Math.random() * canvas.width);
		var starty = (Math.random() * canvas.height);
		
		var velx = (x - startx) / itertot;
		var vely = (y - starty) / itertot;	
		
		parts.push(
			{c: '#18CAE6',
			 x: x, //goal position
			 y: y,
			 x2: startx, //start position
			 y2: starty,
			 r: true, //Released (to fly free!)
			 v:{x:velx , y: vely}
			}
		)
	}
		
	var update = function(){
		var i, dx, dy, sqrDist, scale;
		itercount++;
		clear();
		for (i = 0; i < parts.length; i++){
					
			//If the dot has been released
			if (parts[i].r == true){
				//Fly into infinity!!
				parts[i].x2 += parts[i].v.x;
		        parts[i].y2 += parts[i].v.y;
			//Perhaps I should check if they are out of screen... and kill them?
			}
			if (itercount == itertot){
				parts[i].v = {x:(Math.random() * 6) * 2 - 6 , y:(Math.random() * 6) * 2 - 6};
				parts[i].r = false;
			}
			
	
			//Look into using svg, so there is no mouse tracking.
			//Find distance from mouse/draw!
			dx = parts[i].x - mouse.x;
	        dy = parts[i].y - mouse.y;
	        sqrDist =  Math.sqrt(dx*dx + dy*dy);
			
			if (sqrDist < 20){
				parts[i].r = true;
			} 			

			//Draw the squares
			context.fillStyle = parts[i].c;
			context.beginPath();
			context.rect(parts[i].x2, parts[i].y2, 3, 3);
			context.closePath();
	    	context.fill();	
				
		}	
	}
	
	var MouseMove = function(e) {
	    if (e.layerX || e.layerX == 0) {
	    	//Reset particle positions
	    	mouseOnScreen = true;
	    	
	        mouse.x = e.layerX - canvas.offsetLeft;
	        mouse.y = e.layerY - canvas.offsetTop;
	    }
	}
	
	var MouseOut = function(e) {
		mouseOnScreen = false;
		mouse.x = -100;
		mouse.y = -100;	
	}
	
	//Clear the on screen canvas
	var clear = function(){

		context.fillStyle = '#0f0f0f';
		context.beginPath();
  		context.rect(0, 0, canvas.width, canvas.height);
 		context.closePath();
 		context.fill();
	}
}

var banner = new Banner();
banner.initialize("canvas");