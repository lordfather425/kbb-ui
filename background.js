chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Make an HTTP request to the Kelly Blue Book API using the title of the posting as a parameter
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.kbb.com/api/vehicle/evaluate/vin/" + encodeURIComponent(request.title), true);
  xhr.setRequestHeader("Authorization", "Bearer YOUR_API_KEY");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // Parse the response and extract the value of the vehicle
      var response = JSON.parse(xhr.responseText);
      var value = response.data.vehicle.value;

      // Send a message back to the content script with the Kelly Blue Book value
      chrome.tabs.sendMessage(sender.tab.id, {value: value});
    }
  };
  xhr.send();
});
