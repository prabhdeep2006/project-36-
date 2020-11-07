class Food {
    constructor(){
        this.image = loadImage("images/Milk.png"); 
        this.foodStock = 0; 
        this.lastFed = 0; 
        }
        getFoodStock(){ 
            database.ref('Food').on("value",(data)=>{
                this.foodStock = data.val(); 
            })
        }
           updateFoodStock(foodStock){ 
               this.foodStock = foodStock; 

           }
           updateGameState(gameState){ 
               database.ref('/').update({gameState:gameState }); 
           }
           bedroom(){ 
            background(br,550,500); 
        
           }
           washroom(){ 
            background(wr,550,500); 
           }
           garden(){ 
            background(gr,550,500); 
           }
        display(){ 
            var x=80,y=100; 

            imageMode(CENTER); 
            image(this.image,720,220,70,70); 

            if(lastFed>=12){ 
                text("Last feed " + lastFed%12 + "PM",350,30); 
              }
                else if(lastFed===0){
                  text("last feed 12 AM ",350,30); 
                }
                else{
                 text("Last feed "  + lastFed + "AM",350,30); 
                }
        
    
            if(foodStock !=0){ 
                for(var i=0;i<this.foodStock;i++){
                   if(i%10===0) {
                       x=80; 
                       y=y+50; 
                   }
                   image(this.image,x,y,50,50); 
                   x=x+30; 
                   
                }
            }
        }
    } 
    
    
    
    
  

    

