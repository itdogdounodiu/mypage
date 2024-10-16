/* I declare that the lab work here submitted is original
except for source material explicitly acknowledged,
and that the same or closely related material has not been
previously submitted for another course.
I also acknowledge that I am aware of University policy and
regulations on honesty in academic work, and of the disciplinary
guidelines and procedures applicable to breaches of such
policy and regulations, as contained in the website.
University Guideline on Academic Honesty:
https://www.cuhk.edu.hk/policy/academichonesty/
Student Name : Fong Ka Wai
Student ID : 1155177052
Class/Section : CSCI2720
Date : 18/10/2023 */
function showhide() {
  var text = document.getElementById("togglebutton");
  var div = document.getElementById("button-container");

  if (div.className === "collapse show") {
    div.className = "collapse";
    text.textContent = "Show";
  }
  else if (div.className != "show") {
    div.className = "collapse show";
    text.textContent = "Hide";
  }
}

function progresshidshow() {
  var div = document.getElementById("progressbar");
  if (div.style.display === "none") {
    div.style.display = "flex";
  }
  else {
    div.style.display = "none";

  }
}

function changealign() {
  var div = document.getElementById("task1");
  if (div.align === "left") div.align = "center";
  else if (div.align === "center") div.align = "right";
  else if (div.align === "right") div.align = "left";

}

function spotlight() {
  let content = prompt("Enter a spotlight of the celebrity.");
  if(!content){
    return false;
  }
  let newspotlight = document.createElement("div");
  let element = '<p></p>';
  newspotlight.innerHTML = element;

  newspotlight.className = "card";
  newspotlight.id = "Card";


  newspotlight.querySelector("p").innerHTML = content;

  document.querySelector("#spotlight").appendChild(newspotlight);
}

const filled = document.getElementById("pgsbar");

function scroll() {
  filled.style.width = `${(window.scrollY / (document.body.clientHeight - window.innerHeight)) * 100}%`;
  requestAnimationFrame(scroll);
}
scroll();

function submitcomment() {

  let returnvalue=0;
  let newComment = document.createElement("div");
  let element = '<div><svg height="80" width="80"><circle cx="30" cy="30" r="23"></svg></div><div><p></p><p></p></div>';
  newComment.innerHTML = element;

  newComment.className = "comment_area d-flex bg-light";
  
  let lastComment = document.querySelector("#comment-inner").lastElementChild;
  newComment.id = 'c' + (Number(lastComment.id.substr(1))+1);
  
  newComment.querySelectorAll("div")[0].className = "flex-shrink-0";
  newComment.querySelectorAll("div")[1].className = "flex-grow-1";
  
  var mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
  if (!document.querySelector("#new-comment").value) {
    document.querySelector("#new-comment").classList.add("is-invalid");
    document.querySelector("form").reset();
    returnvalue=1;
  }
  
  if(!document.querySelector("#new-email").value.match(mailformat)){
    document.querySelector("#new-email").classList.add("is-invalid");
    document.querySelector("form").reset();
    returnvalue=1;
  }
  
  if(!document.querySelectorAll("input[name=color]:checked")[0].value){
    returnvalue=1;
  }
  
  if(returnvalue==1){
    return false;
  }
  
  if(document.querySelector("#new-email").value.match(mailformat)){
    newComment.querySelectorAll("p")[0].innerHTML = document.querySelector("#new-email").value;
    newComment.querySelectorAll("p")[0].id = "email";
    newComment.querySelectorAll("p")[1].innerHTML = document.querySelector("#new-comment").value;
    newComment.querySelectorAll("p")[1].id = "cmt";
    
    let color = document.querySelectorAll("input[name=color]:checked")[0].value;
   
    newComment.querySelector("circle").setAttribute("fill", color);
    document.querySelector("#comment-inner").appendChild(newComment);
     savefile();
    document.querySelector("form").reset();
    document.querySelector("#new-email").classList.remove("is-invalid");
    document.querySelector("#new-comment").classList.remove("is-invalid");
    
    return true;
  }
}



function loadfile(){ 
  
  let newComment = document.createElement("div");
  let element = '<div><svg height="80" width="80"><circle cx="30" cy="30" r="23"></svg></div><div><p></p><p></p></div>';
  newComment.innerHTML = element;

  newComment.className = "comment_area d-flex bg-light";
  newComment.querySelectorAll("p")[0].id = "email";
  newComment.querySelectorAll("p")[1].id = "cmt";
  
  let lastComment = document.querySelector("#comment-inner").lastElementChild;
  newComment.id = 'c' + (Number(lastComment.id.substr(1))+1);
  
  newComment.querySelectorAll("div")[0].className = "flex-shrink-0";
  newComment.querySelectorAll("div")[1].className = "flex-grow-1";


    fetch("data") 
      .then(response => response.json())
      .then(data => {
        
        newComment.querySelectorAll("p")[0].innerHTML = data.email;
        newComment.querySelectorAll("p")[1].innerHTML = data.text;
        newComment.querySelector("circle").setAttribute("fill", data.color);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
      
      document.querySelector("#comment-inner").appendChild(newComment);
}


function savefile(){
  const cmt = {
    text: document.querySelector("#new-comment").value,
    email: document.querySelector("#new-email").value,
    color: document.querySelectorAll("input[name=color]:checked")[0].value
  };

    fetch("data", {
    method:'POST',
    body: JSON.stringify(cmt),
    headers: {
      "Content-Type":"application/json",
    }
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
}

document.addEventListener("DOMContentLoaded", function() {loadfile()
});




