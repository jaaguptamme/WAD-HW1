function toggleDropDown(){//function that changes the state of icon dropdown 
    let DropDown=document.getElementById("dropDown");//Get that div by id
    if(DropDown.style.display!="none"){//If its shown, then hide
        DropDown.style.display="none";
    }else{//Otherwise show it
        DropDown.style.display="block";
    }
}
//Function that adds a single post to end of index page
function addPostToPage(postJSON){//JSON object of post
    let postsDiv = document.getElementById("Posts");//Get id of div of all posts
    let newDiv = document.createElement("div");//Create new div for this post
    let topRowDiv=document.createElement("div");//And one for top row (author + date)
    topRowDiv.classList.add("topRow");//Add the right class to it
    
    newDiv.appendChild(topRowDiv);
    let topRowaTag=document.createElement("a");//Creating element for author icon
    topRowaTag.classList.add("postericon");//Add the right class to it
    let topRowPicture=document.createElement("img");//Inside it lets create an img tag
    topRowPicture.setAttribute("src",postJSON.icon);//Load img from JSON
    topRowaTag.appendChild(topRowPicture);//Add img tag inside a tag
    topRowDiv.appendChild(topRowaTag);
    let dateElement=document.createElement("p");//Lets create date element
    dateElement.innerText=postJSON.date;//Add the date from JSON object as its text
    topRowDiv.appendChild(dateElement);
    newDiv.appendChild(topRowDiv);//Add top row to post div
    
    if("pictureLink" in postJSON){//If link to picture in JSON
        newDiv.classList.add("PostPhoto");//Then its a post with a photo
        let pictureElement=document.createElement("img");//Create an img tag
        pictureElement.setAttribute("src",postJSON.pictureLink);//With the right image, src from JSON
        pictureElement.classList.add("contentpicture");//Add photo class to this picture
        newDiv.appendChild(pictureElement);
    }else{//Otherwise we have only text post
        newDiv.classList.add("PostText");
    }

    let textElement=document.createElement("p");//Every post has text so we need a paragraph element
    textElement.innerText=postJSON.text;//With text from JSON
    newDiv.appendChild(textElement);

    let likeElement=document.createElement("a");//Every post also has like icon
    likeElement.classList.add("likeicon");//Add the right class to it
    let likePicture=document.createElement("img");
    likePicture.setAttribute("src","res/images/like.png");//And choose the correct icon
    likeElement.appendChild(likePicture);
    newDiv.appendChild(likeElement);
    postsDiv.appendChild(newDiv);
}

//JSON to append Dropdown menu to page HTML
let logoA=document.querySelector(".logo");//Select user icon on top right of the screen
let newDiv=document.createElement("div");//Lets create a new div element after it
newDiv.id="dropDown";//It has certain ID, so its formated correctly with CSS
let nameP=document.createElement("p");//Add username as first row
nameP.innerText="John Doe";//Values are hardcoded, but also could easily be fetched from external source like posts
let emailP=document.createElement("p");//Then email address
emailP.innerText="john.doe@ut.ee";
let logoutP=document.createElement("p");//And lastly logout
logoutP.innerText="logout";
newDiv.appendChild(nameP);//Add all rows to this div
newDiv.appendChild(emailP);
newDiv.appendChild(logoutP);
logoA.after(newDiv);//And lets add div elemnt after logo

document.querySelector(".logo img").addEventListener('click',toggleDropDown);//Lets add a listener to activate toggling when user click
toggleDropDown();//Lets run it one time to hide the dropdown at first

if(document.querySelector("#Posts")){//If we are at the posts page, not any other
    fetch("res/posts.json")//Then read in posts file
    .then((res) => res.json())//Convert it to JSON
    .then((posts) => {
        for(post of posts){//For each post, we add it to the end of all posts
            addPostToPage(post);
        }
    })
    fetch("https://api.npoint.io/8dc6ed75e0b80340df78")//Read JSON file from api endpoint
    .then((res) => res.json())//Parse it as JSON
    .then((posts) => {
        for(post of posts){//Add each post to end of the posts
            addPostToPage(post);
        }
    })
    /*let text='';
   
    console.log(j);
    addPostToPage(j);

    text='';
    
    console.log(j);*/
}