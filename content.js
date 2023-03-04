// content.js

// Look for listings on Facebook Marketplace page
if (window.location.hostname === "www.facebook.com" && window.location.pathname.startsWith("/marketplace/item")) {
  // Extract the title of the listing
  const titleElement = document.querySelector("h1[itemprop='name']");
  if (titleElement) {
    const title = titleElement.innerText.trim();
    console.log("Title: ", title);
    // Send message to background script with the title
    chrome.runtime.sendMessage({type: "getCarValue", title: title}, (response) => {
      if (response && response.value) {
        // Display the value in an overlay
        const value = response.value;
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "#fff";
        overlay.style.opacity = "0.9";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.innerHTML = `<div style="text-align: center;">
                               <p style="font-size: 30px;">Estimated Value: $${value}</p>
                               <p style="font-size: 20px;">Powered by CarQuery API</p>
                             </div>`;
        document.body.appendChild(overlay);
      } else {
        console.log("Error: ", response.error);
      }
    });
  }
}
