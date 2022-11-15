/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.novelfav.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.novelfav.com/server-sitemap.xml', // <==== Add here
    ],
  },
}