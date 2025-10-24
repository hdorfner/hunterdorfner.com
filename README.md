# hunterdorfner.com

A simple, single-page personal website for Hunter Dorfner. The site highlights an introduction, experience, education, and key contact links in a clean layout.

## Getting started

Open `index.html` in your browser to preview the site locally. Customize the content in each section or adjust the visual styling by editing `styles.css`.

### Metadata

The `<head>` includes SEO and social sharing metadata. Update the description, canonical URL, and social tags to reflect any changes to your branding or hosting domain.

For richer link previews, replace `social-preview.jpg` with a real image hosted at your domain (1200×630px works well) and update the `og:image`/`twitter:image` URLs accordingly.

## Deploying with Cloudflare Pages

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and choose **Workers & Pages → Create application → Pages**.
2. Select **Connect to Git**, authorize Cloudflare to access your GitHub account if prompted, and pick the `hunterdorfner.com` repository.
3. Configure the deployment settings:
   * **Production branch**: `main` (or your preferred live branch).
   * **Build command**: leave empty because this is a static HTML/CSS site.
   * **Build output directory**: leave empty so Cloudflare serves the repository root.
4. Click **Save and Deploy**. Cloudflare Pages will clone the repository and publish the site at a `*.pages.dev` preview URL.
5. Under your new Pages project, open **Settings → Custom domains** to add `hunterdorfner.com` (or another domain you control). Follow the prompts to activate the domain; Cloudflare will generate the required DNS records automatically if the domain is already managed in your Cloudflare account.
6. After DNS propagates, the custom domain will serve the latest build from the repository. Future pushes to the production branch trigger automatic redeploys.

### Troubleshooting Cloudflare Pages build errors

If a deployment fails with a log similar to:

```
Executing user deploy command: npx wrangler deploy
✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

Cloudflare is trying to run the Wrangler CLI instead of publishing your static files. Clear the custom build command so Pages simply uploads the repository contents:

1. In the Cloudflare dashboard, open your Pages project and go to **Settings → Build & deploy → Build configuration**.
2. Delete any value in **Build command** (for example `npx wrangler deploy`) and save. Leave **Build output directory** empty unless you intentionally build into a subfolder.
3. Trigger a new deployment from the **Deployments** tab or by pushing a commit. The next build should finish successfully because Pages will serve the static files directly.

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
