

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBr1b2r0iIbtDTH8jhp2sciHdBNO3GoNys",
    authDomain: "onlineshop18-8e218.firebaseapp.com",
    databaseURL: "https://onlineshop18-8e218.firebaseio.com",
    projectId: "onlineshop18-8e218",
    storageBucket: "onlineshop18-8e218.appspot.com",
    messagingSenderId: "952922018507"
  };
  firebase.initializeApp(config);
  console.log("firebase loaded"+firebase);

  function* autoGen(){

    console.log("inside utils");
    
    var counter=1;

    console.log(id);
    
    while(true){
      
      yield counter;
      counter++;
    }
  }