const iframe = document.getElementById("container");
const buttonDownload = document.getElementById("download-button");
const buttonFullscreen = document.getElementById("fullscreen-button");

buttonDownload.addEventListener("click", downloadRender); 
buttonFullscreen.addEventListener("click", toggleFullScreen); 

function downloadRender() {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const target = iframeDoc.body;

  const baclgroundElement = iframeDoc.getElementById("background-element");
  baclgroundElement.style.background = "#FFF";
  console.log();

  html2canvas(target, {
    scale: 4   // масштаб у 2 рази
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "iframe_x2.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  baclgroundElement.style.background = "repeating-linear-gradient(45deg, #FFF 25%, #FFF 50%, #EEE 50%, #EEE 75%)";
  baclgroundElement.style.backgroundSize = "30px 30px";

}

function toggleFullScreen() {
    // Get your full screen element
    const video = iframe;
    const rfs = video.requestFullscreen || video.webkitRequestFullScreen || video.mozRequestFullScreen || video.msRequestFullscreen;
    rfs.call(video);
}
