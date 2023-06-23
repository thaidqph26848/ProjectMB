import { StyleSheet } from "react-native";

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFCC",
        alignItems: 'center',
        paddingTop: 20,
    },
    khung: {
        marginTop: 50,
        padding: 10,
        alignItems: 'center',

    },
    dangnhap: {
        fontSize: 35,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 20
    },
    onhap: {
        height: 40,
        borderWidth: 1,
        width: 320,
        marginTop: 20,
        padding: 10,
        borderRadius: 20
    },
    onhap1: {
        height: 40,
        borderWidth: 1,
        width: 320,
        marginTop: 5,
        padding: 10,
        borderRadius: 20,
        marginTop: 10

    },
    login: {
        fontSize: 20,
        backgroundColor: '#0066FF',

        color: 'white',
        fontWeight: 'bold',
        width: 320,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 20,
        padding: 5


    },
    ciew1: {
        flexDirection: 'row'
    }
    ,
    fb: {
        width: 120,
        height: 32,
        backgroundColor: '#0066CC',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        marginRight: 50,
        marginTop: 15,
        borderRadius: 20,
        padding: 4,
        fontWeight: 'bold'

    }
    , gg: {
        width: 120,
        height: 32,
        backgroundColor: '#FF0000',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        marginTop: 15,
        borderRadius: 20,
        padding: 4,
        fontWeight: 'bold'

    }, b1: {
        borderWidth: 0.5,
        padding: 10,
        margin: 5,
        borderRadius: 20,
        backgroundColor:'#DDEEFF'



    },
    b2:{
        borderWidth: 0.5,
        padding: 10,
        margin: 5,
        borderRadius: 20,
        width:380,
        height:600,
        backgroundColor:'#DDEEFF',
        paddingTop:50,
        alignItems:'center'
    },
    v1: {
        width: 80,
        height: 130,
        borderRadius: 20,
        marginLeft: 0,
        marginBottom: 30
    },v2: {
        width: 250,
        height: 130,
        borderRadius: 20,
        marginBottom: 70,
    marginLeft:30,
    
    },
    v3: {
        width: 280,
        height: 100,
        borderRadius: 20,
        marginBottom: 125,
 
    alignItems:'center'
    }, ct: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 1
    },
    td: {
        color: '#FF3333',
        fontSize: 20,

        fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        width:30,
        height:30,
        borderRadius:50,
        padding:5,
       
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,
        marginBottom:5
    },
    countText: {
        color: '#FF00FF',
    },
    render_giohang: {
        backgroundColor:'#DDEEFF',
        marginTop: 20,
        flexDirection: 'row',
        width:400,
        
    },
    searchBox: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        width: 350,
        marginBottom: 20,
        marginRight: 50,
        marginTop: 20,
        marginLeft:40
    },
    o: {
        height: 40,
        borderWidth: 1,
        width: 320,
        marginTop: 20,
        padding: 10,
        borderRadius:7

    },
    them: {
        backgroundColor: '#DDEEFF',
        marginTop: 120,
        borderWidth: 1,
padding:10,
        flex: 1,
        width:420,
        color: 'red',
        
   
        
    },
    x: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 15,
        textAlign: 'center',
        backgroundColor: 'red',
        padding: 5,
        margin: 7
    },
    o1: {
        borderWidth: 0.2,
        height: 35,
        padding: 10,
        margin: 10
    }, btnchonanh: {
        backgroundColor: '#FF9900',
        width: 150,
        height: 30,
        borderRadius: 20,
        marginLeft: 110,
        borderWidth: 1,
        marginTop: 5

    }, i: {
        backgroundColor: 'yellow',
        width: 200,
        zIndex: 100, // quy định thứ tự xếp chồng
        margin: 20,

    }, us: {
        backgroundColor: 'yellow',
        width: 320,
        height: 80,
        marginTop: 65,
        marginLeft: 60,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 0.6,
        paddingLeft: 8,

    }, dx: {
        marginLeft: 2,
        marginTop: 35,
        backgroundColor: '#FFCCFF',
        borderRadius: 20,
        padding: 2,
        width: 80,
        height: 30,
        textAlign: 'center'

    }, btnMua: {
        backgroundColor: 'green'
    }, gtt: {

        fontSize: 30,
        marginRight: 140,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 20,

    },
    hi: {
        fontSize: 20, marginRight: 250, marginTop: 30, marginLeft: 10,
        marginBottom: 30
    },
    del:{
       
            backgroundColor: '#FF6600',
            width: 150,
            height: 30,
            borderRadius: 20,
        marginLeft:15,
            borderWidth: 1,
            marginTop: 5
        
    }

})

export default st