var dgram = require('dgram');
var uuid = require('uuid');

var protocol = require('./musician-protocol');

var instrumentArray = [["piano","ti-ta-ti"],["trumpet","pouet"],["flute","trulu"],["violin","gzi-gzi"],["drum","bum-boum"]];
var instrumentMap = new Map(instrumentArray);
var socketMusicUDP = dgram.createSocket('udp4');
var socketAuditorUDP = dgram.createSocket('udp4');

// This was inspired by Thermometer example + https://nodejs.org/api/dgram.html
function Musician(instrument){
    this.uuid = uuid.v4();
    this.instrument = instrument;
    this.date = new Date();

    auditorPayload = new Buffer(JSON.stringify(this));

    socketAuditorUDP.on("message", function(){
        socketAuditorUDP.send(auditorPayload, 0, auditorPayload.length, 40001, protocol.GROUP_IP, function() {
            
        });
    });

    Musician.prototype.playInstrument = function(){
        this.date = new Date();

        soundMessage = new Buffer(JSON.stringify(this));

        socketMusicUDP.send(soundMessage,0,soundMessage.length, protocol.UDP_PORT, protocol.GROUP_IP, function() {
        });

        auditorPayload = new Buffer(JSON.stringify(this));
    };

    setInterval(this.playInstrument.bind(this), protocol.INTERVAL);
}

function Instrument(type){
    this.instrument = type;
    this.sound = instrumentMap.get(type);
}

var instrumentArg = process.argv[2];

if(instrumentMap.has(instrumentArg)){
    var instru = new Instrument(instrumentArg);
    var musi = new Musician(instru);
}else{
    console.log("Error, instrument doesn't exist");
}