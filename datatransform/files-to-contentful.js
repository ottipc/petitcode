const contentfulManagement = require('contentful-management')
const fs = require('fs').promises
const path = require('path')
const fm = require('front-matter')

const clientManagement = contentfulManagement.createClient({
  accessToken: 'dyx5SW6BvXBTrEgQSmDnn60CfWWgNEKmUXprz6NrR1Y'
})

;(async () => {
  const spaceManagement = await clientManagement.getSpace('mtyay169tt6k')
  const masterContentful = await spaceManagement.getEnvironment('master')

  try {
    const result = await masterContentful.getEntries({
      content_type: 'page'
    })

    const pages = result.items.reduce((map, page) => {
      map[page.fields.slug] = page
      return map
    }, {})

    console.log(pages)
    const PAGES_DIR = path.join(__dirname, '..', 'website', 'content', 'pages')
    const pageDirs = await fs.readdir(PAGES_DIR)
    console.log(pageDirs)
    for (const pageDir of pageDirs) {
      console.log(`Processing ${pageDir}`)
      const enBuffer = await fs.readFile(
        path.join(PAGES_DIR, pageDir, 'index.en.md')
      )
      const deBuffer = await fs.readFile(
        path.join(PAGES_DIR, pageDir, 'index.de.md')
      )

      const en = fm(enBuffer.toString())
      const de = fm(deBuffer.toString())

      await masterContentful.createEntry('page', {
        fields: {
          title: {
            en: en.attributes.title,
            de: de.attributes.title
          },
          slug: {
            en: en.attributes.slug,
            de: de.attributes.slug
          },
          description: {
            en: en.attributes.description,
            de: de.attributes.description
          },
          content: {
            de: de.body,
            en: en.body
          }
        }
      })
    }

    const JOBS_DIR = path.join(__dirname, '..', 'website', 'content', 'jobs')
    const jobsDirs = await fs.readdir(JOBS_DIR)
    console.log(jobsDirs)
    for (const jobDir of jobsDirs) {
      console.log(`Processing ${jobDir}`)
      const enBuffer = await fs.readFile(
        path.join(JOBS_DIR, jobDir, 'index.en.md')
      )
      const deBuffer = await fs.readFile(
        path.join(JOBS_DIR, jobDir, 'index.de.md')
      )

      const en = fm(enBuffer.toString())
      const de = fm(deBuffer.toString())

      await masterContentful.createEntry('job-posting', {
        fields: {
          title: {
            en: en.attributes.title,
            de: de.attributes.title
          },
          slug: {
            en: en.attributes.slug,
            de: de.attributes.slug
          },
          description: {
            en: en.attributes.description,
            de: de.attributes.description
          },
          content: {
            de: de.body,
            en: en.body
          }
        }
      })
    }

    const BLOGPOSTS_DIR = path.join(
      __dirname,
      '..',
      'website',
      'content',
      'blog'
    )
    const blogDirs = await fs.readdir(BLOGPOSTS_DIR)
    console.log(blogDirs)
    for (const blogDir of blogDirs) {
      console.log(`Processing ${blogDir}`)
      const enBuffer = await fs.readFile(
        path.join(BLOGPOSTS_DIR, blogDir, 'index.en.md')
      )
      const deBuffer = await fs.readFile(
        path.join(BLOGPOSTS_DIR, blogDir, 'index.de.md')
      )

      const en = fm(enBuffer.toString())
      const de = fm(deBuffer.toString())

      await masterContentful.createEntry('blog-post', {
        fields: {
          title: {
            en: en.attributes.title,
            de: de.attributes.title
          },
          slug: {
            en: en.attributes.slug,
            de: de.attributes.slug
          },
          description: {
            en: en.attributes.description,
            de: de.attributes.description
          },
          content: {
            de: de.body,
            en: en.body
          },
          date: en.date
        }
      })
    }
  } catch (err) {
    console.error(err)
  }
})()
