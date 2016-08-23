var experiment = require('./')
var device = require('device-stream-2choice-stdin').createStream()

function updateLED () {
  var blueLED = Math.random() < 0.5
  var redLED = !blueLED
  return {
    blueLED: blueLED,
    redLED: redLED
  }
}

var initial = updateLED()
var expt = experiment.createStream(updateLED, initial)
device.write(initial)

var results = device.pipe(expt)
results.on('data', console.log)
results.pipe(device)