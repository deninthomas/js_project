async function readEmployee() {
  let temp = "";
  const display = 5; // Number of employees to display per page
  let currentPage = 1;

  const response = await fetch("http://localhost:3000/employees");
  const data = await response.json();

  const employeeTableBody = document.getElementById("employeetablebody");
  const paginationNumbers = document.getElementById("pagination-numbers");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  async function displayEmployees(page) {
    const startIndex = (page - 1) * display;
    const endIndex = startIndex + display;
    const displayedEmployees = data.slice(startIndex, endIndex);

    temp = "";
    for (let i = 0; i < displayedEmployees.length; i++) {
      const employee = displayedEmployees[i];
      temp += `<tr class="zero">
        <td>${startIndex + i + 1}</td>
        <td><img class="profile-img" src="http://localhost:3000/employees/${
          employee.id
        }/avatar">${employee.firstName + " " + employee.lastName}</td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td>${employee.gender}</td>
        <td>${employee.dob}</td>
        <td>${employee.country}</td>
        <td class="morebutton"><button class="more_button"><i class="fa-solid fa-ellipsis"></i></button>
                           <div class="dropdown-menu">
                           <div class="dropdown-item">
                          <button class="action" onclick="viewEmployee('${
                            employee.id
                          }')"><span><i class="fa-regular fa-eye"></i></span> View
                                  Details</button>
                              <button class="action" onclick="editEmployeeDetails('${
                                employee.id
                              }')"  data-bs-toggle="modal" data-bs-target="#edit_page" href="#"><span><i
                                      class="fa-solid fa-pen"></i></span> Edit</button>
                              <button class="action" onclick="deleteEmployee('${
                                employee.id
                              }')" data-bs-toggle="modal" data-bs-target="#delete_employee" ><i class="fa fa-sharp fa-light fa-trash" id="buttonDropdown_action"></i>Delete</button>
                            </div>
                            </div>
                          </td>
      </tr>`;
    }

    employeeTableBody.innerHTML = temp;
  }

  displayEmployees(currentPage);

  // Pagination logic
  const pageCount = Math.ceil(data.length / display);

  function updatePaginationButtons() {
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === pageCount;
  }

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.innerHTML = i;
    button.addEventListener("click", () => {
      currentPage = i;
      displayEmployees(currentPage);
      updatePaginationButtons();
    });
    paginationNumbers.appendChild(button);
  }

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayEmployees(currentPage);
      updatePaginationButtons();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < pageCount) {
      currentPage++;
      displayEmployees(currentPage);
      updatePaginationButtons();
    }
  });

  updatePaginationButtons();
}

readEmployee();

// view employee

function viewEmployee(employeeId) {
  const url = "http://127.0.0.1:5500/page2.html?";
  const obj = {
    id: employeeId,
  };
  const searchParams = new URLSearchParams(obj);
  const queryString = searchParams.toString();
  window.location.href = url + queryString;
}

