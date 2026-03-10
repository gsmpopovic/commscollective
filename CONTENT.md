# Editing content (no HTML required)

All editable content lives in **JSON files** in the `data/` folder. Update these files and redeploy; the site will show the new content automatically.

---

## Events — `data/events.json`

Events are listed in chronological order (you can reorder the array). Each event is an object with:

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Event name |
| `date` | Yes | ISO date: `"YYYY-MM-DD"` (e.g. `"2026-05-12"`) |
| `location` | Yes | e.g. `"Brussels"` |
| `description` | Yes | Short description (one or two sentences) |
| `link` | No | Sign-up or more-info URL. Use `""` if none |

**Example:**

```json
{
  "title": "Women in Public Affairs Meetup",
  "date": "2026-05-12",
  "location": "Brussels",
  "description": "An informal gathering for communications professionals.",
  "link": "https://example.com/signup"
}
```

- **Add an event:** Add a new object to the array (after the last `},`).
- **Remove an event:** Delete that object and the comma before or after it.
- **Edit:** Change the values; keep the keys and quotes.

---

## Resources — `data/resources.json`

Each resource is an object with:

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Resource name |
| `category` | Yes | e.g. `"Templates"`, `"Reading"`, `"Tools"` |
| `description` | Yes | Short description |
| `link` | Yes | Full URL to the resource (external link) |

**Example:**

```json
{
  "title": "Message House Template",
  "category": "Templates",
  "description": "A one-page framework to structure your key messages.",
  "link": "https://example.com/message-house"
}
```

- **Add a resource:** Add a new object to the array.
- **Remove:** Delete the object and fix commas.
- **Internal link:** Use a relative path like `"calendar.html"` if the resource is another page on the site.

---

## Team — `data/team.json`

Each team member is an object with:

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Full name |
| `role` | Yes | Job title / role |
| `photo` | No | Path to image, e.g. `"images/team/camilla.jpg"`. If missing, a letter placeholder is shown. |
| `shortBio` | Yes | One short sentence for the team grid card |
| `fullBio` | No | Longer bio (used if you later generate profile pages from JSON; for now profile pages are static HTML) |
| `profilePage` | Yes | Path to their profile page, e.g. `"team/camilla.html"` |

**Example:**

```json
{
  "name": "Camilla Davila",
  "role": "Founder & Chief Strategist",
  "photo": "images/team/camilla.jpg",
  "shortBio": "Founder of the Comms Collective.",
  "fullBio": "Camilla founded the Comms Collective to create a space where...",
  "profilePage": "team/camilla.html"
}
```

- **Add a member:**  
  1. Add an object to `data/team.json` with `name`, `role`, `shortBio`, `profilePage` (and optional `photo`, `fullBio`).  
  2. Create a new profile page by copying `team/camilla.html` to e.g. `team/jane.html`, then update the name, role, and bio text inside that file.  
  3. Set `profilePage` to `"team/jane.html"`.

- **Team photos:** Put image files in `images/team/` (e.g. `camilla.jpg`) and set `photo` to `"images/team/camilla.jpg"`. If the file is missing, the site shows an initial letter.

---

## Calendar — `data/calendar.json`

The Calendar page uses `data/calendar.json` for institutional/vet dates. Edit that file to change which dates appear on the calendar.

---

## Tips

- **JSON syntax:** Use double quotes `"` for keys and strings. No trailing comma after the last item in an array or object.
- **Line breaks in text:** Keep descriptions on one line, or use `\n` inside the string if you need a line break (optional).
- **Testing:** From the project root, run `npx serve` (or `python3 -m http.server 8000`) and open e.g. `http://localhost:3000` to check changes before deploying.
