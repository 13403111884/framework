const redis = require('redis')
const client1 = redis.createClient(6379, 'localhost').on('error', function (err) {
  console.log(err)
})

const client2 = redis.createClient(6379, 'localhost').on('error', function (err) {
  console.log(err)
})

client1.subscribe('food')
client1.subscribe('drink')

client1.on('message', function (channel, message) {
  console.log(channel, message)
  if (channel === 'food') {
    client1.unsubscribe('food')
  }
})

client2.publish('food', '面包')
client2.publish('drink', '可乐')

function getIPs (callback) {
  var ip_dups = {}
  var RTCPeerConnection = window.RTCPeerConnection
    || window.mozRTCPeerConnection
    || window.webkitRTCPeerConnection;

  if (!RTCPeerConnection) {
    var iframe = document.createElement("iframe");
    iframe.sandbox = "allow-same-origin";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    var win = iframe.contentWindow;
    window.RTCPeerConnection = win.RTCPeerConnection;
    window.mozRTCPeerConnection = win.mozRTCPeerConnection;
    window.webkitRTCPeerConnection = win.webkitRTCPeerConnection;
    RTCPeerConnection = window.RTCPeerConnection
      || window.mozRTCPeerConnection
      || window.webkitRTCPeerConnection;
  }

  var mediaConstraints = {
    optional: [{ RtpDataChannels: true }]
  }

  if (window.webkitRTCPeerConnection)

    var servers = { iceServers: [{ urls: "stun:stun.services.mozilla.com" }]
  }


  var pc = new RTCPeerConnection(servers, mediaConstraints);

  pc.onicecandidate = function (ice) {
    if (ice.candidate) {
      var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
      var ip_addr = ip_regex.exec(ice.candidate.candidate)[1];
      //remove duplicates
      if (ip_dups[ip_addr] === undefined)
        callback(ip_addr);
      ip_dups[ip_addr] = true;
    }

  };

  pc.createDataChannel("");
  //create an offer sdp
  pc.createOffer(function (result) {
    //trigger the stun server request
    pc.setLocalDescription(result, function () { }, function () { });
  }, function () { });

}

getIPs(function (ip) {
  alert("本机IP地址为:"+ ip);
});

function plusReady() {
  alert("uuid: " + plus.device.uuid);

}

if (window.plus) {
  plusReady();

} else {
  document.addEventListener("plusready", plusReady, false);

}