const fixedHeight = document.documentElement.scrollHeight;
const fixedWidth = document.documentElement.scrollWidth;
const divScaleCoef = 0.7;
const imgScaleCoef = 8;
const colorGreen = "rgb(0, 255, 0)";
const colorRed = "rgb(255, 0, 0)";
const colorZero = "rgba(0, 0, 0, 0)";

const menuList = document.getElementById("menu-list");
menuList.onmouseleave = menuButtonHide;
const menuSlider = document.getElementById("menu-slider");
menuSlider.oninput = menuSliderScale;
const menuFile = document.getElementById("menu-file");
menuFile.addEventListener("change", menuButtonNewClick);

const menuHeight = 300;
const menuWidth = 200;
menuList.style.height = menuHeight + "px";
menuList.style.width = menuWidth + "px";

let targetElement = undefined;
const frameContainer = document.getElementById("frame-container");
const baclgroundElement = document.getElementById("background-element");
baclgroundElement.style.borderColor = colorZero;
baclgroundElement.style.borderWidth = "0px";
baclgroundElement.addEventListener('contextmenu', e => {
    e.preventDefault();
    targetElement = {elmnt: baclgroundElement};
    menuButtonShow(e);
});



class Dr {
    constructor(elmnt, lockAxis="none", centered="none") {
        this.elmnt = elmnt;
        this.lockAxis = lockAxis;
        this.centered = centered;
        this.middlePointTop = this.elmnt.offsetHeight/2;
        this.middlePointLeft = this.elmnt.offsetWidth/2;

        // Прив'язуємо обробники для миші та тачів
        this.elmnt.onmousedown = this.dragMouseDown;
        this.elmnt.ontouchstart = this.dragTouchStart;

        switch(this.elmnt.nodeName) {
            case "DIV":
                this.elmnt.style.fontSize = "35px";
                break;
            case "IMG":
                this.elmnt.style.width = "550px";
                break;
        }
        this.elmnt.style.transition = "border-color 0.3s linear";
        this.elmnt.style.borderColor = colorZero;

        switch (this.centered) {
            case "horizontal":
                console.log();
                this.elmnt.style.left = (fixedWidth/2 - this.elmnt.offsetWidth/2) + "px";
                break;
            case "vertical":
                this.elmnt.style.top = (fixedHeight/2 - this.elmnt.offsetHeight/2) + "px";
                break;
            case "both":                
                this.elmnt.style.left = (fixedWidth/2 - this.elmnt.offsetWidth/2) + "px";
                this.elmnt.style.top = (fixedHeight/2 - this.elmnt.offsetHeight/2) + "px";
                break;
        }

        this.elmnt.addEventListener('contextmenu', e => {
            e.preventDefault();
            targetElement = this;
            console.log(targetElement, "RIGHT");
            menuButtonShow(e);
        });

        this.pos1 = 0; 
        this.pos2 = 0; 
        this.pos3 = 0; 
        this.pos4 = 0;
    }

    centerElement = () => {
        switch (this.centered) {
            case "horizontal":
                console.log();
                this.elmnt.style.left = (fixedWidth/2 - this.elmnt.offsetWidth/2) + "px";
                break;
            case "vertical":
                this.elmnt.style.top = (fixedHeight/2 - this.elmnt.offsetHeight/2) + "px";
                break;
            case "both":                
                this.elmnt.style.left = (fixedWidth/2 - this.elmnt.offsetWidth/2) + "px";
                this.elmnt.style.top = (fixedHeight/2 - this.elmnt.offsetHeight/2) + "px";
                break;
        }
    }

