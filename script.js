
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
 
const extractedDetails = extractDetails(message);

if (extractedDetails.length > 0) {
  importantDetails.textContent =
    extractedDetails.join("\n");
} else {
  importantDetails.textContent = details;
}

  nextSteps.textContent = action;

  result.hidden = false;
});

const increaseText =
  document.getElementById("increaseText");

const decreaseText =
  document.getElementById("decreaseText");

let textSize = 100;

increaseText.addEventListener("click", function () {
  if (textSize < 150) {
    textSize += 10;
    document.documentElement.style.fontSize =
      textSize + "%";
  }
});

decreaseText.addEventListener("click", function () {
  if (textSize > 90) {
    textSize -= 10;
    document.documentElement.style.fontSize =
      textSize + "%";
  }
});

/* Read-aloud functionality */

const readAloudButton = document.getElementById("readAloud");
const stopReadingButton = document.getElementById("stopReading");
const speechStatus = document.getElementById("speechStatus");

const speechSupported =
  "speechSynthesis" in window &&
  "SpeechSynthesisUtterance" in window;

if (!speechSupported) {
  readAloudButton.disabled = true;
  stopReadingButton.disabled = true;
  speechStatus.textContent =
    "Read-aloud is not supported in this browser.";
}

readAloudButton.addEventListener("click", function () {
  if (!speechSupported) return;

  window.speechSynthesis.cancel();

  
const speechParts = [
  "What does this mean?",
  simplifiedText.textContent,
  "Important details.",
  importantDetails.textContent,
  "What should I do?",
  nextSteps.textContent
];

if (!scamWarnings.hidden) {
  speechParts.push("Potential warning signs.");

  warningList.querySelectorAll("li").forEach(function (item) {
    speechParts.push(item.textContent);
  });

  speechParts.push(safetyAdvice.textContent);
}

const speechText = speechParts.join(" ");


  const speech = new SpeechSynthesisUtterance(speechText);

  speech.lang = "en-US";
  speech.rate = 0.85;

  speech.onstart = function () {
    speechStatus.textContent = "Reading your explanation aloud.";
  };

  speech.onend = function () {
    speechStatus.textContent = "Finished reading.";
  };

  speech.onerror = function (event) {
    if (event.error !== "canceled" &&
        event.error !== "interrupted") {
      speechStatus.textContent = "Unable to read aloud.";
    }
  };

  window.speechSynthesis.speak(speech);
});

stopReadingButton.addEventListener("click", function () {
  if (!speechSupported) return;

  window.speechSynthesis.cancel();
  speechStatus.textContent = "Reading stopped.";
});

/* Copy explanation */

const copyButton =
  document.getElementById("copyExplanation");

const copyStatus =
  document.getElementById("copyStatus");

copyButton.addEventListener("click", async function () {
  
const explanationParts = [
  "What does this mean?",
  simplifiedText.textContent,
  "",
  "Important Details",
  importantDetails.textContent,
  "",
  "What should I do?",
  nextSteps.textContent
];

if (!scamWarnings.hidden) {
  explanationParts.push("", "Potential Warning Signs");

  warningList.querySelectorAll("li").forEach(function (item) {
    explanationParts.push("- " + item.textContent);
  });

  explanationParts.push("", safetyAdvice.textContent);
}

const explanation = explanationParts.join("\n");


  try {
    await navigator.clipboard.writeText(explanation);
    copyStatus.textContent = "Explanation copied!";
  } catch (error) {
    copyStatus.textContent =
      "Unable to copy automatically. Please select and copy the explanation manually.";
  }
});

/* Sample messages */

const samples = {
  sampleAppointment:
    "Hello, your appointment is scheduled for Friday at 10:00 AM. Please arrive 15 minutes early.",

  sampleSecurity:
    "URGENT: Verify your account immediately. Click the link below and enter your password to avoid suspension.",

  samplePayment:
    "This is a reminder that your payment of $45 is due on November 15."
};

Object.keys(samples).forEach(function (buttonId) {
  const sampleButton = document.getElementById(buttonId);

  sampleButton.addEventListener("click", function () {
    messageInput.value = samples[buttonId];

    result.hidden = true;
    copyStatus.textContent = "";
    speechStatus.textContent = "";

    if (speechSupported) {
      window.speechSynthesis.cancel();
    }

    messageInput.focus();
  });
});

/* Bridge v0.3: Information extraction */


/* Bridge v0.3: Improved information extraction */

