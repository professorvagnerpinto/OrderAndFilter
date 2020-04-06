/**
 * Vídeo #43 ao #45: Order and Filter - Módulo 12 - Requisições, Web Services e Banco de Dados - B7Web
 * Exemplo do uso de orderBy, startAt e startEnd.
 * Obs.: Para instalar as dependências do Firebase utilize o assistente da IDE, ou digite no terminal da IDE 'npm install firebase --save'.
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import firebase from 'firebase';

export default class Despesa extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            lista:[]
        };

        //códigos de acesso aos serviços do Firebase
        const firebaseConfig = {
            /*
                Coloque aqui as credenciais do teu projeto no Firebase.
             */

        };
        //inicializa o serviço
        if (!firebase.apps.length) { //antes testa se ele já não foi iniciado
            firebase.initializeApp(firebaseConfig);
        }

        /*
        *  Exemplos de busca dos dados no firebase - orderByValue, orderByKey e orderByChild
        */

        /* orderByValue, ordena pelo valor do nó (natural crescente) */
        // firebase.database().ref('orderfilter').child('precos')
        //     .orderByValue()
        //     .on('value', (dataSnapshot) => {
        //         let s = this.state;
        //         s.lista = [];
        //         dataSnapshot.forEach((childItem) => {
        //             s.lista.push({
        //                 key:childItem.key,
        //                 dado:childItem.val()
        //             });
        //         });
        //         this.setState(s);
        //         console.log(this.state.lista);
        //     });


        /* orderByKey,  ordena pelo key do nó (natural crescente, se é string segue a ordenação léxica (considera caixa alta ou baixa) */
        // firebase.database().ref('orderfilter').child('precos')
        //     .orderByKey()
        //     .on('value', (dataSnapshot) => {
        //         let s = this.state;
        //         s.lista = [];
        //         dataSnapshot.forEach((childItem) => {
        //             s.lista.push({
        //                 key:childItem.key,
        //                 dado:childItem.val() //use para orderByValue e orderByKey
        //             });
        //         });
        //         this.setState(s);
        //         console.log(this.state.lista);
        //     });


        /* orderByChild, ordena pelo valor de um nó filho (natural crescente) */
        // firebase.database().ref('orderfilter').child('motorizacao') //para orderByChild
        // .orderByChild('potencia')
        // .on('value', (dataSnapshot) => {
        //     let s = this.state;
        //     s.lista = [];
        //     dataSnapshot.forEach((childItem) => {
        //         s.lista.push({
        //             key:childItem.key,
        //             dado:childItem.val().potencia //use para orderByChild (pega o atributo da raiz do nó, que agora é um objeto com mais de um atributo)
        //         });
        //     })
        //     this.setState(s);
        //     console.log(this.state);
        // });


        /*
        *  Exemplos de filtro no firebase - startAt, endAt, equalTo, limitToFirst, limitToLast
        */

        /* startAt e endAt */
        // firebase.database().ref('usuarios')
        //     .orderByChild('idade')
        //     .startAt(18)
        //     .endAt(65)
        //     .on('value', (dataSnapshot) => {
        //         let s = this.state;
        //         s.lista = [];
        //         dataSnapshot.forEach((childItem) => {
        //             s.lista.push({
        //                 key:childItem.key,
        //                 dado:childItem.val().nome,
        //                 idade:childItem.val().idade
        //             });
        //         });
        //         this.setState(s);
        //         console.log(this.state.lista);
        //     });

        /* equalTo */
        // firebase.database().ref('usuarios')
        //     .orderByChild('idade')
        //     .equalTo(4)
        //     .on('value', (dataSnapshot) => {
        //         let s = this.state;
        //         s.lista = [];
        //         dataSnapshot.forEach((childItem) => {
        //             s.lista.push({
        //                 key:childItem.key,
        //                 dado:childItem.val().nome,
        //                 idade:childItem.val().idade
        //             });
        //         });
        //         this.setState(s);
        //         console.log(this.state.lista);
        //     });

        /* limitToFirst e limitToLast */
        firebase.database().ref('usuarios')
            .orderByChild('idade')
            .limitToLast(2)
            .on('value', (dataSnapshot) => {
                let s = this.state;
                s.lista = [];
                dataSnapshot.forEach((childItem) => {
                    s.lista.push({
                        key:childItem.key,
                        dado:childItem.val().nome,
                        idade:childItem.val().idade
                    });
                });
                this.setState(s);
                console.log(this.state.lista);
            });

    }//fim construtor

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={this.state.lista}
                    renderItem = {({item}) => {
                        return (
                            <Text>{item.dado} - {item.idade}</Text>
                        );
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:5
    },
    list:{
        flex:1,
        padding:5
    }
});
