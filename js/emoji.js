firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
document.getElementById("emoji1").addEventListener("click", emoji1);

function emoji1(){
  document.getElementById("search").value += "😎 ";
}
document.getElementById("emoji2").addEventListener("click", emoji2);

function emoji2(){
  document.getElementById("search").value += "🤡 ";
}
document.getElementById("emoji3").addEventListener("click", emoji3);

function emoji3(){
  document.getElementById("search").value += "👍 ";
}
document.getElementById("emoji4").addEventListener("click", emoji4);

function emoji4(){
  document.getElementById("search").value += "😱 ";
}
document.getElementById("emoji5").addEventListener("click", emoji5);

function emoji5(){
  document.getElementById("search").value += "😡 ";
}
document.getElementById("emoji6").addEventListener("click", emoji6);

function emoji6(){
  document.getElementById("search").value += "😂 ";
}
document.getElementById("emoji7").addEventListener("click", emoji7);

function emoji7(){
  document.getElementById("search").value += "😅 ";
}
document.getElementById("emoji8").addEventListener("click", emoji8);

function emoji8(){
  document.getElementById("search").value += "😍 ";
}
}
});