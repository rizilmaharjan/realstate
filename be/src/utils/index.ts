export const generateUsername = (name: string)=>{
    return name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString()
}

export const generatePassword = ()=> Math.random().toString(36).slice(-8)