// search
function searchbar() {
  let input, searchText, tableBody, tr, td, i, j, textValue;

  input = document.getElementById("search");
  searchText = input.value.toUpperCase();
  tableBody = document.getElementById("employeetablebody");
  tr = tableBody.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    let rowMatch = false;

    for (j = 0; j < td.length; j++) {
      if (td[j]) {
        textValue = td[j].textContent || td[j].innerText;
        if (textValue.toUpperCase().indexOf(searchText) > -1) {
          rowMatch = true;
          break;
        }
      }
    }
    if (rowMatch) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

// form validation
function FormValidation() {
  const image = document.getElementById("imgUpload").value;
  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("mob_num").value;
  const dob = document.getElementById("dob").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pincode = document.getElementById("zip_pin").value;
  const qualifications = document.getElementById("qualification").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const salutation = document.getElementById("salutation").value;

  var errormessageImage = document.getElementById("errormessageImage");
  var errorMessageSalutation = document.getElementById(
    "errormessageSalutation"
  );
  var errorMessageFirstName = document.getElementById("errormessageFirstname");
  var errorMessageLastName = document.getElementById("errormessageLastname");
  var errorMessageEmail = document.getElementById("errormessageEmail");
  var errorMessagePhone = document.getElementById("errormessagePhone");
  var errorMessageDob = document.getElementById("errormessageDob");
  var errorMessageAddress = document.getElementById("errormessageAddress");
  var errorMessageQualification = document.getElementById(
    "errormessageQualifications"
  );
  var errorMessageCountry = document.getElementById("errormessageCountry");
  var errorMessageState = document.getElementById("errormessageState");
  var errorMessageCity = document.getElementById("errormessageCity");
  var errorMessagePin = document.getElementById("errormessagePin");
  var errorMessageUsrName = document.getElementById("errormessageUsrname");
  var errorMessagePass = document.getElementById("errormessagePass");

  let hasError = false;
  const validNamePattern = /^[A-Za-z]+$/; // for name validation

  // salutation
  if (salutation === "") {
    errorMessageSalutation.style.display = "flex";
    hasError = true;
  } else {
    errorMessageSalutation.style.display = "none";
  }

  // first name
  if (firstName === "") {
    errorMessageFirstName.style.display = "flex";
    hasError = true;
  } else if (!validNamePattern.test(firstName)) {
    errorMessageFirstName.style.display = "flex";
    errorMessageFirstName.textContent = "Invalid characters in first name";
    hasError = true;
  } else {
    errorMessageFirstName.style.display = "none";
  }

  // last name
  if (lastName === "") {
    errorMessageLastName.style.display = "flex";
    hasError = true;
  } else if (!validNamePattern.test(lastName)) {
    errorMessageLastName.style.display = "flex";
    errorMessageLastName.textContent = "Invalid characters in last name";
    hasError = true;
  } else {
    errorMessageLastName.style.display = "none";
  }

  // email

  const validEmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (email === "") {
    errorMessageEmail.style.display = "flex";
    hasError = true;
  } else if (!validEmailPattern.test(email)) {
    errorMessageEmail.style.display = "flex";
    errorMessageEmail.textContent = "Invalid email format";
    hasError = true;
  } else {
    errorMessageEmail.style.display = "none";
  }

  // phone number
  const validPhonePattern = /^\d{10}$/;

  if (phone === "") {
    errorMessagePhone.style.display = "flex";
    hasError = true;
  } else if (!validPhonePattern.test(phone)) {
    errorMessagePhone.style.display = "flex";
    errorMessagePhone.textContent = "Invalid phone number";
    hasError = true;
  } else {
    errorMessagePhone.style.display = "none";
  }

  // dob

  if (dob === "") {
    errorMessageDob.style.display = "flex";
    hasError = true;
  } else {
    errorMessageDob.style.display = "none";
  }

  // address

  if (address === "") {
    errorMessageAddress.style.display = "flex";
    hasError = true;
  } else {
    errorMessageAddress.style.display = "none";
  }

  // qualification

  if (qualifications === "") {
    errorMessageQualification.style.display = "flex";
    hasError = true;
  } else {
    errorMessageQualification.style.display = "none";
  }

  // country

  if (country === "" || country == "Select a country") {
    errorMessageCountry.style.display = "flex";
    hasError = true;
  } else {
    errorMessageCountry.style.display = "none";
  }

  // state

  if (state === "" || state == "Select a state") {
    errorMessageState.style.display = "flex";
    hasError = true;
  } else {
    errorMessageState.style.display = "none";
  }

  // city

  if (city === "" || city == "Select a city") {
    errorMessageCity.style.display = "flex";
    hasError = true;
  } else {
    errorMessageCity.style.display = "none";
  }

  // pincode
  if (pincode === "") {
    errorMessagePin.style.display = "flex";
    hasError = true;
  } else {
    errorMessagePin.style.display = "none";
  }

  // usr name

  if (username === "") {
    errorMessageUsrName.style.display = "flex";
    hasError = true;
  } else {
    errorMessageUsrName.style.display = "none";
  }

  // password

  if (password === "") {
    errorMessagePass.style.display = "flex";
    hasError = true;
  } else {
    errorMessagePass.style.display = "none";
  }

  return !hasError;
}
