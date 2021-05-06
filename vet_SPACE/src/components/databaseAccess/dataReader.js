import database from '@react-native-firebase/database';

export default async function dataReader(source) {
    const ref = database().ref(source);
    let data = await (await fetch(ref + '.json')).json();
    console.log(data);
    return data;
} 

/*
function dr(params) {
    const data = [];
    const datareader = database()
    .ref(params)
    .once('value')
    .then(snapshot => {
        data = snapshot.val();
        console.log('Data : ', snapshot.val());
    });
    setTimeout(function(){
        console.log("Reader : " + params);
    }, 1000);
    return data;
}
*/