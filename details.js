let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id);

function detailsEmployee(id) {
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((employee) => {
      console.log(employee);
      const dateOfBirth = employee.dob; // Replace with the actual date of birth
      const age = calculateAge(dateOfBirth);
      console.log("Age:", age);

      const employeeDetails = document.getElementById("detailsemp");

      employeeDetails.innerHTML = `
        <div style="position: relative;" class="col head pt-3">
                        <img src="resources/Background Image.png" alt="">
                    </div>
                    <div style="justify-content: center;" class="col profile_img d-flex">
                        <img src="http://localhost:3000/employees/${employee.id}/avatar">
                    </div>
                    <div style="flex-direction: column;text-align: center;" class="col emp_details d-flex">
                        <h5>${employee.firstName}</h5>
                        <p>${employee.email}</p>
                    </div>
                    <div class="row details mb-4">
                        <div class="col-4">
                            <div class="data">
                                <p>Gender</p>
                                <h6>${employee.gender}</h6>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="data">
                                <p>Age</p>
                                <h6>${age}</h6>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="data">
                                <p>Date of Birth</p>
                                <h6>${employee.dob}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-6">
                            <div class="data">
                                <P>Mobile Number</P>
                                <h6>${employee.phone}</h6>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="data">
                                <p>Qualifications</p>
                                <h6>${employee.qualifications}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-5">
                        <div class="col-6">
                            <div class="data">
                                <P>Address</P>
                                <h6>${employee.address}</h6>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="data pb-5">
                                <p>Username</p>
                                <h6>${employee.username}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="view_button mb-4 pb-5">
                    <button type="button" class="btn btn-primary">Delete</button>
                    <button class="btn menu_button" >Edit Details</button>
                </div>
       `;
    });
}

detailsEmployee(id);

// date of birth

function calculateAge(dateOfBirth) {
  // Parse the date of birth string into a Date object
  const dob = new Date(dateOfBirth);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDiff = currentDate - dob;

  // Calculate the age by dividing the difference in milliseconds by the number of milliseconds in a year
  const age = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));

  return age;
}

// Example usage:

