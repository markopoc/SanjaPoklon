import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoO1CIMqGnUpayBYD_NH-fQziPPSbWQDE",
  authDomain: "novi-e0e5f.firebaseapp.com",
  databaseURL: "https://novi-e0e5f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "novi-e0e5f",
  storageBucket: "novi-e0e5f.appspot.com",
  messagingSenderId: "943695448817",
  appId: "1:943695448817:web:3d0ccd90d67af8d332f750"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkIfTimeSlotTaken(date, time) {
  const q = query(
    collection(db, "Narudzbe"),
    where("datum", "==", date),
    where("vrijeme", "==", time)
  );
  
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

document.getElementById("Prijava").onclick = async function() {
  const ime = document.getElementById("ime").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const mail = document.getElementById("mail").value.trim();
  const datum = document.getElementById("datum").value.trim();
  const vrijeme = document.getElementById("vrijeme").value.trim();
  const problem = document.getElementById("problem").value.trim();
  const poda = document.getElementById("Pon");


  const maxGodina = new Date().getFullYear() + 5;
  const unesenaGodina = new Date(datum).getFullYear();
  if (unesenaGodina > maxGodina) {
    alert("Unijeli ste datum koji je predaleko u budućnosti.");
    return false;
  }
  if (!ime || !telefon || !mail || !datum || !vrijeme || !problem) {
    poda.classList.remove('hidden');
    return false;
  }

  // Provjera zauzetosti 
  try {
    const isTaken = await checkIfTimeSlotTaken(datum, vrijeme);
    if(isTaken) {
      alert("Ovaj termin je već zauzet! Molimo odaberite drugi termin.");
      return false;
    }
  } catch(error) {
    alert("Došlo je do greške pri provjeri termina: " + error.message);
    return false;
  }

  // Slanje podataka
  try {
    await addDoc(collection(db, "Narudzbe"), {
      ime,
      telefon,
      mail,
      datum,
      vrijeme,
      problem,
      vrijemeSlanja: serverTimestamp()
    });

    alert("Podaci su uspješno poslani!");

    
  } catch (error) {
    alert("Greška pri slanju podataka: " + error.message);
  }
  return true;
};
