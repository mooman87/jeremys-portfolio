import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="project card-neon">
      <div className="image-wrapper">
        {p.image && (
          <Image
            src={p.image}
            alt={p.title}
            width={1200}
            height={800}
            className="project-image"
            priority={false}
          />
        )}
        {p.link && (
          <div className="overlay" aria-hidden={!p.link}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="overlay-button"
            >
              View Project
            </a>
          </div>
        )}
      </div>

      <div className="pbody">
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <div className="meta">
          {p.period && <span>• {p.period}</span>}
          {p.role && <span>• {p.role}</span>}
          {p.impact && <span>• {p.impact}</span>}
        </div>
      </div>
    </article>
  );
}
