import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/project-media";

export function TabbyStory({ project }: { project: Project }) {
  const [board, spaces, extension, batch] = project.gallery;

  return (
    <section className="tabby-story" aria-label="The Tabby product story">
      <figure className="tabby-hero">
        <div className="tabby-board-stage">
          <div className="tabby-browser">
            <div className="tabby-browser-bar" aria-hidden="true">
              <i /><i /><i /><span>thankyoutabby.com</span>
            </div>
            <ProjectMedia item={board} first />
          </div>
        </div>
        <figcaption>The web app, populated with sample tabs from my portfolio.</figcaption>
      </figure>

      <section className="tabby-beat tabby-problem" aria-labelledby="tabby-problem">
        <div className="tabby-copy">
          <p className="kicker">01 / A very personal problem</p>
          <h2 id="tabby-problem">“I might need<br />that later.”</h2>
          <p>That’s how I end up with 70 tabs open. Some for weeks. Eventually I can’t find anything, and my computer feels it too.</p>
          <p>Bookmarks felt like an archive. Tab groups still left everything open. I wanted a visual place for the things I was still thinking about.</p>
        </div>
        <div className="tabby-thought" role="img" aria-label="An illustration of crowded browser tabs, followed by the idea: keep the thought, close the tab">
          <div className="tabby-crowded-tabs" aria-hidden="true">
            {Array.from({ length: 22 }, (_, i) => <span key={i}><i /></span>)}
          </div>
          <div className="tabby-thought-copy" aria-hidden="true">
            <span>Research. A side project. That one good idea.</span>
            <p>Keep the thought.<br /><em>Close the tab.</em></p>
            <img src="/work/tabby/icon.svg" width="72" height="72" alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="tabby-beat" aria-labelledby="tabby-spaces">
        <div className="tabby-section-heading">
          <div>
            <p className="kicker">02 / Pinterest, but for tabs</p>
            <h2 id="tabby-spaces">A place for each<br />part of my brain.</h2>
          </div>
          <p>Spaces separate work, personal life, and research. Inside each space, groups and folders keep related tabs together. Visual previews give me something to recognize when I come back.</p>
        </div>
        <figure className="tabby-spaces">
          <ProjectMedia item={spaces} first={false} />
          <figcaption>Switch context without sorting through everything else. App detail with sample content.</figcaption>
        </figure>
      </section>

      <section className="tabby-beat" aria-labelledby="tabby-extension">
        <div className="tabby-section-heading">
          <div>
            <p className="kicker">03 / Save it where you find it</p>
            <h2 id="tabby-extension">The best place to save a tab?<br />The tab.</h2>
          </div>
          <p>Copying URLs was one step too many. I built a Chrome extension: right-click a page, choose “Save to Tabby,” and give it a home. When the whole window gets out of hand, I can select and save multiple tabs together.</p>
        </div>
        <div className="tabby-extension-pair">
          <figure>
            <div className="tabby-extension-stage"><ProjectMedia item={extension} first={false} /></div>
            <figcaption><strong>One worth keeping.</strong>Preview the page, edit its title, and choose a group or folder.</figcaption>
          </figure>
          <figure>
            <div className="tabby-extension-stage"><ProjectMedia item={batch} first={false} /></div>
            <figcaption><strong>A whole window’s worth.</strong>Select the tabs to keep and save them in one go.</figcaption>
          </figure>
        </div>
        <p className="tabby-media-note">Actual extension UI, rendered locally with sample tabs.</p>
        <div className="tabby-detail-note">
          <span className="kicker">A small detail that matters</span>
          <p>When saving the current page, the extension can capture what’s actually on screen. A recognizable preview makes the tab easier to find later.</p>
        </div>
      </section>

      <section className="tabby-beat" aria-labelledby="tabby-brand">
        <div className="tabby-section-heading">
          <div>
            <p className="kicker">04 / A little personality</p>
            <h2 id="tabby-brand">A tab habit.<br />A cat called Tabby.</h2>
          </div>
          <p>I named it, designed its identity, and carried the warm orange, rounded forms, and playful character into the product. Something useful can have a little charm.</p>
        </div>
        <div className="tabby-brand-board">
          <div className="tabby-wordmark">
            <img src="/work/tabby/logo.svg" width="259" height="93" alt="Tabby wordmark with a winking cat and striped tail in the letter y" loading="lazy" />
            <span>Close every tab. Lose nothing.</span>
          </div>
          <div className="tabby-brand-detail">
            <div className="tabby-icon-stage"><img src="/work/tabby/icon.svg" width="144" height="144" alt="Tabby’s orange cat app icon" loading="lazy" /></div>
            <div className="tabby-palette" aria-label="Tabby’s interface palette: orange, cream, and charcoal">
              <span>Orange</span><span>Cream</span><span>Charcoal</span>
            </div>
          </div>
        </div>
      </section>

      <section className="tabby-close" aria-labelledby="tabby-ownership">
        <p className="kicker">From a personal problem to a working product</p>
        <h2 id="tabby-ownership">I wanted it.<br />So I made the whole thing.</h2>
        <p>{project.role}</p>
        {project.projectUrl ? <a href={project.projectUrl} target="_blank" rel="noreferrer">Visit Tabby <span aria-hidden="true">↗</span></a> : null}
      </section>
    </section>
  );
}
