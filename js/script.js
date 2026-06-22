let lowestOrder = 0; // Globale Variable für die niedrigste Order-Zahl

document.addEventListener("DOMContentLoaded", function () {
    // Wähle alle <li>-Elemente mit der Klasse "element" aus
    const elements = document.querySelectorAll(".eintrag");

    // Das Element mit der ID "buttonContainer" wird in die Variable gespeichert
    const buttonContainer = document.getElementById("buttonContainer");
    
   

// Iteriert durch alle Elemente in der "elements"-Liste
elements.forEach((element) => {
  let buttonStatus = false; // Speichert den aktuellen Status des Buttons (ein-/ausgeschaltet)
  
  // Erstellt ein neues Button-Element
  let buttonEl = document.createElement("button");
  
  // Setzt den Inhalt des Buttons auf den Inhalt des entsprechenden Elements
  buttonEl.innerHTML = element.childNodes[0]?.nodeValue?.trim() || "";

  // Fügt einen Event-Listener für den Klick auf den Button hinzu
  buttonEl.addEventListener("click", function () {
    if (buttonStatus == false) { // Falls der Buttonstatus "false" ist (nicht aktiv)
        let duration = element.dataset.duration; // Annahme: du speicherst die Dauer als data-Attribut im HTML
        let newWidth = `calc(100 * ${duration}px)`; // Berechnet die Höhe
        
        // Setzt die Höhe des Elements und fügt die Klasse .big hinzu
        element.style.width = newWidth;
        element.style.order = lowestOrder--;

        element.classList.add("big"); // Fügt die CSS-Klasse "big" zum Element hinzu
        element.classList.remove("einklappen");

        // Speichert nur den Text, aber nicht die <span>-Elemente
        element.dataset.originalText = element.childNodes[0]?.nodeValue?.trim() || "";
        if (element.dataset.originalText) {
            element.childNodes[0].nodeValue = ""; // Entfernt nur den sichtbaren Text
        }

        buttonStatus = true; // Setzt den Status auf "true"

    } else { // Falls der Buttonstatus "true" ist (aktiv)
        element.style.width = "10px"; // Setzt die Höhe zurück
        element.style.order = 0;

        element.classList.remove("big"); // Entfernt die CSS-Klasse "big"
        element.classList.add("einklappen");

        // Stellt nur den ursprünglichen Text wieder her, ohne die Spans zu beeinflussen
        if (element.dataset.originalText) {
            element.childNodes[0].nodeValue = element.dataset.originalText;
        }

        buttonStatus = false; // Setzt den Status auf "false"
    }

    // Button-Text durchgestrichen machen oder zurücksetzen
    buttonEl.classList.toggle("durchgestrichen");
  });

  // Fügt den Button dem "buttonContainer"-Element hinzu
  buttonContainer.appendChild(buttonEl);
    });
});


// Scrolll Animation

const scrollContainer = document.getElementById("buttonContainer");
const movingBox = document.querySelector(".moving-box");

scrollContainer.addEventListener("scroll", () => {
  const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
  const scrollProgress = scrollContainer.scrollTop / maxScroll; // Wert zwischen 0 und 1

  // Box vertikal innerhalb der scroll-box bewegen
  const maxMove = scrollContainer.clientHeight - movingBox.clientHeight; 
  movingBox.style.top = `${scrollProgress * maxMove}px`;
});

