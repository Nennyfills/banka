
let adminView = `
< !DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Banka | View</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" type="text/css" media="screen" href="./css-folder/main.css" />
        <link rel="shortcut icon" href="../public/bicon.ico" type="image/x-icon">
        <link rel="apple-touch-icon" href="../public/bicon.png">
        <link rel="icon" sizes="192x192" href="../public/bicon.png">
    </head>

    <body>
        <label for="mobileShowmenu" class="mobileShowmenu">Show Menu</label>
        <input type="checkbox" role="button" id="mobileShowmenu" />
        <div class="sidemenu">
            <nav>
                <div class="logo">
                    <h1><span>B</span>anka</h1>
                </div>
                <ul>
                    <li>
                        <a href="./dashboard-admin.html">
                            <img src="../public/dashboard.svg" alt="" class="icon" />Dashboard</a>
                    </li>
                    <li>
                        <a class="active" href="./accounts.html">
                            <img src="../public/account.svg" alt="" class="icon" />Account</a>
                    </li>

                    <li>
                        <a href=""><img src="../public/drop-down-arrow.svg" alt="" class="icon" />Create Account</a>
                        <ul class="hidden">
                            <li>
                                <a href="./create-staff.html"><img src="../public/createicon.svg" alt="" class="icon" />Staff
                                    Account</a>
                            </li>
                            <li>
                                <a href="./create-admin.html"><img src="../public/createicon.svg" alt="" class="icon" />Admin
                                    Account</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
        <header>
            <div class="userarea">
                <div id="logout">
                    <a href="../index.html"><strong>Log Out</strong></a>
                </div>
                <div class="userimage">
                    <img src="../public/nenny1.jpg" alt="" />
                </div>
                <div class="username">
                    <p>
                        Welcome "<span> <strong>Admin1</strong></span>"
                    </p>
                </div>
            </div>
        </header>
        <div id="c"></div>
        <div class="content-area">
            <div class="heading">
                <h1>Account Detail</h1>
            </div>
            <div class="cards">
                {/* <div id="viewStaff" class="showStaff"></div>
                <div id="viewAdmin" class="showAdmin"></div> */}
                <div class="go-back">
                    <a href="./accounts.html">Go Back</a>
                </div>
                <div class="card-view">
                    <h2 class="name-header">
                        <strong>Name</strong>: <span class="name">Ike Peter Joe</span>
                    </h2>
                    <h2 class="account-header">
                        <strong>account</strong>: <span class="account">0965537892</span>
                    </h2>
                    <h2 class="cell-header">
                        <strong>Phone Number</strong>: <span class="cell">0965537892</span>
                    </h2>
                    <h2 class="email-header">
                        <strong>Email</strong>: <span class="email">peterike@gmail.com</span>
                    </h2>
                    <h2 class="address-header">
                        <strong>Address</strong>: <span class="address">Plot 7 Uyo close</span>
                    </h2>
                    <h2 class="dob-header">
                        <strong>Date Of Birth</strong>: <span class="dob">12/3/0998</span>
                    </h2>
                    <h2 class="created-on-header">
                        <strong>Created On</strong>:{" "}
                        <span class="created-on">03-18-2009, 01:29 pm</span>
                    </h2>
                    <h2 class="account-balance-header">
                        <strong>Account Balance</strong>:
                        <span class="account-balance">#50000</span>
                    </h2>
                    <h2 class="type-header">
                        <strong>Type</strong>:<span class="type">Current Acount</span>
                    </h2>
                    <h2 class="view-active-header">
                        Active: <span /> <strong class="badge-success view-active">Active</strong>
                    </h2>
                    <button type="submit" class="primary-btn btn-float-left delete-btn" onclick="openModal('simpleModalDelete')">
                        Delete
                    </button>
                    <button type="submit" class="primary-btn btn-float-right" onclick="openModal('simpleModalDeactivate')">
                        Deactivate
                    </button>
                </div>
            </div>
            <div id="simpleModalDelete" class="modalDelete">
                <div class="modal-content">
                    <span class="closeBtn" onclick="closeModal('simpleModalDelete')">&times;</span>
                    <p id="content">Are you sure you want to delete this account</p>
                    <button class="primary-btn" id="deleteModal" onclick="deleteBtn()">Delete</button>
                </div>
            </div>
            <div id="simpleModalDeactivate" class="modalDeactivate">
                <div class="modal-content">
                    <span class="closeBtn" onclick="closeModal('simpleModalDeactivate')">&times;</span>
                    <p id="content">Are you sure you want to deactivate this account</p>
                    <button class="primary-btn" id="deactivateModal" onclick="deactivateBtn()">Deactivate</button>
                </div>
            </div>
        </div>
        <footer id="main-footer">
            <p>Copyright &copy; 2019 Banka All Right Reserved</p>
        </footer>
        </div>
        <script src="./js-folder/veiw.js"></script>
        <script src="./js-folder/main.js"></script>
    </body>

    </html>
`;


// function to view html
const viewFile = (current)=>{
let view = document.getElementById("viewAdmin");
// console.log(document.getElementById("viewAdmin"));

viewAdmin.innerHTML = adminView;
//  adminVeiw;
// viewAdmin.style.display = "block";
}
// const openModal = current => {
//     let modal = document.getElementById(current);
//     modal.style.display = "block";
// };
viewFile()
