let mode = "submit"

//clear form after submission
function clearForm() {
  
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
 document.getElementById("email").value = "";
 document.getElementById("password").value = "";
}

//update editted user information
let updatedUser= function(){
  let users= JSON.parse(localStorage.getItem("users"))
 
  let index=document.getElementById("index").value
 
  let updatedUser = {
   fullname: document.getElementById("name").value,
   phone: document.getElementById("phone").value,
   email: document.getElementById("email").value,
   password: document.getElementById("password").value,
 };
 
 const{fullname, phone, email, password} =updatedUser;
 console.log(updatedUser)
 if(!fullname || !phone || !email ||!password) {
   return
 
 } 
 
 console.log(updatedUser)
 users.splice(index, 1, updatedUser)
 localStorage.setItem("users", JSON.stringify(users))
   
 mode="submit"
 displayNewUsers();
 clearForm();
 }
 
 //ADD NEW USER
 let addUser= function(){
 let internalUsers = JSON.parse(localStorage.getItem("users")) || [];
 newUsers = {
   fullname: document.getElementById("name").value,
   phone: document.getElementById("phone").value,
   email: document.getElementById("email").value,
   password: document.getElementById("password").value,
 };
 
 const{fullname, phone, email, password}= newUsers
 if (!fullname ||  !phone||  !email ||  !password ) {
   //prevent submitting blank field
   return
 } else {
   internalUsers.push(newUsers);
   localStorage.setItem("users", JSON.stringify(internalUsers));
   clearForm();
   displayNewUsers();
 }
 }
 

let submit = window.document.getElementById("submit");
submit.addEventListener("click", (e) => {
  console.log(mode)
  e.preventDefault()
 if(mode === "submit"){
  addUser()

 }
 else{
  updatedUser()
 }

});




//DISPLAY NEW USER
let output = document.getElementById("output");
function displayNewUsers() {
  output.innerHTML = " ";
 let users = JSON.parse(localStorage.getItem("users"))|| [];

  for (let i = 0; i < users.length; i++) {
    let { fullname, phone, email, password } = users[i];

    const eachOutput = document.createElement("div");
    eachOutput.innerHTML = `
<main style=width:200px>
<p>${fullname}</p>
<p>${phone}</p>
<p>${email}</p>
<p>${password}</p>
<button style= "background-color:green; " onclick = "editUser(${i})" > Edit</button>
<button  style= "background-color:red" onclick="deleteUser(${i})"> Delete</button>

</main>
   `;
    output.appendChild(eachOutput);
  }
}
displayNewUsers();



//EDIT USER INFO

function editUser(index) {

  let details = JSON.parse(localStorage.getItem("users"));
  let { fullname, phone, email, password } = details[index];

  let inputName = document.getElementById("name");
  let inputPhone = document.getElementById("phone");
  let inputEmail = document.getElementById("email");
  let inputPassword = document.getElementById("password");

  inputName.value = fullname;
  inputPhone.value = phone;
  inputEmail.value = email;
  inputPassword.value = password;

  // let updateUser= document.getElementById("update")
  let hiddenInput =document.getElementById("index")

  mode="update"
  hiddenInput.value= index
 
 
}


//DELETE USER
function deleteUser(index) {
  const users = JSON.parse(localStorage.getItem("users")) ;
  users.splice(index, 1)


  localStorage.setItem("users", JSON.stringify(users))
  displayNewUsers()
}
