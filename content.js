function addValueOverlay(value) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";

  const valueDisplay = document.createElement("div");
  valueDisplay.style.color = "#fff";
  valueDisplay.style.fontSize = "2em";
  valueDisplay.style.textAlign = "center";
  valueDisplay.style.padding = "1em";
  valueDisplay.textContent = `Estimated value: $${value}`;

  overlay.appendChild(valueDisplay);
  document.body.appendChild(overlay);
}

function getTitle() {
  const title = document.querySelector("h2.postingtitle span.postingtitletext:first-of-type").textContent.trim();
  return title.split(" - ")[0];
}

chrome.runtime.sendMessage({ action: "getCarValue", title: getTitle() }, function(response) {
  if (response.error) {
    console.error(response.error);
  } else {
    addValueOverlay(response.value);
  }
});
