Postgres (Neon)          MongoDB Atlas           Redis (Upstash)
──────────────           ──────────────          ──────────────
users                    group_messages          presence
groups                   direct_messages         typing indicators
group_members            reactions               unread counts (hot)
conversations            read_receipts           message cache (last 50)


Oracle ARM VM (4 cores, 24GB RAM)
├── Redis (self-hosted, ~50MB RAM idle)
├── MongoDB (self-hosted, ~200MB RAM idle)  ← optional
└── Your WebSocket server (Node.js)

┌─────────────────────────────────────────────────────┐
│                   ORACLE CLOUD (ARM VM)             │
│                                                     │
│  Redis (self-hosted)    MongoDB (self-hosted)       │
│  ├─ presence            ├─ group_messages           │
│  ├─ typing indicators   ├─ direct_messages          │
│  ├─ unread counts       ├─ reactions                │
│  └─ message cache       └─ read_receipts            │
│                                                     │
│  WebSocket Server (Node.js / Bun)                   │
└─────────────────────────────────────────────────────┘
           │                        │
           ▼                        ▼
    Neon (Postgres)          Your App Frontend
    ├─ users                 (Vercel free tier)
    ├─ groups
    ├─ group_members
    └─ conversations




    ```
    Act as a senior software architect. Generate a `src/db/schema.js` file using Drizzle ORM and PostgreSQL for a real-time chat application.

- Create a role status enum with the values member , moderator, admin, user

- Create a users table with the fields id set to primary key with a random UUID, email, username, display_name, password_hash, email_verfied, email_verify_token, reset_password_token, reser_toekn_expires_at, avatar_url, bio, is_active, role which defaults to user(This one uses the enum), last_seen_at, created_at which defaults to now an updated_at
    ```