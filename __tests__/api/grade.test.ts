
/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST, GET } from '../../app/api/grades/route';
import sql from '../../lib/db';

jest.mock('../../lib/db', () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockRequest = (body: any): NextRequest => {
  return {
    json: () => Promise.resolve(body),
  } as any;
};

describe('Grades API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/grades', () => {
    it('should successfully add a valid grade', async () => {
      const req = mockRequest({ class: 'Math', grade: 85 });

      const response = await POST(req);
      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data).toEqual({ message: 'Grade added' });
    });

    it('should reject invalid class names', async () => {
      const req = mockRequest({ class: 'InvalidClass', grade: 90 });
      
      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Invalid class' });
      expect(sql).not.toHaveBeenCalled();
    });

    it('should reject grades outside 0-100 range', async () => {
      const testCases = [
        { grade: -1, expected: 'too low' },
        { grade: 101, expected: 'too high' },
        { grade: 90.5, expected: 'non-integer' },
      ];

      for (const testCase of testCases) {
        const req = mockRequest({ class: 'Science', grade: testCase.grade });
        const response = await POST(req);
        expect(response.status).toBe(400);
        expect(await response.json()).toHaveProperty('error');
      }
    });

    it('should handle database errors', async () => {
      const req = mockRequest({ class: 'History', grade: 75 });
      (sql as any).mockRejectedValueOnce(new Error('DB error'));

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to add grade' });
    });
  });

  describe('GET /api/grades', () => {
    it('should return empty array when no grades exist', async () => {
      (sql as any).mockResolvedValueOnce([]);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual([]);
    });

    it('should return all grades in ascending order', async () => {
      const mockGrades = [
        { id: 1, class: 'Math', grade: 90 },
        { id: 2, class: 'Science', grade: 85 },
      ];
      (sql as any).mockResolvedValueOnce(mockGrades);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual([
        { id: 1, class_name: 'Math', value: 90 },
        { id: 2, class_name: 'Science', value: 85 },
      ]);
    });

    it('should handle database errors', async () => {
      (sql as any).mockRejectedValueOnce(new Error('DB error'));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to fetch grades' });
    });
  });
});
