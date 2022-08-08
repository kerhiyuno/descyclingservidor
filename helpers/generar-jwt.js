const jwt = require('jsonwebtoken');


const generarJWT = (uid = '', tipo) => {

    return new Promise( (resolve, reject) => {
        const payload = {uid};
        let key;
        let tiempo;
        if (tipo === 'access'){
            key = process.env.SECRETORPRIVATEKEY;
            tiempo = '1h'
            console.log(key);
        }
        else {
            key = process.env.REFRESHRPRIVATEKEY;
            tiempo = '5h'
            console.log(key);
        }
        jwt.sign(payload, key , {
            expiresIn: tiempo
        },(err,token) =>{ 
            if(err){
                console.log(err);
                reject('no se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    generarJWT
}