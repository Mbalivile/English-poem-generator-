document.getElementById("poem-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const topic = document.getElementById("poem-topic").value.trim();
  const poemElement = document.getElementById("poem-output");

  if (!topic) {
    poemElement.innerHTML = "Please enter a topic to generate a poem.";
    return;
  }

  poemElement.innerHTML = "Generating poem...";

  try {
    // Fetch a random poem from the Poems API
    const response = await fetch("https://poems.one/api/poem/");
    const data = await response.json();

    if (data && data.poem && data.poem.content) {
      // Display the fetched poem
      const poem = data.poem.content.trim().replace(/\n/g, "<br/>");
      poemElement.innerHTML = poem;
    } else {
      poemElement.innerHTML = "Could not retrieve a poem. Please try again.";
    }
  } catch (error) {
    console.error("Error fetching poem:", error);
    poemElement.innerHTML = "An error occurred while generating the poem.";
  }
});