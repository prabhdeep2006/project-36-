//Create variables here
var dog;
var happyDog;
var database;
var foodS=0;
var foodStock; 
var dog1; 
var addFood,feedFood;
var fedTime,lastFed; 
var foodObj; 
var wr,lv,gr,br; 
var changeState,readState; 
var gameState="Hungry"; 

function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
  wr = loadImage("images/Wash Room.png"); 
  gr = loadImage("images/Garden.png"); 
  lv = loadImage("images/Living Room.png"); 
  br = loadImage("images/Bed Room.png"); 
}

function setup() {
	createCanvas(500, 500);
   dog1 = createSprite(250,300);
   dog1.addImage(dog);
   //dog1.addImage(happyDog);
   dog1.scale=0.2;
  addFood = createButton("add the food"); 
  feedFood = createButton("feed the food"); 
  addFood.position(100,100); 
  addFood.mousePressed(foodAdd);
  feedFood.mousePressed(feedDog); 
  feedFood.position(200,100);
   foodObj = new Food(200,200); 
 
  database = firebase.database(); 
  foodStock = database.ref('Food'); 
  foodStock.on("value",readStock); 

  readState = database.ref('gameState'); 
  readState.on("value", function(data){
    gameState = data.val(); 
  })
}


function draw() { 
  background(46,139,87); 
  //foodObj.display(); 

  fedTime = database.ref('FeedTime'); 
  fedTime.on("value",function(data){
    lastFed = data.val(); 
  })

  fill(255,255,254);
  textSize(15); 

  currenttime = hour(); 

  if(gameState!="Hungry"){
    feedFood.hide(); 
    addFood.hide(); 
    dog1.remove(); 
  }
  else{
    feedFood.show(); 
    addFood.show(); 
    dog1.addImage(dog); 
  }

  if(currenttime == (lastFed+1)){
    foodObj.updateGameState("playing");
    foodObj.garden(); 
  }
  else if(currenttime ==(lastFed+2)){
    foodObj.updateGameState("sleeping"); 
    foodObj.bedroom(); 
  }
  else if(currenttime > (lastFed+2) && currenttime < (lastFed+4)){
    foodObj.updateGameState("bathroom"); 
    foodObj.bathroom(); 
  }
  else{
    foodObj.updateGameState("Hungry"); 
    foodObj.display(); 
  }

  
    drawSprites();
    fill("black");
    textSize(20); 
    text("Feed the dog to make it happy",100,100); 
    text("No.of foodstocks available " + foodS,100,150); 
  
  
  }
  

 
  //add styles here
 
function readStock(data){
  foodS=data.val(); 
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
} 
function foodAdd(){
  foodS++; 
  foodObj.updateFoodStock(foodS); 
  database.ref('/').update({
    Food:foodS

  })
}
function feedDog(){
  dog1.addImage(happyDog)
foodS--; 
  foodObj.updateFoodStock(foodS); 
  database.ref('/').update({
    Food:foodS, 
    FeedTime:hour()

  })

}