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

function HeadingProjects() {
  return (
    <Heading as="h2">
      <Translate id="showcase.favoritesList.title">Projects</Translate>
    </Heading>
  );
}

function HeadingAllSites() {
  return (
    <Heading as="h2">
      <Translate id="showcase.projectsList.allProjects">Guides</Translate>
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
            <CardList heading={<HeadingProjects />} items={favoriteProjects} />
          </div>
          <div className="margin-top--lg">
            <CardList heading={<HeadingAllSites />} items={guides} />
          </div>
        </>
      ) : (
        <CardList items={filteredProjects} />
      )}
    </section>
  );
}
