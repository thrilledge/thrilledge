# Paddle Billing Setup Guide

This guide walks you through getting the Paddle credentials needed to accept payments for the Unlimited Plan.

---

## Prerequisites

- A Paddle account (sign up at https://paddle.com)
- Your website must be live (Paddle requires a live URL for webhooks)

---

## Step 1: Get Your Paddle Client-Side Token

1. Log in to your [Paddle Dashboard](https://vendors.paddle.com)
2. Go to **Developer Tools > Authentication**
3. Under **Client-Side Token**, click **Generate Token**
4. Copy the token value
5. Set it in `.env.local`:
   ```
   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your_client_token_here
   ```

---

## Step 2: Get Your Paddle API Key

1. In the Paddle Dashboard, go to **Developer Tools > Authentication**
2. Under **API Keys**, click **Generate API Key**
3. Give it a name (e.g. "Thrill Edge Backend")
4. Copy the key (starts with `pdl_`)
5. Set it in `.env.local`:
   ```
   PADDLE_API_KEY=your_api_key_here
   ```

---

## Step 3: Create a Product & Price

1. In the Paddle Dashboard, go to **Catalog > Products**
2. Click **Create Product**
3. Fill in:
   - **Name**: `Unlimited Plan`
   - **Description**: `Full, unrestricted access to all tools with no usage limits.`
4. Click **Save**
5. On the product page, click **Create Price**
6. Choose:
   - **Billing mode**: Recurring
   - **Billing period**: Monthly (or Annual)
   - **Price**: e.g. `$29.99`
7. Copy the Price ID (starts with `pri_`)
8. Set it in `.env.local`:
   ```
   NEXT_PUBLIC_PADDLE_PRICE_ID=pri_your_price_id_here
   ```

---

## Step 4: Set Up Webhooks

1. In the Paddle Dashboard, go to **Developer Tools > Webhooks**
2. Click **Create Webhook**
3. Set:
   - **URL**: `https://thrilledge.com/api/paddle/webhook`
   - **Events**: Select at minimum:
     - `checkout.completed`
     - `subscription.activated`
     - `subscription.canceled`
4. Click **Save**
5. Copy the **Webhook Secret Key** (starts with `whsec_`)
6. Set it in `.env.local`:
   ```
   PADDLE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

---

## Step 5: Set Environment

In `.env.local`, set:
```
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox
```

Change to `production` when you go live.

- **Sandbox**: Use test card `4000 0000 0000 0002` for testing
- **Production**: Real payments

---

## Step 6: Test the Flow

1. Make sure all `.env.local` values are filled in (no `placeholder_` prefix)
2. Run `npm run dev`
3. Go to `/tools/profile`
4. Click **Upgrade to Unlimited**
5. Complete checkout with test card `4000 0000 0000 0002`
6. Verify you're redirected back to `/tools/profile?checkout=success`
7. Check that the plan badge changes from "Free Plan" to "Unlimited Plan"
8. Check that usage bars show "Unlimited" instead of counts

---

## Step 7: Go Live

1. Change `NEXT_PUBLIC_PADDLE_ENVIRONMENT` to `production`
2. Update the webhook URL in Paddle Dashboard if needed
3. In Paddle Dashboard, go to **Settings > Company** and verify your live details
4. Submit your Paddle account for review (Paddle will verify your business)

---

## Customer Portal (Manage Subscription)

The customer portal lets users update payment details or cancel their subscription.

To generate a portal link from the backend, the frontend sends a POST to:

```
POST /api/paddle/customer-portal
Body: { "subscriptionId": "sub_..." }
```

This returns a URL you can redirect the user to. Add a "Manage Subscription" button on the profile page once you have the user's `subscriptionId` stored.

To store the `subscriptionId`:
- The webhook handler (`app/api/paddle/webhook/route.ts`) can save it to `user.privateMetadata.subscriptionId`
- Then the profile page can read it and show the "Manage" button

---

## File Reference

| File | Purpose |
|------|---------|
| `.env.local` | All Paddle secrets and config |
| `lib/paddle.ts` | Server-side Paddle SDK initializer |
| `lib/paddle-client.ts` | Client-side Paddle.js initializer + checkout helper |
| `components/tools/paddle-checkout.tsx` | "Upgrade to Unlimited" button |
| `app/api/paddle/webhook/route.ts` | Webhook handler for subscription events |
| `app/api/paddle/customer-portal/route.ts` | Generates customer portal links |
| `app/tools/profile/profile-client.tsx` | Profile page with upgrade button |
| `app/refund-policy/page.tsx` | Refund policy (references Paddle) |

---

## Troubleshooting

**"Paddle not configured" error**: One or more `.env.local` values are still placeholders.

**Webhook returning 401**: The `PADDLE_WEBHOOK_SECRET` is wrong or the webhook URL is misconfigured.

**Checkout doesn't open**: Check browser console for Paddle.js errors. Ensure the client token is correct.

**Plan not updating after payment**: Check the webhook is receiving events. Check `clerkClient().users.updateUser()` has the correct permissions.
