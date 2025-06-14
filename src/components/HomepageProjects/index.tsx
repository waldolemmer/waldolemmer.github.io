import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type ProjectItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

//const motorProject = {title: 'DC motor',
//                      Svg: require('@site/static/img/motor.jpg').default,
//                      description: (<>A DC motor with 100 windings using the
//                                      Lorentz force. Includes 3D printed parts.
//                                      Budget: $10.</>)}
//
//const attoProject = {title: 'Cryptocurrency library',
//                     Svg: require('@site/static/img/atto.svg').default,
//                     description: (<>The first non-reference library for
//                                     sending and receiving Atto and
//                                     exploring the blockchain.</>)}

//const ProjectList: ProjectItem[] = [motorProject, attoProject];
const ProjectList: ProjectItem[] = [];

function Project({title, Svg, description}: ProjectItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageProjects(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {ProjectList.map((props, idx) => (
            <Project key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
