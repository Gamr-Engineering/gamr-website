# Security Policy

This project is a frontend application with Supabase-backed workflows. Treat secrets, Supabase policies, admin routes, and email dispatch with care.

## Supported Scope

Security guidance in this document applies to the current Gamr Website codebase, including:

- React frontend code.
- Supabase client usage.
- Public onboarding and article submission flows.
- Protected admin dashboard behavior.
- Environment variable usage.
- Mocked email service behavior.

## Secret Handling

Never commit:

- Supabase service role keys.
- Resend or other email provider API keys.
- Private backend tokens.
- Personal access tokens.
- Production secrets.
- Real user exports or sensitive customer data.

Only public frontend variables should use the `VITE_` prefix. Vite exposes `VITE_` variables to browser code.

Required public variables:

```sh
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Security Notes

- Frontend checks are not authorization.
- The hard-coded admin email in `src/context/AuthContext.tsx` is a frontend convenience and must not be the only production access control.
- Sensitive read, update, delete, approve, reject, feature, and subscriber operations should be enforced by Supabase Row Level Security policies or secure backend endpoints.
- When changing tables used by public forms, review insert policies carefully.
- When changing approved article visibility, confirm public read policies only expose intended fields.

## Email Dispatch

`src/services/emailService.ts` intentionally runs in mock mode.

Do not add real email provider API keys to frontend code. Real email sending should be implemented through a secure backend endpoint, Supabase Edge Function, or another server-side path.

## Reporting Security Issues

If you find a security issue, do not publish exploit details publicly. Share:

- A concise description of the issue.
- Affected route, file, table, policy, or workflow.
- Steps to reproduce.
- Potential impact.
- Suggested fix, if known.

Use the project's private team communication channel or repository security reporting process when available.

## Security Review Checklist

Use this checklist for sensitive changes:

- No private secrets are added to frontend code.
- `.env.example` contains placeholders only.
- Supabase RLS policies match the intended access model.
- Admin-only behavior is enforced outside the frontend when needed.
- Public forms validate and constrain writes.
- Storage buckets expose only intended assets.
- Error messages do not leak secrets or sensitive implementation details.
- Email dispatch remains mocked unless a secure backend implementation exists.

