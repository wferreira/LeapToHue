var Cylon = require('cylon');

Cylon.robot({
  connections: {
    hue: { adaptor: 'hue', host: '192.168.254.121', username: 'newdeveloper' }
  },

  devices: {
    bridge: { driver: 'hue-bridge'}
  },

  work: function(my) {
    my.bridge.getFullState(function(err, config) {
        if (err) {
          console.log(err);
        } else {
          console.log(config);
        }
      });
  }
}).start();