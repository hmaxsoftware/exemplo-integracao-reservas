function atualizarTiposApto() {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return ;

        const response = JSON.parse(this.responseText)
        if (this.status == 200 && response.success) {
            const tipos = response.list.map(item => {
                return {
                    id: item.id,
                    nome: item.nome,
                    mnemonico: item.mnemonico,
                    leitos: item.leitos
                }
            })
            updateTable('table-tipos-apto', tipos)
            toast('Dados atualizados com sucesso', 'success')
        } else {
            toast(response.msg || 'Falha ao atualizar dados', 'error')
            console.error({response: response})
        }
    }
    xhttp.open('GET', 'getTiposApto', true)
    xhttp.send()
}

function atualizarInventario() {
    const inicio = document.getElementById('inicio').value
    const fim = document.getElementById('fim').value

    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return ;

        const response = JSON.parse(this.responseText)
        if (this.status == 200 && response.success) {
            var colunas = response.list.map(item => item.data.substr(-2, 2))
            colunas = ['ID', ...colunas]

            var inventario = []
            response.list.forEach(item => {
                item.inv.forEach(inv => {
                    var idx = null
                    for (let i = 0; i < inventario.length; i++) if (inventario[i].id === inv.id) {
                        idx = i
                        break
                    }

                    // Add se não tiver
                    if (idx === null) {
                        inventario.push({id: inv.id})
                        idx = inventario.length - 1
                    } 

                    inventario[idx]['d' + item.data.substr(-5, 5)] = inv.qtd
                })
            })

            updateTable('table-inventario', inventario, colunas)
            toast('Dados atualizados com sucesso', 'success')
        } else {
            toast(response.msg || 'Falha ao atualizar dados', 'error')
            console.error({response: response})
        }
    }
    xhttp.open('GET', 'getInventario?inicio=' + inicio + '&fim=' + fim, true)
    xhttp.send()
}

function setCredenciais() {
    const form = document.forms['form-credenciais']

    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return ;

        const response = JSON.parse(this.responseText)
        if (this.status == 200 && response.success) {
            toast('Dados atualizados com sucesso', 'success')
        } else {
            toast(response.msg || 'Falha ao atualizar dados', 'error')
            console.error({response: response})
        }
    }
    xhttp.open('POST', 'setCredenciais', true)
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(JSON.stringify({
        token: form.token.value,
        user: form.user.value,
        password: form.password.value
    }))
}

function setCfgIntegrador() {
    const form = document.forms['form-urls']
    const dados = {
        url_inventario: form.url_inventario.value,
        url_portais: form.url_portais.value,
        url_confirmacao: form.url_confirmacao.value
    }

    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return ;

        const response = JSON.parse(this.responseText)
        if (this.status == 200 && response.success) {
            toast('Dados atualizados com sucesso', 'success')
            console.log({response: response})
        } else {
            toast(response.msg || 'Falha ao atualizar dados', 'error')
            console.error({response: response})
        }
    }
    xhttp.open('POST', 'setCfgIntegrador', true)
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(JSON.stringify(dados))
}