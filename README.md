# petitcode Gatsby website

## editing

The content is stored in the MDX data format.

### Available tags:

#### Basic section layout

For white on black coloring, add `inverted` attribute to `<Section>`

```markdown
<Sections>
<Section>
<SectionContent>

# Content

Just some paragraph

</SectionContent>
</Section>
</Sections>
```

#### Grid

```markdown
<Grid>

Column 1

Column 2

<div>

## Complex column 3

<GridImage image="name-of-image-in-grid-folder.jpg" alt="alt text for image" maxWidth="100%"/>

</div>

</Grid>
```

#### Columns

Two columns with the image pushed to the very side of the screen.

Can have:
* `reverse`: Display image first, then content.
* `contentWidth`: Width of the content. Value of 1 to 12

```markdown
<Columns reverse contentWidth="6">
<ColumnContent>

# Actual content

of the columns layout

</ColumnContent>
<ColumnImage file="name-of-file-in-images-columns-dir.jpg" alt="image alt text for seo" />
</Columns>
```

#### Cards

```markdown
<Card>
<CardImage>

![](./images/icons/some-image.svg)

</CardImage>
<CardContent>

the **actual** card content.

</CardContent>
</Card>
```

#### Carousels

```markdown
<Carousel>
<CarouselNavigation>

Navigation Item 1

Navigation Item 2

Navigation Item 3

</CarouselNavigation>
<CarouselSlides>
<CarouselSlide>

First carousel slide. Linked with first navigation item.

</CarouselSlide>
...
</CarouselSlides>
```

#### Link

```markdown
<Link humanId="some-page">More information</Link>
```

#### Centered content

```markdown
<Centered>

I'll be displayed in the middle. Consider using it withing <SectionContent />.

</Centered>
```

#### Knockout Text

```markdown
<KnockoutText> I'll have a moving image as text color</KnockoutText>
```

#### Video

```markdown
<Video youtubeId="aFG9afg0" description="Awesome documentation about digital nomads" />
```

#### Person

Basically a fancy card.

```markdown
<Person name="Name of person" image="image-in-persons-folder.jpg">

Some description to the person

</Person>
```

#### Forms

```markdown
<ClientForm />
<FreelancerForm />
```

## installation

```
npm ci
pip install -r requirements.txt
```

## development

`npm run develop` to start a development server with live reload.

For more, see `npm run` for all available scripts.


## production / deployment

`npm run build` to create a production ready website.

`npm run production` to emulate production environment on the current device.
