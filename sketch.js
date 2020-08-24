//Create variables here
var dog, dogImg,happyDogImg, database, foodS, foodStock;
var feedBtn, addFoodBtn,fedTime, lastFed,foodObj // VP2

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")

  
}

function setup() {
  createCanvas(600, 500);
  database = firebase.database();
  dog = createSprite(250,250)
  dog.addImage("dog",dogImg)
  dog.addImage("doghappy",happyDogImg)
  dog.scale = 0.2;
  getFoodStock();
  /* VP1
  database.ref("Food").on("value",function(data){
    foodS = data.val();
  })*/

  //VP2 start
  feedBtn = createButton("Feed Dog")
  feedBtn.position(700,75)
  addFoodBtn = createButton("Add Food")
  addFoodBtn.position(800,75)
  foodObj = new Food();
  //VP2 END
}


function draw() {  

  background(46, 139, 87);
  fill("red")
  stroke("white")
  text("Press UP ARROW TO FEED DOG", 150, 50);
  
  /* PART of VP1
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
  }
  if(keyWentUp(UP_ARROW)){
    dog.changeImage("dog",dogImg)
  }*/

  // VP2
  foodObj.foodStock = foodS;
  foodObj.display();
  database.ref('FeedTime').on("value",function(data){
    lastFed = data.val();
    showTime(lastFed);
  });
  addFoodBtn.mousePressed(function(){
    getFoodStock();
    addFood(foodS);
  });
  feedBtn.mousePressed(function(){
    getFoodStock();
    feedDog();
  })
  //VP2 end
  drawSprites();
  

}
/* Part of VP1
function writeStock(food){
  
  if(food>0){
    food--;
    dog.changeImage("doghappy",happyDogImg)
  }
  
  else
  food = 0;

  database.ref('/').update({
    Food:food
  })
}*/

function showTime(time){
if(time>=12){
  text("LastFeed :"+time%12 +"PM",350,300)
}
else if(time===0){
  text("LastFeed : 12 AM",350,300)
}else{
  text("LastFeed :"+time +"PM",350,300)
}
}

function addFood(f){
  f++;
  database.ref('/').update({
    Food : f
  })
}
function getFoodStock(){
  database.ref("Food").on("value",function(data){
    foodS = data.val();
  })
}
function feedDog(){
  foodS--
  database.ref("/").update({
    FeedTime:hour(),
    Food:foodS
  })
}