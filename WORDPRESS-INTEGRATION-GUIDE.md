# WordPress + ACF → Next.js Integration Guide (Roman Urdu)

Yeh guide hai ke Thrill Edge website ka WordPress backend se data kaise aata hai, aur agar tumhe
**naye ACF fields** add karne hain ya **nayi custom post type** banani hai toh kis file mein ja kar
kya update karna hai. Step by step, Roman Urdu mein.

---

## 1. Sab se pehle samajho: Data ka flow

```
WordPress Admin (admin.thrilledge.com)
   │
   │  ACF fields + Custom Post Types (Team Member, Service, Job, etc.)
   │
   ▼
WordPress REST API  (https://admin.thrilledge.com/wp-json/wp/v2/...)
   │
   ▼
lib/wordpress.ts  (fetch karne ki functions yahan hain)
   │
   ▼
app/.../page.tsx  (page mein data use karte ho)
```

- `lib/wordpress.ts` = **bridge** hai WordPress aur website ke beech. Data fetch karne ki saari
  functions isi file mein hoti hain.
- Pages (`app/team/page.tsx`, `app/services/page.tsx` waghera) is file ki functions ko call karte hain.
- WordPress REST API mein ACF data tabhi aata hai jab field group mein **Show in REST = enabled**
  ho. Tumhare Team Member field group mein yeh abhi `show_in_rest: 0` hai (ACF export file mein),
  isliye agar API se `acf` values nahi aa rahi hain toh usse `1` kar do.

---

## 2. Naya ACF field add karna (jaise Team Member mein "LinkedIn" field)

Maan lo tum Team Member mein ek naya text field add karna chahte ho jiska naam hai `linkedin`.

### Step 2.1 — WordPress Admin (ACF)
1. `admin.thrilledge.com` par login karo.
2. **Custom Fields → Field Groups → Team Member** pe click karo.
3. **+ Add Field** button se naya field banao:
   - Field Label: `LinkedIn URL`
   - Field Name: `linkedin`   ← **yeh name important hai**, REST API isi se data dega
4. Right side mein **Settings** tab mein "Show in REST" ko **Enabled** karo (agar nahi hai).
5. **Save Changes** karo.
6. Har Team Member post mein jao aur LinkedIn URL bhar do → Update karo.

### Step 2.2 — `lib/wordpress.ts` mein interface update karo
File: `lib/wordpress.ts` (line ~477, `TeamMember` interface)

```ts
export interface TeamMember {
  id: number
  title: { rendered: string }
  slug: string
  content: { rendered: string }
  featured_media: number
  acf?: {
    role?: string
    bio?: string
    linkedin?: string   // ← YEH NAYA FIELD ADD KIYA
  }
  // ...
}
```

### Step 2.3 — Team page mein naya field render karo
File: `app/team/page.tsx` (andar `TeamCard` function)

Apne naye field ko card mein dikhane ke liye, `role` aur `bio` wale pattern ki tarah:

```tsx
const linkedin = member.acf?.linkedin?.trim()

// JSX ke andar (role ke baad)
{linkedin && (
  <p className="font-inter text-[#555] text-[14px]">
    LinkedIn: {linkedin}
  </p>
)}
```

> **Rule:** `{linkedin && (...)}` lagana zaroori hai. Agar field khali hai toh kuch nahi
> dikhega — yeh tumhare original requirement hai "empty fields nahi dikhana".

### Step 2.4 — Test karo
```
npm run dev
```
URL kholo: `http://localhost:3000/team`
- Agar WP mein value bhari hai → field show hogi
- Agar khali hai → field hide hogi

> ⚠️ Agar value nahi aa rahi toh check karo: browser mein
> `https://admin.thrilledge.com/wp-json/wp/v2/team-member?acf_format=standard`
> kholo aur dekho `acf` object mein `linkedin` hai ya nahi.

---

## 3. Nayi Custom Post Type banana (jaise "FAQ" ya "Partner")

Maan lo tum ek nayi post type banana chahte ho jiska naam hai `partner` (jo client logos dikhayegi).

### Step 3.1 — WordPress Admin (ACF) mein Post Type banao
1. `admin.thrilledge.com` login karo.
2. **Custom Post Types → Add New** (ACF plugin ka tab, agar enabled hai).
3. Post Type Key: `partner`
4. Settings:
   - Labels bharo (Name: Partners, Singular Name: Partner)
   - **Show in REST API** → tick/true karo (yeh zaroori hai, warna Next.js data nahi lega)
   - Supports: `title`, `thumbnail` (image ke liye)
5. **Save** karo.
6. Phir **Field Groups → Add New Field Group** banao is post type ke liye:
   - Location: `Post Type == Partner`
   - Fields banao (jaise `description`, `website_url`, waghera)
   - Field group ke settings mein **Show in REST** enable karo
7. **Partners** menu se kuch posts add karo.

