import type { Metadata } from "next";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Hafizi about software, data analytics, and collaboration.",
};

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-hafizi-kamal-ariffin-64002a1b2/" },
  { label: "GitHub", href: "https://github.com/hafizi1997" },
  { label: "Website", href: "https://hafizyy.com/" },
];

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="contact-heading">
          <div className={styles.art} aria-hidden="true" />
          <div className={styles.shade} aria-hidden="true" />

          <div className={styles.inner}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}><span /> GET IN TOUCH</p>
              <h1 id="contact-heading">Have a good opportunity in mind? <em>Let’s talk.</em></h1>
              <p className={styles.intro}>
                I’m open to conversations about jobs, freelance work, and collaborations.
                Choose whichever way is easiest to reach me.
              </p>

              <div className={styles.direct} aria-label="Direct contact">
                <a className={styles.directLink} href="mailto:hafizikamal8@gmail.com">
                  <span className={styles.linkLabel}>EMAIL</span>
                  <span>hafizikamal8@gmail.com</span>
                  <span className={styles.arrow} aria-hidden="true">↗</span>
                </a>
                <a className={styles.directLink} href="tel:+60198176949">
                  <span className={styles.linkLabel}>PHONE</span>
                  <span>+60 19-817 6949</span>
                  <span className={styles.arrow} aria-hidden="true">↗</span>
                </a>
              </div>

              <nav className={styles.socials} aria-label="Social profiles">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}<span aria-hidden="true"> ↗</span>
                  </a>
                ))}
              </nav>
            </div>

            <form className={styles.form} action="mailto:hafizikamal8@gmail.com" method="post" encType="text/plain">
              <div className={styles.formHeading}>
                <div>
                  <p className={styles.formEyebrow}>START A CONVERSATION</p>
                  <h2>Send me a note</h2>
                </div>
                <span className={styles.formMark} aria-hidden="true">✳</span>
              </div>

              <label className={styles.field}>
                <span>Name</span>
                <input name="name" autoComplete="name" placeholder="Your name" required />
              </label>

              <label className={styles.field}>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>

              <label className={styles.field}>
                <span>Inquiry type</span>
                <select name="inquiry" defaultValue="" required>
                  <option value="" disabled>Select a topic</option>
                  <option>Job opportunity</option>
                  <option>Freelance work</option>
                  <option>Collaboration</option>
                  <option>Something else</option>
                </select>
              </label>

              <label className={`${styles.field} ${styles.messageField}`}>
                <span>Message</span>
                <textarea name="message" placeholder="Tell me a little about it…" rows={3} required />
              </label>

              <button className={styles.submit} type="submit">
                <span>Send message</span><span aria-hidden="true">↗</span>
              </button>
              <p className={styles.formNote}>Your message will open in your email app to send.</p>
            </form>
          </div>

          <footer className={styles.footer}>
            <small>© 2026 Hafizi</small>
            <a href="#page-top">Back to top <span aria-hidden="true">↑</span></a>
          </footer>
        </section>
      </main>
    </div>
  );
}
