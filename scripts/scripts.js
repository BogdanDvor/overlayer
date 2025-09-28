const iframe = document.getElementById("container");
const button = document.getElementById("download-button");

button.addEventListener("click", () => {
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

});
