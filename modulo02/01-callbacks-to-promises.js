/*
vamos refatorar todo nosso código para usar promises no lugar de callbacks
*/
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    //problema => reject, resolve => tudo funcionou bem
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            // return reject (new Error('Deu ruim')) // teste de ordem chamadas
            return resolve({
                id: 1,
                nome: 'Tony Stark',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1125444',
                ddd: '84'
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null,{
            rua: 'Rua Bobos, B. UM',
            numero: 'zero - 000'
        })
    }, 2000);
}

//usando função obterUsuário
const usuarioPromise = obterUsuario()
//para manipular sucesso .then
//para manipular erros .cacth
usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    id: usuario.id,
                    Nome: usuario.nome
                },
                telefone: {
                    ddd: result.ddd,
                    celular: result.telefone
                }
            }
        })
        .then(function (resultado) {
            const endereco = obterEnderecoAsync(resultado.usuario.id)
            return endereco.then(function resolverEndereco(result) {
                return {
                    usuario: resultado.usuario,
                    telefone: resultado.telefone,
                    endereco: result
                }
            })
        })
    })
    .then(function(resultado) {
        console.log(`
            ID: ${resultado.usuario.id}
            Nome: ${resultado.usuario.Nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Celular: (${resultado.telefone.ddd}) ${resultado.telefone.celular}
        `)
    })
    .catch(function(error) {
        console.error('Deu ruim!', error)
    })

// obterUsuario(function resolverUsuario(error, usuario) {
//     //null, valor vazio "" ou 0 === false
//     if(error) {
//         console.error('Deu ruim demais, usuario!', error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
//         if(error1) {
//             console.error('Deu ruim demais, Telefone!', error1)
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
//             if(error2) {
//                 console.error('Deu ruim demais, endereco!', error2)
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereço: ${endereco.endereco}
//                 Telefone: (${telefone.ddd}) ${telefone.telefone},
//             `)
//         })
//     })
// })'