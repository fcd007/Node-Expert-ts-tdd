/*
* 1- obter usuário
* 2 - obter número telefone de um usuário a partir do ID
* 3 - Obter o endereço pelo ID
*/

function obterUsuario(callback) {
    setTimeout(function() {
        return callback(null,{
            id: 1,
            nome: 'Tony Stark',
            dataNascimento: new Date()
        })
    }, 1000)
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

function resolverUsuario(error, usuario) {
    console.log('usuario', usuario)
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