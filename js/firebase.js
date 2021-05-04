var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
var objDiv = document.getElementById("main-chat");
  objDiv.scrollTop = objDiv.scrollHeight;

document.getElementById("send").addEventListener("click", send);
function send(){
  var user = firebase.auth().currentUser;
  if (user != null) {
  user.providerData.forEach(function (profile) {
    var message = document.getElementById("search").value;
    if(document.getElementById("search").value.trim() === ""){
       document.getElementById("alert").innerHTML = "¡Mensaje no valido!";
      document.getElementById("search").value = "";
      return false;
      }else{
         date = new Date();
        document.getElementById("search").value = "";
        if(date.getMinutes() < 10){
          var minutes = "0"+date.getMinutes();
        }else{
          var minutes = date.getMinutes();
        }
        firebase.database().ref("messages").push().set({
            "sender": profile.displayName,
            "message": message.replace(/</g, "&lt", />/g, "&gt", /"/g, "&quot", /&/g, "&amp"),
            "date" : date.getDate()+"/"+date.getMonth()+1+"    "+date.getHours()+":"+minutes
        });
        $("#main-chat").animate({ scrollTop: $('#main-chat').prop("scrollHeight")}, 1000);
        document.getElementById("alert").innerHTML = "";
        return false;
      }
    });
  }
}

firebase.database().ref("messages").on("child_added", function (snapshot) {
  var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
  var html = "";
    if (snapshot.val().sender == profile.displayName) {
        html += "<div>";
        html += "<p class='pm' id='message-"+ snapshot.key + "' style='width:auto;'>";
        html += snapshot.val().message;
        html += "</p>";
        html += "<p class='pm-date'>"+snapshot.val().date+"</p>";
        html += "</div>";
        document.getElementById("messages").innerHTML += html;
    }
    
    if (snapshot.val().sender != profile.displayName) {
        html += "<div>";
        html += "<p class='am-name'>"+ snapshot.val().sender +"</p>";
        html += "<p name='date' id='message-"+ snapshot.key + "' style='width:auto;' class='am'>";
        html += snapshot.val().message;
        html += "</p>";
        html += "<p class='am-date'>"+snapshot.val().date+"</p>";
        html += "</div>"
        document.getElementById("messages").innerHTML += html;
    }
    var objDiv = document.getElementById("main-chat");
    objDiv.scrollTop = objDiv.scrollHeight;
    var container_charge = document.getElementById("container_charge");
    container_charge.style.visibility = "hidden";
    container_charge.style.opacity = "0";
});
}
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
        //Usuario conectado
        var user2 = firebase.auth().currentUser;
        user2.providerData.forEach(function (profile) {
          document.getElementById("user_photo").src = profile.photoURL;
          document.getElementById("user_photo").title = "Sesion Iniciada con: "+profile.displayName+" | "+profile.email;
          document.getElementById("search").title = "¡Escribe Algo!";
        });
  }else{
    $("#send").prop('disabled', true);
    $("#emoji1").prop('disabled',true);
    $("#emoji2").prop('disabled',true);
    $("#emoji3").prop('disabled',true);
    $("#emoji4").prop('disabled',true);
    $("#emoji5").prop('disabled',true);
    $("#emoji6").prop('disabled',true);
    $("#emoji7").prop('disabled',true);
    $("#emoji8").prop('disabled',true);
    $("#search").prop('disabled',true); 
    document.getElementById("search").placeholder = "Inicia Sesión para chatear";
    document.getElementById("user_photo").addEventListener("click", Login);
    var container_charge = document.getElementById("container_charge");
    container_charge.style.visibility = "hidden";
    container_charge.style.opacity = "0";

    console.log("holas");
  }
});

    function Login() {
    //first of all create google provider object
    console.log("hola");
    var provider = new firebase.auth.GoogleAuthProvider();
    //Login with popup window
    firebase.auth().signInWithPopup(provider).then(function () {
        //code executes after successful login
        var user = firebase.auth().currentUser;
        user.providerData.forEach(function (profile) {
          document.getElementById("user_photo").src = profile.photoURL;
          document.getElementById("user_photo").title = "Sesion Iniciada con"+profile.email;
          document.getElementById("search").title = "¡Escribe Algo!";
          var container_charge = document.getElementById("container_charge");
          container_charge.style.visibility = "hidden";
          container_charge.style.opacity = "0";
          document.getElementById("messages").innerHTML = "<h1>Recarga la extensión para acceder</h1>";
        });
    }).catch(function (error) {
        var errorMessage=error.message;
        alert(errorMessage);
    });
}