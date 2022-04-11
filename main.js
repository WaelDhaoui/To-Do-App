// clear Strorage
function clear() {
    localStorage.clear();
}

// create li with children 
let newLi = document.createElement("li"); 
let newImg1 = document.createElement("img");
newImg1.src = "images/icon-check.svg";
newImg1.alt = "check.svg";
let newImg2 = document.createElement("img");
newImg2.src = "images/icon-cross.svg";
newImg2.alt = "cross.svg";
newImg2.className = "cross";
let newP = document.createElement("p");

newLi.append(newImg1);
newLi.append(newP);
newLi.append(newImg2);

// moon & sun 
let mode = document.querySelector(".mode");
let list = document.querySelector("ul");
let footer = document.querySelector(".list");

mode.addEventListener("click", function() {
    [...this.children].forEach(function(e){
        e.classList.toggle("inactive");
    });
    if(this.children[0].classList.contains("inactive")) {
        list.style.backgroundColor = "#25273c";
        list.style.boxShadow = "0px 7px 12px 2px rgb(124 124 124)";
        list.nextElementSibling.style.boxShadow = "rgb(124 124 124) 0px 5px 10px 0px";
        document.body.style.backgroundColor = "#181824";
        document.querySelector("footer div").style.backgroundColor = "#25273c";
        if(document.body.offsetWidth < 767) {
            
            document.querySelector("footer div").style.boxShadow = "rgb(124 124 124) 0px 5px 10px 0px";
        }
        list.nextElementSibling.style.backgroundColor = "#25273c";
        if(list.children.length != 0) {
            [...list.children].forEach(function(e){
                e.style.backgroundColor = "#25273c";
                if(!e.classList.contains("done")) {
                    e.children[1].style.color = "#dedede";
                } 
            });
        }
    }
    else {
        list.style.backgroundColor = "white";
        list.style.boxShadow = "0px 7px 12px 2px #ddd";
        list.nextElementSibling.style.boxShadow = "0px 7px 12px 2px #ddd";
        document.body.style.backgroundColor = "#eee";
        document.querySelector("footer div").style.backgroundColor = "white"
        list.nextElementSibling.style.backgroundColor = "white";
        if(list.children.length != 0) {
            [...list.children].forEach(function(e){
                e.style.backgroundColor = "white";
                if(!e.classList.contains("done")) {
                    e.children[1].style.color = "#504f5f";
                }
            });
        }
    }
});

//footer 
let [a,,e] = [...footer.children];
let [b,c,d] = [...footer.children[1].children]
let counter = 0;
c.onclick = function() {
    [...list.children].forEach(function(ele) {
        ele.className == "done" ? ele.style.display = "none" : ele.style.display = "flex";
    });
    [b,c,d].forEach(function(ele) {
        ele.classList.remove("active");
    });
    c.className = "active";
};
d.onclick = function() {
    [...list.children].forEach(function(ele) {
        ele.className == "done" ? ele.style.display = "flex" : ele.style.display = "none";
    });
    [b,c,d].forEach(function(ele) {
        ele.classList.remove("active");
    });
    d.className = "active";
};
b.onclick = function() {
    [...list.children].forEach(function(ele) {
        ele.style.display = "flex";
    });
    [b,c,d].forEach(function(ele) {
        ele.classList.remove("active");
    });
    b.className = "active";
};
e.onclick = function() {
    [...list.children].forEach(function(ele) {
        ele.remove();
    });
    counter = 0;
    a.textContent = `${counter} items left`;
    clear();
};

// Verif BOM has items
if(localStorage.length != 0) {
    counter = localStorage.length;
    let j = 1;
    for(let i=0; i<localStorage.length; i++) {
        let li = newLi.cloneNode(true);
        if(localStorage.getItem(`task${j}`).endsWith("T")) {
            li.children[1].textContent = localStorage.getItem(`task${j}`).slice(0,localStorage.getItem(`task${j}`).length - 1);
            li.className = "done";
            --counter;
        } else 
            li.children[1].textContent = localStorage.getItem(`task${j}`);
        list.append(li);
        a.textContent = `${counter} items left`;
        // li active
        li.addEventListener("click",function(e) {
            this.classList.toggle("done");
            
            if(e.target == li.lastChild) {
                if (this.className == "done") {
                    a.textContent = `${--counter} items left`;
                } else {
                    a.textContent = `${counter} items left`;
                }
                [...list.children].forEach(function(ele,i) {
                    if (ele.lastChild == e.target) {
                        localStorage.removeItem(`task${i+1}`);
                    }
                });
                this.remove();
            } else {
                if (this.className == "done") {
                    a.textContent = `${--counter} items left`;
                    window.localStorage.setItem(`task${i+1}`,`${this.textContent}T`);
                } else {
                    a.textContent = `${++counter} items left`;
                    window.localStorage.setItem(`task${i+1}`,`${this.textContent}`);
                }
            }
        });
        j++;
    }

}

// add input
let form = document.forms[0];

form[1].addEventListener("click",function(e) {
    e.preventDefault();
    if(! form[0].value == "") {
        let li = newLi.cloneNode(true);
        li.children[1].textContent = form[0].value;
        list.append(li);

        a.textContent = `${++counter} items left`;

        //start BOM
        window.localStorage.setItem(`task${counter}`,`${form[0].value}`);

        // li active
        li.addEventListener("click",function(e) {
            this.classList.toggle("done");
            
            if(e.target == li.lastChild) {
                if (this.className == "done") {
                    a.textContent = `${--counter} items left`;
                } else {
                    a.textContent = `${counter} items left`;
                }
                [...list.children].forEach(function(ele,i) {
                    if (ele.lastChild == e.target) {
                        localStorage.removeItem(`task${i+1}`);
                    }
                });
                this.remove();
            } else {
                if (this.className == "done") {
                    a.textContent = `${--counter} items left`;
                    window.localStorage.setItem(`task${i+1}`,`${this.textContent}T`);
                } else {
                    a.textContent = `${++counter} items left`;
                }
            }
        });
        // set BOM
        [...list.children].forEach(function(ele,i) {
            ele.addEventListener("click",function() {
                if(this.className == "done") {
                    window.localStorage.setItem(`task${i+1}`,`${this.textContent}T`);
                } else 
                    window.localStorage.setItem(`task${i+1}`,`${this.textContent}`);
            });
        });
    }
    form[0].value = "";
});
