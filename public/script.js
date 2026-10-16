const feedbackForm = document.getElementById("feedbackForm");
const message = document.getElementById("message");
const feedbackList = document.getElementById("feedbackList");


feedbackForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const rating = document.getElementById("rating").value;
  const comments = document.getElementById("comments").value;

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: name,
        rating: rating,
        comments: comments
      })
    });

    const data = await response.json();

    message.textContent = data.message;

    feedbackForm.reset();

    loadFeedback();

  } catch (error) {
    console.log(error);

    message.textContent = "Something went wrong!";
  }
});


async function loadFeedback() {
  try {
    const response = await fetch("/api/feedback");

    const feedback = await response.json();

    feedbackList.innerHTML = "";

    feedback.forEach((item) => {

      const card = document.createElement("div");

      card.className = "feedback-card";

      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Rating:</strong> ${item.rating}/5</p>
        <p><strong>Comment:</strong> ${item.comments}</p>
      `;

      feedbackList.appendChild(card);
    });

  } catch (error) {
    console.log(error);

    feedbackList.textContent = "Unable to load feedback.";
  }
}


loadFeedback();