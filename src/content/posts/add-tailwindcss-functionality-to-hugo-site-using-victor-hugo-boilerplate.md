---
audio: []
date: "2019-12-30"
description: A short how to guide on adding Tailwindcss functionality to the Netlify Victor Hugo starter boilerplate.
images:
- post-cover.png
tags: ["code", "guide", "jamstack"]
title:  Add Tailwindcss functionality to Hugo site using Victor Hugo Boilerplate
videos: []
draft: false
---

# Add Tailwindcss functionality to Hugo site using Victor Hugo Boilerplate

## Background Info

### What is Hugo?

Hugo is a fast and modern static site generator written in Go, and designed to make website creation fun again.

Hugo was is a static site generator, and general-purpose website framework. Hugo leverages Go language templates in HTML and builds static sites for fast, and secure deployment. 

### What is Victor Hugo?

Victor Hugo is a starter template built ontop of Hugo. The starter is provided by Netlify, and is built to include Webpack, PostCSS, and Babel. 

### What is Tailwindcss?

A utility-first CSS framework for rapidly building custom designs.
Tailwindcss  is a low-level CSS framework. Tailwind differs from Bootstrap and other CSS frameworks in that it is used to apply atomic CSS classes to HTML elements inline, as opposed to pre-built modular components. This allows for fast prototyping while allowing bespoke design.

## How to Guide

First clone the Victor Hugo repo.

```bash

    $ git clone https://github.com/netlify-templates/victor-hugo
    $ cd victor-hugo
    $ npm install

```

Next install tailwindcss and purgecss. [note tailwindcss not tailwind]

```bash

    $ npm i @fullhuman/postcss-purgecss tailwindcss -D

```

Create the tailwindcss config file. Here I create the config file with the flag --full for a reference. Then rename that file, and create another blank file. The reference file may come in handy later when developing a custom theme.

```bash

    $ npx tailwind init --full

```

Then rename this file tailwindfull.config.js, and regenrate an empty state file.

```bash

    $ npx tailwind init

```

Now edit the following files inside the Hugo template.

```css

    /* ./src/css/main.css */

    @import 'imports/reset.css';
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ...


```

```js

    // postcss.config.js

    const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        './site/**/*.html',
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    })
    module.exports = {
    plugins: [
        require("postcss-import"),
        require("postcss-preset-env")({
        browsers: "last 2 versions"
        }),
        require('tailwindcss'),
        require('autoprefixer'),
        ...process.env.NODE_ENV === 'production' ? [purgecss] : []
    ]
    };

```


Now add a tailwindcss class to the index.html in order to test the process. Here we add "bg-red-500" to the div which will give us a red background.

```html

<!--./site/layouts/index.html -->

{{ define "main" }}

<div class="bg-red-500">
  <h1>Hugo with Webpack, Sass, TailwindCSS, PostCSS, and PurgeCSS</h1>
</div>

{{ end }}

```

Finally we can test the setup by starting the local development server.

```bash

    $ npm run start

```

If everything worked OK you should see this (http://localhost:3000/)

Demo Repo
https://github.com/sanderjson/victor-hugo-tailwindcss

