import database from '@react-native-firebase/database';

export default async function dataWriter(source) {
    const ref = database().ref(source,data);
    //let data = await (await fetch(ref + '.json')).json();
    try{
        ref.set(data);
    }catch{

    }
    console.log("data Set" + data);
    return;
} 
