
function sendToWatchFlow(ean) {
  const data = eanData[ean];
  if (!data) {
    document.getElementById("result").textContent = "Code inconnu : " + ean;
    return;
  }
  const payload = {
    ean: ean,
    model: data.model,
    price: data.price,
    currency: data.currency,
    sold_at: new Date().toISOString(),
    location: "Retail Store X"
  };

  fetch("https://ton-api-watchflow.com/sales", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      document.getElementById("result").textContent = "Vente enregistrée : " + data.model;
    } else {
      document.getElementById("result").textContent = "Erreur lors de l'envoi";
    }
  })
  .catch(error => {
    console.error(error);
    document.getElementById("result").textContent = "Erreur réseau";
  });
}

let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (content) {
  sendToWatchFlow(content);
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[0]);
  } else {
    console.error('Aucune caméra trouvée.');
  }
}).catch(function (e) {
  console.error(e);
});
