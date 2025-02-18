import { View,Text,TextInput,TouchableOpacity,Image,Modal, FlatList } from "react-native-web";
import { StyleSheet,TouchableWithoutFeedback } from "react-native";
import { useEffect, useState } from "react";
import axios from 'axios';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import logo from '../Images/Logo.png'

export default function Home(){

    const [modalVisebleCAD, SetmodalVisebleCAD] = useState(false)
    const [modalViseblePUT, SetmodalViseblePUT] = useState(false)
    const [data,SetData] = useState([])
    const [id,SetId] = useState(null)
    const [nome,SetNome] = useState('')
    const [quantidade,SetQuantidade] = useState('')
    const [preco,SetPreco] = useState('')
    const [descricao,SetDescricao] = useState('')
    const [searchTerm, SetSearchTerm] = useState('')
    const [filteredData, SetFilteredData] = useState(data)


    const Pesquisar = () => {
        const dataP = data.filter(item => item.nome.toLowerCase().includes(searchTerm.toLowerCase()));
        SetFilteredData(dataP)
    }

    const ModalPut = (produto) => {
        SetmodalViseblePUT(true);
        SetId(produto.id);
        SetNome(produto.nome);
        SetQuantidade(produto.Quantidade.toString());
        SetPreco(produto.Preço.toString());
        
    };

    const CarregarProdutos = async () => {
        try{
            const Rensponse = await axios.get('http://127.0.0.1:5000/produtos');
            SetData(Rensponse.data.Produtos)
        } catch(error) {
            console.error('Erro ao buscar produtos')
        }  
    }

    const Cadastro = async () => {
        try{
            await axios.post('http://127.0.0.1:5000/produtos', {nome,quantidade,preco,descricao})
            alert('Produto cadastrado')
            SetNome('')
            SetQuantidade('')
            SetPreco('')
            SetmodalVisebleCAD(false)
            await CarregarProdutos();
        } catch(error) {
            alert('Erro ao cadastar produto')
        }
    } 
    
    const Delete = async (produto) => {
        try{
            await axios.delete(`http://127.0.0.1:5000/produtos/${produto.id}`)
            alert('Produto deletado')
            await CarregarProdutos();
            
        } catch(error) {
            alert('Erro ao deletar produto')
        }
    }

    const DeleteNotificação =  (item) => {
        const ConfirmDelete = window.confirm(`Deseja mesmo deletar ${item.nome} ?`) 

        if(ConfirmDelete){
            Delete(item)
        }
    }

    const Alterar = async () => {
        try{
            await axios.put(`http://127.0.0.1:5000/produtos/${id}`,{nome,quantidade,preco,descricao})
            alert('Produto alterado com sucesso')
            SetmodalViseblePUT(false)
            SetNome('')
            SetQuantidade('')
            SetPreco('')
            await CarregarProdutos();

        } catch(error){
            alert('Erro ao alterar produto')
            SetmodalViseblePUT(false)
            SetNome('')
            SetQuantidade('')
            SetPreco('')
        }
    }

    useEffect(() => {
        CarregarProdutos();
    }, []);

    useEffect(() => {
        SetFilteredData(data); 
    }, [data]);

    return(
        <View style={styles.conteiner}>
            <View style={styles.Header}>
                <View style={styles.BoxSearch}>
                    <TextInput
                      style={styles.Search}
                      placeholder="Pesquisar"
                      placeholderTextColor={'#D9D9D9'}
                      value={searchTerm}
                      onChangeText={SetSearchTerm}
                    />
                    <TouchableOpacity style={styles.BtnSearch} onPress={Pesquisar}>
                        <Fontisto name="search" size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Image
                        source={logo}
                        style = {{height: 300, width: 300}}
                    />
                </View>
            </View>
            <View style={styles.Infos}>

                <View style={styles.lenBox}>
                   <Text style={styles.lenProdutos}> Total de produtos: {data.length} </Text>
                </View>
                
                <TouchableOpacity style={styles.BtnAdc} onPress={() => SetmodalVisebleCAD(true)}>
                    <AntDesign name="plus" size={35} color="white" />
                    <Text style={styles.TxtAdc}> Produto </Text>
                </TouchableOpacity>

            </View>
            <View style={styles.body}>
                <View style={styles.Names}>

                    <View style={styles.InfosSize}>
                        <Text style={styles.TxtNames}> ID </Text>
                    </View>

                    <View style={styles.InfosSize}>
                        <Text style={styles.TxtNames}> Nome Produto </Text>
                    </View>

                    <View style={styles.InfosSize}>
                        <Text style={styles.TxtNames}> Quantidade </Text>      
                    </View >

                    <View style={styles.InfosSize}>
                        <Text style={styles.TxtNames}> Preço </Text>
                    </View>

                    <View style={styles.InfosSize}>
                        <Text style={styles.TxtNames}> Ações </Text>        
                    </View>

                </View>

                <View style={styles.flatlistbox}>
                <FlatList
                style={styles.flatlist}
                data={filteredData}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) =>

                    <View style={styles.itens}>

                        <View style={styles.InfosSize}>
                            <Text style={styles.TxtItens}> {item.id} </Text>
                        </View>

                        <View style={styles.InfosSize}>
                            <Text style={styles.TxtItens}> {item.nome} </Text>
                        </View>

                        <View style={styles.InfosSize}>
                            <Text style={styles.TxtItens}> {item.Quantidade} </Text>
                        </View>

                        <View style={styles.InfosSize}>
                            <Text style={styles.TxtItens}> {item.Preço} R$ </Text>
                        </View>

                        



                        <View style={styles.Icons}>
                            <TouchableOpacity onPress={() => ModalPut(item)}>
                                <Feather name="edit" size={38} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => DeleteNotificação(item)}>
                                <Feather name="trash-2" size={38} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                 }
                /> 


             </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisebleCAD}
                onRequestClose={() => SetmodalVisebleCAD(false)}
            >
                <TouchableWithoutFeedback onPress={() => SetmodalVisebleCAD(false)}>
                    <View style={styles.ModalConteiner}>
                    <TouchableWithoutFeedback onPress={() => null} accessible={false}>
                        <View style={styles.ModalBody}>
                        <Text style={styles.TxtModalHeader}>Cadastrar Produto</Text>

                        <View style={styles.ModalInputBox}>
                            <TextInput style={styles.ModalInput} value={nome} onChangeText={SetNome} placeholder="Nome do produto" />
                            <TextInput style={styles.ModalInput} value={quantidade} onChangeText={SetQuantidade} placeholder="Quantidade" />
                            <TextInput style={styles.ModalInput} value={preco} onChangeText={SetPreco} placeholder="Preço" />

                            <View style={styles.ModalBtnsBox}>
                            <TouchableOpacity
                                style={styles.ModalBtnsX}
                                onPress={() => {
                                    SetmodalVisebleCAD(false);
                                    SetNome('');
                                    SetQuantidade('');
                                    SetPreco('');
                                }}
                                
                            >
                                <Feather name="x" size={35} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.ModalBtnsV} onPress={Cadastro}>
                                <Entypo name="check" size={35} color="white" />
                            </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
                </Modal>

                <Modal
                animationType="slide"
                transparent={true}
                visible={modalViseblePUT}
                onRequestClose={() => SetmodalViseblePUT(false)}
            >
                <TouchableWithoutFeedback onPress={() => SetmodalViseblePUT(false)}>
                    <View style={styles.ModalConteiner}>
                    <TouchableWithoutFeedback onPress={() => null} accessible={false}>
                        <View style={styles.ModalBody}>
                        <Text style={styles.TxtModalHeader}>Editar Produto</Text>

                        <View style={styles.ModalInputBox}>
                            <TextInput style={styles.ModalInput} value={nome} onChangeText={SetNome} placeholder="Nome do produto" />
                            <TextInput style={styles.ModalInput} value={quantidade} onChangeText={SetQuantidade} placeholder="Quantidade" />
                            <TextInput style={styles.ModalInput} value={preco} onChangeText={SetPreco} placeholder="Preço" />

                            <View style={styles.ModalBtnsBox}>
                            <TouchableOpacity
                                style={styles.ModalBtnsX}
                                onPress={() =>{ 
                                    SetmodalViseblePUT(false);
                                    SetNome('');
                                    SetQuantidade('');
                                    SetPreco('');
                                }}
                            >
                                <Feather name="x" size={35} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.ModalBtnsV} onPress={Alterar}>
                                <Entypo name="check" size={35} color="white" />
                            </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
                </Modal>

               


            
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#F9F9F9'
    },
    Header: {
        width: '100%',
        height: '15%',
        backgroundColor: '#F26430',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '2%'
    },
    BoxSearch: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        width: '45%',
        height: '50%',
        alignItems: 'center',
    },
    Search: {
        flex: 1,
        outline: 'none',
        fontSize: 25,
        color: '#333',
        width: '100%',
        height: '100%',
        paddingLeft: '2%'
    },
    BtnSearch: {
        backgroundColor: '#FF9068',
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Infos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        marginTop: '2%'
    },
    lenProdutos: {
        fontSize: 23,
        color: '#333'
    },
    BtnAdc: {
        backgroundColor: '#F24F13',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    TxtAdc: {
        fontSize: 23,
        color: '#FFF',
        marginLeft: 5
    },
    body: {
        marginTop: '1%',
        paddingHorizontal: '5%',
    },
    InfosSize: {
        width: '9%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Names: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EAEAEA',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    TxtNames: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center'
    },
    itens: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 10,
        elevation: 2
        
    },
    TxtItens: {
        fontSize: 16,
        color: '#333',
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 5,
        overflow: 'hidden'
    },
    Icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '9%',
        paddingHorizontal: 10,
    },
    ModalConteiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ModalBody: {
        width: '30%',
        padding: 20,
        backgroundColor: '#FFF',
        elevation: 5
    },
    TxtModalHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15
    },
    ModalInput: {
        fontSize: 18,
        color: '#333',
        borderBottomWidth: 1,
        borderColor: '#CCC',
        marginBottom: 20,
        paddingBottom: 5
    },
    ModalBtnsBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    ModalBtnsV: {
        backgroundColor: '#28A745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    ModalBtnsX: {
        backgroundColor: '#DC3545',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
});
