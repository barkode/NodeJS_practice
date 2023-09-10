const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
try {
    
 const [type, token] =  req.headers.authorization.split(" ")
if(type === "Bearer" && token){
    const decode = jwt.verify(token, "cat")
    req.user = decode
    next()
    
}
} catch (error) {
   res.status(401).json({code: 401, error:error.message}) 
  
}
//отримуємо токен
//розшифровуємо токен
//пердаємо інфу з токена далі
}

// {
//     friends: [ 'maria', 'kocty', 'vetal' ],
//     id: '64e9e9d8a8d7b8e50be63264',
//     iat: 1693055055,
//     exp: 1693083855
//   }