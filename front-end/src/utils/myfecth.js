const myfetch = {} // Objeto vazio

//Lê o endereço do back-end a partir do arquivo .env.local

const baseUrl = import.meta.env.VITE_BACKEND_URI

function defaultOptions(body = null, method = 'GET'){
    const options = {
        method,      
        headers:{"Content-type": "application/json; charset=UTF-8"},
        credentials: 'include'
    }
    if(body) options.body = JSON.stringify(body)

    //Verifica se existe um token gravado no localStorage e o inclui
    // nos headers, nesse caso
    const token = window.localStorage.getItem('token')

    if(token) options.headers.Authentication = `Bearer ${token}`
    console.log(options)
    
    return options
}
function getErrorDescription(response){
    switch(response.status){
        case 401: //Unauthorized
            return'ERRO: usuário ou senha incorretos'
        default:
            return `ERRO: HTTP ${response.status}: ${response.statusText}`
    }
}
myfetch.post = async function(path, body){
    const response = await fetch(baseUrl + path, defaultOptions(body, 'POST'))
    console.log(body)
    if(response.ok) return true
    else throw new Error(getErrorDescription(response))
}
myfetch.get = async function(path){
    const response = await fetch(baseUrl + path, defaultOptions())
    console.log(response)
    
    if(response.ok) return  response.json()
    
    else throw new Error(getErrorDescription(response))
}
myfetch.delete = async function(path){
    const response = await fetch(baseUrl + path, defaultOptions(null, 'DELETE'))
    console.log(response)
    
    if(response.ok) return  true //não retorna json()
    
    else throw new Error(getErrorDescription(response))
}
myfetch.put = async function(path, body){
    const response = await fetch(baseUrl + path, defaultOptions(body, 'PUT'))
    console.log(body)
    if(response.ok) return true
    else throw new Error(getErrorDescription(response))
}

export default myfetch