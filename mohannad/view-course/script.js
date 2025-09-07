const detailBoxes = document.querySelectorAll('.detail-box'); // array holds the detail boxes in the details section like course overview 
for (let i = 0; i<detailBoxes.length; i++){
    const box  = detailBoxes[i];
    const icon = box.querySelector('i');
    icon.onclick = function(){
        icon.classList.toggle('bx-rotate-90');
        icon.classList.toggle('no-animation');
        const content = box.nextElementSibling; // this is the next element (content) after the button
            content.classList.toggle('show');
            console.log(content.classList);
        };
    box.addEventListener('mouseover', () => {
        // start the animation only on mouse hover
        icon.style.animation = 'move-right .4s ease-out 0s infinite alternate';
    });
    box.addEventListener('mouseout', function() {
        icon.style.animation = 'none';
    });
}

const instructorsLink = document.querySelectorAll('.course-info .instructor span');
for (let i = 0; i<instructorsLink.length; i++){
    const link = instructorsLink[i];
    link.onclick = function(){
        // check if the instructors section is hidden, if yes, unhide it;
        const instrucorSection = 
        document.querySelector('.detail-box.instrucors-h2');
        const icon = instrucorSection.querySelector('i');
        const content = instrucorSection.nextElementSibling;
        if (!content.classList.contains('show')){
            // rotate the arrow icon and stop the animation
            icon.classList.toggle('bx-rotate-90');
            icon.classList.toggle('no-animation');
            // show the content of the corresponding section
            content.classList.toggle('show');
        }
        // scroll to the instructors section
        content.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
const shareButton = document.querySelector(".view-modal"),
popup = document.querySelector(".popup-share"),
close = popup.querySelector(".popup-share .close"),
field = popup.querySelector(".popup-share .field"),
input = field.querySelector(".popup-share input"),
copy = field.querySelector(".popup-share button"),
focusBlock = document.querySelector('.focus-block');

shareButton.onclick = () => {
    // show/hide the share page
    popup.classList.toggle("show");
    focusBlock.classList.toggle('display-initial');
}
close.onclick = () => {
    shareButton.click();
}

copy.onclick = () => {
    input.select(); //select input value
    if (document.execCommand("copy")) { // if the process isn't running already
        field.classList.add("active");
        copy.innerText = "Copied";
        setTimeout(() => {
            window.getSelection().removeAllRanges(); // remove selection from document
            field.classList.remove("active");
            copy.innerText = "Copy";
        }, 3000);
    }
}

// a list containing all hidden comments
const hiddenComments = document.querySelectorAll('.comments-section.details-box.new-box .comment.hidden-by-default');
const showAllCommentsButton = document.getElementById('show-all-comments');
const showLessCommentsButton = document.getElementById('show-less-comments');
const toggleComments = () => {
    showAllCommentsButton.classList.toggle('hidden-by-default');
    showLessCommentsButton.classList.toggle('hidden-by-default');
    hiddenComments.forEach(comment => {
        comment.classList.toggle('hidden-by-default');
    });
};
showAllCommentsButton.addEventListener('click', toggleComments);
showLessCommentsButton.addEventListener('click', toggleComments);

const commentsButton = document.querySelector('.additional-buttons li.write-a-comment');
const commentSection = document.getElementById('comments-section');
commentsButton.onclick = () => {
    commentSection.scrollIntoView({behavior: "smooth"});
};

const fav1 = document.getElementById('add-to-fav1');
const fav2 = document.getElementById('add-to-fav2');
let fav = 0;
const toggleHearts = () => {
    fav = !fav;
    fav1.classList.toggle('bxs-heart');
    if (fav){
        alert("Added to favorites!");
        fav2.classList.remove('uil');
        fav2.classList.remove('uil-heart-medical');
        fav2.classList.add('bx');
        fav2.classList.add('bxs-heart');
        fav2.style.top = "9px";
    } else {
        alert("Removed from favorites!");
        fav2.classList.add('uil');
        fav2.classList.add('uil-heart-medical');
        fav2.classList.remove('bx');
        fav2.classList.remove('bxs-heart');
        fav2.style.top = "5px";
    }
};
document.querySelector('.add-to-fav').addEventListener('click', toggleHearts);
document.querySelector('.buttons.fav').addEventListener('click', toggleHearts);

let cart = 0;
document.querySelector('.buttons.cart').onclick = () => {
    cart = !cart;
    if (cart)
        alert("Added to Cart!");
    else
        alert("Removed from Cart!");
};

const scrollToTopButton = document.getElementById('scroll-to-top');
scrollToTopButton.onclick = () => {
    document.body.scrollIntoView({behavior: 'smooth'})
}

// darkmode button even listeners
const toDark = [document.querySelector('.body'), 
                document.querySelector('.darkmode-button'), 
                document.querySelector('.darkmode-button .sun'), 
                document.querySelector('.darkmode-button .moon'),
                document.querySelectorAll('.darkmode-button .lines')];
const darkmodeButton = document.querySelector('.darkmode-button');
let isDark = 0;
const darkStyle = document.getElementById('dark-style'); // the link for the stylesheet
darkmodeButton.addEventListener('click', () => {
    for (let i = 0; i<toDark.length-1; i++){
        toDark[i].classList.toggle('dark');
        // console.log(toDark[i].classList);
    }
    for (let i = 0; i<toDark[3].length; i++){
        toDark[3][i].classList.toggle('dark');
    }
    if (isDark)
    darkStyle.href = 'style.css';
    else 
        darkStyle.href = 'style-dark.css';
    isDark = !isDark;
});
