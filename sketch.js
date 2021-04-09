//assing the global variables so that we can assess it in our functions
var gameState;
var PLAY = 1;
var END = 0
var levi;
var levi_running;
var obstacle;
var obstacleImage;
var FoodGroup;
var obstacleGroup;
var ground;
var score = 0;
var jungle;
var gameover;

function preload(){
  
  
  levi_running =loadAnimation("AOT_image/L1.jpg","AOT_image/L2.jpg","AOT_image/L3.png","AOT_image/L4.png","AOT_image/L5.png");
  
  l1Img = loadImage("AOT_image/T1.png");
  l2Img = loadImage("AOT_image/T2.jpg");
  l3Img = loadImage("AOT_image/T3.jpg");
  l4Img = loadImage("AOT_image/T4.jpg");
  l5Img = loadImage("AOT_image/T5.jpg");

  jungle_image = loadImage("AOT_image/bg.png");
  
  gameover_image = loadImage("AOT_image/gameOver.png");
}

function setup() {
createCanvas(800,800);
  
//creating levi
 levi = createSprite(80,340,20,20);
 levi.addAnimation("running", levi_running);  
 levi.scale=0.1;
 levi.setCollider("circle",0,0,levi.width / 3);  

  
//creating ground
ground=createSprite(200,350,800,20);
ground.visible = false;  
 
  
//creating obstacleGroup
obstacleGroup = createGroup();  
  
//setting gameState to play  
  gameState = PLAY;
//creating jungle
  jungle = createSprite(200,200,400,400);
  jungle.addImage(jungle_image);
  jungle.scale = 0.55;
  jungle.depth = -50;
  jungle.velocityX = -1;
  
  gameover = createSprite (200,200,100,100);
  gameover.addImage(gameover_image);
  gameover.visible = false;


}

function draw() {
  
background("white");
//adding ground 
  
//adding gravity 
levi.velocityY=levi.velocityY+0.5;
//making levi collid the ground  
levi.collide(ground); 

  
//destroying obstacle when levi is touching them
if (obstacleGroup.collide(levi)) {
    obstacleGroup.destroyEach();
      levi.scale = levi.scale + 0.025; 
    }
//making levi jump  
if(keyDown("space") && levi.y >= 300){
  levi.velocityY= -15;
  } 
  
  if(gameState === PLAY){
    play(); 
  }

if(obstacleGroup.isTouching(levi)){  
  levi.scale = levi.scale - 0.05;
  obstacleGroup.destroyEach();
}
  
if(levi.scale <= 0){
end();
gameState = END;  
levi.scale = 0;  
}

 if(jungle.x < 150){
 jungle.x = 250;
 }
 drawSprites();
textSize(25); 
fill("white");
text("survival Time:" + score,10,50); 
} 
 
function spawnObstacle(){
  
    if(World.frameCount%80===0){
      position = Math.round(random(1,2))
    
      obstacle = createSprite(400,200,20,20); 
    
      //console.log(position)
      if(position==1){
        obstacle.x = 400;
        obstacle.velocityX=-(7+score/4);
         
      }
      else {
        if(position==2){
          obstacle.x = 0;
          obstacle.velocityX=(7+score/4); 
      }
              
    }
    obstacle.scale = 0.2
    rand=Math.round(random(1,5));
    if(rand===1){
      obstacle.addImage(l1Img); 
    } else if (rand===2){
      obstacle.addImage(l2Img);
    }else if (rand===3){
      obstacle.addImage(l3Img);
    }else if(rand===4){
      obstacle.addImage(l4Img);
    }else{
      obstacle.addImage(l5Img);
    }    
       
   
    obstacle.y=Math.round(random(50,340));
    obstacle.setLifetime=100;
    obstacleGroup.add(obstacle);
    
     
   
  }
}

function play(){
score = Math.ceil(frameCount/frameRate());  
 spawnObstacle(); 
  
}

function end (){
  ground.velocityX=0; 
  obstacle.velocityX=0;
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
  levi.velocityY = 0;
  gameover.visible = true;
  jungle.velocityX = 0;
}
