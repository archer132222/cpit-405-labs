
const likebtn = document.getElementById("like");
const dislikebtn = document.getElementById("dislike");

const likecounter = document.getElementById("likecount")
const discounter = document.getElementById("dislikecount")

var discnt = 0
var likecnt = 0

// Restore vote after refreshing
if (document.cookie.split("; ").some(c => c === "vote=like")) {
    likecnt = 1;
}
else if (document.cookie.split("; ").some(c => c === "vote=dislike")) {
    discnt = 1;
}

likecounter.innerHTML = likecnt;
discounter.innerHTML = discnt;


// LIKE BUTTON
likebtn.addEventListener("click", () => {

    if (document.cookie.split("; ").some(c => c === "vote=like")) {
        alert("You have already voted like!");
        return;
    }

    if (document.cookie.split("; ").some(c => c === "vote=dislike")) {
        discnt--;
        discounter.innerHTML = discnt;
    }

    const kh_select = new Audio("kh_select.mp3");
    kh_select.currentTime = 0.300;
    kh_select.volume = 0.4; 

    kh_select.play().catch(error => {
        console.warn("Audio playback was blocked or failed:", error);
    });
    kh_select.currentTime = 0.300;


    likecnt++;
    likecounter.innerHTML = likecnt;

    document.cookie = "vote=like; max-age=86400; path=/";
});


// DISLIKE BUTTON
dislikebtn.addEventListener("click", () => {

    if (document.cookie.split("; ").some(c => c === "vote=dislike")) {
        alert("You have already voted dislike!");
        return;
    }

    if (document.cookie.split("; ").some(c => c === "vote=like")) {
        likecnt--;
        likecounter.innerHTML = likecnt;
    }

    discnt++;
    discounter.innerHTML = discnt;

    document.cookie = "vote=dislike; max-age=86400; path=/";
});



const commentInput = document.getElementById("commentInput");
const commentSubmit = document.getElementById("commentSubmit");
const commentsList = document.getElementById("comments");

commentSubmit.addEventListener("click", () => {

    if (document.cookie.split("; ").some(c => c.startsWith("comment=") && c.substring(8) !== "")) {
        alert("You have already submitted a comment!");
        return;
    }


    const commentText = commentInput.value.trim();
    if (commentText !== "") {
        
        const newComment = document.createElement("li");

        newComment.classList.add("user-comment");
        newComment.textContent = commentText;

        commentsList.appendChild(newComment);
        
        commentInput.value = "";
        
        document.cookie = "comment=" + encodeURIComponent(commentText) + "; max-age=86400; path=/";


    }
})
const savedCookie = document.cookie
    .split("; ")
    .find(c => c.startsWith("comment="));

if (savedCookie) {
    const savedComment = decodeURIComponent(
        savedCookie.substring("comment=".length)
    );

    const li = document.createElement("li");
    li.classList.add("user-comment");
    li.textContent = savedComment;
    commentsList.appendChild(li);

    
}



const resetBtn = document.getElementById("resetButton");
resetBtn.addEventListener("click", () => {
    likecnt = 0;
    discnt = 0;
    likecounter.innerHTML = likecnt;
    discounter.innerHTML = discnt;

    document.cookie = "vote=; max-age=0; path=/";
    document.cookie = "comment=; max-age=0; path=/";

    commentsList.querySelectorAll("li.user-comment").forEach(li => li.remove());    
    commentInput.value = "";

})