function extractDetails(message) {
  const patterns = {
    writtenDate:
      /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:,\s*\d{4})?\b/gi,

    numericDate:
      /\b(?:0?[1-9]|1[0-2])\/(?:0?[1-9]|[12]\d|3[01])(?:\/\d{2,4})?\b/g,

    weekday:
      /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/gi,

    time:
      /\b(?:1[0-2]|0?[1-9]):[0-5]\d\s*(?:AM|PM)\b/gi,

    money:
      /\$\s?\d+(?:,\d{3})*(?:\.\d{2})?/g,

    arrival:
      /\barrive\s+\d+\s+minutes?\s+early\b/gi,

    deadline:
      /\b(?:due|pay|respond|submit)\s+(?:by|on|before)\s+(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January\s+\d{1,2}|February\s+\d{1,2}|March\s+\d{1,2}|April\s+\d{1,2}|May\s+\d{1,2}|June\s+\d{1,2}|July\s+\d{1,2}|August\s+\d{1,2}|September\s+\d{1,2}|October\s+\d{1,2}|November\s+\d{1,2}|December\s+\d{1,2}|\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\b/gi
  };

  const foundDetails = [];

  function addMatches(label, pattern) {
    const matches = [...message.matchAll(pattern)];

    matches.forEach(function (match) {
      const detail = label + ": " + match[0];

      if (!foundDetails.includes(detail)) {
        foundDetails.push(detail);
      }
    });
  }

  addMatches("Date", patterns.writtenDate);
  addMatches("Date", patterns.numericDate);
  addMatches("Day mentioned", patterns.weekday);
  addMatches("Time", patterns.time);
  addMatches("Amount", patterns.money);
  addMatches("Instruction", patterns.arrival);
  addMatches("Possible deadline", patterns.deadline);

  return foundDetails;
}

/* Bridge v0.4: Scam awareness demo */

const scamWarnings = document.getElementById("scamWarnings");
const warningList = document.getElementById("warningList");
const safetyAdvice = document.getElementById("safetyAdvice");

function checkWarningSigns(message) {
  const warnings = [];

  if (/\b(urgent|immediately|act now|final warning)\b/i.test(message)) {
    warnings.push(
      "Urgent language: The message pressures you to act quickly."
    );
  }

  if (/\b(password|passcode|verification code|one.time code)\b/i.test(message)) {
    warnings.push(
      "Sensitive information: The message mentions credentials or security codes. Check whether it is requesting them."
    );
  }

  if (/\b(click (this |the |a )?link|tap (this |the )?link)\b/i.test(message)) {
    warnings.push(
      "Link request: Be cautious about following links in unexpected messages."
    );
  }

  if (/\b(gift card|wire transfer|cryptocurrency)\b/i.test(message)) {
    warnings.push(
      "Payment method: Requests involving gift cards, wire transfers, or cryptocurrency deserve extra verification."
    );
  }

  if (/\b(suspended|locked|terminated)\b/i.test(message)) {
    warnings.push(
      "Account threat: The message may be using the threat of lost access to create pressure."
    );
  }

  return warnings;
}

button.addEventListener("click", function () {
  const message = messageInput.value.trim();

  warningList.replaceChildren();
  scamWarnings.hidden = true;

  if (!message) return;

  const warnings = checkWarningSigns(message);

  warnings.forEach(function (warning) {
    const item = document.createElement("li");
    item.textContent = warning;
    warningList.appendChild(item);
  });

  if (warnings.length > 0) {
    safetyAdvice.textContent =
      "If this message was unexpected, verify it using a trusted phone number or website. Do not share passwords or verification codes.";
  } else {
    const item = document.createElement("li");
    item.textContent =
      "No supported warning phrases were found. This does not mean the message is safe.";
    warningList.appendChild(item);

    safetyAdvice.textContent =
      "Bridge cannot verify senders, links, or whether a message is genuine.";
  }

  scamWarnings.hidden = false;
});

/* Bridge v0.5: Clear Message */

const clearMessageButton =
  document.getElementById("clearMessage");

clearMessageButton.addEventListener("click", function () {
  // Stop any ongoing speech
  if (speechSupported) {
    window.speechSynthesis.cancel();
  }

  // Clear the message input
  messageInput.value = "";

  // Hide the explanation and warnings
  result.hidden = true;
  scamWarnings.hidden = true;

  // Remove previous warning items
  warningList.replaceChildren();

  // Clear status messages
  speechStatus.textContent = "";
  copyStatus.textContent = "";

  // Clear old explanation text
  simplifiedText.textContent = "";
  importantDetails.textContent = "";
  nextSteps.textContent = "";
  safetyAdvice.textContent = "";

  // Return the cursor to the message box
  messageInput.focus();
});
