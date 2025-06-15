/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {sortedProjects, type Project} from '@site/src/data/projects';
import Heading from '@theme/Heading';
import ShowcaseCard from '../ShowcaseCard';
import {useFilteredProjects} from '../../_utils';

import styles from './styles.module.css';
import sharedStyles from '../styles.module.css';

const favoriteProjects = sortedProjects.filter((project) =>
  project.tags.includes('electronics'),
);

const guides = sortedProjects.filter(
  (project) => project.tags.includes('guide'),
);

function HeadingNoResult() {
  return (
    <Heading as="h2">
      <Translate id="showcase.projectsList.noResult">No result</Translate>
    </Heading>
  );
}

import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';


function SectionHeading({ docKey, titleId, titleText }) {
  const allDocs = useAllDocsData();
  const docsData = allDocs[docKey];
  const firstDoc = docsData.versions[0].docs[0];

  return (
    <Heading as="h2">
      <Link to={firstDoc.path} className={styles.headingLink}>
        <Translate id={titleId}>{titleText}</Translate>
        <span style={{ marginLeft: '0.25rem' }}>›</span>
      </Link>
    </Heading>
  );
}

function HeadingProjects() {
  const allDocs = useAllDocsData();
  const projectsData = allDocs.projects;
  const firstDoc = projectsData.versions[0].docs[0];
  return (
    <Heading as="h2">
      <Link to={firstDoc.path} className={styles.headingLink}>
        <Translate id="showcase.favoritesList.title">Projects</Translate>
        <span style={{ marginLeft: '0.25rem' }}>›</span>
      </Link>
    </Heading>
  );
}

function HeadingAllSites() {
  const allDocs = useAllDocsData();
  const projectsData = allDocs.default;
  const firstDoc = projectsData.versions[0].docs[0];
  return (
    <Heading as="h2">
      <Link to={firstDoc.path} className={styles.headingLink}>
        <Translate id="showcase.projectsList.allProjects">Guides</Translate>
        <span style={{ marginLeft: '0.25rem' }}>›</span>
      </Link>
    </Heading>
  );
}

function CardList({heading, items}: {heading?: ReactNode; items: Project[]}) {
  return (
    <div className="container">
      {heading}
      <ul className={clsx('clean-list', styles.cardList)}>
        {items.map((item) => (
          <ShowcaseCard key={item.title} project={item} />
        ))}
      </ul>
    </div>
  );
}

function NoResultSection() {
  return (
    <section className="margin-top--lg margin-bottom--xl">
      <div className="container padding-vert--md text--center">
        <HeadingNoResult />
      </div>
    </section>
  );
}

export default function ShowcaseCards() {
  const filteredProjects = useFilteredProjects();

  if (filteredProjects.length === 0) {
    return <NoResultSection />;
  }

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {filteredProjects.length === sortedProjects.length ? (
        <>
          <div className={styles.showcaseFavorite}>
            <CardList
              heading={
                <SectionHeading
                  docKey="projects"
                  titleId="showcase.favoritesList.title"
                  titleText="Projects"
                />
              }
              items={favoriteProjects}
            />
          </div>
          <div className="margin-top--lg">
            <CardList
              heading={
                <SectionHeading
                  docKey="default"
                  titleId="showcase.projectsList.allProjects"
                  titleText="Guides"
                />
              }
              items={guides}
            />
          </div>
        </>
      ) : (
        <CardList items={filteredProjects} />
      )}
    </section>
  );
}
