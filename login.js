const sha256 = require('js-sha256');

let listAuths = [];

exports.createAuth = createAuth = () => {
    let x = Math.floor(Math.random() * 2147483648).toString();
    let digest = sha256(x);
    listAuths.push(digest);
    return digest;
}

exports.validateAuth = validateAuth = (auth) => {
    console.log(listAuths.find(element => element == auth));
    return listAuths.find(element => element == auth);
}