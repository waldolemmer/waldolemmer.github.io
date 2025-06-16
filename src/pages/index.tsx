import type {ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import ShowcaseCards from './showcase/_components/ShowcaseCards';
import ShowcaseFilters from './showcase/_components/ShowcaseFilters';

const TITLE = translate({message: 'Waldo Lemmer'});
const DESCRIPTION = translate({
  message: 'My projects and guides, covering software development, Linux and \
            system administration, electronics and more.',
});

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
    </section>
  );
}

import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Showcase(): ReactNode {
  const imageUrl = useBaseUrl('/img/homepage-screenshot.png');
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className="margin-vert--lg">
        <ShowcaseHeader />
        <ShowcaseFilters />
        <ShowcaseCards />
      </main>
    </Layout>
  );
}
