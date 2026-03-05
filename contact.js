const CONTACT_EMAIL = "dyrkolbotnvvs@gmail.com";

const form = document.querySelector("#contact-form");
const helpText = document.querySelector("#form-help");

if (form && helpText) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (CONTACT_EMAIL.includes("sett-inn-epost")) {
      helpText.textContent =
        "Oppdater e-postadressen i contact.js før skjemaet tas i bruk.";
      return;
    }

    const data = new FormData(form);
    const name = data.get("name")?.toString().trim() || "";
    const email = data.get("email")?.toString().trim() || "";
    const phone = data.get("phone")?.toString().trim() || "";
    const subject = data.get("subject")?.toString().trim() || "Ny henvendelse";
    const message = data.get("message")?.toString().trim() || "";

    const body = [
      `Navn: ${name}`,
      `E-post: ${email}`,
      `Telefon: ${phone || "Ikke oppgitt"}`,
      "",
      "Hva gjelder henvendelsen:",
      subject,
      "",
      "Melding:",
      message,
    ].join("\r\n");

    const mailtoUrl =
      `mailto:${encodeURIComponent(CONTACT_EMAIL)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    helpText.textContent = "E-postmeldingen er klar i e-postklienten din.";
  });
}
