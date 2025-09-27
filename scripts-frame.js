const fixedHeight = document.documentElement.scrollHeight;
const fixedWidth = document.documentElement.scrollWidth;
const maxScaleCoef = 2;
const minScaleCoef = 0.5;

const menuList = document.getElementById("menu-list");
menuList.onmouseleave = menuButtonHide;
const menuSlider = document.getElementById("menu-slider");
menuSlider.oninput = menuSliderScale;

const menuHeight = 180;
const menuWidth = 200;
menuList.style.height = menuHeight + "px";
menuList.style.width = menuWidth + "px";

let targetElement = undefined;



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

        this.elmnt.style.scale = 1;
        this.elmnt.style.transition = "border-color 0.3s linear";
        this.elmnt.style.borderColor = "rgba(0, 0, 0, 0)";

        this.elmnt.addEventListener('contextmenu', e => {
            e.preventDefault();
            targetElement = this;
            menuButtonShow(e);
        });

        this.pos1 = 0; 
        this.pos2 = 0; 
        this.pos3 = 0; 
        this.pos4 = 0;
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
        this.elmnt.style.borderColor = "rgba(255, 0, 0, 1)";

        e = e || window.event;
        e.preventDefault();

        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        this.myOffsetTop = (2 * this.elmnt.offsetTop + this.middlePointTop) - ((this.elmnt.offsetTop + this.middlePointTop) * this.elmnt.style.scale);
        this.myOffsetLeft = (2 * this.elmnt.offsetLeft + this.middlePointLeft) - ((this.elmnt.offsetLeft + this.middlePointLeft) * this.elmnt.style.scale);

        console.log(this.elmnt.offsetTop, this.myOffsetTop, this.myOffsetLeft, this.elmnt.style.scale);


        if (this.myOffsetTop - this.pos2 > 0 && 
            this.myOffsetTop - this.pos2 + this.elmnt.offsetHeight * this.elmnt.style.scale < fixedHeight &&
            this.lockAxis != "horizontal") {

            this.elmnt.style.top = (this.elmnt.offsetTop - this.pos2) + "px";
        }
        if (this.myOffsetLeft - this.pos1 > 0 && 
            this.myOffsetLeft - this.pos1 + this.elmnt.offsetWidth * this.elmnt.style.scale < fixedWidth &&
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
        
        menuButtonHide();
    }
}


const menuButtonEdit = document.getElementById("menu-button-edit");
const menuButtonSave = document.getElementById("menu-button-save");

const allDocs = document.querySelectorAll(".movable-element")
const allDocsNew = {};
allDocs.forEach(el => {
    allDocsNew[el.id] = new Dr(el, "none", "horizontal");
});

allDocsNew["main-image"].lockAxis = "vertical";
allDocsNew["jesus-text"].lockAxis = "vertical";
allDocsNew["name-text"].lockAxis = "vertical";

function menuButtonHide() {
    menuList.style.display = "none";
    menuButtonEdit.disabled = false;
    menuButtonSave.disabled = true;
    if (targetElement.elmnt.style.borderColor != "rgba(0, 255, 0, 1)") {
        targetElement.elmnt.style.borderColor = "rgba(0, 0, 0, 0)";
    }

}
function menuButtonShow(e) {
    menuList.style.display = "flex";
    menuList.style.left = (e.clientX-5) + "px";
    menuList.style.top = (e.clientY-5) + "px";
    if (targetElement.elmnt.style.borderColor == "rgba(0, 0, 0, 0)") {
        targetElement.elmnt.style.borderColor = "rgba(255, 0, 0, 1)";
    }

    console.log(fixedWidth);
    console.log(menuHeight);

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

    menuSlider.value = targetElement.elmnt.style.scale * 50;
    
    switch(targetElement.elmnt.nodeName) {
        case "DIV":
            if (targetElement.elmnt.contentEditable == "true") {
                menuButtonEdit.disabled = true;
                menuButtonSave.disabled = false;
            } else {
                menuButtonEdit.disabled = false;
                menuButtonSave.disabled = true;
            }
            break;
        case "IMG":
            menuButtonEdit.disabled = true;
            break;
    }
}

function menuButtonEditClick() {                 
    console.log("Edit");
    menuButtonHide();
    targetElement.elmnt.contentEditable = "true";
    targetElement.elmnt.onmousedown = null;
    targetElement.elmnt.ontouchstart = null;
    targetElement.elmnt.style.borderColor = "rgba(0, 255, 0, 1)";
}

function menuButtonSaveClick() {
    console.log("Save");
    menuButtonHide();
    targetElement.elmnt.contentEditable = "false";
    targetElement.elmnt.onmousedown = targetElement.dragMouseDown;
    targetElement.elmnt.ontouchstart = targetElement.dragTouchStart;
    targetElement.elmnt.style.borderColor = "rgba(0, 0, 0, 0)";
    targetElement.elmnt.style.transition = "border-color 0.3s linear";
    console.log(targetElement.centered);
    switch (targetElement.centered) {
        case "horizontal":
            targetElement.elmnt.style.left = (fixedWidth/2 - targetElement.elmnt.offsetWidth/2) + "px";
            break;
        case "vertical":
            targetElement.elmnt.style.top = (fixedHeight/2 - targetElement.elmnt.offsetHeight/2) + "px";
            break;
        case "both":                
            targetElement.elmnt.style.left = (fixedWidth/2 - targetElement.elmnt.offsetWidth/2) + "px";
            targetElement.elmnt.style.top = (fixedHeight/2 - targetElement.elmnt.offsetHeight/2) + "px";
            break;
    }
}

function menuSliderScale() {
    targetElement.elmnt.style.scale = menuSlider.value/50;
}