import { View,Text,TextInput,TouchableOpacity } from "react-native-web";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Login(){
    return(
        <LinearGradient colors={['#F2F2F2','#F24F13']} style={styles.conteinerGradient}>
            <View style={styles.boxLogin}>
                <View style={styles.HeaderBox}>
                    <Text style={styles.TxtHeader}> Login </Text>
                    <View style={styles.TxtBox}>
                        <Text style={styles.TxtLogin}>Digite seus dados de acesso para realizar o login</Text>
                    </View>
                </View>
                <View style={styles.BoxInputs}>
                    <TextInput 
                       style={styles.Inputs}
                       placeholder="Login"
                       keyboardType="email-address"
                    />
                    <TextInput 
                       style={styles.Inputs}
                       placeholder="Senha"
                       secureTextEntry
                       />
                    <TouchableOpacity style={styles.BtnAcess}>
                        <Text style={styles.TxtAcess}>
                            Acessar
                        </Text>
                    </TouchableOpacity>
                 </View>
                 <View style={styles.FooterBox}>
                    <Text style={styles.FooterTxt}>Não tem uma conta?Criar</Text>
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
        height: '73%',
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
    },
    TxtLogin: {
        color: '#858585'
    },
    BoxInputs: {
        alignItems: 'center',
        height: '60%',
        justifyContent: 'flex-start'
    },
    Inputs: {
        fontSize: 50,
        color:'#D9D9D9',
        height: '25%',
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
        fontSize: 56,
    },
    FooterBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%'
    },
    FooterTxt: {
        color:'#858585',
        fontSize: 18
    }

})