// Edit popup
function changeDateFormat(v) {
  const arr = v.split("-");
  let formattedDate = `${arr[2]}-${arr[1]}-${arr[0]}`;
  return formattedDate;
}

function editEmployeeDetails(employeeId) {
  console.log(employeeId);
  fetch(`http://localhost:3000/employees/${employeeId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((employees) => {
      console.log(employees);
      openeditemployee();

      document.getElementById("editsalutation").value = employees.salutation;
      document.getElementById("editfirstname").value = employees.firstName;
      document.getElementById("editlastname").value = employees.lastName;
      document.getElementById("editemail").value = employees.email;
      document.getElementById("editmobile").value = employees.phone;
      let currentDob = employees.dob;
      let dobEdit = changeDateFormat(currentDob);
      console.log(dobEdit);
      document.getElementById("editdatepicker").value = dobEdit;
      document.querySelector(
        `input[name="editgender"][value="${employees.gender}"]`
      ).checked = true;
      document.getElementById("editaddress").value = employees.address;
      document.getElementById("editqualification").value =
        employees.qualifications;
      document.getElementById("editcountry").value = employees.country;
      document.getElementById("editstate").value = employees.state;
      document.getElementById("editcity").value = employees.city;
      document.getElementById("editzip_pin").value = employees.pincode;
      document.getElementById("editUserName").value = employees.username;
      document.getElementById("editpassword").value = employees.password;
    });

  // Save changes event
  const saveChangesBtn = document.getElementById("saveChanges");
  saveChangesBtn.addEventListener("click", () => {
    const dateOfBirth = document.getElementById("editdatepicker").value;
    var dobFormatted = changeDateFormat(dateOfBirth);

    const editedEmployee = {
      salutation: document.getElementById("editsalutation").value,
      firstName: document.getElementById("editfirstname").value,
      lastName: document.getElementById("editlastname").value,
      email: document.getElementById("editemail").value,
      phone: document.getElementById("editmobile").value,
      dob: dobFormatted,
      gender: document.querySelector('input[name="editgender"]:checked').value,
      address: document.getElementById("editaddress").value,
      qualifications: document.getElementById("editqualification").value,
      country: document.getElementById("editcountry").value,
      state: document.getElementById("editstate").value,
      city: document.getElementById("editcity").value,
      pincode: document.getElementById("editzip_pin").value,
      username: document.getElementById("editUserName").value,
      password: document.getElementById("editpassword").value,
    };

    console.log(editedEmployee);

    fetch(`http://localhost:3000/employees/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedEmployee),
    })
      .then((res) => res.json())
      .then((employee) => {
        console.log(employee);
        
      });
  });
}
function openeditemployee(){
  const openeditemployee=document.getElementById("edit_page");
  openeditemployee.style.display='block';
  over_layon()
}
function closeeditemployee(){
  const edit_page=document.getElementById("edit_page");
  edit_page.style.display='none';
  over_layoff()
}
