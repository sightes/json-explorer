export interface Sample {
  name: string;
  value: string;
}

export const samples: Sample[] = [
  {
    name: "API Response",
    value: `{
  "users": [
    {
      "id": 1,
      "name": "Ana García",
      "email": "ana@example.com",
      "verified": true,
      "balance": 1250.50,
      "metadata": null
    },
    {
      "id": 2,
      "name": "Carlos Ruiz",
      "email": "carlos@example.com",
      "verified": false,
      "balance": 0,
      "metadata": {
        "plan": "free",
        "joined": "2024-01-15"
      }
    }
  ],
  "total": 2,
  "page": 1
}`,
  },
  {
    name: "Config File",
    value: `{
  "name": "my-app",
  "version": "2.0.0",
  "settings": {
    "theme": "dark",
    "language": "es",
    "notifications": {
      "email": true,
      "push": false
    }
  },
  "features": ["auth", "analytics", "billing"],
  "debug": false
}`,
  },
  {
    name: "Nested Data",
    value: `{
  "organization": {
    "name": "TechCorp",
    "departments": [
      {
        "name": "Engineering",
        "teams": [
          { "name": "Frontend", "members": 5 },
          { "name": "Backend", "members": 8 },
          { "name": "DevOps", "members": 3 }
        ]
      },
      {
        "name": "Design",
        "teams": [
          { "name": "UI/UX", "members": 4 },
          { "name": "Brand", "members": 2 }
        ]
      }
    ]
  }
}`,
  },
];
