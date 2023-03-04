function getCarValue(title) {
  const url = `https://www.carqueryapi.com/api/0.3/?cmd=getTrims&year=${new Date().getFullYear()}&make=${encodeURIComponent(title.split(' ')[0])}&model=${encodeURIComponent(title.split(' ')[1])}`;
  
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Trims && data.Trims.length > 0) {
        return data.Trims[0].model_price;
      } else {
        throw new Error("Unable to retrieve car value.");
      }
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getCarValue") {
    getCarValue(request.title)
      .then(value => sendResponse({ value: value }))
      .catch(error => sendResponse({ error: error.message }));
    return true;
  }
});
