import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here

const presets = [['classic',
                  {blog: false,
//                   blog: {showReadingTime: true,
//                          feedOptions: {type: ['rss', 'atom'],
//                                        xslt: true},
//                          onInlineTags: 'warn',
//                          onInlineAuthors: 'warn',
//                          onUntruncatedBlogPosts: 'warn'},
                   docs: {sidebarPath: './sidebars/guideSidebars.ts',
                          sidebarCollapsed: true,
                          path: 'guides',
                          routeBasePath: 'guides',
                          showLastUpdateAuthor: true,
                          showLastUpdateTime: true},
                   theme: {customCss: './src/css/custom.css'}
                   } satisfies Preset.Options]]

const footerLinks = [{title: 'Me',
                      items: [{label: 'LinkedIn',
                               href: 'https://linkedin.com/in/waldo-lemmer'}]}]
const footerCopyright = `Copyright © ${new Date().getFullYear()} Waldo Lemmer.`
const themeConfig = {navbar: {title: 'Waldo Lemmer',
                              items: [{type: 'docSidebar',
                                       sidebarId: 'guideSidebar',
                                       position: 'left',
                                       label: 'Guides'},
                                      {type: 'docSidebar',
                                       docsPluginId: 'projects',
                                       sidebarId: 'projectSidebar',
                                       position: 'left',
                                       label: 'Projects'},
                                      {href: 'https://github.com/waldolemmer/',
                                       label: 'GitHub',
                                       position: 'right'}]},
//                     image: 'img/docusaurus-social-card.jpg',
                     footer: {style: 'dark',
                              links: footerLinks,
                              copyright: footerCopyright},
                     prism: {theme: prismThemes.github,
                             darkTheme: prismThemes.dracula}
                     } satisfies Preset.ThemeConfig;

const config: Config = {title: 'Waldo Lemmer',
                        favicon: 'img/favicon.ico',

                        // Future flags, see
                        // https://docusaurus.io/docs/api/docusaurus-config#future
                        future: {v4: true}, // Improve compatibility with the
                                            // upcoming Docusaurus v4
                        url: 'https://waldolemmer.github.io',
                        baseUrl: '/',

                        // GitHub
                        organizationName: 'waldolemmer',
                        projectName: 'waldolemmer.github.io',

                        onBrokenLinks: 'throw',
                        onBrokenMarkdownLinks: 'warn',

                        // Even if you don't use internationalization, you can
                        // use this field to set useful metadata like html
                        // lang. For example, if your site is Chinese, you may
                        // want to replace "en" with "zh-Hans".
                        i18n: {defaultLocale: 'en', locales: ['en']},

                        plugins: ['@docusaurus/plugin-ideal-image',
                                  ['@docusaurus/plugin-content-docs',
                                   {id: 'projects',
                                    sidebarPath: './sidebars/projectSidebars.ts',
                                    path: 'projects',
                                    routeBasePath: 'projects'}]],

                        presets: presets,
                        themeConfig: themeConfig};

export default config;
