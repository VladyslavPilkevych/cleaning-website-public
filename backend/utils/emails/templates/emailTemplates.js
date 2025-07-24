const paymentTranslations = require("../locales/paymentLocales");

function generateClientPaymentEmailHTML(name, amountFormatted, language, isPaymentReceived = false) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
      <h2 style="color: #4CAF50;">LexiShine Cleaning</h2>
      <p style="font-size: 16px;">${paymentTranslations[language].paymentGreeting(name)}</p>
      <p style="font-size: 16px;">${isPaymentReceived ? paymentTranslations[language].paymentReceived(amountFormatted) : paymentTranslations[language].paymentInCash(amountFormatted)}</p>
      <p style="font-size: 16px;">${paymentTranslations[language].paymentConfirmed}</p>
      <hr style="margin: 20px 0;">
      <p style="font-size: 15px; color: #555;">${paymentTranslations[language].paymentContact}</p>
      <p style="margin-top: 30px; font-size: 14px; color: #999;">${paymentTranslations[language].paymentReceiptNote}</p>
      <p style="font-size: 14px; color: #999;">${paymentTranslations[language].paymentFooter}</p>
    </div>
  `;
}

function generateAdminPaymentEmailHTML(formData, amountFormatted) {
  const formatDate = (str) => str || "—";
  const formatBool = (val) => (val ? "Так" : "Ні");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
      <h2 style="color: #4CAF50;">LexiShine Cleaning</h2>
      <p style="font-size: 16px;">Нова оплата отримана:</p>
      <ul style="font-size: 15px; color: #333; line-height: 1.6;">
        <li><strong>Ім'я:</strong> ${formData.contacts.name}</li>
        <li><strong>Пошта:</strong> ${formData.contacts.email}</li>
        <li><strong>Телефон:</strong> ${formData.contacts.phone ?? "—"}</li>
        <li><strong>Повідомлення:</strong> ${formData.contacts.message ?? "—"}</li>
        <li><strong>Сума:</strong> €${amountFormatted}</li>
        <li><strong>Метод оплати:</strong> ${formData.paymentMethod === "card" ? "Картка" : "Готівка"}</li>
        <li><strong>Дата прибирання:</strong> ${formatDate(formData.date)}</li>
        <li><strong>Час:</strong> ${formData.time ?? "—"}</li>
      </ul>

      <h3 style="color: #4CAF50;">Адреса</h3>
      <ul style="font-size: 15px; color: #333;">
        <li><strong>Вулиця:</strong> ${formData.address.street ?? "—"}</li>
        <li><strong>Будинок:</strong> ${formData.address.house ?? "—"}</li>
        <li><strong>Поверх:</strong> ${formData.address.floor ?? "—"}</li>
        <li><strong>Місто:</strong> ${formData.address.city ?? "—"}</li>
        <li><strong>Поштовий індекс:</strong> ${formData.address.psc ?? "—"}</li>
      </ul>

      <h3 style="color: #4CAF50;">Інформація про нерухомість</h3>
      <ul style="font-size: 15px; color: #333;">
        <li><strong>Тип:</strong> ${
          formData.property.type === "apartment"
            ? "Квартира"
            : formData.property.type === "house"
            ? "Будинок"
            : formData.property.type === "office"
            ? "Офіс"
            : "—"
        }</li>
        <li><strong>Площа:</strong> ${formData.property.area ?? "—"} м²</li>
        <li><strong>Кількість кімнат:</strong> ${formData.property.rooms ?? "—"}</li>
        <li><strong>Прибирання поетапно:</strong> ${formatBool(formData.property.steps)}</li>
      </ul>

      <h3 style="color: #4CAF50;">Миття вікон</h3>
      <ul style="font-size: 15px; color: #333;">
        <li><strong>Потрібно миття:</strong> ${formatBool(formData.windows.cleaning)}</li>
        <li><strong>Площа вікон:</strong> ${formData.windows.area ?? "—"} м²</li>
        <li><strong>Кількість вікон:</strong> ${formData.windows.count ?? "—"}</li>
        <li><strong>Цвіль:</strong> ${formatBool(formData.windows.mold)}</li>
      </ul>

      <h3 style="color: #4CAF50;">Хімчистка</h3>
      <ul style="font-size: 15px; color: #333;">
        <li><strong>Потрібна:</strong> ${formatBool(formData.chemicalCleaning.chemic)}</li>
        <li><strong>Тип:</strong> ${
          formData.chemicalCleaning.type === "bio"
            ? "Біо"
            : formData.chemicalCleaning.type === "regular"
            ? "Звичайна"
            : "—"
        }</li>
      </ul>

      <h3 style="color: #4CAF50;">Інші послуги</h3>
      <ul style="font-size: 15px; color: #333;">
        <li><strong>Пилосос:</strong> ${formatBool(formData.vacuum)}</li>
      </ul>
    </div>
  `;
}
// ${
//   formData.services.length > 0
//     ? formData.services
//         .map(
//           (s, i) => `
//   <li><strong>Додаткова послуга ${i + 1}:</strong> ID: ${
//             s.id
//           }, Кількість: ${s.count}, Ціна: €${s.price}</li>
// `
//         )
//         .join("")
//     : "<li>Немає додаткових послуг</li>"
// }

function generateClientOnlineSupportHTML(name, language) {
  const formatDate = (str) => str || "—";
  const formatBool = (val) => (val ? "Так" : "Ні");

  return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
          <h2 style="color: #4CAF50;">LexiShine Cleaning</h2>
          <p style="font-size: 16px;">${onlineSupportTranslations[language].greeting}, ${name}</p>
          <p style="font-size: 16px;">${onlineSupportTranslations[language].thanks}</p>
          <p style="font-size: 16px;">${onlineSupportTranslations[language].followup}</p>
        </div>
        `;
}

function generateAdminOnlineSupportHTML(name, phone, message, email, language) {
  const formatDate = (str) => str || "—";
  const formatBool = (val) => (val ? "Так" : "Ні");

  return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #4CAF50;">LexiShine Cleaning</h2>
            <p style="font-size: 16px;">Нова заявка на підтримку:</p>
            <ul style="font-size: 15px; color: #333; line-height: 1.6;">
              <li><strong>Ім'я:</strong> ${name}</li>
              <li><strong>Пошта:</strong> ${email}</li>
              <li><strong>Телефон:</strong> ${phone}</li>
              <li><strong>Повідомлення:</strong> ${message}</li>
              <li><strong>Мова спілкування:</strong> ${language}</li>
            </ul>
        </div>
        `;
}

module.exports = {
  generateClientPaymentEmailHTML,
  generateAdminPaymentEmailHTML,
  generateClientOnlineSupportHTML,
  generateAdminOnlineSupportHTML,
};
