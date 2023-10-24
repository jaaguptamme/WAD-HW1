function toggleDropDown(){
    let DropDown=document.getElementById("dropDown");
    if(DropDown.style.display!="none"){
        DropDown.style.display="none";
    }else{
        DropDown.style.display="block";
    }
}

function addPostToPage(postJSON){
    let postsDiv = document.getElementById("Posts");
    let newDiv = document.createElement("div");
    let topRowDiv=document.createElement("div");
    topRowDiv.classList.add("topRow");
    
    newDiv.appendChild(topRowDiv);
    let topRowaTag=document.createElement("a");
    topRowaTag.classList.add("postericon");
    let topRowPicture=document.createElement("img");
    topRowPicture.setAttribute("src","res/images/icon.jpg");
    topRowaTag.appendChild(topRowPicture);
    topRowDiv.appendChild(topRowaTag);
    let dateElement=document.createElement("p");
    dateElement.innerText=postJSON.date;
    topRowDiv.appendChild(dateElement);
    newDiv.appendChild(topRowDiv);
    
    if("pictureLink" in postJSON){
        newDiv.classList.add("PostPhoto");
        let pictureElement=document.createElement("img");
        pictureElement.setAttribute("src",postJSON.pictureLink);
        pictureElement.classList.add("contentpicture");
        newDiv.appendChild(pictureElement);
    }else{
        newDiv.classList.add("PostText");
    }

    let textElement=document.createElement("p");
    textElement.innerText=postJSON.text;
    newDiv.appendChild(textElement);

    let likeElement=document.createElement("a");
    likeElement.classList.add("likeicon");
    let likePicture=document.createElement("img");
    likePicture.setAttribute("src","res/images/like.png");
    likeElement.appendChild(likePicture);
    newDiv.appendChild(likeElement);
    postsDiv.appendChild(newDiv);
}


let logoA=document.querySelector(".logo");
let newDiv=document.createElement("div");
newDiv.id="dropDown";
let nameP=document.createElement("p");
nameP.innerText="John Doe";
let emailP=document.createElement("p");
emailP.innerText="john.doe@ut.ee";
let logoutP=document.createElement("p");
logoutP.innerText="logout";
newDiv.appendChild(nameP);
newDiv.appendChild(emailP);
newDiv.appendChild(logoutP);
logoA.after(newDiv);

document.querySelector(".logo img").addEventListener('click',toggleDropDown);
toggleDropDown();

if(document.querySelector("#Posts")){
    fetch("res/posts.json")
    .then((res) => res.json())
    .then((posts) => {
        for(post of posts){
            addPostToPage(post);
        }
    })
    fetch("https://api.npoint.io/8dc6ed75e0b80340df78")
    .then((res) => res.json())
    .then((posts) => {
        for(post of posts){
            addPostToPage(post);
        }
    })
    /*let text='';
   
    console.log(j);
    addPostToPage(j);

    text='';
    
    console.log(j);*/
}