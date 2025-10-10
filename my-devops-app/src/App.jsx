import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Typing({ phrases = [], speed = 80, pause = 1200 }) {
  const [text, setText] = useState("");
  const [pi, setPi] = useState(0); // phrase index
  const [ci, setCi] = useState(0); // char index
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let t = setTimeout(
      () => {
        const current = phrases[pi % phrases.length] || "";
        if (!deleting) {
          setText(current.slice(0, ci + 1));
          setCi((c) => c + 1);
          if (ci + 1 === current.length) {
            setDeleting(true);
            setTimeout(() => {}, pause);
          }
        } else {
          setText(current.slice(0, ci - 1));
          setCi((c) => c - 1);
          if (ci - 1 === 0) {
            setDeleting(false);
            setPi((p) => p + 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ci, deleting, pi, phrases, speed, pause]);

  return (
    <span className="typing">
      {text}
      <span className="caret" />
    </span>
  );
}

function InfoCard({ title, children, accent }) {
  return (
    <div className="card info-card" data-accent={accent}>
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <div className="nebula" />
      <header className="header glass">
        <div className="logos">
          <a
            href="https://vite.dev"
            target="_blank"
            rel="noreferrer"
            title="Vite"
          >
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            title="React"
          >
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <div className="title-block">
          <h1 className="neon">Deploy Like It's 2099</h1>
          <h2 className="subtitle">
            <Typing
              phrases={[
                "Automate builds. Ship faster.",
                "CI/CD: commit → build → push → deploy.",
                "Less toil, more coffee ☕ (or tea).",
              ]}
              speed={55}
              pause={1000}
            />
          </h2>
          <p className="lead">
            A futuristic demo app showing a CI/CD pipeline that builds a Docker
            image, pushes to Docker Hub, and deploys to an AWS EC2 instance
            automatically.
          </p>
          <div className="cta-row">
            <button
              className="btn primary"
              onClick={() => window.open("#ci-cd", "_self")}
            >
              View CI/CD Flow
            </button>
            <button
              className="btn ghost"
              onClick={() => {
                const el = document.querySelector("#benefits");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Why Automate?
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <section id="ci-cd" className="section">
          <InfoCard title="CI/CD — What we built" accent="#7ef1ff">
            <ul>
              <li>
                GitHub Actions workflow triggers on{" "}
                <strong>push to main</strong> or merged PRs.
              </li>
              <li>
                Builds a Docker image from <code>my-devops-app/Dockerfile</code>
                .
              </li>
              <li>
                Pushes image to <strong>Docker Hub</strong> (tags:{" "}
                <code>latest</code> + commit SHA).
              </li>
              <li>
                SSH into AWS EC2 and runs the new container (mapped to port 80).
              </li>
            </ul>
            <p className="mono">
              Workflow file: <code>.github/workflows/deploy.yml</code>
            </p>
          </InfoCard>

          <div className="card terminal glass">
            <div className="term-top">
              <div className="dots">
                <span />
                <span />
                <span />
              </div>
              <div className="term-title">CI/CD Logs</div>
            </div>
            <pre className="term-body">
              {`> docker build -f my-devops-app/Dockerfile ...
> Successfully built 7a3c1b...
> docker push username/my-devops-app:sha1234
> docker push username/my-devops-app:latest
> ssh ec2-user@ec2-3-12-45-67.compute-1.amazonaws.com
> docker pull username/my-devops-app:latest
> docker run -d --name my-devops-app -p 80:80 username/my-devops-app:latest
> CONTAINER ID  IMAGE                                 PORTS
  abcd1234      username/my-devops-app:latest         0.0.0.0:80->80/tcp`}
            </pre>
          </div>
        </section>

        <section id="benefits" className="section two-col">
          <InfoCard title="Benefits of Automation" accent="#ff7ef1">
            <ol>
              <li>
                <strong>Speed:</strong> Faster, repeatable releases.
              </li>
              <li>
                <strong>Reliability:</strong> Reduce human error with
                deterministic builds.
              </li>
              <li>
                <strong>Traceability:</strong> Each image tagged by commit SHA
                for rollbacks.
              </li>
              <li>
                <strong>Scale:</strong> One pipeline, many environments (dev →
                staging → prod).
              </li>
              <li>
                <strong>Sane humans:</strong> Less firefighting — more feature
                work (and memes).
              </li>
            </ol>
          </InfoCard>

          <InfoCard title="How to Verify" accent="#9bff7e">
            <p>Simple checks you can present as proof:</p>
            <ul>
              <li>
                GitHub Actions logs — show build/push/deploy steps (screenshot).
              </li>
              <li>Docker Hub — the image tags (latest + commit sha).</li>
              <li>
                EC2 `docker ps` — container running with host port 80 exposed.
              </li>
              <li>
                Browser screenshot — live app at{" "}
                <code>http://&lt;EC2-IP&gt;</code>.
              </li>
            </ul>
            <div className="small-note">
              Instructor-ready checklist included on README.
            </div>
          </InfoCard>
        </section>

        <section className="section interactive">
          <div className="card big glow">
            <h3>Try me</h3>
            <p>
              Click the counter to see a playful animation — because devs need
              joy too.
            </p>
            <div className="counter-row">
              <button
                className="btn primary large"
                onClick={() => setCount((c) => c + 1)}
              >
                Tap me — count is {count}
              </button>
            </div>
          </div>
        </section>

        <footer className="footer glass">
          <div>
            <small>
              Repo: <code>my-devops-app</code> • Workflow:{" "}
              <code>ci-cd.yml</code>
            </small>
          </div>
          <div className="social">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://hub.docker.com" target="_blank" rel="noreferrer">
              Docker Hub
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
