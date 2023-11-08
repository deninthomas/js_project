function deleteEmployee(employeeId) {
  delemppopon()
  const dlt = document.getElementById("delete_btn");
  dlt.addEventListener("click", function () {
    fetch(`http://localhost:3000/employees/${employeeId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        // FormValidationSuccessPopup();
        console.log(response);
        delconfon();
        readEmployee();
      }
    });
  });
}
function delemppopon(){
  const delemppop=document.getElementById('delete_employee');
  delemppop.style.display='block';
  over_layon()
}
function delemppopoff(){
  const delemppop=document.getElementById('delete_employee');
  delemppop.style.display='none';
  over_layoff()
}
function delconfon() {
  const ConfirmationPopup = document.getElementById("delconfirmationpopup");
  const employeeForm = document.getElementById("delete_employee");

  ConfirmationPopup.style.display = "block";
  employeeForm.style.display = "none";
}

function delconfoff(){
  const confirmationpopup=document.getElementById("delconfirmationpopup");
  confirmationpopup.style.display='none';
  over_layoff();
  
}

// function FormValidationSuccessPopup() {
//   const ConfirmationPopup = document.getElementById("confirmationpopup");
//   const employeeForm = document.getElementsByClassName("emp-form");

//   ConfirmationPopup.style.display = "block";
//   employeeForm.style.display = "none";
// }
function over_layon(){
  const over_lay = document.getElementById('over_lay');
    over_lay.style.display='block';
  }
  function over_layoff(){
    const over_lay = document.getElementById('over_lay');
    over_lay.style.display='none';
  }