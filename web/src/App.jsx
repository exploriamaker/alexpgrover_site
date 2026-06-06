import { useMemo, useState } from 'react';

const tagFilters = [
  { key: 'all', label: 'All work' },
  { key: 'actual-play', label: 'Actual play' },
  { key: 'games', label: 'Games' },
  { key: 'theme-song', label: 'Theme songs' },
  { key: 'soundcloud', label: 'SoundCloud' },
  { key: 'spotify', label: 'Spotify' },
  { key: 'coming-soon', label: 'Coming soon' },
  { key: 'soundtrack', label: 'Soundtrack' },
];

const tagLabels = Object.fromEntries(tagFilters.map(({ key, label }) => [key, label]));

const projects = [
  {
    title: 'Bonus Action',
    href: 'https://www.youtube.com/@BonusActionRPG',
    type: 'Actual play TTRPG channel',
    creator: "Creator: pReview'd",
    tags: ['actual-play', 'theme-song', 'spotify'],
    workLayout: 'paired',
    summary:
      'Adam and Jay from the reaction channel pReview\'d started an actual play TTRPG channel with their DM buddy David Armstrong! Come by Mondays at 8pm EST as Adam, Jay, and their comedian friends goof and gab through the magical world of Wild Country.',
    works: [
      {
        title: 'Bonus Action Season III',
        role: 'Spotify embed',
        tags: ['soundtrack', 'spotify'],
        detail: (
          <>
            Composer with musical guidance from{' '}
            <a href="http://amandalnicholas.com/" target="_blank" rel="noreferrer">
              Amanda Nicholas
            </a>
            .
          </>
        ),
        embed: {
          title: 'Bonus Action Volume III Spotify album embed',
          src: 'https://open.spotify.com/embed/album/6uDfQzZtEZfOlYR5MiY45w?utm_source=generator&theme=0',
          height: 352,
        },
      },
      {
        title: 'Hail and Well Met',
        role: 'Spotify embed',
        tags: ['theme-song', 'spotify'],
        detail: (
          <>
            Co-composed with{' '}
            <a href="http://amandalnicholas.com/" target="_blank" rel="noreferrer">
              Amanda Nicholas
            </a>
            , co-produced with{' '}
            <a href="https://www.instagram.com/travalor" target="_blank" rel="noreferrer">
              Travalor
            </a>
            .
          </>
        ),
        embed: {
          title: 'Hail and Well Met Spotify album embed',
          src: 'https://open.spotify.com/embed/album/26wqiClSiqMgPrK4vf67RX?utm_source=generator',
          height: 352,
        },
      },
    ],
  },
  {
    title: 'Ludicrous Text Adventures: Worthless Dirt Boys (2021)',
    type: 'Text adventure',
    creator: 'Creator: Impish Intern Games',
    tags: ['games'],
    summary:
      'Your teen baseball team, the Worthless Dirt Boys, has lost to America’s Perfect Boys every year since 1922. Can you give your underdogs a fighting chance with steroids, guns, and blood magic? Explore branching romance, ludicrous training exercises, and more in this absurdly funny narrative RPG.',
    role: 'Composer',
    reception: 'Frontpaged and received Daily 3rd Place on Newgrounds',
    works: [
      {
        title: 'Dirtville (Day Theme)',
        role: 'SoundCloud embed',
        tags: ['soundcloud'],
        embed: {
          title: 'Dirtville Day Theme SoundCloud player',
          src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1186706170%3Fsecret_token%3Ds-XF3uZp0klmE&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
          height: 300,
        },
      },
      {
        title: 'Dirtville (Night Theme)',
        role: 'SoundCloud embed',
        tags: ['soundcloud'],
        embed: {
          title: 'Dirtville Night Theme SoundCloud player',
          src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1186706248%3Fsecret_token%3Ds-jLnpDgRiZX5&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
          height: 300,
        },
      },
      {
        title: 'Game Day!',
        role: 'SoundCloud embed',
        tags: ['soundcloud'],
        embed: {
          title: 'Game Day SoundCloud player',
          src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1186706206%3Fsecret_token%3Ds-8erF9AwrAp9&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
          height: 300,
        },
      },
    ],
  },
  {
    title: 'FrostRunner (2019)',
    type: '3D first-person platformer',
    creator: 'Creator: Think Arcade',
    tags: ['games'],
    summary:
      'FrostRunner is a first-person platformer speedrunning game where the player rapidly completes platforming challenges before the timer runs out.',
    role: 'Composer',
    reception: 'Over 2.5k overwhelmingly positive reviews',
    works: [
      {
        title: 'Ice Flow (Main Theme)',
        role: 'SoundCloud embed',
        tags: ['soundcloud'],
        embed: {
          title: 'Ice Flow Main Theme SoundCloud player',
          src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/870359632%3Fsecret_token%3Ds-MOj4PxshVGz&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
          height: 300,
        },
      },
    ],
  },
];