    // ====== МИША ======
    dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();

        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        document.onmousemove = this.elementDrag;
    }

    // ====== ТЕЛЕФОН ======
    dragTouchStart = (e) => {
        e = e || window.event;
        if (e.touches.length > 1) return; // ігноруємо мультитач

        this.pos3 = e.touches[0].clientX;
        this.pos4 = e.touches[0].clientY;
        document.ontouchend = this.closeDragElement;
        document.ontouchmove = this.elementTouchDrag;
    }

    elementDrag = (e) => {
        targetElement = this;
        menuButtonHide();
        this.elmnt.style.borderColor = colorRed;

        e = e || window.event;
        e.preventDefault();

        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        // this.myOffsetTop = (2 * this.elmnt.offsetTop + this.middlePointTop) - ((this.elmnt.offsetTop + this.middlePointTop) * this.elmnt.style.scale);
        // this.myOffsetLeft = (2 * this.elmnt.offsetLeft + this.middlePointLeft) - ((this.elmnt.offsetLeft + this.middlePointLeft) * this.elmnt.style.scale);
        this.myOffsetTop = this.elmnt.offsetTop;
        this.myOffsetLeft = this.elmnt.offsetLeft;

        
        if (this.myOffsetTop - this.pos2 > 0 && 
            this.myOffsetTop - this.pos2 + this.elmnt.offsetHeight < fixedHeight &&
            this.lockAxis != "horizontal") {
            this.elmnt.style.top = (this.elmnt.offsetTop - this.pos2) + "px";
        }
        if (this.myOffsetLeft - this.pos1 > 0 && 
            this.myOffsetLeft - this.pos1 + this.elmnt.offsetWidth < fixedWidth &&
            this.lockAxis != "vertical") {
            this.elmnt.style.left = (this.elmnt.offsetLeft - this.pos1) + "px";
        }
    }

    elementTouchDrag = (e) => {
        e = e || window.event;
        if (e.touches.length > 1) return;

        this.pos1 = this.pos3 - e.touches[0].clientX;
        this.pos2 = this.pos4 - e.touches[0].clientY;
        this.pos3 = e.touches[0].clientX;
        this.pos4 = e.touches[0].clientY;

        this.elmnt.style.top = (this.elmnt.offsetTop - this.pos2) + "px";
        this.elmnt.style.left = (this.elmnt.offsetLeft - this.pos1) + "px";
    }

    closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
        
        targetElement = this;
        menuButtonHide();
        this.elmnt.style.borderColor = colorZero;
    }
}


const menuButtonEdit = document.getElementById("menu-button-edit");
const menuButtonSave = document.getElementById("menu-button-save");
const menuButtonNew = document.getElementById("menu-button-new");
const menuButtonLock = document.getElementById("menu-button-lock");
const menuButtonCenter = document.getElementById("menu-button-center");
const menuButtonFont = document.getElementById("menu-button-font");


function menuButtonHide() {
    if (menuList.style.display != "none") {
        console.log("menuButtonHide", targetElement.elmnt.style.borderColor);
        if (targetElement.elmnt.style.borderColor === colorRed) {
        targetElement.elmnt.style.borderColor = colorZero;
        }
        menuList.style.display = "none";
        menuButtonEdit.disabled = false;
        menuButtonSave.disabled = true;
    }  
}

function menuButtonShow(e) {
    console.log("menuButtonShow", targetElement, menuButtonLock);
    menuList.style.display = "flex";
    menuList.style.left = (e.clientX-5) + "px";
    menuList.style.top = (e.clientY-5) + "px";

    menuButtonLock.textContent = "Lock axis: " + targetElement.lockAxis;
    menuButtonCenter.textContent = "Centered: " + targetElement.centered;
    menuButtonFont.textContent = "Font: " + (targetElement.elmnt.style.fontFamily ? targetElement.elmnt.style.fontFamily : undefined);


    if (targetElement.elmnt.style.borderColor == colorZero) {
        targetElement.elmnt.style.borderColor = colorRed;
    }

    if (e.clientX > fixedWidth - menuWidth) {
        menuList.style.left = (e.clientX+5-menuWidth) + "px";
    }
    if (e.clientY > fixedHeight - menuHeight) {
        menuList.style.top = (e.clientY+5-menuHeight) + "px";
    }
    if (e.clientX > fixedWidth - menuWidth && e.clientY > fixedHeight - menuHeight) {
        menuList.style.left = (e.clientX+5-menuWidth) + "px";
        menuList.style.top = (e.clientY+5-menuHeight) + "px";
    }

    switch(targetElement.elmnt.nodeName) {
        case "DIV":
            menuSlider.value = parseInt(targetElement.elmnt.style.fontSize, 10) / divScaleCoef;
            console.log(targetElement.elmnt.style.fontSize);
            if (targetElement.elmnt.id == "background-element") {
                menuButtonEdit.disabled = true;
                menuButtonSave.disabled = true;
                menuButtonNew.disabled = false;
                menuButtonLock.disabled = true;
                menuButtonCenter.disabled = true;
                menuButtonFont.disabled = true;
                menuSlider.disabled = true;
            } else if (targetElement.elmnt.contentEditable == "true") {
                menuButtonEdit.disabled = true;
                menuButtonSave.disabled = false;
                menuButtonNew.disabled = true;
                menuButtonLock.disabled = false;
                menuButtonCenter.disabled = false;
                menuButtonFont.disabled = false;
                menuSlider.disabled = false;
            } else {
                menuButtonEdit.disabled = false;
                menuButtonSave.disabled = true;
                menuButtonNew.disabled = true;
                menuButtonLock.disabled = false;
                menuButtonCenter.disabled = false;
                menuButtonFont.disabled = false;
                menuSlider.disabled = false;
            }
            break;
        case "IMG":
            menuSlider.value = parseInt(targetElement.elmnt.style.width, 10) / imgScaleCoef;
            menuButtonEdit.disabled = false;
            menuButtonSave.disabled = true;
            menuButtonNew.disabled = true;
            menuButtonLock.disabled = false;
            menuButtonCenter.disabled = false;
            menuButtonFont.disabled = true;
            menuSlider.disabled = false;
            break;
    }
}

