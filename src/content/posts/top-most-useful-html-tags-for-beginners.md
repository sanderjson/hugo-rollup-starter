---
audio: []
date: "2020-01-06"
description: A short how to guide on adding Tailwindcss functionality to the Netlify Victor Hugo starter boilerplate.
images:
- post-cover.png
tags: ["code", "SEO"]
title:  Top Most Useful HTML Tags for Beginners
videos: []
draft: false
---

# Top Most Useful HTML Tags for Beginners

## Links

Hyperlinks (links) are an essential aspect of the web. Each webpage may be thought of as a document, and the hyperlink allows a user to jump from one document to another. The web is a collection of documents and the links between them. Search engines like Google, Bing, Yandex, and DuckDuckGo provide links to users which may fit given search criteria.  Links in HTML are referred to as anchor tags (<a>). Each anchor tag requires a reference attribute (href). This reference is the address of the document to be linked to. Anchor tags are not self-closing and require a closing tag (</a>).

```html

    <a href="https://www.google.com/">Google</a>

```

## Headings

Headings are very important for organizing content on a web page. There are six levels of headings: <h1>, <h2>, <h3>, <h4>, <h5>, and <h6> . The six HTML heading tags are organized as a hierarchy. Where <h1> represents the top level, and <h6> represents the lowest level. The heading tags are not self closing and must be accompanied by a closing tag (<h1>My Heading</h1>).

Note: avoid using heading tags to resize text. All web styling should be done through CSS. The HTML heading tags have semantic meaning and can affect on-page SEO. It is important to use the heading structure appropriately on any web page.

```html

    <h1>Artists by Music Genre</h1>
        <h2>Rock</h2>
            <h3>Soft Rock</h3>
                <h4>The Beatles</h4>
            <h3>Punk Rock</h3>
                <h4>The Clash</h4>
                <h4>Ramones</h4>
        <h2>Electronic</h2>

```

## Lists

Lists are used to display consecutive items. Lists can either be ordered (<ol>) or unordered (<ul>).  Within each list may be any number of list items (<li>).  These list tags have important semantic meaning and search engines use this to infer a purpose. Lists are excellent for displaying sequential items or breaking down a complicated process.  The list tags are not self closing and must be accompanied by a closing tag (<ul><li>item 1</li></ul>).

```html

    <ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    </ul>

```

## Images

Images are extremely important on the web. It is said that "a picture is worth a thousand words." Images can be used to convey information, or create an atmospheric sense. The image tag requires a reference (src). This reference is essentially a link to the image file, where the data is stored. The image tag also has an alternate tag (alt). The alt tag within the image tag is used to briefly describe the image and/or it's purpose. The alt tag is used by screen readers and other accessibility tools to help people navigate the web. The image tag is self-closing and attributes are listed within the tag.

```html

    <img src="./path-to-my-file.jpg" alt="describe the image and what it represents">

```

## Generic

There are two general HTML tags every beginner should know. The <div> tag and the <span>. Neither tag has semantic meaning. These tags are typically used to group content into components and style with CSS accordingly. The <div> tag is a block-level element. This means that a <div> tag will natively take up the full width available. 

The <div> tag will stretch from the left edge to the right. The <span> tag however is an in-line element. The span tag does not start on a new line and will only occupy the minimum width required by the nested content. Both the <div> and <span> tag require closing tags (</div> and </span> respectively).

```html

    <div>
    This content will occupy the entire width of this line
    </div>
    <span>
    This content may not fill this line
    </span>

```

## Putting it All Together

The HTML tags listed here are a small fraction of what is available. These tags are often nested inside another to present content for the user. It is important to note that HTML tags should not be chosen by their appearance, but for their semantic meaning. It is this semantic meaning which will affect on-page SEO. All appearance or styling should be handled by CSS. 

```html

    <div>
    <h1>My <span>Awesome</span> Heading</h1>
    <h2>Fun Things</h2>
    <p>This is a standard paragraph text</p>
    <img src="./my-img.jpg" alt="fun things">
    <h2>Great List</h2>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li<a href="https://www.youtube.com/watch?v=oHg5SJYRHA0">Click here for SEO secrets</a></li>
    </ul>
    </div>

```
