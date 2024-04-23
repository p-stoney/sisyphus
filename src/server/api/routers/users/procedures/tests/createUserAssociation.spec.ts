import { describe, expect, it, beforeEach } from 'vitest';
import { createUserAssociation } from '../createUserAssociation';
import { testdb, mockCtx } from './testSetup';

describe('createUserAssociation procedure in Next.js', () => {
  beforeEach(() => {
    testdb.$transaction.mockImplementation(async (transactionalQueries) =>
      transactionalQueries(testdb)
    );
    mockCtx.session = {
      user: { id: '2', email: 'user2@example.com', isAdmin: false },
      expires: '2022-12-31T23:59:59Z'
    };
  });

  it('successfully associates a user with businesses', async () => {
    const createUserDTO = {
      userId: '2',
      businessIds: ['1', '2'],
    };

    const mockUserBeforeAssociation = {
      id: createUserDTO.userId,
      email: 'user2@example.com',
      emailVerified: null,
      image: null,
      role: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };

    const mockUserAfterAssociation = {
      ...mockUserBeforeAssociation,
      businesses: [
        { id: '1', name: 'Business One' },
        { id: '2', name: 'Business Two' }
      ]
    };

    testdb.user.findUnique.mockResolvedValueOnce(mockUserBeforeAssociation)
      .mockResolvedValueOnce(mockUserAfterAssociation);

    testdb.business.findMany.mockResolvedValueOnce([
      { id: '1', name: 'Business One', userId: '2', createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
      { id: '2', name: 'Business Two', userId: '2', createdAt: new Date(), updatedAt: new Date(), deletedAt: null }
    ]);

    const result = await createUserAssociation({ input: createUserDTO, ctx: mockCtx });

    expect(result).toMatchObject({
      id: createUserDTO.userId,
      businesses: expect.arrayContaining([
        expect.objectContaining({ id: '1', name: 'Business One' }),
        expect.objectContaining({ id: '2', name: 'Business Two' })
      ]),
      updatedAt: expect.any(Date)
    });

    expect(testdb.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: createUserDTO.userId },
        data: expect.objectContaining({
          businesses: {
            connect: createUserDTO.businessIds.map((id) => ({ id })),
          },
        }),
      })
    );
  });
});
