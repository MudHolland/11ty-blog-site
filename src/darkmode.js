function darkmode() {
    document.body.classList.toggle("dark");
    let myList = document.getElementsByTagName("blockquote");
    for (i = 0; i < myList.length; i++) {
        myList[i].classList.toggle("block-dark");
    }
}