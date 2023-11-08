// function add_emp(){
//     const add_emp=document.getElementById("add_button");
//     add_emp.style.display="block";
// }
// js for creating and submitting new user/employee
const empForm_fetch = document.getElementById("add_emp_btn");
empForm_fetch.addEventListener("click", function (e) {
  e.preventDefault();
  const salutation = document.getElementById("salutation").value;
  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("mob_num").value;
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  console.log(gender);
  //function for converting the format of date from yyyy-mm-dd to dd-mm-yyyy
  var dateofbirth = changeformat(dob);
  function changeformat(val) {
    const Array = val.split("-");
    let year = Array[0];
    let month = Array[1];
    let day = Array[2];
    let formatteddate = day + "-" + month + "-" + year;
    return formatteddate;
  }
  //const gender = document.querySelector('input[name="gender"]:checked').value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pincode = document.getElementById("zip_pin").value;
  const qualifications = document.getElementById("qualification").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // Create a new employee object
  const newEmployee = {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    dob: dateofbirth,
    gender,
    address,
    country,
    state,
    city,
    pincode,
    qualifications,
    username,
    password,
  };


  // VALIDATION
  console.log("before validation/validation error!");
  console.log(newEmployee);
  // Sending the employee data to the server
  console.log(FormValidation()); //for printing the rturn value form the function
  FormValidation();
    console.log("after validation");
    console.log(newEmployee);


    if (FormValidation()){
    fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })

      .then((res) => res.json())
      .then(data => {
          console.log('Employee added:', data);
          console.log(data.id);
          // image upload 
          const imgUpload = document.getElementById('imgUpload');
          const formData = new FormData();
          formData.append("avatar", imgUpload.files[0]);
          fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
              method: 'POST',
              body: formData,
          })
              .then(res => {
                  console.log(res);
                  // closeemployee();
                  FormValidationSuccessPopup();
              
                })

      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
    }
});
function clearForm() {
  document.getElementById("first_name").value = "";
  document.getElementById("last_name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mob_num").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("address").value = "";
  document.getElementById("country").value = "";
  document.getElementById("state").value = "";
  document.getElementById("city").value = "";
  document.getElementById("zip_pin").value = "";
  document.getElementById("qualification").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("salutation").value = "";
}

function FormValidationSuccessPopup() {
  const ConfirmationPopup = document.getElementById("addconfirmationpopup");
  const employeeForm = document.getElementById("exampleModal");

  ConfirmationPopup.style.display = "block";
  employeeForm.style.display = "none";
}

function closevalpopup(){
  const confirmationpopup=document.getElementById("addconfirmationpopup");
  confirmationpopup.style.display='none';
  over_layoff();
  
}
function over_layon(){

const over_lay = document.getElementById('over_lay');
  over_lay.style.display='block';
}
function over_layoff(){
  const over_lay = document.getElementById('over_lay');
  over_lay.style.display='none';
}
function openadd_emp(){
  clearForm()

  const  add_em=document.getElementById('exampleModal');
  add_em.style.display='block';
  over_layon()
  

}
function closeadd_emp(){
  const  add_em=document.getElementById('exampleModal');
  add_em.style.display='none';
  over_layoff()
}