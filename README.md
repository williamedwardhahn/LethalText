# Lethal Text

Writing by William Edward Hahn about infohazards: texts that change the reader who takes them in. A book and three shorter pieces, published at **[lethaltext.ai](https://lethaltext.ai)**.

## The book

**[Infohazards: Second Renaissance](book.html)** (2023) is a non-fiction book of about 30,300 words: an introduction, 21 chapters and an afterword on language as code, ancient computation, and consciousness. Once pushed it is served at `lethaltext.ai/book.html`.

`book.html` is a self-contained reader: a cover, a contents list, and the whole text on one scrolling page. It has three themes (Paper, Night, and a 386 theme matching the rest of the site), adjustable text size, a contents drawer, a progress meter, and left/right arrow keys to move between chapters. It remembers the theme, text size and reading position in the browser, and offers to resume from the cover.

## The shorter pieces

| Page | Title | Year | What it is |
| --- | --- | --- | --- |
| [`index.html`](index.html) · [live](https://lethaltext.ai/) | **Warning** | 2021 | A forwarded message from 2037. William asks his MedBot to re-read the science fiction canon as non-fiction; the bot finishes the analysis and then refuses, on ethical grounds, to tell him what it found. |
| [`metafiction.html`](metafiction.html) · [live](https://lethaltext.ai/metafiction.html) | **Metafiction** | 2023 | A sixteen-chapter novella (about 8,400 words) in which Dr. William Hahn discovers an anomaly that unravels his reality, told by a narrator who knows the story is itself the hazard. |
| [`enki.html`](enki.html) · [live](https://lethaltext.ai/enki.html) | **Namshub** | 2023 | A poem on the nam-shub of Enki, in which the language comes apart as it is read. |

The pages are not linked to one another; each is reached by its own URL.

### Metafiction chapters

1. The Foreword of Paradoxes
2. The Enigmatic Scientist
3. The Unraveling
4. The Observer's Paradox
5. The Ethical Dilemma
6. The Unseen Observer
7. The Fabric of Reality
8. The Echoes of Discovery
9. The Intersecting Realities
10. The Veil of Perception
11. The Web of Realities
12. The Conscious Universe
13. The Ripple of Choices
14. The Harmony of Existence
15. The Threshold of Understanding
16. The Convergence of Realities

## Repository layout

| Path | Purpose |
| --- | --- |
| `book.html` | The book and its reader. Text, styles and script are all in this one file. |
| `fonts/` | Literata and IBM Plex Mono, used only by `book.html`. Both are under the SIL Open Font License. |
| `index.html`, `metafiction.html`, `enki.html` | The three shorter pieces. |
| `text.html` | Plain-text 2021 draft of *Warning*. It is not the source of `index.html`; the two have since diverged, and the published page is the current version. |
| `186_files/` | The retro DOS-style theme for the shorter pieces: a saved copy of [BOOTSTRA.386](http://kristopolous.github.io/BOOTSTRA.386/) (Bootstrap 2.3.1) with its scripts and stylesheets. |
| `WarningIcon.png` | Favicon and touch icon. The pages load it from `raw.githubusercontent.com` on the `main` branch, so renaming the file, branch or repo breaks the icon. |
| `CNAME` | Points GitHub Pages at `lethaltext.ai`. |

## Editing and publishing

The site is static HTML with no build step. GitHub Pages serves the `main` branch, so a push to `main` publishes.

To preview locally, open a page directly:

```sh
open index.html
```

Each of the shorter pieces is one HTML file with the text inline inside the `jumbotron masthead` block. Paragraph spacing in `index.html` is done with `<br>` tags; `metafiction.html` and `enki.html` use `<p>` elements.

To edit the book, change the text in `book.html` directly. Each chapter is an `<article class="chapter">` with its paragraphs inside `<div class="prose">`. A chapter's title appears in four places that must agree: the drawer list, the contents list, the article's `data-title` attribute, and its `<h2>`. The page was generated from the Word manuscript dated February 1, 2024, which is not in the repository; with no build step, `book.html` is now the source.

To add a piece, copy `enki.html` (the smallest page), replace the `<title>`, the navbar brand and the body text, and add a row to the table above.

## Copyright

Copyright © 2021–2023 William Edward Hahn

All rights reserved. No portion of this book may be reproduced in any form without permission from the publisher, except as permitted by U.S. copyright law. For permissions contact: williamedwardhahn at gmail

The theme in `186_files/` (BOOTSTRA.386 and Bootstrap) and the typefaces in `fonts/` are third-party work and remain under their own licences.
