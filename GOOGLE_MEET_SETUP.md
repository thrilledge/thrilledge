# Google Meet Setup Guide — Step by Step

Yeh guide hai **Thrill Edge Technologies** website ke meeting booking form mein Google Meet link auto-generate karne ke liye. Jab koi guest meeting book karega, automatically Google Calendar mein event create hoga aur guest ko email mein Meet link milega.

---

## Step 1: Google Cloud Project Banao

1. Browser mein kholo: https://console.cloud.google.com
2. Upar left side par **Google Cloud** ke logo ke saath ek project name dikhega. Agar koi project nahi hai toh "Select a project" dikhega.
3. "Select a project" click karo → phir "NEW PROJECT" click karo (upar right taraf)
4. Project name likho: `Thrill Edge Meet` (ya koi bhi name)
5. "CREATE" button click karo

### Step 1.1: Calendar API Enable Karo

1. Naye project select hone ke baad, upar search bar mein "Calendar" likh kar search karo
2. **Google Calendar API** par click karo
3. **ENABLE** button click karo (yeh free hai)

---

## Step 2: Service Account Banao

1. Left sidebar mein teen lines ka menu icon (`☰`) click karo
2. **IAM & Admin** → **Service Accounts** par click karo
3. Upar **+ CREATE SERVICE ACCOUNT** click karo

   **Page 1 — Service account details:**
   - Service account name: `thrill-edge-meet`
   - Service account ID: automatic generate ho jayega
   - Description: `Auto-generate Google Meet links for booked meetings`
   - **CREATE AND CONTINUE** click karo

   **Page 2 — Grant this service account access to project:**
   - Kuch bhi change nahi karna. Bas **CONTINUE** click karo

   **Page 3 — Grant users access to this service account:**
   - Kuch bhi change nahi karna. Bas **DONE** click karo

4. Ab service accounts ki list mein `thrill-edge-meet` dikhega. Usko click karo.

### Step 2.1: Service Account Key Download Karo

1. SERVICE ACCOUNT DETAILS page par **KEYS** tab par click karo
2. **ADD KEY** → **Create new key** click karo
3. Key type: **JSON** selected rahe → **CREATE** click karo
4. **Ek JSON file download ho jayegi** (`thrill-edge-meet-xxxxxxxxxxxx.json`). Yeh file **bahut important hai**. Isay mat khoana.
5. JSON file notepad mein kholo. Usmein kuch aisa dikhega:

```json
{
  "type": "service_account",
  "project_id": "thrill-edge-meet",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "thrill-edge-meet@thrill-edge-meet.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

6. Is file se **do values** nikaalni hain:
   - **`client_email`** wali line (kuch aisa: `thrill-edge-meet@thrill-edge-meet.iam.gserviceaccount.com`)
   - **`private_key`** wali line (poori, `-----BEGIN PRIVATE KEY-----` se le kar `-----END PRIVATE KEY-----\n` tak)

---

## Step 3: Google Calendar Ko Service Account Allow Karna

1. **Google Calendar** kholo: https://calendar.google.com
2. Us **Google account** se login karo jis calendar mein meetings create karni hain. (Jese usama@thrilledge.com ya jo bhi aapka calendar ho ga)
3. **Left sidebar** mein neeche **"My calendars"** ka section dikhega. Apne calendar ke naam par **mouse hover** karo → teen dots ya gear icon dikhe ga → click karo → **"Settings and sharing"** select karo
4. **Left panel** mein **"Shared with"** (ya "Share with specific people") par click karo
5. **"+ Add people and groups"** click karo
6. **Email address** mein service account ka **client_email** daalo (jo Step 2.1 mein nikaala tha, kuch aisa: `thrill-edge-meet@thrill-edge-meet.iam.gserviceaccount.com`)
7. **Permissions** mein **"Make changes to events"** select karo
8. **Send** click karo (koi email nahi jayega, bas permission set ho jayegi)

---

## Step 4: .env.local File Mein Values Daalna

Ab `.env.local` file mein Google Meet ki settings daalni hain. Developer yeh file daal sakta hai ya aap batao.

### 4.1 — GOOGLE_SERVICE_ACCOUNT_EMAIL
JSON file ka `client_email` copy karo, jese:
```
thrill-edge-meet@thrill-edge-meet.iam.gserviceaccount.com
```

### 4.2 — GOOGLE_PRIVATE_KEY
JSON file ka `private_key` copy karo. Yeh ek lambi string hoti hai:

```
-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC...\n...\n-----END PRIVATE KEY-----\n
```

⚠️ **Warning:** Yeh pura ek hi line mein copy karna hai. `\n` ko remove nahi karna. Bilkul waisa hi rakhna jaisa JSON file mein hai.

### 4.3 — GOOGLE_CALENDAR_ID
Yeh wo Google account ka **email address** hai jisne Step 3 mein calendar allow kiya tha. Jese:
```
usama@thrilledge.com
```

### Final File Kuch Aisa Dikhna Chahiye:

`.env.local` file ke neeche yeh 3 lines add (ya uncomment) karo:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=thrill-edge-meet@thrill-edge-meet.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=usama@thrilledge.com
```

---

## Step 5: Deploy / Test Karo

1. Jab settings daal di jayein, toh code deploy karo Vercel par (ya localhost par `npm run dev` se test karo)
2. Website par jao → meeting form kholo → meeting book karo
3. **Kya hoga:**
   - Google Calendar mein automatically event create ho ga
   - Guest aur team dono ko email mein **"Join Google Meet"** button ke saath link mile ga
   - Google Calendar invitation bhi guest ke email par chali jayegi

---

## Troubleshooting (Agar Kaam Na Kare To)

| Problem | Solution |
|---------|----------|
| Calendar event nahi banta | Check karo service account ko calendar par "Make changes to events" permission di hai ya nahi |
| Invalid grant error | Service account JSON key nayi banao (purani expire ho sakti hai) |
| Meet link nahi aata | Check karo `GOOGLE_CALENDAR_ID` sahi email hai ya nahi |
| Localhost par test nahi ho raha | Test Vercel deploy par karo (localhost par Meet API kabhi kabhi block hoti hai) |

---

**Koi masla ho toh developer ko batao.** Setup complete hone ke baad yeh file safe delete kar sakte ho.
