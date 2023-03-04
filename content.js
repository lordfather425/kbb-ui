try {
  // Get the title of the posting from the Facebook Marketplace page
  var titleElement = document.querySelector("[data-testid='marketplace_feed_item_title']");
  if (!titleElement) {
    throw new Error("Title element not found");
  }
  var title = titleElement.textContent;

  // Send a message to the background script with the title of the posting
  chrome.runtime.sendMessage({title: title}, function(response) {
    // Get the Kelly Blue Book value from the response and display it on the page
    var value = response.value;
    if (value) {
      var valueElement = document.createElement("div");
      valueElement.textContent = "Kelly Blue Book value: $" + value;
      titleElement.appendChild(valueElement);
    } else {
      throw new Error("No value found for the given title");
    }
  });
} catch (err) {
  console.error(err);
}
