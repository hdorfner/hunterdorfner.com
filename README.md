# hunterdorfner.com

A simple, single-page personal website for Hunter Dorfner. The site highlights an introduction, experience, education, and key contact links in a clean layout.

## Getting started

Open `index.html` in your browser to preview the site locally. Customize the content in each section or adjust the visual styling by editing `styles.css`.

### Metadata

The `<head>` includes SEO and social sharing metadata. Update the description, canonical URL, and social tags to reflect any changes to your branding or hosting domain.

For richer link previews, replace `social-preview.jpg` with a real image hosted at your domain (1200×630px works well) and update the `og:image`/`twitter:image` URLs accordingly.

## Resolving merge conflicts on GitHub

If GitHub reports merge conflicts when you open a pull request:

1. Fetch the latest changes from the default branch locally.
   ```bash
   git fetch origin
   git checkout main
   git pull origin main
   git checkout work
   git merge origin/main
   ```
2. Git will pause at each conflicting file. Open those files, look for the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), and decide which changes to keep.
3. Remove the markers and adjust the surrounding content so the file reads correctly, then save the file.
4. Stage the resolved files and complete the merge.
   ```bash
   git add <resolved-files>
   git commit
   ```
5. Push the updated branch and reload the pull request. GitHub should now show “This branch has no conflicts”.

If you prefer rebasing instead of merging, run `git rebase origin/main` on your feature branch and resolve conflicts as they appear before pushing with `git push --force-with-lease`.
