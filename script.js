const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
whatsappBtn = document.querySelector(".whatsapp"),
body = document.querySelector("body"),
synth = speechSynthesis;



body.onload =() =>{
    randomQuote();
}
function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("https://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText + " ~Developed by Ebenezer P.K. Quayson");
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText} +" ~Developed by Ebenezer P.K. Quayson"`;
    window.open(tweetUrl, "_blank");
});

whatsappBtn.addEventListener("click", ()=>{
    let whatsapUrl = `whatsapp://send?text=${quoteText.innerText}+" ~Developed by Ebenezer P.K. Quayson" `;
    window.open(whatsapUrl, "_blank");
})
quoteBtn.addEventListener("click", randomQuote);
