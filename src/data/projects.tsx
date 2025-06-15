/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import {translate} from '@docusaurus/Translate';
import {sortBy} from '@site/src/utils/jsUtils';

/*
 * ADD YOUR SITE TO THE DOCUSAURUS SHOWCASE
 *
 * Please don't submit a PR yourself: use the Github Discussion instead:
 * https://github.com/facebook/docusaurus/discussions/7826
 *
 * Instructions for maintainers:
 * - Add the site in the json array below
 * - `title` is the project's name (no need for the "Docs" suffix)
 * - A short (≤120 characters) description of the project
 * - Use relevant tags to categorize the site (read the tag descriptions on the
 *   https://docusaurus.io/showcase page and some further clarifications below)
 * - Add a local image preview (decent screenshot of the Docusaurus site)
 * - The image MUST be added to the GitHub repository, and use `require("img")`
 * - The image has to have minimum width 640 and an aspect of no wider than 2:1
 * - If a website is open-source, add a source link. The link should open
 *   to a directory containing the `docusaurus.config.js` file
 * - Resize images: node admin/scripts/resizeImage.js
 * - Run optimizt manually (see resize image script comment)
 * - Open a PR and check for reported CI errors
 *
 * Example PR: https://github.com/facebook/docusaurus/pull/7620
 */

// LIST OF AVAILABLE TAGS
// Available tags to assign to a showcase site
// Please choose all tags that you think might apply.
// We'll remove inappropriate tags, but it's less likely that we add tags.
export type TagType =
  | 'python'
  | 'electronics'
  | 'fdm'
  | 'guide'

// Add sites to this list
// prettier-ignore
const Projects: Project[] = [
  {
    title: 'DC motor',
    description: 'A low-budget DC motor powered by the Lorentz force',
    preview: require('./showcase/dc-motor.jpg'),
    website: '../../projects/dc-motor/',
    tags: ['electronics', 'fdm'],
  },
  {
    title: 'Gentoo Linux',
    description: 'Guides for installing and configuring Gentoo Linux',
    preview: require('../../guides/gentoo/light-vps/fastfetch.png'),
    website: '../../guides/gentoo/light-vps/',
    tags: ['guide'],
  },
  {
    title: 'Networks',
    description: 'Networking guides and tutorials',
    preview: require('../../guides/networks/show-hidden-huawei-router-features/screenshot.png'),
    website: '../../guides/networks/show-hidden-huawei-router-features/',
    tags: ['guide'],
  },
  {
    title: 'Volume and filesystem management',
    description: 'ZFS and other filesystem and volume management guides',
    preview: '/img/zfs-social-card.png',
    website: '../../guides/volume-mgmt/zfs-drives-with-mixed-capacities/',
    tags: ['guide'],
  },
];

export type Project = {
  title: string;
  description: string;
  preview: string;
  website: string;
  tags: TagType[];
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export const Tags: {[type in TagType]: Tag} = {
  python: {
    label: translate({message: 'Python'}),
    description: translate({
      message:
        'Software and libraries written in Python',
      id: 'showcase.tag.python.description',
    }),
    color: '#e9669e',
  },

  electronics: {
    label: translate({message: 'Electronics'}),
    description: translate({
      message: 'Electronics and electrical projects',
      id: 'showcase.tag.electronics.description',
    }),
    color: '#39ca30',
  },

  fdm: {
    label: translate({message: '3D printing'}),
    description: translate({
      message: 'Projects involving 3D printed parts (FDM)',
      id: 'showcase.tag.fdm.description',
    }),
    color: '#dfd545',
  },

  guide: {
    label: translate({message: 'Guides'}),
    description: translate({
      message: 'Guides',
      id: 'showcase.tag.electronics.description',
    }),
    color: '#30ac39',
  },
};

export const TagList = Object.keys(Tags) as TagType[];
function sortProjects() {
  let result = Projects;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  return result;
}

export const sortedProjects = sortProjects();
