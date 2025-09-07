const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
const logout = document.querySelector('.logout');
logout.addEventListener('click', () => {
    localStorage.setItem("x", "false");
});
allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});


document.addEventListener("DOMContentLoaded", function () {
    var myCoursesLink = document.getElementById("my-courses-link");
    var accountSection = document.getElementById("account");
    var myCoursesSection = document.getElementById("my-courses-page");

    myCoursesLink.addEventListener("click", function (event) {
        event.preventDefault();
        accountSection.style.display = "none";
        myCoursesSection.style.display = "block";
    });

    var accountLink = document.querySelector("#sidebar .side-menu li:first-child a");

    accountLink.addEventListener("click", function (event) {
        event.preventDefault();
        accountSection.style.display = "block";
        myCoursesSection.style.display = "none";
    });
});


// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
})

document.addEventListener("DOMContentLoaded", function () {
    // Hide the logout link initially
    var logoutLink = document.querySelector('#sidebar .side-menu.top li:last-child');
    logoutLink.style.display = "none";
    // logoutLink.addEventListener('click', function () {
    //     localStorage.setItem('x', 'false')l
    // });
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            });
            li.classList.add('active');
        });
    });

    // TOGGLE SIDEBAR
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    menuBar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');
    });

    // Show the logout link after everything is loaded
    logoutLink.style.display = "block";
});