function menuButtonEditClick() {                 
    console.log("Edit");
    menuButtonHide();
    switch(targetElement.elmnt.nodeName) {
        case "DIV":
            targetElement.elmnt.style.opacity = 1;
            targetElement.elmnt.contentEditable = "true";
            targetElement.elmnt.onmousedown = null;
            targetElement.elmnt.ontouchstart = null;
            targetElement.elmnt.style.borderColor = colorGreen;
            break;
        case "IMG":
            menuFile.click()
            break;
    }
}

function menuButtonSaveClick() {
    console.log("Save");
    menuButtonHide();
    if (targetElement.elmnt.textContent == "") {
        targetElement.elmnt.textContent = "Empty text box";
        targetElement.elmnt.style.opacity = 0.5;
    }
    targetElement.elmnt.contentEditable = "false";
    targetElement.elmnt.onmousedown = targetElement.dragMouseDown;
    targetElement.elmnt.ontouchstart = targetElement.dragTouchStart;
    targetElement.elmnt.style.borderColor = colorZero;
    console.log(targetElement.centered);
    targetElement.centerElement()
}

function menuButtonNewClick() {
    console.log("New");
    menuButtonHide();
    if (targetElement.elmnt.nodeName == "IMG") {
        targetElement.elmnt.src = window.URL.createObjectURL(menuFile.files[0]);
    } else {
        let el = document.createElement("img");
        el.setAttribute('src', window.URL.createObjectURL(menuFile.files[0]));
        el.setAttribute('class', 'movable-element');
        frameContainer.appendChild(el);
        allDocsNew[el.id] = new Dr(el, "none", "none");
        allDocsNew[el.id].elmnt.style.width = "100px";
        allDocsNew[el.id].centerElement();
    }
}

function menuButtonLockClick() {
    console.log("Lock");

    switch(targetElement.lockAxis) {
        case "vertical":
            targetElement.lockAxis = "horizontal";
            break;
        case "horizontal":
            targetElement.lockAxis = "none";
            break;
        case "none":
            targetElement.lockAxis = "vertical";
            break;
    }
    menuButtonLock.textContent = "Lock axis: " + targetElement.lockAxis;
}

function menuButtonCenterClick() {
    console.log("Center");

    switch(targetElement.centered) {
        case "vertical":
            targetElement.centered = "horizontal";
            break;
        case "horizontal":
            targetElement.centered = "both";
            break;
        case "both":
            targetElement.centered = "vertical";
            break;
    }
    targetElement.centerElement();
    menuButtonCenter.textContent = "Centered: " + targetElement.centered;
}

function menuButtonFontClick() {
    console.log("Font", targetElement.elmnt.style.fontFamily);

    switch(targetElement.elmnt.style.fontFamily) {
        case "Marcellus":
            targetElement.elmnt.style.fontFamily = "Black-Mango";
            break;
        case "Black-Mango":
            targetElement.elmnt.style.fontFamily = "Garamond";
            break;
        case "Garamond":
            targetElement.elmnt.style.fontFamily = "Brush-Script";
            break;
        case "Brush-Script":
            targetElement.elmnt.style.fontFamily = "Marcellus";
            break;
    }
    targetElement.centerElement();
    menuButtonFont.textContent = "Font: " + targetElement.elmnt.style.fontFamily;
}

function menuSliderScale() {
    switch(targetElement.elmnt.nodeName) {
        case "DIV":
            targetElement.elmnt.style.fontSize = menuSlider.value * divScaleCoef + "px";
            targetElement.centerElement();
            break;
        case "IMG":
            targetElement.elmnt.style.width = menuSlider.value * imgScaleCoef + "px";
            targetElement.centerElement()
            break;
    }
}








const allDocs = document.querySelectorAll(".movable-element")
const allDocsNew = {};
allDocs.forEach(el => {
    allDocsNew[el.id] = new Dr(el, "none", "horizontal");
});

allDocsNew["main-image"].lockAxis = "vertical";
allDocsNew["jesus-text"].lockAxis = "vertical";
allDocsNew["jesus-text"].elmnt.style.fontFamily = "Marcellus";
allDocsNew["name-text"].lockAxis = "vertical";
allDocsNew["name-text"].elmnt.style.fontFamily = "Marcellus";
allDocsNew["name-text"].elmnt.style.fontSize = "55px";
allDocsNew["name-text"].centerElement();