function tagLabel(key) {
  return tagLabels[key] ?? key;
}

function TagChip({ tagKey, activeTag, onSelect, small = false }) {
  const active = activeTag === tagKey;

  return (
    <button
      type="button"
      className={`tag-chip${small ? ' tag-chip--small' : ''}${active ? ' is-active' : ''}`}
      aria-pressed={active}
      onClick={() => onSelect(tagKey)}
    >
      {tagLabel(tagKey)}
    </button>
  );
}

function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function App() {
  const [activeTag, setActiveTag] = useState('all');

  const visibleProjects = useMemo(() => {
    return projects
      .map((project) => {
        const matchingWorks =
          activeTag === 'all'
            ? project.works
            : project.works.filter((work) => work.tags.includes(activeTag));
        const projectMatches = activeTag === 'all' || project.tags.includes(activeTag);
        const visibleWorks =
          activeTag === 'all'
            ? project.works
            : matchingWorks.length > 0
              ? matchingWorks
              : projectMatches
                ? project.works
                : [];

        if (activeTag !== 'all' && !projectMatches && matchingWorks.length === 0) {
          return null;
        }

        return {
          ...project,
          visibleWorks,
        };
      })
      .filter(Boolean);
  }, [activeTag]);

  const visibleProjectCount = visibleProjects.length;
  const visibleCueCount = visibleProjects.reduce((count, project) => count + project.visibleWorks.length, 0);
  const activeFilterLabel = tagLabel(activeTag);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top">
          Alex P. Grover
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="https://alexpgrover.newgrounds.com/" target="_blank" rel="noreferrer">
            Newgrounds
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero panel">
          <div className="hero__copy">
            <p className="eyebrow">Composer, producer, collaborator</p>
            <h1>Music that drives storytelling.</h1>
            <p className="lede">
              Hi, I&apos;m Alex! I write and produce music for video games, TTRPG
              channels, and other media that need a memorable musical identity (aka "the good stuff").
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="mailto:alexgroverworks@gmail.com">
                Email Alex
              </a>
              <a className="button button--ghost" href="#projects">
                View projects
              </a>
            </div>

            <div className="hero__notes">
              <p className="hero__aside-title">Current notes</p>
              <ul className="fact-list">
                <li>
                  <span>Based in</span>
                  <strong>New York City</strong>
                </li>
                <li>
                  <span>Good fit for</span>
                  <strong>games, actual play, theme songs</strong>
                </li>
                <li>
                  <span>Best contact</span>
                  <strong>
                    <a href="mailto:alexgroverworks@gmail.com">alexgroverworks@gmail.com</a>
                  </strong>
                </li>
                <li>
                  <span>Status</span>
                  <strong>Open to commissions and licensing</strong>
                </li>
              </ul>
            </div>
          </div>

          <aside className="hero__aside">
            <figure className="portrait-card">
              <img
                src="./images/alex-profile-700.jpg"
                srcSet="./images/alex-profile-350.jpg 350w, ./images/alex-profile-700.jpg 700w"
                sizes="(max-width: 720px) 100vw, 390px"
                alt="Alex P. Grover surrounded by nature."
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          </aside>
        </section>

        <section id="about" className="section">
          <div className="section__heading">
            <p className="eyebrow">About</p>
            <h2>Versatile writing for games, shows, and collaboration-first projects.</h2>
          </div>

          <div className="about-grid">
            <p>
              Based in New York City, I love projects where the music
              supports the storytelling, while never overstaying its welcome.
            </p>
            <p>
              If you need a theme, a score, or a sonic signature that can live comfortably
              inside a game, a stream, or a short-form series, let&apos;s talk!
            </p>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section__heading">
            <p className="eyebrow">Selected work</p>
            <h2>Recent projects and featured cues.</h2>
          </div>

          <div className="project-filters">
            <p className="filter-label">Tap a tag to narrow the catalogue.</p>
            <div className="tag-rail" aria-label="Content tags">
              {tagFilters.map(({ key }) => (
                <TagChip key={key} tagKey={key} activeTag={activeTag} onSelect={setActiveTag} />
              ))}
            </div>
          </div>

          <div className="project-summary-row section__meta--row">
            <span>
              {pluralize(visibleProjectCount, 'project')} and {pluralize(visibleCueCount, 'cue')}
              {activeTag === 'all' ? '' : ` tagged "${activeFilterLabel}"`}
            </span>
            {activeTag === 'all' ? null : (
              <button type="button" className="text-button" onClick={() => setActiveTag('all')}>
                Clear filter
              </button>
            )}
          </div>

          <div className="project-stack">
            {visibleProjects.map((project) => (
              <article className="project-card panel" key={project.title}>
                <div className="project-card__header">
                  <div className="project-card__title-block">
                    <p className="project-card__meta">{project.type}</p>
                    <h3>
                      {project.href ? (
                        <a href={project.href} target="_blank" rel="noreferrer">
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                  </div>
                  <p className="project-card__creator">{project.creator}</p>
                </div>

                <div className="tag-rail project-card__tags" aria-label={`${project.title} tags`}>
                  {project.tags.map((tagKey) => (
                    <TagChip
                      key={tagKey}
                      tagKey={tagKey}
                      activeTag={activeTag}
                      onSelect={setActiveTag}
                      small
                    />
                  ))}
                </div>

                <p className="project-card__summary">{project.summary}</p>
                <div className="project-card__details">
                  {project.role ? <p>{project.role}</p> : null}
                  {project.reception ? <p>{project.reception}</p> : null}
                </div>

                <div className={`work-grid${project.workLayout ? ` work-grid--${project.workLayout}` : ''}`}>
                  {project.visibleWorks.map((work) => (
                    <section className="work-card" key={work.title}>
                      <div className="work-card__header">
                        <div className="work-card__title-block">
                          <h4>{work.title}</h4>
                        </div>
                        <div className="tag-rail work-card__tags" aria-label={`${work.title} tags`}>
                          {work.tags.map((tagKey) => (
                            <TagChip
                              key={tagKey}
                              tagKey={tagKey}
                              activeTag={activeTag}
                              onSelect={setActiveTag}
                              small
                            />
                          ))}
                        </div>
                      </div>

                      {work.detail ? <p className="work-card__detail">{work.detail}</p> : null}

                      {work.embed ? (
                        <div className="embed-shell">
                          <iframe
                            title={work.embed.title}
                            src={work.embed.src}
                            width="100%"
                            height={work.embed.height}
                            loading="lazy"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      ) : null}
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <div className="contact-panel panel">
            <div className="section__heading">
              <p className="eyebrow">Contact</p>
              <h2>Let&apos;s make something cool as hell.</h2>
            </div>

            <p className="contact-panel__body">
              For commissions, collaborations, and licensing questions, email{' '}
              <a href="mailto:alexgroverworks@gmail.com">alexgroverworks@gmail.com</a>.
            </p>

            <div className="contact-panel__actions">
              <a className="button button--primary" href="mailto:alexgroverworks@gmail.com">
                Start a conversation
              </a>
              <a
                className="button button--ghost"
                href="https://alexpgrover.newgrounds.com/"
                target="_blank"
                rel="noreferrer"
              >
                Visit Newgrounds
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Alex P. Grover. Music for games, shows, and the people making them.</p>
      </footer>
    </div>
  );
}

export default App;
