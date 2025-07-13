# Skill Swap Platform

A mini web application that enables users to **offer** and **request skills** in return — encouraging collaborative learning and growth within a community.

## 🚀 Overview

The **Skill Swap Platform** allows individuals to create profiles, list skills they can teach, and request skills they wish to learn. The platform fosters mutual skill exchange through a clean and intuitive interface.

---

## ✨ Key Features

- **User Profiles**
  - Name, location (optional), profile photo (optional)
  - Public/private profile toggle
  - Availability preferences (e.g., Weekends, Evenings)

- **Skill Listings**
  - Skills Offered (what the user can teach)
  - Skills Wanted (what the user wants to learn)

- **Skill Swap System**
  - Search and filter users by skills
  - Send and manage swap requests
  - Accept, reject, or cancel requests
  - Leave feedback or ratings after a swap

- **Admin Capabilities**
  - Approve or reject inappropriate skill descriptions
  - Ban policy-violating users
  - Monitor all swap requests
  - Broadcast platform-wide announcements
  - Generate reports on activity and feedback

---

## 🧱 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI, Wouter
- **Backend as a Service**: [Supabase](https://supabase.com/)
  - Realtime PostgreSQL database
  - Auth (email/password, social)
  - Row-level security (RLS)
  - Storage for user profile images (optional)
- **State Management**: React Query (TanStack Query)
- **Build Tool**: Vite

---
