function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32)
  textAlign(CENTER,CENTER)
  strokeCap(SQUARE)
}

var keys = [false,false]
var codeWord = []
var decodeWord = []
var symbol 

var slidingLeft = false
var slidingRight = false

var slidingFinger

var erase = false
var space = false

//reference value for sliding glyphs around - need two since symbols and characters have different behaviors
var offsetSymbols = 0
var offsetCharacters = 0

function draw() {

  background(200)

	drawScreenElements()


  printSymbols()
  printCharacters()
	//text(transitionArray, 100, 160)
  //text(transitioning, 100+offsetSymbols, 200)

}

function drawScreenElements(){

  fill(170)
  noStroke()
  rect(0,0,width/2,height)

  strokeWeight(4)
  
  fill(0)
  stroke(255)
  ellipse(110,520,120,120)
  stroke(0)
  fill(255)
  ellipse(260,520,120,120)
  noStroke()
  fill(0)

}

function touchStarted(){

  if(transitioning){
    offsetSymbols=0
    offsetCharacters = 0
    transitioning=false
    clearArray()
  }

  //determining either/both for which keys get touched
	for(i=0;i<touches.length;i++){
    	if(dist(touches[i].x,touches[i].y,110,520)<60){
        	keys[0] = true

          //possible sliding right gesture?
          if(keys[1]==false){
            slidingFinger = touches[i].id
            slidingRight = true
          }else{
            slidingLeft = false
          }

    	}else if(dist(touches[i].x,touches[i].y,260,520)<60){
        	keys[1] = true

          //possible sliding left gesture?
          if(keys[0]==false){
            slidingFinger = touches[i].id
            slidingLeft = true
          }else{
            slidingRight = false
          }
    	}
    }
}

function touchMoved(){
  if(touches.length==1&&slidingRight){
    offsetSymbols = map(touches[0].x,110,260,0,24)
    offsetCharacters = map(touches[0].x,110,260,0,24)
  }
  if(touches.length==1&&slidingLeft){
    offsetSymbols = map(touches[0].x,260,110,0,-24)
    offsetCharacters = map(touches[0].x,260,110,0,-24)
  }

  for(j=0;j<touches.length;j++){
    if(slidingLeft&&touches[j].id==slidingFinger&&dist(touches[j].x,touches[j].y,110,520)<60){
      space = true
    }else if(slidingRight&&touches[j].id==slidingFinger&&dist(touches[j].x,touches[j].y,260,520)<60){
      erase = true
    }
  }
  return false;
}

function touchEnded(){
	if(touches.length==0){

    if(erase){
      if(codeWord.length==0){
        decodeWord.pop()
      }else{
        codeWord.pop()
      }
      erase = false
    }else if(space){
      if(codeWord.length==0){
        decodeWord.push(" ")
      }
      space = false
    }else{
		  symbolCheck()
      characterCheck()
    } 

		keys[0] = false
		keys[1] = false

    slidingRight = false
    slidingLeft = false

    offsetSymbols = 0
    offsetCharacters = 0

	}
}


function symbolCheck(){

	if(keys[0]==true&&keys[1]==false){
		codeWord.push(1)
	}
	if(keys[0]==false&&keys[1]==true){
		codeWord.push(2)
	}
	if(keys[0]==true&&keys[1]==true){
		codeWord.push(3)
	}

}

