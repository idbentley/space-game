var keyEventMonitor = (function(undefined){
    var currentlyDepressed = false;
    var keyDepressed;
    var actions = {LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4};
    function charToAction(char){
          switch(char){
            case 'w':
            case 'W':
              return actions.UP;
            case 'a':
            case 'A':
              return actions.LEFT;
            case 's':
            case 'S':
              return actions.DOWN;
            case 'd':
            case 'D':
              return actions.RIGHT;
          }
  
    }
    function getCurrentAction(){
      if(currentlyDepressed){
        return keyDepressed;
      }else{
        return undefined;
      }
    }
  
    $("body").on("keydown", function(event){
      var charCode = event.charCode;
      var char = String.fromCharCode(charCode);
      if(!currentlyDepressed){
        if(keyDepressed !== char){
          keyDepressed = char;
        }
      }
      if(currentlyDepressed){
        console.log("still down");
      }
      currentlyDepressed = true;
    });
    $("body").on("keyup", function(event){
      console.log("keyup", event);
      currentlyDepressed = false;
    });
    return {
      getCurrentAction: getCurrentAction
    };
  })();
