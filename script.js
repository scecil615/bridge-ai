
const button = document.getElementById("simplifyBtn");
const messageInput = document.getElementById("message");
const result = document.getElementById("result");
const simplifiedText = document.getElementById("simplifiedText");

button.addEventListener("click", function () {
  const message = messageInput.value.trim();

  if (message === "") {
    alert("Please enter a message first.");
    messageInput.focus();
    return;
  }

  const lowerMessage = message.toLowerCase();
  let explanation = "";

  if (lowerMessage.includes("appointment")) {
    explanation =
      "This message appears to be about an appointment. " +
      "Check the date, time, and location carefully.";
  } else if (
    lowerMessage.includes("password") ||
    lowerMessage.includes("verify your account")
  ) {
    explanation =
      "This message mentions account security. " +
      "Be careful with links and never share your password. " +
      "Contact the organization directly if you are unsure.";
  } else if (lowerMessage.includes("payment")) {
    explanation =
      "This message appears to be about a payment. " +
      "Check who sent it and verify the amount before taking action.";
  } else {
    explanation =
      "Bridge received your message. " +
      "AI-powered explanations are not connected yet. " +
      "For now, this is a demonstration of how the feature will work.";
  }

  simplifiedText.textContent = explanation;
  result.hidden = false;
});


