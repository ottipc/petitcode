const contentfulManagement = require('contentful-management')

const clientManagement = contentfulManagement.createClient({
  accessToken: 'dyx5SW6BvXBTrEgQSmDnn60CfWWgNEKmUXprz6NrR1Y'
})

;(async () => {
  const spaceManagement = await clientManagement.getSpace('mtyay169tt6k')
  const masterContentful = await spaceManagement.getEnvironment('master')

  try {
    const result = await masterContentful.getEntries()

    const pages = result.items

    const resultAssets = await masterContentful.getAssets()
    const assets = resultAssets.items

    const assetReplacer = (match, p1, offset, string) => {
      const asset = assets.find((asset) => asset.fields.file.en.fileName === p1)
      return match.replace(p1, asset ? asset.sys.id : p1)
    }

    const linkReplacer = (match, p1, offset, string) => {
      const page = pages.find(
        (page) =>
          page.fields.slug.de.indexOf(p1) !== -1 ||
          page.fields.slug.en.indexOf(p1) !== -1
      )
      console.log({ page })
      return match.replace(p1, page ? page.sys.id : p1)
    }

    for (const pageData of pages) {
      const page = await masterContentful.getEntry(pageData.sys.id)

      page.fields.content.en = page.fields.content.en.replace(
        /image="([^"]+)"/g,
        assetReplacer
      )
      page.fields.content.de = page.fields.content.de.replace(
        /image="([^"]+)"/g,
        assetReplacer
      )
      page.fields.content.en = page.fields.content.en.replace(
        /file="([^"]+)"/g,
        assetReplacer
      )
      page.fields.content.de = page.fields.content.de.replace(
        /file="([^"]+)"/g,
        assetReplacer
      )
      page.fields.content.en = page.fields.content.en.replace(
        /humanId="([^"]+)"/g,
        linkReplacer
      )
      page.fields.content.de = page.fields.content.de.replace(
        /humanId="([^"]+)"/g,
        linkReplacer
      )

      await page.update()
    }
  } catch (err) {
    console.error(err)
  }
})()
