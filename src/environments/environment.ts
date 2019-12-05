export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAHkpKhDXw4yndq8UlACM74vWByCx83Yso",
  authDomain: "timeskip-d7f8c.firebaseapp.com",
  databaseURL: "https://timeskip-d7f8c.firebaseio.com",
  projectId: "timeskip-d7f8c",
  storageBucket: "timeskip-d7f8c.appspot.com",
  messagingSenderId: "717083745228",
  appId: "1:717083745228:web:2b0a4f183465836d2cdb69",
  measurementId: "G-QTB6KKQS9P"
  }

}

  export const snapshotToArray = snapshot => {
    let returnArray  = [];
    snapshot.forEach(element => {
    let prod = element.val();
    prod.key = element.key;
    returnArray.push(prod);
    });
    return returnArray;
  }
