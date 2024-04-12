const socket = io();
let typemsg = document.querySelector("#type-msg");
let uname;

// user join
document.querySelector("#join").addEventListener("click", () => {
  let username = document.querySelector("#username").value;
  if (username.length == 0) {
    return;
  }
  socket.emit("username", username);
  uname = username;
  document.querySelector(".user-area").classList.add("screenHide");
  document.querySelector(".msg-area").classList.remove("screenHide");
  document.querySelector(".type-msg").classList.remove("screenHide");
});

// sending message 
document.querySelector("#send-msg").addEventListener("click", () => {
  let getMsg = document.querySelector("#type-msg").value;
  let getFile = document.querySelector("#file").value;

  console.log(getFile, "ff");
  document.querySelector("#type-msg").value = "";
  console.log(getMsg, "getmsg#2");
  if (getFile) {


  }

  let sendMsgorFile = getFile
    ? getFile
    : (chatMsg = {
        username: uname,
        message: getMsg,
        date: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

  socket.emit("chat", sendMsgorFile);

  let mainDiv = document.createElement("p");

  mainDiv.classList.add("rightSide");
  let markup = `<p><span style="font-size:10px;font-weight:"bold"><- You </span> </br> <span style="font-size:15px"> ${sendMsgorFile.message}</span>  <span style="font-size:10px">${sendMsgorFile.date} </span></p>`;
  mainDiv.innerHTML = markup;
  document.querySelector(".msg-area").appendChild(mainDiv);
});

// receving msg
socket.on("chat", (message) => {
  let mainDiv = document.createElement("p");
  mainDiv.classList.add("leftSide");
  let markup = `<p><span style="font-size:10px;font-weight:"bold">-> ${message.username} </span> </br> <span style="font-size:15px"> ${message.message}</span>  <span style="font-size:10px">${message.date} </span></p>`;
  mainDiv.innerHTML = markup;
  document.querySelector(".msg-area").appendChild(mainDiv);
});
