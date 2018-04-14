'use strict';
var Alexa = require('alexa-sdk');

var urls =
[
  "https://s3-ap-northeast-1.amazonaws.com/yukkymusic/yukky/shatiku-yukky-.mp3"
  ,"https://s3-ap-northeast-1.amazonaws.com/yukkymusic/yukky/Mizerable-PIANOver-.mp3"
  ,"https://s3-ap-northeast-1.amazonaws.com/yukkymusic/yukky/youranka-LULLING-PIANOver-.mp3"
]

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = process.env.ALEXA_APPLICATION_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
  // 再生開始時
  'PlaybackStarted':  function () {
    console.log('play back start');
    this.emit(':responseReady');
  },
  // 再生終了時
  'PlaybackFinished':  function () {
    console.log('play back finish');
    this.emit(':responseReady');
  },
  // 再生停止時
  'PlaybackStopped':  function () {
    console.log('play back stop');
    this.emit(':responseReady');
  },
  // 再生終了が近い時
  'PlaybackNearlyFinished':  function () {
    console.log('play back nearly');
    this.emit(':responseReady');
  },
  // 再生失敗時
  'PlaybackFailed':  function () {
    console.log('play back failed');
    this.emit(':responseReady');
  },
  'AMAZON.PauseIntent': function () {
    console.log('pause');
    this.response.speak(text).audioPlayerStop();
    this.emit(':responseReady');
  },
  'AMAZON.ResumeIntent': function () {
    console.log('resume');
    var factIndex = Math.floor(Math.random() * urls.length);
    var url = urls[factIndex];
    this.response.audioPlayerPlay('REPLACE_ALL', url, url, null, 0);
    this.emit(':responseReady');
  },'PlayIntent': function() {
    const output = "ゆっきぃの曲を流します。";
    var factIndex = Math.floor(Math.random() * urls.length);
    var url = urls[factIndex];
    this.response.speak(output).audioPlayerPlay('REPLACE_ALL', url, url, null, 0);
    this.emit(':responseReady');
  }
};
