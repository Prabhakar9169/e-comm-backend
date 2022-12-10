const replaceComparsionString = (objString)=>{
    const obj = JSON.parse(objString)
    const processString = (obj)=>{
     let keys = Object.keys(obj)
     for(let i=0; i<keys.length; i++){
        const newKey = keys[i].replace(/^(gte|gt|lte|lt)$/, str=>`$${str}`)
        if(keys[i]!= newKey){
            obj[newKey] = obj[keys[i]]
            delete obj[keys[i]]
        }
        if(obj[newKey]?.constructor === Object){
            processString(obj[newKey])
        }
     }
    }
    processString(obj)
    return JSON.stringify(obj)
}



const filterResponse = (obj , ...responseToSend)=>{
    const result = {}
    responseToSend.forEach((item)=>{
        result[item] = obj[item]
    })
    return result
}

export{replaceComparsionString , filterResponse}