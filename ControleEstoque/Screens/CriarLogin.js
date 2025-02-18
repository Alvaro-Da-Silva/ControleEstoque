import { View,Text,TextInput,TouchableOpacity } from "react-native-web";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useState } from "react";

export default function CriarLogin(){
    const [nome,SetNome] = useState('')
    const [login,SetLogin] = useState('')
    const [senha,SetSenha] = useState('')

    const NewUser = async () => {
        try{
            axios.post('http://127.0.0.1:5000/users', {nome,login,senha})
            SetNome('')
            SetLogin('')
            SetSenha('')
            alert('Cadastro feito com sucesso')
        } catch(error){
            alert('Erro ao cadastar')
            SetNome('')
            SetLogin('')
            SetSenha('')
        }

        }
    return(
        <LinearGradient colors={['#F2F2F2','#F24F13']} style={styles.conteinerGradient}>
        <View style={styles.boxLogin}>
            <View style={styles.HeaderBox}>
                <Text style={styles.TxtHeader}> Nova conta </Text>
                <View style={styles.TxtBox}>
                    <Text style={styles.TxtLogin}>Digite seus dados Para Criar uma nova conta</Text>
                </View>
            </View>
            <View style={styles.BoxInputs}>
                <TextInput 
                   style={styles.Inputs}
                   placeholder="Nome"
                   placeholderTextColor={'#D9D9D9'}
                   value={nome}
                   onChangeText={SetNome}
                />
                <TextInput 
                   style={styles.Inputs}
                   placeholder="Login"
                   placeholderTextColor={'#D9D9D9'}
                   value={login}
                   onChangeText={SetLogin}
                />
                <TextInput 
                   style={styles.Inputs}
                   placeholder="Senha"
                   placeholderTextColor={'#D9D9D9'}
                   secureTextEntry
                   value={senha}
                   onChangeText={SetSenha}
                   />
                <TouchableOpacity style={styles.BtnAcess} onPress={NewUser}>
                    <Text style={styles.TxtAcess}>
                        Criar
                    </Text>
                </TouchableOpacity>
             </View>
             <View style={styles.FooterBox}>
                <Text style={styles.FooterTxt} onPress={() => navigation.navigate("Login")}>Já tem uma conta?Entrar</Text>
             </View>
        </View>
        
    </LinearGradient>
)
}

const styles = StyleSheet.create({
    conteinerGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxLogin: {
        backgroundColor: '#fff',
        width: '35%',
        height: '70%',
    },
    HeaderBox: {
        padding: 10,
        paddingTop: 1
    },
    TxtHeader: {
        fontSize: 70,
        color: '#F24F13',
        fontFamily: 'Arial'
    },
    TxtBox: {
        paddingTop: 7,
        paddingLeft: '5%',
        fontWeight: 'bold',
    },
    TxtLogin: {
        color: '#858585',
        fontWeight: 'bold'
    },
    BoxInputs: {
        alignItems: 'center',
        height: '65%',
        justifyContent: 'flex-start'
    },
    Inputs: {
        fontSize: 38,
        color:'#333',
        height: '28%',
        width: '85%',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        marginTop: '3%',
        marginBottom: 5,
        paddingLeft: '3%'
    },
    BtnAcess: {
        marginTop: '2%',
        height: '25%',
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F24F13'
    },
    TxtAcess: {
        color: '#fff',
        fontSize: 45,
    },
    FooterBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '12%'
    },
    FooterTxt: {
        color:'#858585',
        fontSize: 18,
        
    }

})