
/* Bridge: Message recognition rules */

function isPaymentMessage(message) {
  const paymentPattern =
    /\b(payment|pay|paying|paid|bill|billing|balance|owe|overdue|invoice|transfer money|send money)\b/i;

  return paymentPattern.test(message);
}
