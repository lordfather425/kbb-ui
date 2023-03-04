// Send a message to the background script to retrieve the Kelly Blue Book value
chrome.runtime.sendMessage({action: "getKBBValue", title: document.title}, function(response) {
  if (chrome.runtime.lastError) {
    // Display an error message if there was an error communicating with the background script
    console.error("Error communicating with the background script:", chrome.runtime.lastError);
    return;
  }

  if (response.error) {
    // Display an error message if the background script encountered an error retrieving the KBB value
    console.error("Error retrieving KBB value:", response.error);
    return;
  }

  // Create a div element to hold the value
  var kbbValueDiv = document.createElement("div");
  
  // Set the div's styles
  kbbValueDiv.style.position = "fixed";
  kbbValueDiv.style.bottom = "10px";
  kbbValueDiv.style.right = "10px";
  kbbValueDiv.style.padding = "10px";
  kbbValueDiv.style.backgroundColor = "#f9f9f9";
  kbbValueDiv.style.border = "1px solid #ccc";
  
  // Create a text node with the value and append it to the div
  var kbbValueTextNode = document.createTextNode("Kelly Blue Book Value: $" + response.value);
  kbbValueDiv.appendChild(kbbValueTextNode);
  
  // Append the div to the document body
  document.body.appendChild(kbbValueDiv);
});
