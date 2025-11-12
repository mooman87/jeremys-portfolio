import Header from "./components/Header";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import ProjectCard from "./components/ProjectCard";
// import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <>
    <Header/>
      <main>
      <section className="hero">
        {/* top- left  */}
        <h1 className="hero-title">
          Hi, I&apos;m <span style={{ color: "#1ABC9C" }}>{profile.firstName}</span>
        </h1>

        {/* right column spacer  */}
        <div className="hero-portrait" />

        {/* bottom- left */}
        <div className="hero-copy">
        <div
          className="tagline"
          style={{ whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{ __html: profile.tagline }}
        />
        </div>

        {/* bottom- right */}
        <aside className="hero-explore" aria-labelledby="now-title">
          {profile.exploring?.length ? (
            <div className="now-card">
              <h4 id="now-title">Currently exploring</h4>
              <ul>
                {profile.exploring.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </section>
        <section id="work" className="grid">
          <div className="section-title">
            <h2>Selected Highlights</h2>
          </div>
          <div className="projects">
            {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
          </div>
        </section>
        <hr className="sep" />
        <section id="about" className="grid about-grid">
  <div className="card about-left">
    <h2>Toolkit</h2>
    <div className="toolkit" style={{ marginTop: 12 }}>
      {profile.tools.map(s => (
        <a
          key={s.label}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="icon-link"
          title={s.label}
        >
          <img src={s.icon} alt={s.label} />
        </a>
      ))}
    </div>
  </div>

  <div className="card about-right">
    <h3>Professional Experience</h3>
    <div className="timeline">
      {experience.map((e) => (
        <div className="item" key={e.company}>
          <strong>{e.role} — {e.company}</strong>
          <span className="when">{e.when}</span>
          <p>{e.blurb}</p>
        </div>
      ))}
    </div>
  </div>
</section>


        {/* <hr className="sep" />

        <section id="contact" className="grid">
          <div className="card" style={{gridColumn: "span 12"}}>
            <h2>Let’s build the future together</h2>
            <p className="tagline">Have a project, role, or collaboration in mind? I’d love to hear about it.</p>
            <div className="actions" style={{marginTop: 12}}>
              <ContactForm/>
            </div>
          </div>
        </section> */}

        <footer className="footer">
          <small>© {new Date().getFullYear()} {profile.firstName + " "}{profile.lastName}</small>
        </footer>
      </main>
    </>
  );
}
