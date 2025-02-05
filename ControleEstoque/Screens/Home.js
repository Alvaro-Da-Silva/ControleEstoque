import { View,Text,TextInput,TouchableOpacity,Image,Modal } from "react-native-web";
import { StyleSheet,TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import logo from '../Images/Logo.png'

export default function Home(){

    const [modalVisebleCAD, SetmodalVisebleCAD] = useState(false)
    const [modalViseblePUT, SetmodalViseblePUT] = useState(false)
    const [modalVisebleDEL, SetmodalVisebleDEL] = useState(false)

    return(
        <View style={styles.conteiner}>
            <View style={styles.Header}>
                <View style={styles.BoxSearch}>
                    <TextInput
                      style={styles.Search}
                      placeholder="Pesquisar"
                      placeholderTextColor={'#D9D9D9'}
                    />
                    <TouchableOpacity style={styles.BtnSearch}>
                        <Fontisto name="search" size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.Logo}>
                    <Image
                        source={logo}
                        style = {{height: 300, width: 300}}
                    />
                </View>
            </View>
            <View style={styles.Infos}>

                <View style={styles.lenBox}>
                   <Text style={styles.lenProdutos}> Total de produtos: 4 </Text>
                </View>
                
                <TouchableOpacity style={styles.BtnAdc} onPress={() => SetmodalVisebleCAD(true)}>
                    <AntDesign name="plus" size={35} color="white" />
                    <Text style={styles.TxtAdc}> Produto </Text>
                </TouchableOpacity>

            </View>
            <View style={styles.body}>
                <View style={styles.Names}>
                    <Text style={styles.TxtNames}> ID </Text>
                    <Text style={styles.TxtNames}> Nome Produto </Text>
                    <Text style={styles.TxtNames}> Quantidade </Text>
                    <Text style={styles.TxtNames}> Preço </Text>
                    <Text style={styles.TxtNames}> Ações </Text>
                </View>

                <View style={styles.itens}>
                    <Text style={styles.TxtItens}> 1 </Text>
                    <Text style={styles.TxtItens}> Betonera </Text>
                    <Text style={styles.TxtItens}> 20 </Text>
                    <Text style={styles.TxtItens}> 2000R$ </Text>
                    <View style={styles.Icons}>
                        <TouchableOpacity onPress={() => SetmodalViseblePUT(true)}>
                            <Feather name="edit" size={38} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SetmodalVisebleDEL(true)}>
                            <Feather name="trash-2" size={38} color="black" />
                        </TouchableOpacity>
                        

                    </View>
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
                            <TextInput style={styles.ModalInput} placeholder="Nome do produto" />
                            <TextInput style={styles.ModalInput} placeholder="Quantidade" />
                            <TextInput style={styles.ModalInput} placeholder="Preço" />

                            <View style={styles.ModalBtnsBox}>
                            <TouchableOpacity
                                style={styles.ModalBtnsX}
                                onPress={() => SetmodalVisebleCAD(false)}
                            >
                                <Feather name="x" size={35} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.ModalBtnsV}>
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
                            <TextInput style={styles.ModalInput} placeholder="Nome do produto" />
                            <TextInput style={styles.ModalInput} placeholder="Quantidade" />
                            <TextInput style={styles.ModalInput} placeholder="Preço" />

                            <View style={styles.ModalBtnsBox}>
                            <TouchableOpacity
                                style={styles.ModalBtnsX}
                                onPress={() => SetmodalViseblePUT(false)}
                            >
                                <Feather name="x" size={35} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.ModalBtnsV}>
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
                    visible={modalVisebleDEL}
                    onRequestClose={() => SetmodalVisebleDEL(false)}
                >
                <TouchableWithoutFeedback onPress={() => SetmodalVisebleDEL(false)}>
                    <View style={styles.ModalConteiner}>
                    <TouchableWithoutFeedback onPress={() => null} accessible={false}>
                        <View style={styles.ModalBodyDel}>

                        <View style={styles.ModalMessageBox}>
                            <View style={styles.ModalTxtBox}>
                                <Text style={styles.ModalMessage}>Deseja mesmo deletar </Text>
                                <Text style={styles.ModalMessage}> esse produto?</Text>
                                <Text style={styles.ModalMessage}>produto?</Text>
                            </View>


                            <View style={styles.ModalBtnsBox}>
                            <TouchableOpacity
                                style={styles.ModalBtnsXDel}
                                onPress={() => SetmodalVisebleDEL(false)}
                            >
                                <Text style={styles.ModalBtnsTxtDel}>NÃO</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.ModalBtnsVDel}>
                                <Text style={styles.ModalBtnsTxtDel}>SIM</Text>
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
        backgroundColor: '#F2F2F2'
    },
    Header: {
        width: '100%',
        height: '15%',
        backgroundColor: '#F26430',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    BoxSearch: {
        flexDirection: 'row',
        backgroundColor:'#fff',
        width: '43%',
        height: '50%',
        marginLeft: '3%'
    },
    Search: {
        width: '90%',
        height: '100%',
        fontSize: 30,
        color:'#000',
        paddingLeft: '2%'
    },
    BtnSearch: {
        backgroundColor: '#FF9068',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '10%'
    },
    Infos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '2%'
    },
    lenBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: '160%',
        width: '20%'
    },
    lenProdutos: {
        fontSize: 30
    },
    BtnAdc: {
        backgroundColor: '#F24F13',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: '160%',
        width: '12%'
    },
    TxtAdc: {
        fontSize: 30,
        color: '#fff'
    },
    body: {
        marginTop: '1%',
        alignItems: 'center'
    },
    Names: {
        borderWidth: 5,
        borderColor: '#D9D9D9',
        height: '45%',
        width: '98%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    TxtNames: {
        fontSize: 30,
        width: '14%',
        textAlign: 'center',
    },
    itens: {
        marginTop: '1%',
        borderWidth: 5,
        borderColor: '#D9D9D9',
        height: '60%',
        width: '98%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    TxtItens: {
        fontSize: 30,
        width: '14%',
        textAlign: 'center',
    },
    Icons: {
        flexDirection: 'row',
        justifyContent:  'space-evenly',
        width: '14%',
    },
    ModalConteiner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    ModalBody: {
        width: "35%",
        height: '60%',
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    ModalBodyDel: {
        width: "35%",
        height: '60%',
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'center',
    },
    TxtModalHeader:{
        fontSize: 38
    },
    ModalInputBox: {
        alignItems: 'center',
        height: '85%',
        width: '100%',
    },
    ModalInput: {
        fontSize: 30,
        margin: '2%',
        color:'#636363',
        height: '20%',
        width: '90%',
        borderWidth: 1,
        borderColor: '#636363',
        paddingLeft: '3%'
    },
    ModalTxtBox: {
        alignItems: 'center'
    },
    ModalMessageBox: {
        alignItems: 'center',
        height: '85%',
        width: '100%',
        justifyContent: 'space-around',
    },
    ModalMessage: {
        fontSize: 45
    },
    ModalBtnsBox: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '3%'
    },
    ModalBtnsV: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '160%',
        width: '14%',
        backgroundColor: '#00FF1E',
    },
    ModalBtnsX: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '160%',
        width: '14%',
        backgroundColor: '#FF0000'
    },
    ModalBtnsVDel: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '160%',
        width: '20%',
        backgroundColor: '#00FF1E',
    },
    ModalBtnsXDel: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '160%',
        width: '20%',
        backgroundColor: '#FF0000'
    },
    ModalBtnsTxtDel: {
        color: '#fff',
        fontSize: 26
    },
})