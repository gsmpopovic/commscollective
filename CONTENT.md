# Editing content

## The easy way — use the admin panel

Once the CMS is wired up, the simplest way to edit content is:

1. Go to **https://commscollective.xyz/admin/** (or whichever URL the site is live at).
2. Sign in with your GitHub account.
3. Pick a section (Events, Resources, Team, Calendar), edit the fields, hit **Save**.
4. The site updates automatically within a couple of minutes.

You never need to touch JSON, Git, or HTML if you go through `/admin/`.

---

## The fallback way — edit the JSON files directly

For anyone comfortable with JSON, the underlying content lives in the `data/` folder. Each file has an outer object with a single key that wraps a list of items.

### `data/events.json`

```json
{
  "events": [
    {
      "title": "Coffee Corner",
      "type": "coffee-corner",
      "date": "2026-04-15",
      "location": "Karsmakers · After lunch",
      "description": "Monthly drop-in catch-up.",
      "link": ""
    }
  ]
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Event name. |
| `type` | Yes | One of: `flagship`, `networking`, `coffee-corner`. Controls which section of the Events page the card appears under. |
| `date` | No | ISO `"YYYY-MM-DD"`. Leave as `""` to display "Date TBC". |
| `location` | Yes | e.g. `"Brussels · Partner venue"`. |
| `description` | Yes | One or two sentences. |
| `link` | No | RSVP/info URL. Use `""` if none. |

### `data/resources.json`

```json
{
  "resources": [
    {
      "title": "Message House Template",
      "category": "Templates",
      "description": "Short description.",
      "link": "https://example.com/..."
    }
  ]
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Resource name. |
| `category` | Yes | One of: `Templates`, `Reading`, `Tools`, `Trainings`, `Vendor Hub`. |
| `description` | Yes | Short description. |
| `link` | Yes | URL or relative path (e.g. `events.html`). |

### `data/team.json`

```json
{
  "team": [
    {
      "slug": "camilla",
      "name": "Camilla Davila",
      "role": "Founder & Chief Strategist",
      "bio": "Short bio for the team grid.",
      "image": "images/team/camilla.jpg",
      "bioPage": "team/camilla.html",
      "contact": ""
    }
  ]
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `slug` | Yes | URL-safe identifier — lowercase, no spaces. |
| `name` | Yes | Full name. |
| `role` | Yes | Job title / role. |
| `bio` | Yes | Short bio (one or two sentences) for the grid card. |
| `image` | No | Path to image, e.g. `"images/team/camilla.jpg"`. Letter placeholder used if missing. |
| `bioPage` | No | Path to full profile page, e.g. `"team/camilla.html"`. |
| `contact` | No | Optional contact link. |

### `data/calendar.json`

Single object with metadata and a `dates` list of `{ date, label }` items.

---

## Tips

- **JSON syntax**: use double quotes `"`, no trailing commas after the last item in a list.
- **Testing locally**: from the project root, run `npm run dev` and open the URL Vite prints. Edits to JSON files appear after a reload.
- **The CMS commits straight to GitHub** — every edit is a commit you can roll back to.
