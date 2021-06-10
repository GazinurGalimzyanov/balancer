const {prepare} = require('./machinations')
const {run} = require('./run')
const {rebalance} = require('./rebalance')
const fs = require('fs')

fs.readFile('./in.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    const input = JSON.parse(jsonString)
    let changed = true
    while(changed){
      prepare(input) 
      const result = run(input)
      let direction="none"
      if (result<input.lowerBound)direction=positive
      if (result>input.upperBound)direction=negative
      input.params=rebalance(input.params,direction)
      changed = (!direction==="none")
    }
    const out = input.params
    fs.writeFile('./out.json',JSON.stringify(out),(err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('data saved!');
})
})
