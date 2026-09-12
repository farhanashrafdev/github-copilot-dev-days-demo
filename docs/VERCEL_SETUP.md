# Vercel setup

Ten minutes, once, before the talk.

## Connect the project

1. Go to [vercel.com/new](https://vercel.com/new) and import
   `farhanashrafdev/github-copilot-dev-days-demo`.
2. Framework preset: **Next.js** (detected automatically).
3. Leave the build and output settings alone. Vercel gets them right.
4. Deploy.

Production branch is `main`. No environment variables are needed — the app has
no database, no API keys and no secrets.

## The one setting that will otherwise ruin the demo

**Project → Settings → Deployment Protection → set the protection scope to
`None`.**

By default Vercel protects preview deployments behind Vercel Authentication.
That means the preview URL shows a login wall to anyone who is not signed in to
your Vercel account — including you, if you open it in a different browser
profile, and including the room if you put a QR code on screen.

Turning it off is safe **for this repository specifically**: the app is
front-end only, contains no secrets, and every patient and clinical figure is
synthetic demo data. Do not treat this as general advice for a real project.

If you would rather leave protection on, generate a **Sharable Link** for the
demo PR in advance and put that in `demo/QUICK_REFERENCE.md` instead of the
preview URL.

## Verify it before the talk

1. Open the production URL. The homepage should look **lopsided** — content
   pushed to the left. That is issue #2 and it is meant to look like that.
2. Open PR #6 and click the Vercel preview link **in a private window**. If it
   asks you to log in, Deployment Protection is still on.
3. On the PR #6 preview, the homepage should look **correctly centred**.

That before/after pair is the visual payoff of the whole talk. Check it works.

## Note on agent branches

Copilot pushes to branches named `copilot/...` in this repository. Vercel's Git
integration builds those automatically, so an agent's pull request gets a preview
URL without you doing anything.

GitHub Actions is different: workflows do **not** run on an agent's push until
you click **Approve and run workflows** in the pull request's merge box. That is
deliberate on GitHub's part, and it is worth pointing out on stage rather than
treating it as a snag.
