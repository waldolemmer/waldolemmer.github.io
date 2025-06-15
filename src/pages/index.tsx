//import type {ReactNode} from 'react';
//import clsx from 'clsx';
//import Link from '@docusaurus/Link';
//import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
//import Layout from '@theme/Layout';
//import HomepageProjects from '@site/src/components/HomepageProjects';
//import Heading from '@theme/Heading';
//
//import styles from './index.module.css';
//
//function HomepageHeader() {
//  const {siteConfig} = useDocusaurusContext();
//  return (
//    <header className={clsx('hero hero--primary', styles.heroBanner)}>
//      <div className="container">
//        <Heading as="h1" className="hero__title">
//          {siteConfig.title}
//        </Heading>
//        <p className="hero__subtitle">{siteConfig.tagline}</p>
//        <div className={styles.buttons}>
//	{/*<Link
//            className="button button--secondary button--lg"
//            to="/docs/intro">
//            Docusaurus Tutorial - 5min ⏱️
//          </Link>*/}
//        </div>
//      </div>
//    </header>
//  );
//}
//
//export default function Home(): ReactNode {
//  const {siteConfig} = useDocusaurusContext();
//  return (
//    <Layout
//      title={`${siteConfig.title}`}
//      description="Waldo Lemmer's home page">
//      <HomepageHeader />
//      <main>
//        <HomepageProjects />
//      </main>
//    </Layout>
//  );
//}
///**
// * Copyright (c) Facebook, Inc. and its affiliates.
// *
// * This source code is licensed under the MIT license found in the
// * LICENSE file in the root directory of this source tree.
// */

import type {ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';

import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import ShowcaseCards from './showcase/_components/ShowcaseCards';
import ShowcaseFilters from './showcase/_components/ShowcaseFilters';

const TITLE = translate({message: 'Waldo Lemmer'});
const DESCRIPTION = translate({
  message: 'My projects and guides',
});

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
    </section>
  );
}

export default function Showcase(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <ShowcaseHeader />
        <ShowcaseFilters />
        <ShowcaseCards />
      </main>
    </Layout>
  );
}
