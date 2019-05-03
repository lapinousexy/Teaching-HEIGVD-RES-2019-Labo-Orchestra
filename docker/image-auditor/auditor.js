var dgram = require('dgram');
var moment = require('moment');
var net = require('net');

var protocol = require('./musician-protocol');

var socketMusicUDP = dgram.createSocket('udp4');

var socketTCP = net.createServer(function(socket) {
    var sock = socket;
    socket.write('Test\r\n');

});

socketTCP.listen(1337, "172.17.0.3");

function isDuplicateUUID(array, uuid){
    var isPresent = false;
    var returnElement;

    array.forEach(function(element){
        if(element.uuid == uuid){
            isPresent = true;
            returnElement = element;
        }
    });

    if(isPresent){
        return returnElement;
    }else{
        return null;
    }
}

function Auditor(){
    this.musicians = [];
    
    // Source : https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
    var self = this;

    socketMusicUDP.bind(protocol.UDP_PORT, function() {
        socketMusicUDP.addMembership(protocol.GROUP_IP);
        console.log("Joining multicast group");
    });

    socketMusicUDP.on('listening', () => {
        const address = socketMusicUDP.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });

    socketMusicUDP.on('message', function(msg, source) {
        var message = JSON.parse(msg.toString());

        element = isDuplicateUUID(self.musicians, message.uuid);

        if(element == null){
            self.musicians.push(message);
        }else{
            self.musicians[self.musicians.indexOf(element)].date = new Date();
        }
    });

    socketTCP.on('connection', function(socket){
        console.log("LAAAAAAAAAAAA");

        socket.on('data', function(data){
            console.log("LAAAAAAAAAAAA2");
    
            socket.write('Test\r\n');
        });
    });


    Auditor.prototype.verifyTimestampOfMusician = function(){
        var array = this.musicians;

        this.musicians.forEach(function(element){
            if((moment().diff(element.date, 'seconds')) > 5){
                array.splice(array.indexOf(element), 1);
            }
        });

        console.log(this.musicians);
    };

    setInterval(this.verifyTimestampOfMusician.bind(this), 1000);
}

var test = new Auditor();
