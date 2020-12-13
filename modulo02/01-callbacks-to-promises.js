/*
vamos refatorar todo nosso código para usar promises no lugar de callbacks
*/
function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            return resolve({
                id: 1,
                nome: 'Tony Stark',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null,{
            telefone: '1125444',
            ddd: '84'
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null,{
            endereco: 'Rua Zero, B. UM',
        })
    }, 3000);
}

obterUsuario(function resolverUsuario(error, usuario) {
    //null, valor vazio "" ou 0 === false
    if(error) {
        console.error('Deu ruim demais, usuario!', error)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1) {
            console.error('Deu ruim demais, Telefone!', error1)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
            if(error2) {
                console.error('Deu ruim demais, endereco!', error2)
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereço: ${endereco.endereco}
                Telefone: (${telefone.ddd}) ${telefone.telefone},
            `)
        })
    })
})