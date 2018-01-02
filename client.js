var xhr = new XMLHttpRequest();
var chatMessages = [];

var myChat = new InteractiveChat();
myChat.init({
    container: document.getElementById("dom-id")
    //target: ​"http://localhost"
})

function InteractiveChat() {
    this.dump = function (callback) {
        var data = null;

        var url = "http://localhost:3000/read";
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var json = JSON.parse(xhr.responseText);

                var chat = "";
                for( var i = 0; i<json.length; i++){
                    var p = "<p><span style='font-weight:bold;'>"+json[i].nickname+"</span> : "+json[i].message+"</p>";
                    chat += p;
                }

                var chatInfo = document.getElementById("chatMsg");
                chatInfo.innerHTML = chat;
                callback(this.responseText);
            }
        });

        xhr.open("GET", url);
        xhr.setRequestHeader("Content-type", "application/json", "XMLHttpRequest");
        xhr.send(data);


    }
    this.onMessageSent = function () {
        console.log("sent")
    }
    this.init = function () {
        console.log("init")
    }
    this.init();
}


setInterval(function() {
    var messages = myChat.dump(function(data){
        console.log("callback done", data);
    })
}, 1000);


myChat.onMessageSent = function (message) {

    window.onkeyup = function(e) {
        if (e.keyCode === 13) {
            if (document.getElementById("nickname").value != "" && document.getElementById("message").value != "") {

                var url = "http://localhost:3000/send?nickname=" + document.getElementById("nickname").value + "&message=" + document.getElementById("message").value;
                xhr.open("GET", url, true);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8", "Access-Control-Allow-Headers=origin");
                xhr.setRequestHeader("Authorization", "Basic[anvato2017]")
                if (chatMessages.length == 0)

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                    }
                };

                xhr.send();

                document.getElementById("nickname").value = "";
                document.getElementById("message").value = "";
                document.getElementById("error").innerHTML = "";

            }
            else {
                console.log("err")
                var errorInfo = document.getElementById("error");
                errorInfo.innerHTML = "<p>Lütfen isim ve mesaj alanını doldurunuz!</p>";
            }
        }

    }
}

myChat.onMessageSent()