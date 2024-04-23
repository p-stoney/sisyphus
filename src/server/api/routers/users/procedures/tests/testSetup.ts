// import { beforeEach } from 'vitest';
// import { mockDeep, mockReset } from 'vitest-mock-extended';
// import { PrismaClient } from '@prisma/client';
// import { Session } from 'next-auth';

// // Mock database as before
// export const testdb = mockDeep<PrismaClient>();

// beforeEach(() => {
//   mockReset(testdb);
// });

// export type TestContext = {
//   db: typeof testdb;
//   session: Session | null;  // Adapted to mimic Next.js session
// };

// // Example of a mocked session object
// const mockSession = {
//   user: {
//     id: '1',
//     email: 'user@example.com',
//     isAdmin: true,
//   },
//   expires: '2022-12-31T23:59:59Z', // Add the 'expires' property with a valid value
// };

// export const mockCtx: TestContext = {
//   db: testdb,
//   session: mockSession, // Session now replaces the user directly
// };