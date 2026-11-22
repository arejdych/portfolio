# Aneta Rejdych — portfolio

A static site. The homepage is the HTML portfolio that was provided (`index.html`), including the case-study images. The stock-scoring article is a separate page, `article.html`, linked from the Further section at the bottom.

`cv.html` is the résumé. `scoring-model-article-en.md` is the article source.

## Open it

From this folder:

```bash
python3 -m http.server 4327
```

Then open [http://localhost:4327](http://localhost:4327).

The article is [http://localhost:4327/article.html](http://localhost:4327/article.html).

Opening `index.html` directly from the file system will not run the page. The portfolio file needs those scripts served over http, which is what the command above does.
