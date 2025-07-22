const translations = {
  en: {
    paymentSubject: "Thank you for your payment",
    paymentGreeting: (name) => `Hello ${name},`,
    paymentReceived: (amount) =>
      `We’ve successfully received your payment of <strong>€${amount}</strong>.`,
    paymentConfirmed:
      "Thank you for choosing <strong>LexiShine Cleaning</strong>! Your cleaning service is now confirmed.",
    paymentContact: `If you have any questions, feel free to reply to this email or contact us at <a href="mailto:infolexishine@gmail.com">infolexishine@gmail.com</a>.`,
    paymentReceiptNote:
      "This email serves as your receipt. Please keep it for your records.",
    paymentFooter: "LexiShine Cleaning · Your trusted cleaning partner",
  },
  sk: {
    paymentSubject: "Ďakujeme za vašu platbu",
    paymentGreeting: (name) => `Ahoj ${name},`,
    paymentReceived: (amount) =>
      `Úspešne sme prijali vašu platbu vo výške <strong>€${amount}</strong>.`,
    paymentConfirmed:
      "Ďakujeme, že ste si vybrali <strong>LexiShine Cleaning</strong>! Vaša čistiaca služba bola potvrdená.",
    paymentContact: `Ak máte akékoľvek otázky, odpovedzte na tento e-mail alebo nás kontaktujte na <a href="mailto:infolexishine@gmail.com">infolexishine@gmail.com</a>.`,
    paymentReceiptNote:
      "Tento e-mail slúži ako potvrdenie o platbe. Prosím, uchovajte si ho pre vlastné záznamy.",
    paymentFooter: "LexiShine Cleaning · Váš spoľahlivý partner pre čistenie",
  },
  ua: {
    paymentSubject: "Дякуємо за вашу оплату",
    paymentGreeting: (name) => `Привіт, ${name},`,
    paymentReceived: (amount) =>
      `Ми успішно отримали вашу оплату на суму <strong>€${amount}</strong>.`,
    paymentConfirmed:
      "Дякуємо, що обрали <strong>LexiShine Cleaning</strong>! Вашу послугу прибирання підтверджено.",
    paymentContact: `Якщо у вас є запитання, просто відповідайте на цей лист або напишіть нам на <a href="mailto:infolexishine@gmail.com">infolexishine@gmail.com</a>.`,
    paymentReceiptNote:
      "Цей лист є підтвердженням платежу. Збережіть його для себе.",
    paymentFooter: "LexiShine Cleaning · Ваш надійний партнер у прибиранні",
  },
  ru: {
    paymentSubject: "Спасибо за вашу оплату",
    paymentGreeting: (name) => `Здравствуйте, ${name},`,
    paymentReceived: (amount) =>
      `Мы успешно получили ваш платеж на сумму <strong>€${amount}</strong>.`,
    paymentConfirmed:
      "Спасибо, что выбрали <strong>LexiShine Cleaning</strong>! Ваша уборка подтверждена.",
    paymentContact: `Если у вас есть вопросы, просто ответьте на это письмо или свяжитесь с нами по адресу <a href="mailto:infolexishine@gmail.com">infolexishine@gmail.com</a>.`,
    paymentReceiptNote:
      "Это письмо служит вашей квитанцией. Пожалуйста, сохраните его.",
    paymentFooter: "LexiShine Cleaning · Ваш надежный партнёр по уборке",
  },
};

module.exports = translations;
