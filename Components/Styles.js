import Colors from "./Colors";

export default {
    mainContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    header:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:50,
        backgroundColor:Colors.mainColor,
        marginBottom:10,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    },
    pannel:{
       width:"95%",
       alignItems:"center",
       padding:25,
       paddingVertical:25,
       borderRadius:15,
       backgroundColor:Colors.thirdColor,
       margin:10,
       justifyContent:"space-between",
       shadowColor: '#000',
       shadowOffset: {
         width: 10,
         height: 10,
       },
       shadowOpacity: 1,
       shadowRadius: 0,
       elevation: 10,
   },
   pannel2:{
      alignItems:"center",
      width:"47%",
      padding:8,
      paddingVertical:10,
      borderRadius:15,
      backgroundColor:Colors.thirdColor,
      margin:5,
      justifyContent:"space-between",
      shadowColor: '#000',
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 10,
  },
    midFont1:{
        color:Colors.thirdColor,
        fontSize:20,
    },
    midFont2:{
        fontSize:20,
        color:Colors.mainColor
    },
    stateLED:{
        width:60,
        height:60,
        backgroundColor:Colors.darkColor,
        borderWidth:2,
        borderColor:"#000",
        borderRadius:40,
        margin:10,
        justifyContent: "center",
        alignItems: "center"
      },
      led:{
        opacity:0.7
      },
      switchOne:{
        transform: [{ scaleX: 3 }, { scaleY: 3 }],
        marginHorizontal:0,
        marginVertical:0,
        marginVertical:33,
        margin:-20
      },
      rowContainer:{
        flexDirection: 'row-reverse',
        alignItems:"center",
        justifyContent:"center",
        margin:0,
        padding:-5,
        justifyContent:"flex-end",
        width:"90%",
      },
      
          //error message
          errContaner:{
            width:"80%",
            height:50,
            backgroundColor:"#fff",
            borderWidth:2,
            borderRadius:15,
            borderColor:"red",
            alignItems:"center",
            justifyContent:"center",
            position:"absolute",
            top:30,
            shadowColor: '#000',
            shadowOffset: {
              width: 10,
              height: 14,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 12,
          
          },
          errorMessage:{
            fontSize:17,
            color:"red",
          },

          visible: {
            display: 'flex',
          },
          hidden: {
            display: 'none',
          },
          textbox:{
            borderWidth:1,
            width:"40%",
            margin:5,
            padding:15,
            paddingVertical:6.5,
            borderRadius:15,
            borderColor:"#aaa",
            fontSize:19,
            color:Colors.mainColor
          },
          button:{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 10,
              height: 14,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 12,
            borderRadius: 22,
            backgroundColor: Colors.mainColor,
            height:45,
            marginHorizontal:4
          
          },
          acsd:{
            width:"50%",
            position:"absolute",
            bottom:20
          }

}