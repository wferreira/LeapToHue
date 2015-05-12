var Cylon = require('cylon');

Cylon.robot({
  connections: {
    hue: { adaptor: 'hue', host: '192.168.254.121', username: 'newdeveloper' },
    leapmotion: { adaptor: 'leapmotion' }
  },

  devices: {
    bridge: { driver: 'hue-bridge'},
    leapmotion: { driver: 'leapmotion', connection: 'leapmotion' },
    bulb1: { driver: 'hue-light', lightId: 1 },
    bulb2: { driver: 'hue-light', lightId: 2 }
  },

  work: function(my) {
    var COMMAND_TIMER_MS = 100;
    var timerRunning = 0;

    var xMin = 0;
    var xMax = 200;
    var yMin = 150;
    var yMax = 250;
    var zMin = -100;
    var zMax = 100;

    //x -> between 0 and 200 for right hand
    //y -> between 150 and 250
    //z -> between -100 and 100

    function xyzToRGB(value, axisMin, axisMax){
      var result = Math.floor(((value-axisMin)*255/(axisMax-axisMin)));
      if (result>255) return 255;
      if (result<0) return 0;
      return result;
    }
    function updateColor(bulb, x, y, z){
      var r = xyzToRGB(x, xMin, xMax);
      var g = xyzToRGB(y, yMin, yMax);
      var b = xyzToRGB(z, zMin, zMax);

      console.log("R:"+r+"-G:"+g+"-B:"+b);

      bulb.rgb(r, g, b);
    }

    my.leapmotion.on('gesture', function(gesture) {

      if (gesture.type="keyTap"){
        //my.bulb1.toggle();
        //my.bulb2.toggle();
      }

    });
    my.leapmotion.on('hand', function(hand) {

      if (!timerRunning){
        timerRunning = 1;
        if(hand.type == "right"){
          updateColor(my.bulb1, hand.palmX, hand.palmY, hand.palmZ);
          updateColor(my.bulb2, hand.palmX, hand.palmY, hand.palmZ);
        }

        setTimeout(function(){timerRunning=0;}, COMMAND_TIMER_MS);
      }
      
    });
  }
}).start();