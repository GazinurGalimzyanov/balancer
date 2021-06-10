function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
const rebalance=(params, direction)=>{
	if(direction==="none")return params
	shuffle(params)
	let changed = 0
	const modify=(param)=>{
		if (changed>0)return param
		let value = param.value
		const idx = param.values.indexOf(value)
		if(direction==="positive" && param.relation === "negative" && idx>0){
			param.value=param.values[idx-1]
			changed+=1
		}
		if(direction==="positive" && param.relation === "positive" && idx<param.values.length-1){
			param.value=param.values[idx+1]
			changed+=1
		}
		if(direction==="negative" && param.relation === "negative" && idx<param.values.length-1){
			param.value=param.values[idx+1]
			changed+=1
		}
		if(direction==="negative" && param.relation === "positive" && idx>0){
			param.value=param.values[idx-1]
			changed+=1
		}
		return param
	}
	return params.map(modify)

}

module.exports = {rebalance}