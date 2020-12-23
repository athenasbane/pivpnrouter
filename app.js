const { exec } = require('child_process');
const remote = require('electron').remote;
const $ = require('jquery');
const connected = 0;
$('#connected-clients').text(connected.toString());

function getData() {
  exec('sudo iw dev wlan0 station dump | grep Station', (err, stdout, stderr) => {
    let connections = 0;
    if (err) {
      connections = 0;
      $('#connected-clients').text(connections);
      $('.box1').removeClass('connection pulse');
    } else {
      connections = stdout.trim().split('\n');
      console.log(connections)
      if (connections.length > 0) {
        $('.box1').addClass('connection pulse');
      } else {
        $('.box1').removeClass('connection pulse');
      }
    }
    $('#connected-clients').text(connections.length);
  });
}

function modal() {
  $('#modal').toggleClass('closed')
}

function restart() {
  exec('sudo reboot now', (err) => {
    console.log(err);
  });
}

function shutdown() {
  exec('sudo shutdown now', (err) => {
    console.log(err);
  });
}

function closeApp() {
  window.close();
}

function modalBackground() {
  $('#modal').toggleClass('closed')
}


setInterval(getData, 1000)
