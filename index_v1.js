function init(){
	canvas = document.getElementById('gamepad');
	pen = canvas.getContext("2d");
	W = canvas.width;
	H = canvas.height;
	score = 0;
	//creating a box;
	/*box = {
		x:10,
		y:20,
		h:20,
		w:20,
		speed:5,
	}*/
	gameOver = false;
	food = generateFood();
	snake = {
		length: 1,
		color: "aqua",
		strokeColor:"black",
		cells: [],
		direction:"right",
		createSnake:function(){
			for(var i = this.length-1; i >= 0; i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){
			for(var i = 0; i < this.cells.length; i++){
				pen.fillStyle = this.color;
				pen.strokeStyle = this.strokeColor;
				pen.lineWidth = 4;
				pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
				pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
			}
		},
		updateSnake:function(){
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
			/* = headX+1;*/
			if(headX == food.x && headY == food.y){
				score++;
				$("#scoreval").html(score);
				food = generateFood();
			}
			else{
				this.cells.pop();
			}
			//console.log(this.direction);
			if(this.direction == "right"){
				nextX = headX+1;
				nextY = headY;
			}
			else if(this.direction == "left"){
				nextX = headX-1;
				nextY = headY;
			}
			else if(this.direction == "down"){
				nextX = headX;
				nextY = headY+1;
			}
			else{
				nextX = headX;
				nextY = headY-1;
			}
			this.cells.unshift({x:nextX, y:nextY});
			var last_x = Math.round((W-10)/10);
            var last_y = Math.round((H-10)/10);

            
            if(nextX<0 || nextY <0|| nextX>last_x || nextY>last_y){
            		console.log("GameOver");
                    gameOver = true;     
            }
		}
	};
	snake.createSnake();
	function KeyPressed(e){
        
        console.log("You pressed a key");
        console.log(e);
        
        if(e.key=="ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction = "down";
        }
        else{
            snake.direction = "up";
        }
        
    }
    
    
    document.addEventListener('keydown',KeyPressed);
}
function draw(){
	pen.clearRect(0,0,W,H);
	console.log("In Draw");
	snake.drawSnake();
	pen.fillStyle = food.color;
	pen.fillRect(food.x*10,food.y*10,10,10);

}
function update(){
	snake.updateSnake();
}
function gameloop(){
	console.log(snake.cells);
	draw();
	update();
	if(gameOver == true){
		clearInterval(action);
		$("#gameover").style.display = "block";
		$("#gameover").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
	}
}
function generateFood(){
	var foodX = Math.round(Math.random()*(W-10)/10);
	var foodY = Math.round(Math.random()*(H-10)/10);
	foodColors = ["red","green","aqua","coral","orchid"];
    var i = Math.round(Math.random()*foodColors.length);
    var food = {
    	x:foodX,
    	y:foodY,
    	color:foodColors[i],
    };
    return food;
}
function startGame(){
	init();
	var action=setInterval(gameloop, 100);
}
//startGame();
//gameloop();
