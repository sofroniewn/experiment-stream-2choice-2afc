var through = require('through2')

module.exports = {
  createStream: function (update, initial) {
    var writeData = initial
    var score = 0
    var prevTime = Date.now()
    
    return through.obj(function (data, enc, callback) {
      var curTime = Date.now()
      var deltaTime = curTime - prevTime
      prevTime = curTime
      var correct = writeData.blueLED === data.blueButton && writeData.redLED === data.redButton
      if (correct) score++
      else score--
      writeData = update()
      callback(null, {
        blueButton: data.blueButton,
        redButton: data.redButton,
        blueLED: writeData.blueLED,
        redLED: writeData.redLED,
        correct: correct,
        score: score,
        time: deltaTime
      })
    })
  }
}
