import react from "react";
import { View,Text, Image } from "react-native";
import Styles from "../Components/Styles";
export default Contact=()=>{
    return(
        <View style={Styles.mainContainer}>
                
    <Text>
      ضياء
      </Text>   
            <Text style={Styles.midFont2}>
                07717124094
            </Text>
               <Image source={require("../assets/acsd.png")} 
               style={Styles.acsd}
               resizeMode="contain"
               />
            
        </View>
    )
}