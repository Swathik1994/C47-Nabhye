var bird,pillar1,pillar2,back1,back2;
var birdImage,pillar1Image,pillar2Image,back1Image,back2Image,pillar3,pillar3Image,pillar4,pillar4Image; 
var pillarsGroup,pillars2Group;
var star,starImage,starGroup,starSound;
var endSound;
//var score;
var score = 0;
var Play = 1;
var End = 0;
var gameState = Play;
localStorage["HighScore"]=0;

function preload(){
 birdImage = loadImage("sprites/th.3.jpg");
 pillar1Image = loadImage("sprites/pillars1.png");
 pillar2Image = loadImage("sprites/pillars2.png");
 pillar3Image = loadImage("sprites/pillars3.png");
 pillar4Image = loadImage("sprites/pillars4.jpg");
 back1Image = loadImage("sprites/background.png");
 back2Image = loadImage("sprites/winter_night.png");
 starImage = loadImage("sprites/Yellow_star_small.png"); 
 starSound = loadSound("mixkit-bonus-earned-in-video-game-2058.wav");
 endSound = loadSound ("Game-end-sound-effect.mp3");
}

function setup() {
  createCanvas(800,400);

  back1 = createSprite(10,10,20,20);
  back1.addImage(back1Image);
  back1.velocityX = -1;


 bird = createSprite(200,200,20,30);
 scale(0.2);
 bird.addImage(birdImage);
 
 /*pillar1 = createSprite (400,50,5,2);
 scale(0.2);
 pillar1.addImage(pillar1Image);
 pillar1.velocityX = -2;*/

 bird.setCollider("circle",0,0,35);
 bird.debug = false;

 pillarsGroup = new Group();
 pillars2Group = new Group();
 starGroup = new Group();

}

function draw() {
  //background(0);
 
  console.log(back1.x);

  if(gameState === Play){
    score = score+ Math.round(World.frameRate/60);
    
  if (back1.x < 0 ){
        back1.x = back1.width/4;
  }

   if(keyDown("space")){
       bird.velocityY = -4;
   }
   bird.velocityY = bird.velocityY + 0.3;
   
  
    //bird.display();
    spawnPillars();
    spawnPillars1();
    spawnStar();

    if(frameCount %190 ===0){
      fill("red");
      textSize = 70;
      text("Great Going :)",540,30);
      back2 = createSprite(400,200,120,70);
      back2.addImage(back2Image);
      back2.velocityX = -1;
     // pillarsGroup.depth = back2.depth;
      //back2.depth+= 1;
      back2.depth = bird.depth;
      bird.depth+= 1;
      console.log(bird.depth);
      console.log(back2.depth);
  
    }

    if(pillarsGroup.isTouching(bird)||pillars2Group.isTouching(bird)||bird.y>400||bird.y<0){
      gameState = End;
      endSound.play();

   }
   if(starGroup.isTouching(bird)){
     starSound.play();
   }
  }
  else if(gameState === End){
    bird.velocityY = 0; 
    back1.velocityX = 0;
    fill("red");
    text("You Lose",380,200);
    text("Press R to restart",360,230);
    
    
   
    pillarsGroup.setVelocityXEach(0);
    pillars2Group.setVelocityXEach(0);

   

  }

  if(keyDown("r")&&gameState === End){ 
    Restart();
   }

  drawSprites();
  fill("red");
  textSize = 20;
  text("Score: "+ score,450,30);
}

function spawnPillars(){
  if (frameCount % 37 === 0){
    var pillar = createSprite(800,10,5,2);
    //pillar.velocityX = -2;
  
     var pillar1 = Math.round(random(1,20));      //1,7
    // switch(rand) {
       pillar.addImage(pillar1Image);

               
       pillar.addImage(pillar1Image);
       
               
       /*if(score > 100){
        pillar.velocityX = -8;
      }*/
      pillar.velocityX = -(4 + 3* score/100)
      // case 3: pillar.addImage(pillar3Image);
        //       break;
       //case 4: pillar.addImage(pillar4Image);
         //      break;

      
    // }
     
     pillar.scale = 1;
     pillar.lifetime = 400;
     pillarsGroup.add(pillar);
     pillar.debug = false;
     pillar.setCollider("rectangle",0,0,70,350);
     
}
}
              
    

     function spawnPillars1(){
        if (frameCount % 40 === 0){
          var pillar2 = createSprite(800,550,5,2);
         // pillar2.velocityX = -2;
          
           var rand = Math.round(random(1,8));     //1,8
         //  switch(rand) {
              pillar2.addImage(pillar2Image);
                     
              pillar2.addImage(pillar2Image);
                     
             // if(score > 100){
               // pillar2.velocityX = -8;
              //}
              pillar2.velocityX = -(4 + 3* score/100)
           //}
                    
           pillar2.scale = 1;
           pillar2.lifetime = 400;
           pillars2Group.add(pillar2);
           pillar2.debug = false;
           pillar2Image.visible = true;
           pillar2.setCollider("rectangle",0,0,70,350);
        
}

}
function spawnStar(){
  if(frameCount %60 === 0){
    var star = createSprite(400,200,20,30);
     
    star.y = Math.round(random(100,250));
   // star.velocityX
    star.addImage(starImage);

    star.velocityX = -(5 +1*score/100);
    
    starGroup.add(star);
    star.lifetime = 400;
  }
}

function Restart(){ 
  
gameState = Play; 

if(localStorage["HighScore"]<score){ 
  localStorage["HighScore"] = score; 
}

score = 0; 
pillarsGroup.destroyEach();
pillars2Group.destroyEach();
}