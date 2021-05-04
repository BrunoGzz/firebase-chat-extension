document.getElementById("send").addEventListener("click", send);
function send(){
    var message = document.getElementById("search").value;
    document.getElementById("search").value = "";
        firebase.database().ref("messages").push().set({
            "sender": "prueba",
            "message": message,
        });
        return false;
}