### Step 3.2 — `lib/wordpress.ts` mein interface + function add karo
File: `lib/wordpress.ts` — kisi bhi `getXxx()` function ke baad yeh code paste karo:

```ts
export interface Partner {
  id: number
  title: { rendered: string }
  slug: string
  featured_media: number
  acf?: {
    description?: string
    website_url?: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text?: string
    }>
  }
}

export async function getPartners(per_page: number = 100): Promise<Partner[]> {
  try {
    return await fetchFromWordPress<Partner[]>(
      `/wp/v2/partner?per_page=${per_page}&_embed&acf_format=standard&orderby=date&order=asc`
    )
  } catch {
    return []
  }
}
```

> **Note:** URL mein `/wp/v2/partner` — post type ka key (singular) likho. Team ke liye
> `/wp/v2/team-member`, Services ke liye `/wp/v2/service`.

### Step 3.3 — Page banao
File: `app/partners/page.tsx` (nayi file banao)

```tsx
import { getPartners } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Partners | Thrill Edge Technologies",
  description: "Meet the partners we work with.",
};

export default async function PartnersPage() {
  const partners = await getPartners(100).catch(() => []);

  return (
    <div className="relative bg-white px-4 md:px-9 py-12 md:py-20 max-w-360 mx-auto">
      <h1 className="font-mont font-semibold text-[#111212] text-[32px] mb-8">
        Our Partners
      </h1>
      {partners.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {partners.map((p) => (
            <div key={p.id} className="border border-[#e5e5e5] rounded-[20px] p-6">
              {/* image / title / acf fields yahan */}
              <h2 className="font-mont font-semibold text-[#111212] text-[18px]">
                {p.title.rendered}
              </h2>
              {p.acf?.description && (
                <p className="font-inter text-[#555] text-[14px]">{p.acf.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="font-inter text-[#929296]">Partners coming soon.</p>
      )}
    </div>
  );
}
```

### Step 3.4 — Menu mein link add karo (agar chahiye)
- **Desktop mega menu:** `components/layout/mega-menu.tsx` — Company section ke `items` array mein
  naya entry daalo:
  ```ts
  { label: 'Partners', href: '/partners', icon: Handshake, description: 'Meet our trusted partners.' }
  ```
  (`Handshake` icon lucide-react se import karna hoga)
- **Mobile menu:** `components/layout/header.tsx` — `mobileNav` array ke Company section ke
  `children` mein naya link daalo:
  ```ts
  { label: 'Partners', href: '/partners', desc: 'Meet our trusted partners', icon: Handshake }
  ```

### Step 3.5 — Test karo
```
npm run dev
```
`http://localhost:3000/partners` kholo.

---

## 4. Image ka placeholder (rule)

Team/Partners waghera cards mein:
- Featured image ho → `member._embedded['wp:featuredmedia'][0].source_url`
- Na ho → placeholder (`/placeholder-user.jpg`)

Yeh logic already `app/team/page.tsx` mein hai:

```tsx
const imgSrc = member._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder-user.jpg";
```

Agar tumhe naye page mein bhi same chahiye toh yehi pattern copy kar lo.

---

## 5. Quick file reference table

| Kaam | File |
|------|------|
| Data fetch karne wali functions | `lib/wordpress.ts` |
| Team page UI | `app/team/page.tsx` |
| Desktop nav (mega menu) | `components/layout/mega-menu.tsx` |
| Mobile nav | `components/layout/header.tsx` |
| Image domain allowlist | `next.config.mjs` (already `admin.thrilledge.com` allowed) |

---

## 6. Common problems

1. **ACF data REST API mein nahi aa rahi**
   → Field group ki settings mein **Show in REST = Enabled** karo.

2. **Nayi post type REST API mein nahi dikh rahi**
   → Post type ki settings mein **Show in REST API = true** karo.

3. **Featured image nahi aa rahi**
   → Fetch URL mein `_embed` hona chahiye (functions mein already hai). Aur WP mein post ke
   featured image set honi chahiye.

4. **Test kaise confirm karun data aa raha hai?**
   → Browser mein yeh URL kholo (partner example):
   `https://admin.thrilledge.com/wp-json/wp/v2/partner?acf_format=standard&_embed`
   JSON mein data dikhega toh integration ready hai.

5. **Page error 500**
   → `npm run dev` ki console mein dekho. Zyada tar `acf` undefined ho sakta hai, isliye hamesha
   `member.acf?.role?.trim()` pattern use karo (`?.` optional chaining).

---

## 7. Complete naya field add karne ka quick checklist

- [ ] ACF mein field banao (name yaad rakho) + Show in REST enable
- [ ] WP mein post par value bharo
- [ ] `lib/wordpress.ts` ke interface mein `acf` object mein field add karo
- [ ] Page ke JSX mein `{value && (...)}` se render karo
- [ ] `npm run dev` se test karo
