// Your code here
document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters();
  });
  
  let currentCharacter = null; 
  
  function fetchCharacters() {
    fetch("http://localhost:3000/characters") 
      .then(response => response.json())
      .then(characters => {
        const characterBar = document.getElementById("character-bar");
  
        characters.forEach(character => {
          const span = document.createElement("span");
          span.textContent = character.name;
          span.style.cursor = "pointer";
  
          span.addEventListener("click", () => displayCharacterDetails(character));
  
          characterBar.appendChild(span);
        });
      })
      .catch(error => console.error("Error fetching characters:", error));
  }
  
  function displayCharacterDetails(character) {
    currentCharacter = character;
  
    document.getElementById("name").textContent = character.name;
    document.getElementById("image").src = character.image;
    document.getElementById("image").alt = character.name;
    document.getElementById("vote-count").textContent = character.votes;
  
    const form = document.getElementById("votes-form");
    form.onsubmit = (event) => {
      event.preventDefault();
      addVotes();
    };
  
    document.getElementById("reset-btn").onclick = resetVotes;
  }
  
  function addVotes() {
    if (!currentCharacter) return;
  
    const voteInput = document.getElementById("votes");
    const voteCountSpan = document.getElementById("vote-count");
  
    let newVotes = parseInt(voteInput.value);
    if (!isNaN(newVotes) && newVotes > 0) {
      currentCharacter.votes += newVotes; 
      voteCountSpan.textContent = currentCharacter.votes; 
      voteInput.value = ""; 
    } else {
      alert("Please enter a valid number!");
    }
  }
  
  function resetVotes() {
    if (!currentCharacter) return;
  
    currentCharacter.votes = 0; 
    document.getElementById("vote-count").textContent = 0; 
  }