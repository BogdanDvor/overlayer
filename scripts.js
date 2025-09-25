class Dr {
    constructor(elementName) {
        this.elmnt = document.getElementById(elementName);

        // Прив'язуємо обробники для миші та тачів
        this.elmnt.onmousedown = this.dragMouseDown;
        this.elmnt.ontouchstart = this.dragTouchStart;

        if (this.elmnt.nodeName == "DIV") {
            console.log(this.elmnt.contentEditable);
            this.elmnt.onclick = e => {
                if (e.detail === 2 && this.elmnt.contentEditable == "false") {                    
                    console.log("Double");
                    this.elmnt.contentEditable = "true";
                    this.elmnt.onmousedown = null;
                    this.elmnt.ontouchstart = null;
                } else if (e.detail === 2 && this.elmnt.contentEditable === "true") {
                    console.log("Double");
                    this.elmnt.contentEditable = "false";
                    this.elmnt.onmousedown = this.dragMouseDown;
                    this.elmnt.ontouchstart = this.dragTouchStart;
                }
            };
        }

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
        e = e || window.event;
        e.preventDefault();

        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        this.elmnt.style.top = (this.elmnt.offsetTop - this.pos2) + "px";
        this.elmnt.style.left = (this.elmnt.offsetLeft - this.pos1) + "px";
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
    }
}

let im = new Dr("image1");
let im2 = new Dr("image2");
