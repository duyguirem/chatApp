console.log("dddddd")

var xhr = new XMLHttpRequest();
var chatMessages = [];

var myChat = new InteractiveChat();
/*myChat.init({
    container: document.getElementById("dom-id"),
    target: ​"http://localhost"
})
*/
function InteractiveChat() {
    this.dump = function () {
        console.log("as")

        var url = "http://localhost:3000/read";
        xhr.onreadystatechange = function() {
            console.log(xhr.status, xhr.responseText)
            if ( xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log("json",json)
                //document.getElementById("chatMsg").value(json)
            }
        };

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type", "application/json", "XMLHttpRequest");
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
        xhr.send();

    }
    this.onMessageSent = function () {
        console.log("1")
    }
    this.init = function () {
        console.log("init")
    }
    this.init();
}


setInterval(function() {
    var messages = myChat.dump();
}, 1000);

myChat.onMessageSent = function (message) {
    console.log("2",message)

    window.onkeyup = function(e) {
        console.log(e)
        if (e.keyCode === 13) {

            var sendObje = {
                "nickname": document.getElementById("nickname").value,
                "message": document.getElementById("message").value
            }

            var url = "http://localhost:3000/send?nickname="+document.getElementById("nickname").value+"&message="+document.getElementById("message").value;
console.log(url)
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8", "Access-Control-Allow-Headers=origin");
            xhr.setRequestHeader("Authorization", "Basic[anvato2017]")
            if(chatMessages.length == 0)

            xhr.onreadystatechange = function() {
                if ( xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log("json",json.nickname)
                }
            };

            /*
            var sendObject = JSON.stringify({
                "nickname": "aa",
                "message": "bb"
            })
            xhr.send(sendObject);
            */

            xhr.send();

        }
    }


}

myChat.onMessageSent()