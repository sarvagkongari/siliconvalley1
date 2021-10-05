var jack,jackImg;
var beanStalk;
var bgImg,beanstalkImg;
var eggImg,eggGroup;
var spikes,spikesImg
var gameState="start"
var jackleft,jackright;
var lives=3
var score=0
var branchImg,branchGroup;
var branch;
var egg;
var gameover;
var victory;
var bgmusic;
function preload(){
bgImg=loadImage("bg.jpg")
beanstalkImg=loadImage("beanstalkpic.png")
eggImg=loadImage("goldegg.png")
spikesImg=loadImage("spikes.jpg")
jackleft=loadImage("jack2.png")
jackright=loadImage("jack1.png")
branchImg=loadImage("branch.png")
gameover=loadImage("gameover.png")
victory=loadImage("victory.png")
bgmusic=loadSound("bensound-epic.mp3")
}

function setup(){
createCanvas(800,400);
beanstalk=createSprite(400,200,50,700);
beanstalk.addImage(beanstalkImg)
beanstalk.shapeColor="green";
beanstalk.velocityY=3
jack=createSprite(365,340,20,50);
jack.scale=0.3
jack.addImage("jackR",jackright)
jack.addImage("jackL",jackleft)
branchGroup=new Group();
eggGroup= new Group();
spikes=createSprite(400,430,800,10)
spikes.addImage(spikesImg)
spikes.width=800
}

function draw(){
if(gameState==="start"){
background("#000066")

text("click space to begin",350,70)
textSize(30)
fill("gold")
text("JACK AND THE BEANSTALK",200,200)
text("by STAR",550,320)
if(keyCode===32){
gameState="play"
}
}
if(gameState==="play"){
background("lightblue");
image(bgImg,-100,0,1000,400)
spikes.velocityY=-0.3
textSize(20)
bgmusic.play();
fill("red")
text("Lives "+lives,650,40)
text("Score "+ score,650,70)
text("watch for spikes under you",60,40)

if(beanstalk.y>250){
beanstalk.y=200
}
if(keyDown(UP_ARROW)){
jack.y-=3
}
if(keyDown(DOWN_ARROW)){
jack.y+=3
}
if(keyDown(RIGHT_ARROW)){
jack.x=420
jack.changeAnimation("jackL")
}
if(keyDown(LEFT_ARROW)){
jack.x=385
jack.changeAnimation("jackR")
}
branches();
goldenEgg();
if(branchGroup.isTouching(jack,branchCollision)){
branch.destroy()
}

if(eggGroup.isTouching(jack,eggCollision)){
   score+=1
   egg.destroy()
}

spikes.setCollider("rectangle",0,0,280,40)
if(spikes.isTouching(jack)){
gameState="lose"
}

camera.position.x=jack.x
text(mouseX+", "+mouseY,mouseX,mouseY)
drawSprites();
if(gameState==="win"){
   win();
}

if(gameState==="lose"){
   lose();
}
}
}

function branches(){
 if(frameCount%120===0){
    branch=createSprite(300,0,80,10)
    var position=[350,450]
    branch.x=random(position)
    branch.velocityY=2
    branch.addImage(branchImg)
    branch.scale=0.2
    
    branch.setCollider("rectangle",0,0,400,100)
    branchGroup.add(branch)
   }
}
function goldenEgg(){
   if(frameCount%60===0){
      egg=createSprite(200,0,10,10)
      egg.addImage(eggImg)
      egg.velocityY=random(1,4)
      egg.scale=0.05
      var position=[380,420]
      egg.x=random(position)
      eggGroup.add(egg)
   }
}
function branchCollision(branch,jack){
  lives-=1
  if(lives>=1){
     branch.destroy()
  } 
  if(lives<1){
     jack.destroy()
     gameState="lose"
  }
}

function eggCollision(egg,jack){
   if(score<10){
      egg.destroy()
   }
   if(score===10){
      gameState="win"
   }
}

function lose(){
 background("black")
 image(gameover,0,0,800,400)
}

function win (){
   background("light blue")
   image(victory,0,0,800,400)
}