function characterCheck()
{
  if (codeWord[0]==1) {//DOT start
    if (codeWord[1]==1) {
      decodeWord.push("T")
      symbolsToCharacter();
    }
    if (codeWord[1]==2) {
      decodeWord.push("A")
      symbolsToCharacter();
    }
    if (codeWord[1]==3) {
      if (codeWord[2]==1) {
        decodeWord.push("D")
        symbolsToCharacter();
      }
      if (codeWord[2]==2) {
        decodeWord.push("L")
        symbolsToCharacter();
      }
      if (codeWord[2]==3) {
        decodeWord.push("C")
        symbolsToCharacter();
      }
    }
  }
  if (codeWord[0]==2) {//DASH start
    if (codeWord[1]==1) {
      decodeWord.push("O")
      symbolsToCharacter();
    }
    if (codeWord[1]==2) {
      decodeWord.push("I")
      symbolsToCharacter();
    }
    if (codeWord[1]==3) {
      if (codeWord[2]==1) {
        decodeWord.push("U")
        symbolsToCharacter();
      }    
      if (codeWord[2]==2) {
        decodeWord.push("M")
        symbolsToCharacter();
      }    
      if (codeWord[2]==3) {
        decodeWord.push("W")
        symbolsToCharacter();
      }
    }
  }
  if (codeWord[0]==3) {//DOUBLE start
    if (codeWord[1]==1) {
      if (codeWord[2]==1) {
        decodeWord.push("H")
        symbolsToCharacter();
      }
      if (codeWord[2]==2) {
        decodeWord.push("R")
        symbolsToCharacter();
      }
      if (codeWord[2]==3) {
        if (codeWord[3]==1) {
          decodeWord.push("Y")
          symbolsToCharacter();
        }
        if (codeWord[3]==2) {
          decodeWord.push("P")
          symbolsToCharacter();
        }
        if (codeWord[3]==3) {
          decodeWord.push("B")
          symbolsToCharacter();
        }
      }
    }
    if (codeWord[1]==2) {
      decodeWord.push("E")
      symbolsToCharacter();
    }
    if (codeWord[1]==3) {
      if (codeWord[2]==1) {
        decodeWord.push("N")
        symbolsToCharacter();
      }
      if (codeWord[2]==2) {
        decodeWord.push("S")
        symbolsToCharacter();
      }
      if (codeWord[2]==3) {
        if (codeWord[3]==1) {
          decodeWord.push("F")
          symbolsToCharacter();
        }
        if (codeWord[3]==2) {
          decodeWord.push("G")
          symbolsToCharacter();
        }
        if (codeWord[3]==3) {
          if (codeWord[4]==1) {
            decodeWord.push("K")
            symbolsToCharacter();
          }
          if (codeWord[4]==2) {
            decodeWord.push("V")
            symbolsToCharacter();
          }
          if (codeWord[4]==3) {
            if (codeWord[5]==1) {
              decodeWord.push("J")
              symbolsToCharacter();
            }
            if (codeWord[5]==2) {
              decodeWord.push("X")
              symbolsToCharacter();
            }
            if (codeWord[5]==3) {
              if (codeWord[6]==1) {
                decodeWord.push("Q")
                symbolsToCharacter();
              }
              if (codeWord[6]==2) {
                decodeWord.push("Z")
                symbolsToCharacter();
              }
              if (codeWord[6]==3) {
                symbolsToCharacter();
              }
            }
          }
        }
      }
    }
  }
}




function drawDot(xPos,yPos){
  fill(0)
  stroke(255)
  ellipse(xPos,yPos,20,20)

}

function drawDash(xPos,yPos){
  fill(255)
  stroke(0)
  ellipse(xPos,yPos,20,20)

}

function drawDouble(xPos,yPos){
  fill(255)
  stroke(0)
  arc(xPos,yPos, 20, 20, 0, HALF_PI)
  arc(xPos,yPos, 20, 20, PI, PI + HALF_PI)
  fill(0)
  stroke(255)
  arc(xPos,yPos, 20, 20, HALF_PI, PI)
  arc(xPos,yPos, 20, 20, PI + HALF_PI, TWO_PI)

}

function printSymbols(){
  strokeWeight(2)
  for(m=codeWord.length-1;m>=0;m--){

    if(transitioning){
      if(millis()-endTime>0){
        offsetSymbols=0
        offsetCharacters = 0
        transitioning=false
        clearArray()
      }else{
        offsetSymbols = easeInOutCubic(millis()-startTime,0,transitionArray[m],300)
      }

    }


    if(codeWord[m]==1){
      drawDot(offsetSymbols+(width/2)+(m+1)*24,height/2)
    }else if(codeWord[m]==2){
      drawDash(offsetSymbols+(width/2)+(m+1)*24,height/2)
    }else if(codeWord[m]==3){
      drawDouble(offsetSymbols+(width/2)+(m+1)*24,height/2)
    }


  }
}

function printCharacters(){
  fill(0)
  noStroke()
  if(transitioning){
    offsetCharacters = easeInOutCubic(millis()-startTime,0,-24,300)
    for(m=decodeWord.length-2;m>=0;m--){
      text(decodeWord[m],offsetCharacters+(width/2)-((decodeWord.length)-(m+1))*24,height/2)
    }
  }else{
    for(m=decodeWord.length-1;m>=0;m--){
      text(decodeWord[m],offsetCharacters+(width/2)-((decodeWord.length)-m)*24,height/2)
    }
  }

}

//boolean for movement of symbols into letters
var transitioning = false
var startTime
var endTime

//array which stores the distance to move for each symbol
var transitionArray = []

//function initiates transition from symbols to characters. Ease is handled in the printSymbols() function
function symbolsToCharacter(){
  transitioning = true
  startTime = millis()
  endTime = millis()+300

  for(n=0;n<codeWord.length;n++){
    transitionArray.push(-(n+2)*24)
  }

}

function clearArray(){
  codeWord.splice(0,codeWord.length)
  transitionArray.splice(0,transitionArray.length)
}






//easing; t = current time, b = start position, c = distance to move, d = duration of move
function easeInOutCubic(t,b,c,d){
    if((t/=d/2)<1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
}




