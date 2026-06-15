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




   