import '@/styles/globals.css'
import React, { useState, useEffect } from 'react'
import MainContext from '@/contexts/mainContext'
import swal from 'sweetalert'
import styles from '@/styles/dashboard.module.css'

class Table {
    nome;
    total;
    gasto;
    constructor(nome, total, gasto){
        this.nome = nome;
        this.total = total;
        this.gasto = gasto;
    }
}

export default function App({ Component, pageProps }) {
    // Variáveis e estados
    const [viewActive, setViewActive] = useState('tabelas');
    const [tabelas, setTabelas] = useState([new Table('Transporte', 400, 0), new Table('Comida', 600, 200)]);
    const [valorGlobal, setValorGlobal] = useState(1000);
    const [sobraGlobal, setSobraGlobal] = useState(0);
    const [dashboardIsLoading, setDashboardIsLoading] = useState(true);

    async function sobraGlobalCounter(){
        if(document.getElementById('dashboard') !== null){
            let tabelasValue = 0;
            let sobraObject = document.getElementById('db-sobraGlobal');
            
            for(var i = 0; i < tabelas.length; i++){
                tabelasValue = tabelasValue + parseFloat(tabelas[i].total);
            }
            
            setSobraGlobal(valorGlobal - tabelasValue);
    
            if((valorGlobal - tabelasValue) < 0){
                sobraObject.className = 'db-sobraGlobalNegative';
            } else{
                sobraObject.className = 'db-sobraGlobalPositive';
            }
        }
    }

    async function eraseTabelas(){
        if(tabelas.length == 0){
            swal('Você já não possui tabelas!', 'A área de trabalho não possui nenhuma tabela!', 'error', {
                button: 'Vou criar uma!'
            });
        } else {
            await swal('Esta ação é importante', 'Você tem certeza de que quer excluir todas as tabelas?', 'warning', {
                buttons: {
                    cancel: 'Não tenho certeza',
                    default: 'Sim, tenho certeza'
                }
            }).then((value) => {
                if(value == null){
                    swal('Operação abortada!', 'Sua área de trabalho continua a mesma.', 'info', {
                        button: 'Ok!'
                    });

                    return null;
                } else{
                    setTabelas(new Array);
                    
                    return true;
                }
            }).then((value) => {
                if(value == true){
                    sobraGlobalCounter(); // Atualizando sobra
    
                    swal('Sucesso!', 'A área de trabalho agora está limpa e não possui tabelas!', 'success', {
                        button: 'Ok!'
                    });
                }
            });
        }
    }

    async function addNewTabela(){
        let nome = null;
        let total = null;
        let gasto = null;

        await swal({ // Recebendo nome
            text: 'Digite o nome da Tabela',
            content: 'input',
            icon: 'info'
        }).then((value) => {
            if(value == ''){
                swal('Digite um nome válido!', 'A Tabela precisa de um nome, por favor, tente novamente.', 'error');

                nome = null;
            } else{
                nome = value;
            }
        });
        if(nome != null){
            await swal({ // Recebendo valor teto
                text: 'Digite o valor total (o teto) da Tabela',
                content: 'input',
                icon: 'info'
            }).then((value) => {
                if(value == '' || Number.isNaN(parseFloat(value)) || value <= 0){
                    swal('Digite um valor válido!', 'A Tabela precisa de um teto válido, por favor, tente novamente.', 'error');
    
                    total = null;
                } else{
                    total = parseFloat(value);
                }
            });
        } if(total != null){
            await swal({ // Recebendo valor gasto
                text: 'Digite o valor gasto da Tabela',
                content: 'input',
                icon: 'info'
            }).then((value) => {
                if(value == '' || Number.isNaN(parseFloat(value)) || value < 0){
                    swal('Digite um valor válido!', 'A Tabela precisa de um valor gasto válido, por favor, tente novamente.', 'error');
    
                    return;
                } else if(parseFloat(value) > total){
                    swal('Tabela inválida!', 'O valor gasto da Tabela é maior que o valor total da Tabela.', 'error');
    
                    return;
                } else{
                    gasto = parseFloat(value);

                    let newTable = new Table(nome, total, gasto);
                    // console.log(newTable);
                    setTabelas([...tabelas, newTable]);

                    let a = new Promise(() => {
                        sobraGlobalCounter(); // Atualizando sobra
                    });

                    a.then(() => {
                        if(sobraGlobal >= 0){
                            swal('Tabela criada com sucesso!', `A tabela ${nome} foi criada, agora você possui um total de ${tabelas.length} tabelas!`, 'success');
                        } else {
                            swal('Tabela criada com sucesso, mas cuidado...', `A tabela ${nome} foi criada, porém agora você está no negativo, tem certeza de que está tudo certo?`, 'warning');
                        }
                    })
                }
            });
        }
    }

    async function removeTabela(index){
        await swal('Tem certeza?', 'A ação excluirá a tabela', 'warning', {
            buttons: {
                cancel: 'Cancelar',
                catch: {
                    text: 'Excluir tabela',
                    value: 'submit'
                }
            }
        }).then((value) => {
            switch(value){
                case 'submit':
                    let filteredTables = tabelas.filter((e, id) => {
                        if(id != index){
                            return e;
                        }
                    });
                    setTabelas(filteredTables);
                    sobraGlobalCounter(); // Atualizando sobra
                    swal('Sucesso!', 'Tabela excluida com sucesso!', 'success');
                    break;
                default:
                    swal('Operação cancelada!', 'Operação cancelada com sucesso', 'info');
                    break;
            }
        });
    }

    async function refreshDashboard(){
        async function doRefresh(){
            // Pegar valor gasto de cada tabela.
            let totalExpended = 0;
            tabelas.map((e) => {
                totalExpended += e.gasto;
            });

            if(totalExpended > 0){
                // Debitar total de valores gasto no total da conta
                setValorGlobal(valorGlobal - totalExpended);
                
                // Atualizar Tabelas para terem sobra 0
                let newTables = tabelas.map(e => {
                    e.total = e.total - e.gasto;
                    e.gasto = 0;
    
                    return e;
                });
                setTabelas(newTables);

                return true;
            }

            return false;
        }

        if(tabelas.length == 0){
            swal('Tabelas insuficientes!', 'Operação cancelada pois não existem tabelas na Dasboard!', 'error');
            return;
        }
        
        await swal('Essa ação é importante!', 'Você realmente quer atualizar sua Dashboard? Isso vai remover todas as sobras e debita-lás no seu total. Recomendamos fazer isso apenas em caso de diferenças no valor total da conta.', 'info', {
            buttons: {
                cancel: 'Cancelar',
                default: 'Prosseguir'
            }
        })
        .then(async yes => {
            if(yes){
                await doRefresh()
                .then( refreshed => {
                    if(refreshed){
                        swal('Dashboard atualizada', 'Sua Dashboard foi atualizada com sucesso!', 'success');
                        return;
                    }
                    swal('Valor gasto insuficiente', 'Sua Dashboard não possui gastos, por isso é impossível atualizar sua Dashboard!', 'error');
                });
            } else {
                swal('Operação Cancelada', 'Operação cancelada com sucesso!', 'info');
            }
        });
    }

    async function editTableName(index){
        let newName = null;

        await swal({
            text: 'Digite o novo nome da Tabela',
            content: 'input',
            icon: 'info',
        })
        .then((value) => {
            if((value == '') || (value == null) || (value == undefined)){
                swal('Nome inválido!', 'O nome está vazio! Digite um nome válido.', 'error');
                return false;
            } else{
                newName = value;
                return true;
            }
        })
        .then((sucess) => {
            if(sucess){
                let filteredTable = tabelas.filter((e, id) => {
                    if(index == id){
                        e.nome = newName;
    
                        return e;
                    } else{
                        return e;
                    }
                });
    
                setTabelas(filteredTable);
                swal('Nome alterado', 'O nome foi alterado com sucesso!', 'success');
            } else{
                swal('Operação cancelada', 'Operação cancelada com sucesso e o nome não foi alterado!', 'info');
            }
        })
    }

    async function addRemoveTotalGasto(type, fnc, index){
        let value = null;
        
        if(type == 'total'){
            if(fnc == 'add'){
                await swal('Digite quanto você deseja adicionar: ', {
                    content: 'input'
                }).then(content  => {
                    value = parseFloat(content);
                    console.log(content, value);
                });

                if(value < 0){
                    swal('ERROR', 'Você não digitou um número positivo!', 'error');

                    return;
                } else if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    swal('ERROR', 'É necessário NÚMEROS para fazer a operação.', 'error');

                    return;
                }

                let filteredTables = tabelas.filter((e, id) => {
                    if(id == index){
                        e.total += value;

                        return e;
                    } else{
                        return e;
                    }
                });
                setTabelas(filteredTables);
                sobraGlobalCounter();
                console.log(value, 'valor no final');
            } else if(fnc == 'remove'){
                await swal('Digite quanto você deseja diminuir: ', {
                    content: 'input'
                }).then(content  => {
                    value = parseFloat(content);
                    console.log(content, value);
                });
                
                if(value < 0){
                    swal('ERROR', 'Você não digitou um número positivo!', 'error');

                    return;
                } if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    swal('ERROR', 'É necessário NÚMEROS para fazer a operação.', 'error');

                    return;
                } if(tabelas[index].total - value < 1){
                    swal('ERROR', 'O total não pode ser menor que 1.', 'error');

                    return;
                } if((tabelas[index].total - value) < tabelas[index].gasto){
                    swal('ERROR', 'O total não pode ser menor que o gasto.', 'error');

                    return;
                }

                let filteredTables = tabelas.filter((e, id) => {
                    if(id == index){
                        e.total -= value;

                        return e;
                    } else{
                        return e;
                    }
                });
                setTabelas(filteredTables);
                sobraGlobalCounter();
            }
        } else if(type == 'gasto') { // gasto
            if(fnc == 'add'){
                await swal('Digite quanto você deseja adicionar: ', {
                    content: 'input'
                }).then(content  => {
                    value = parseFloat(content);
                    console.log(content, value);
                });
                
                if(value < 0){
                    swal('ERROR', 'Você não digitou um número positivo!', 'error');

                    return;
                } if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    swal('ERROR', 'É necessário NÚMEROS para fazer a operação.', 'error');

                    return;
                } if(tabelas[index].gasto + value > tabelas[index].total){
                    swal('ERROR', 'O valor gasto não pode ser maior que o valor total.', 'error');

                    return;
                }

                let filteredTables = tabelas.filter((e, id) => {
                    if(id == index){
                        e.gasto += value;

                        return e;
                    } else{
                        return e;
                    }
                });
                setTabelas(filteredTables);
            } else if(fnc == 'remove'){
                await swal('Digite quanto você deseja diminuir: ', {
                    content: 'input'
                }).then(content  => {
                    value = parseFloat(content);
                    console.log(content, value);
                });
                
                if(value < 0){
                    swal('ERROR', 'Você não digitou um número positivo!', 'error');

                    return;
                } if(Number.isNaN(value)){ // usando a função Number.isNaN para checar se o número é NaN ou não
                    swal('ERROR', 'É necessário NÚMEROS para fazer a operação.', 'error');

                    return;
                } if(tabelas[index].gasto - value < 0){
                    swal('ERROR', 'O valor gasto não pode ser menor que 0.', 'error');

                    return;
                }

                let filteredTables = tabelas.filter((e, id) => {
                    if(id == index){
                        e.gasto -= value;

                        return e;
                    } else{
                        return e;
                    }
                });
                setTabelas(filteredTables);
            }
        }
    }

    function toggleHeaderSD(){
        if(document.getElementById('dashboard')){
            let btn = document.getElementById('toggleBtn');
            let header = document.getElementById('dashboardHeader');

            if(header.className == styles.header){
                header.className = styles.headerOn;
            } else if (header.className == styles.headerOn){
                header.className = styles.header;
            }
        }
    }

    // Check JSON Management on Start-up
    useEffect(() => {
        if(localStorage.getItem('tabelas') !== null){
            setTabelas(JSON.parse(localStorage.getItem('tabelas')));
            setDashboardIsLoading(false);
        } else {
            setDashboardIsLoading(false);
            console.log('Não existem tabelas');
        }
        if(localStorage.getItem('valorGlobal') !== null){
            setDashboardIsLoading(false);
            setValorGlobal(JSON.parse(localStorage.getItem('valorGlobal')));
        } else {
            setDashboardIsLoading(false);
            console.log('Não existe valor global');
        }
    }, []);

    // Always refresh local storage
    useEffect(() => {
        const tablesJSON = JSON.stringify(tabelas);
        // console.log(tablesJSON);
        localStorage.setItem('tabelas', tablesJSON);

        sobraGlobalCounter();
        console.log('Efeito colateral JSON ativado, localStorage atualizado e sobra atualizada!');
    }, [tabelas]);

    useEffect(() => {
        localStorage.setItem('valorGlobal', JSON.stringify(valorGlobal));
    }, [valorGlobal]);

    // Use Effects
    useEffect(() => {
        const tabelaView = document.getElementById('db-tabelaView');
        const analyticsView = document.getElementById('db-analyticsView');

        const btnTabelas = document.getElementById('btn-tabelas');
        const btnAnalytics = document.getElementById('btn-analytics');

        if(tabelaView){ // Se tabelaView EXISTE, então...
            if(viewActive == 'tabelas'){
                tabelaView.className = ('db-viewTabelaOn');
                analyticsView.className = ('db-viewAnalyticsOff')
                
                btnTabelas.className = ('db-lb-buttonSelected');
                btnAnalytics.className = ('db-lb-button');
            } else if(viewActive == 'analytics'){
                tabelaView.className = ('db-viewTabelaOff');
                analyticsView.className = ('db-viewAnalyticsOn')
                
                btnTabelas.className = ('db-lb-button');
                btnAnalytics.className = ('db-lb-buttonSelected');
            }
        }
    }, [viewActive]);

    useEffect(() => {
        sobraGlobalCounter();
    }, [valorGlobal]);

    return (
        <MainContext.Provider value={[setViewActive, addNewTabela, tabelas, setTabelas, removeTabela, addRemoveTotalGasto, eraseTabelas, valorGlobal, setValorGlobal, sobraGlobal, setSobraGlobal, toggleHeaderSD, editTableName, dashboardIsLoading, setDashboardIsLoading, refreshDashboard]}>
            <Component {...pageProps} />
        </MainContext.Provider>
    );
}
