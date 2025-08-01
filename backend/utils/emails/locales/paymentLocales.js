const paymentTranslations = {
  en: {
    paymentSubject: "Thank you for your payment",
    paymentSubjectCash: "Thank you for your order",
    paymentGreeting: (name) => `Hello ${name},`,
    paymentReceived: (amount) =>
      `We’ve successfully received your payment of <strong>€${amount}</strong>.`,
    paymentInCash: (amount) =>
      `You have chosen to pay in cash <strong>€${amount}</strong>.`,
    paymentConfirmed:
      "Thank you for choosing <strong>Cleaning</strong>! Your cleaning service is now confirmed.",
    paymentContact: `If you have any questions, feel free to reply to this email or contact us at <a href="mailto:example@gmail.com">example@gmail.com</a>.`,
    paymentReceiptNote:
      "This email serves as your receipt. Please keep it for your records.",
    paymentFooter: "Cleaning service · Your trusted cleaning partner",
  },
  sk: {
    paymentSubject: "Ďakujeme za vašu platbu",
    paymentSubjectCash: "Ďakujeme za vašu objednavku",
    paymentGreeting: (name) => `Ahoj ${name},`,
    paymentReceived: (amount) =>
      `Úspešne sme prijali vašu platbu vo výške <strong>€${amount}</strong>.`,
    paymentInCash: (amount) =>
      `Ste vybrali splatit v hotovosti <strong>€${amount}</strong>.`,
    paymentConfirmed:
      "Ďakujeme, že ste si vybrali <strong>Cleaning service</strong>! Vaša čistiaca služba bola potvrdená.",
    paymentContact: `Ak máte akékoľvek otázky, odpovedzte na tento e-mail alebo nás kontaktujte na <a href="mailto:example@gmail.com">example@gmail.com</a>.`,
    paymentReceiptNote:
      "Tento e-mail slúži ako potvrdenie o platbe. Prosím, uchovajte si ho pre vlastné záznamy.",
    paymentFooter: "Cleaning service · Váš spoľahlivý partner pre čistenie",
  },
  ua: {
    paymentSubject: "Дякуємо за вашу оплату",
    paymentSubjectCash: "Дякуємо за ваше замовлення",
    paymentGreeting: (name) => `Привіт, ${name},`,
    paymentReceived: (amount) =>
      `Ми успішно отримали вашу оплату на суму <strong>€${amount}</strong>.`,
    paymentInCash: (amount) =>
      `Ви обрали оплату готівкою <strong>€${amount}</strong>.`,
    paymentConfirmed:
      "Дякуємо, що обрали <strong>Cleaning service</strong>! Вашу послугу прибирання підтверджено.",
    paymentContact: `Якщо у вас є запитання, просто відповідайте на цей лист або напишіть нам на <a href="mailto:example@gmail.com">example@gmail.com</a>.`,
    paymentReceiptNote:
      "Цей лист є підтвердженням платежу. Збережіть його для себе.",
    paymentFooter: "Cleaning service · Ваш надійний партнер у прибиранні",
  },
  ru: {
    paymentSubject: "Спасибо за вашу оплату",
    paymentSubjectCash: "Спасибо за ваше заказ",
    paymentGreeting: (name) => `Здравствуйте, ${name},`,
    paymentReceived: (amount) =>
      `Мы успешно получили ваш платеж на сумму <strong>€${amount}</strong>.`,
    paymentInCash: (amount) =>
      `Вы выбрали оплату наличными <strong>€${amount}</strong>.`,
    paymentConfirmed:
      "Спасибо, что выбрали <strong>Cleaning service</strong>! Ваша уборка подтверждена.",
    paymentContact: `Если у вас есть вопросы, просто ответьте на это письмо или свяжитесь с нами по адресу <a href="mailto:example@gmail.com">example@gmail.com</a>.`,
    paymentReceiptNote:
      "Это письмо служит вашей квитанцией. Пожалуйста, сохраните его.",
    paymentFooter: "Cleaning service · Ваш надежный партнёр по уборке",
  },
};

module.exports = paymentTranslations;
