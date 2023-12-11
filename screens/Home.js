import react, { useState,useEffect } from "react";
import { View,Text,ScrollView,StatusBar,I18nManager,Switch } from "react-native";
import Styles from "../Components/Styles";
import CircularProgress from 'react-native-circular-progress-indicator';
//npm i react-native-circular-progress-indicator then run npx expo install react-native-reanimated then npm i react-native-svg
import Colors from "../Components/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
export default Home=()=>{
  const [value1,setValue1]=useState(0);
  const [value2,setValue2]=useState(0);
  const [stateLed1,setStateLed1]=useState(false);
  const [stateLed2,setStateLed2]=useState(false);
  const [stateLed3,setStateLed3]=useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);//switch one is on
  const [errorMsg,setErrorMsg]=useState("لا يوجد اتصال بالجهاز!");
  const [errorMsgState,setErrorMsgState]=useState(true);

    const switchOneOn=()=>{
      setIsEnabled1(previousState => !previousState); 
      if(!isEnabled1){// turn on the motor
        new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const url = 'http://192.168.4.1/fanOnwdx';
      
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                resolve(xhr.responseText);
                setErrorMsgState(false);
              } else {
                setErrorMsgState(true);
              }
            }
          };
          xhr.open('GET', url, true);
          xhr.timeout = 1000; // set the timeout to 2 seconds
          xhr.send();
        });
      }
      else{// turn off the motor
        new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const url = 'http://192.168.4.1/fanOffwdx';
      
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                resolve(xhr.responseText);
                setErrorMsgState(false);
              } else {
                setErrorMsgState(true);
              }
            }
          };
          xhr.open('GET', url, true);
          xhr.timeout = 1000; // set the timeout to 2 seconds
          xhr.send();
        });
      }

    } //end switchOneOn

    
// sycronisation
  useEffect(() => {
    const interval=setInterval(()=>{
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://192.168.4.1/statewdx';
    
        xhr.onreadystatechange = async() => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              setErrorMsgState(false);
              resolve(xhr.responseText);
              setErrorMsgState(false);
              setValue1(parseFloat(xhr.responseText.split("#")[0]));
              setValue2(parseFloat(xhr.responseText.split("#")[1]));
              if(parseInt(xhr.responseText.split("#")[2])){
                setStateLed1(true);
              }
              else{
                setStateLed1(false);
              }
              if(parseInt(xhr.responseText.split("#")[3])){
                setStateLed2(true);
              }
              else{
                setStateLed2(false);
              }
              if(parseInt(xhr.responseText.split("#")[4])){
                setStateLed3(true);
                setIsEnabled1(true);
              }
              else{
                setStateLed3(false);
                setIsEnabled1(false);
              }
            } else {
              setErrorMsgState(true);
            }
          }
        };
        xhr.open('GET', url, true);
        xhr.timeout = 400; // set the timeout to 2 seconds
        xhr.send();
      });
    },200);
    return ()=> clearInterval(interval);
  }, []);

    return(
<ScrollView>
  <StatusBar
    backgroundColor={Colors.mainColor}
    barStyle="light-content"
  />
        
  <View style={Styles.mainContainer}>
      <View style={Styles.header}>
        <Text style={Styles.midFont1}>
            الفقاسة الذكية
        </Text>
      </View>
    <View style={[errorMsgState? Styles.visible : Styles.hidden,{marginBottom:20}]}>
        <Text style={Styles.errorMessage}>{errorMsg}</Text>
      </View>

          <View style={{...Styles.rowContainer,margin:0,padding:0,marginVertical:10}}>
            <View style={{...Styles.pannel2,width:"30%"}}>
               <View style={[Styles.stateLED,{backgroundColor: stateLed1?"red":Colors.darkColor}]}>
               <MaterialCommunityIcons style={Styles.led} name={stateLed1?"lightbulb-on":"lightbulb-on-outline"} size={30} color="white" />
               </View>
               <Text style={Styles.midFont2}>
                الهيتر
               </Text>
            </View>
            <View style={{...Styles.pannel2,width:"30%"}}>
            <View style={[Styles.stateLED,{backgroundColor: stateLed2?"green":Colors.darkColor}]}>
                {stateLed2? <Entypo style={Styles.led} name="drop" size={30} color="white" />:<SimpleLineIcons style={Styles.led} name="drop" size={30} color="white" /> }
               </View>
               <Text style={Styles.midFont2}>
                المبخرة
               </Text>
            </View>
            <View style={{...Styles.pannel2,width:"30%"}}>
            <View style={[Styles.stateLED,{backgroundColor: stateLed3?"blue":Colors.darkColor}]}>
               <MaterialCommunityIcons style={Styles.led} name={stateLed3?"fan":"fan-off"} size={30} color="white" />
               </View>
              <Text style={Styles.midFont2}>
                المروحة
               </Text>
            </View>
         </View>
         <View style={{...Styles.rowContainer,margin:0,padding:0,marginBottom:10}}>
         <View style={Styles.pannel2}>
          <CircularProgress
            value={value1}
            progressValueColor={Colors.mainColor}   
            radius={65}
            maxValue={75
            }
            valueSuffix={'C°'}
            duration={2000}
            strokeColorConfig={[
                { color: 'red', value: 25 },
                { color: 'blue', value: 50 },
                { color: 'green', value: 75 },
              ]}
              progressFormatter={(value) => {
                'worklet';
                return value.toFixed(1); // 1 decimal places
              }} 
              // dashedStrokeConfig={{
              //   count: 50,
              //   width: 4,
              // }}
            />
            <Text style={{...Styles.midFont2,marginTop:10}}>
              درجة الحرارة
            </Text>
          </View>

          <View style={Styles.pannel2}>
          <CircularProgress
            value={value2}
            progressValueColor={Colors.mainColor}   
            radius={65}
            maxValue={100}
            // activeStrokeColor={'red'}
            // activeStrokeSecondaryColor={'green'}
            valueSuffix={'%'}
            duration={2000}
            strokeColorConfig={[
                { color: 'red', value: 25 },
                { color: 'blue', value: 50 },
                { color: 'green', value: 75 },
              ]}            
            />
            <Text style={{...Styles.midFont2,marginTop:10}}>
              نسبة الرطوبة
            </Text>
          </View>

        </View>
    <View style={{...Styles.pannel,marginBottom:20,width:"87%"}}>

      <View style={{...Styles.rowContainer,justifyContent:"space-between",width:"70%",margin:-20}}>
      <Switch
        trackColor={{ false: '#767577', true: Colors.secondColor }}
        thumbColor={isEnabled1 ? Colors.mainColor : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={switchOneOn}
        value={isEnabled1}
        style={Styles.switchOne} // set size
      />
          <Text style={Styles.midFont2}>
              المروحة
          </Text>
      </View>
        </View>
        </View>
        </ScrollView>
    )
}