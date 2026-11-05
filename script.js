
const button = document.getElementById("simplifyBtn");
const messageInput = document.getElementById("message");
const result = document.getElementById("result");

const simplifiedText = document.getElementById("simplifiedText");
const importantDetails = document.getElementById("importantDetails");
const nextSteps = document.getElementById("nextSteps");

button.addEventListener("click", function () {
  const message = messageInput.value.trim();

  if (message === "") {
    alert("Please enter a message first.");
    messageInput.focus();
    return;
  }

  const lowerMessage = message.toLowerCase();

  let explanation = "";
  let details = "";
  let action = "";

  if (lowerMessage.includes("appointment")) {
    explanation = "This message is about an appointment.";

    details =
      "Look at the original message for the date, time, and location.";

    action =
      "Confirm when and where your appointment is scheduled.";

  } else if (
    lowerMessage.includes("password") ||
    lowerMessage.includes("verify your account")
  ) {
    explanation =
      "This message mentions account security.";

    details =
      "Requests for passwords or account verification can be warning signs of scams.";

    action =
      "Do not share your password. Contact the organization using a trusted phone number or website.";

  } else if (lowerMessage.includes("payment")) {
    explanation =
      "This message appears to concern a payment.";

    details =
      "Check the payment amount, sender, and any stated deadline in the original message.";

    action =
      "Verify the request directly with the organization before paying.";

  } else {
    explanation =
      "Bridge received your message, but this demo cannot reliably explain its meaning.";

    details =
      "No specific details were identified by the demo.";

    action =
      "Review the original message. Future versions of Bridge will provide more personalized explanations.";
  }

  simplifiedText.textContent = explanation;
  importantDetails.textContent = details;
  nextSteps.textContent = action;

  result.hidden = false;
});
