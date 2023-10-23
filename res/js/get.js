let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("GET", "https://api.jsonbin.io/v3/b/65368a6d12a5d376598f7604/latest", true);
req.setRequestHeader("X-Master-Key", "$2a$10$J9LawyOMyoV/ZoLv64cVKukFwciYUQT4ZhwO.hSddzc9BaAzmnHpa");
req.send();