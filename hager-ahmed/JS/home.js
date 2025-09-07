const signoutBtn = document.getElementById('logout');
signoutBtn.addEventListener('click', () => {
    localStorage.setItem("x", "false");
});

if (localStorage.getItem("x") == "true") {
    $(".profile").click(function () {
        $(".wrapper").toggleClass("collapse");
    });
    document.querySelector('.top_menu ul').style.visibility = "visible";
    document.querySelector('.signin_up ul').style.visibility = "hidden";
    document.querySelector('.top_menu ul').style.display = "flex";
    document.querySelector('.discussion').style.display = "flex";
    document.querySelector('.signin_up ul').style.display = "none";
}


const toDark = [
    document.querySelector(".darkmode-button"),
    document.querySelector(".darkmode-button .sun"),
    document.querySelector(".darkmode-button .moon"),
    document.querySelectorAll(".darkmode-button .lines")
];

const darkmodeButton = document.querySelector(".darkmode-button");
let c=0;
darkmodeButton.addEventListener("click", () => {
    for (let i = 0; i < toDark.length - 1; i++) {
        toDark[i].classList.toggle("dark");
        console.log(toDark[i].classList);
    }
    for (let i = 0; i < toDark[3].length; i++) {
        toDark[3][i].classList.toggle("dark");
    }
    if (c == 0) {
        document.getElementById("stylesheets").href = "../CSS/home2.css";
        document.getElementById("stylesheetsfooter").href = "../CSS/footer2.css";
        c++;
    }
    else {
        document.getElementById("stylesheets").href = "../CSS/home.css";
        document.getElementById("stylesheetsfooter").href = "../CSS/footer.css";
        c = 0;
    }
});