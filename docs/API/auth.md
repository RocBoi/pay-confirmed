---

### 📄 `docs/api/auth.md`

```md
# Auth API

### POST `/api/auth/register`

Registers a business user.

**Body Parameters:**

```json
{
  "businessName": "Acme Inc.",
  "email": "admin@acme.com",
  "password": "securepass"
}
