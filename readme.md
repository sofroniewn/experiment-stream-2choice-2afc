# experiment-stream-2choice-2afc
Through stream for running a 2AFC experiment

```
npm install experiment-stream-2choice-2afc
```

This module returns a through stream that compares the button press to led state and updates the next trial. Useful for running experiments using device-stream-2choice modules.


## Usage
```js
var experiment = require('experiment-stream-2choice-2afc')
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
```

## API

#### var expt = experiment.createStream()
Create a new through stream that reads and write to a `device-stream-2choice` duplex stream. It compares the current button press and led state. If they match it increments your score by one, if the don't it decrements your score by one. After each button press the next LED to turn on is chosen randomly.

## Licence
MIT