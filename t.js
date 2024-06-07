

function makeUser(validatrionfunc){
 return function user(params) {
    let name = params.name
    
    return Object.freeze({
        getName: () => name,
        isValid: () => validatrionfunc(params),
        updateName: (str) => name = str
    })
 }
}



// 


const User = makeUser(validationEcx)
const Luca = User({name:'guy'})
const name = Luca.getName()
console.log(name)
Luca.updateName('luca')
console.log(Luca.getName())


function validationEcx (subject) {
    return true
}

function validationEcx_2 (subject) {
    return false
}
