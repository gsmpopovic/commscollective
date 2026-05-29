/**
 * Cloudflare Worker — GitHub OAuth proxy for Sveltia / Decap CMS
 *
 * Deploy steps:
 *   1. Create a Cloudflare account (free).
 *   2. In the Cloudflare dashboard: Workers & Pages → Create → Hello World → paste this file.
 *   3. Settings → Variables → add two SECRETS:
 *        GITHUB_CLIENT_ID      — from your GitHub OAuth App
 *        GITHUB_CLIENT_SECRET  — from your GitHub OAuth App
 *   4. Deploy. Cloudflare gives you a URL like https://commscollective-auth.<your-subdomain>.workers.dev
 *   5. In your GitHub OAuth App settings, set the Authorization callback URL to:
 *        https://commscollective-auth.<your-subdomain>.workers.dev/callback
 *   6. In admin/config.yml, set:
 *        backend:
 *          base_url: https://commscollective-auth.<your-subdomain>.workers.dev
 */

const ALLOWED_ORIGINS = [
  'https://commscollective.xyz',
  'https://gsmpopovic.github.io',
  'http://localhost:5173',
  'http://localhost:3000',
];

function originAllowed(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some((o) => origin === o);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Step 1 — CMS calls /auth?provider=github&scope=repo,user
    // We redirect the browser to GitHub's authorize page.
    if (url.pathname === '/auth') {
      const scope = url.searchParams.get('scope') || 'repo,user';
      const state = crypto.randomUUID();
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        scope,
        state,
        redirect_uri: `${url.origin}/callback`,
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params.toString()}`,
        302,
      );
    }

    // Step 2 — GitHub redirects back here with ?code=...
    // We exchange the code for an access token and postMessage it back to the CMS window.
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });

      const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'sveltia-cms-oauth',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const data = await tokenResp.json();
      const payload = data.error
        ? { error: data.error, error_description: data.error_description }
        : { token: data.access_token, provider: 'github' };
      const status = data.error ? 'error' : 'success';
      const message = `authorization:github:${status}:${JSON.stringify(payload)}`;

      const html = `<!doctype html>
<meta charset="utf-8">
<title>Signing you in…</title>
<script>
(function () {
  function send() {
    if (!window.opener) return;
    window.opener.postMessage(${JSON.stringify(message)}, '*');
  }
  window.addEventListener('message', send, false);
  send();
  setTimeout(function () { window.close(); }, 1000);
})();
</script>
<p style="font-family:system-ui;padding:2rem;text-align:center">You can close this window.</p>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    return new Response(
      'Sveltia CMS OAuth proxy is running.\n\nEndpoints: /auth, /callback',
      { headers: { 'Content-Type': 'text/plain' } },
    );
  },
};
