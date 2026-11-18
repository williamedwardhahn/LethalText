# Lethal Text

Writing by William Edward Hahn about infohazards: texts that change the reader who takes them in. Two books and three shorter pieces, published at **[lethaltext.ai](https://lethaltext.ai)**.

## The landing page

[`index.html`](index.html) is the front door. It lists three of the five texts as a dose schedule, shortest first, from a five-minute story to an eight-hour novel, after MedBot's line in *Warning* that information "must be administered with great care". An Exposure column shows how far the visitor has got: the books report their reading progress and offer to resume, and the shorter pieces are marked as taken once opened. This is read from the same browser storage the reader uses; nothing is sent anywhere. Up and down arrow keys move between rows.

Two texts are left off the list for now. *Namshub* is only unlisted: `enki.html` is still served at its own URL. *Metafiction* is hidden while it is being reworked: the draft lives in `_drafts/`, which GitHub Pages does not serve, so `lethaltext.ai/metafiction.html` stops working once this is pushed. To bring it back, move `_drafts/metafiction.html` to the top level, change its `../186_files/` and `../index.html` paths back to `./186_files/` and `index.html`, and add a row for it to the schedule in `index.html`.

When a text is added or its length changes, update its row in `index.html` and the totals in the grey strip at the top by hand.

## The books

| Page | Title | Year | What it is |
| --- | --- | --- | --- |
| [`book.html`](book.html) | **Infohazards: Second Renaissance** | 2023 | Non-fiction, about 30,300 words: an introduction, 21 chapters and an afterword on language as code, ancient computation, and consciousness. |
| [`seventh-name.html`](seventh-name.html) | **The Seventh Name** | 2026 | A novel of about 118,000 words in six parts, an interlude and an epilogue (36 chapters), following a lost musical language from an Egyptian Listening House to the present day. Each chapter opens with an entry from the *Concordance of Fragments*. |

Once pushed they are served at `lethaltext.ai/book.html` and `lethaltext.ai/seventh-name.html`.

Both use the same reader: a cover, a contents list, and the whole text on one scrolling page. It has three themes (Paper, Night, and a 386 theme matching the rest of the site), adjustable text size, a contents drawer, a progress meter, and left/right arrow keys to move between chapters. Theme and text size are remembered in the browser and shared between the two books; the reading position is remembered separately for each, and the cover offers to resume.

## The shorter pieces

| Page | Title | Year | What it is |
| --- | --- | --- | --- |
| [`warning.html`](warning.html) | **Warning** | 2021 | A forwarded message from 2037. William asks his MedBot to re-read the science fiction canon as non-fiction; the bot finishes the analysis and then refuses, on ethical grounds, to tell him what it found. |
| [`_drafts/metafiction.html`](_drafts/metafiction.html) (hidden) | **Metafiction** | 2026 | A story in thirty-one numbered sections (about 2,600 words). A lab finds a thirty-one-line proof that moves whoever reads it out of the first person; the narrator, who has read eleven lines, decides to contain it by writing it up as fiction. It replaces a sixteen-chapter 2023 version, which it quotes as an account written by one of its characters. |
| [`enki.html`](enki.html) · [live](https://lethaltext.ai/enki.html) | **Namshub** | 2023 | A poem on the nam-shub of Enki, in which the language comes apart as it is read. |

*Warning* was the site's home page until the landing page replaced it; it now lives at `warning.html`. The title in each page's top bar links back to the landing page.

## Repository layout

| Path | Purpose |
| --- | --- |
| `index.html` | The landing page. Its styles and script are inline. |
| `book.html`, `seventh-name.html` | The two books. Each file holds its own cover, contents and full text. |
| `reader.css`, `reader.js` | The reader's styles and behaviour, shared by both books. |
| `fonts/` | Literata and IBM Plex Mono, used by the reader and the landing page. Both are under the SIL Open Font License. |
| `warning.html`, `enki.html` | The published shorter pieces. |
| `_drafts/` | Work in progress that is not on the website: currently the new *Metafiction*. Like `_archive/`, it is not served by GitHub Pages but is visible in the repository. |
| `_archive/` | Earlier versions kept for reference: `metafiction-2023-original.html` (the sixteen-chapter original, as published until 2026) and `metafiction-2026-trimmed-edit.html` (an intermediate twelve-chapter edit). GitHub Pages does not serve folders whose names begin with an underscore, so these are not on the website, but they are visible in the repository. The new *Metafiction* quotes the original, so keep the two consistent. |
| `text.html` | Plain-text 2021 draft of *Warning*. It is not the source of `warning.html`; the two have since diverged, and the published page is the current version. |
| `186_files/` | The retro DOS-style theme for the shorter pieces: a saved copy of [BOOTSTRA.386](http://kristopolous.github.io/BOOTSTRA.386/) (Bootstrap 2.3.1) with its scripts and stylesheets. |
| `WarningIcon.png` | Favicon and touch icon. The pages load it from `raw.githubusercontent.com` on the `main` branch, so renaming the file, branch or repo breaks the icon. |
| `CNAME` | Points GitHub Pages at `lethaltext.ai`. |

## Editing and publishing

The site is static HTML with no build step. GitHub Pages serves the `main` branch, so a push to `main` publishes.

To preview locally, open a page directly:

```sh
open index.html
```

Each of the shorter pieces is one HTML file with the text inline inside the `jumbotron masthead` block. Paragraph spacing in `warning.html` is done with `<br>` tags; `enki.html` uses `<p>` elements.

To edit a book, change the text in its HTML file directly. Each chapter is an `<article class="chapter">` with its paragraphs inside `<div class="prose">`. A chapter's title appears in four places that must agree: the drawer list, the contents list, the article's `data-title` attribute, and its `<h2>`. To change how the reader looks or behaves for both books, edit `reader.css` or `reader.js`.

The pages were generated from Word manuscripts that are not in the repository (*Infohazards* dated February 1, 2024; *The Seventh Name* dated November 13, 2026). With no build step, the HTML files are now the source.

To add another book, copy `book.html` (plain chapters) or `seventh-name.html` (parts, epigraphs and scene breaks), give `<html data-book="…">` a new value so its reading position is stored separately, add a row to the books table, and add it to the landing page.

To add a piece, copy `enki.html` (the smallest page), replace the `<title>`, the navbar brand and the body text, add a row to the shorter pieces table, and add it to the landing page.

## Copyright

Copyright © 2021–2026 William Edward Hahn

All rights reserved. No portion of this book may be reproduced in any form without permission from the publisher, except as permitted by U.S. copyright law. For permissions contact: williamedwardhahn at gmail

The theme in `186_files/` (BOOTSTRA.386 and Bootstrap) and the typefaces in `fonts/` are third-party work and remain under their own licences.
