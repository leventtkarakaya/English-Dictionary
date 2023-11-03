const inputs = document.getElementById("input");
const paragraf = document.getElementById("paragraf");
const meaningContainer = document.getElementById("meaning-container");
const title = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audioEL = document.getElementById("audio");

async function fetchApi(word) {
  try {
    paragraf.style.display = "block";
    meaningContainer.style.display = "none";
    paragraf.innerText = `Searching the meaning of ${word}`;
    const engApi = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(engApi).then((Response) => Response.json());
    if (result.title) {
      meaningContainer.style.display = "block";
      paragraf.style.display="none"
      title.innerText = `${word}`;
      meaning.innerText = "N/A";
    }
    meaningContainer.style.display = "block";
    paragraf.style.display = "none";
    audioEL.style.display = "inline-flex";
    title.innerText = result[0].word;
    meaning.innerText = result[0].meanings[0].definitions[0].definition;
    audioEL.src = result[0].phonetics[0].audio;
  } catch (error) {
    console.log(error);
  }
}

inputs.addEventListener("keyup", (event) => {
  if (event.target.value && event.key === "Enter") {
    fetchApi(event.target.value);
  }
});
