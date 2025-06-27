function sendToWatchFlow(ean) {
  const data = eanData[ean];
  if (!data) {
    document.getElementById("result").textContent = "Code inconnu : " + ean;
    return;
  }
  const payload = {import eanMapping from './ean-mapping.js';

function sendToWatchFlow(ean) {
  const data = eanMapping[ean];

  const resultEl = document.getElementById("result");

  if (!data) {
    resultEl.innerHTML = `<p style="color:red;">Code inconnu : ${ean}</p>`;
    return;
  }

  const payload = {
    ean: ean,
    model: data.reference,
    price: data.price || null,
    currency: data.currency || "CHF",
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
      resultEl.innerHTML = `
        <h2>${data.reference}</h2>
        <p><strong>Collection :</strong> ${data.collection}</p>
        <p>${data.description || ''}</p>
        <p style="color:green;">✅ Vente enregistrée</p>
      `;
    } else {
      resultEl.innerHTML = `<p style="color:red;">❌ Erreur lors de l'envoi</p>`;
    }
  })
  .catch(error => {
    console.error(error);
    resultEl.innerHTML = `<p style="color:red;">❌ Erreur réseau</p>`;
  });
}

// Activation du scanner avec Instascan
let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (ean) {
  sendToWatchFlow(ean);
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[0]);
  } else {
    console.error('Aucune caméra trouvée.');
    document.getElementById("result").textContent = "Aucune caméra détectée.";
  }
}).catch(function (e) {
  console.error(e);
  document.getElementById("result").textContent = "Erreur d'accès caméra.";
});
