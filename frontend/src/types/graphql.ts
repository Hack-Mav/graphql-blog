// frontend/src/types/graphql.ts
export type User = {
  id: string;
  email: string;
  name: string;
  // Add other user fields as needed
};

export type Post = {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  // Add other post fields as needed
};

// Add other types as needed