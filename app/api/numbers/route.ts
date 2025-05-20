import sql from '../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { number } = await request.json();
    await sql`INSERT INTO numbers (number) VALUES (${number})`;
    return NextResponse.json({ message: 'Number added' }, { status: 200 });
  } catch (error) {
    console.error('ERROR: ', error);
    return NextResponse.json({ error: 'Failed to add number' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const numbers = await sql`SELECT id, number FROM numbers ORDER BY id ASC`;
    const pairs = numbers.map((row, index) => {
      if (index < numbers.length - 1) {
        return {
          id1: row.id,
          number1: row.number,
          id2: numbers[index + 1].id,
          number2: numbers[index + 1].number,
          sum: row.number + numbers[index + 1].number,
        };
      }
      return { id1: row.id, number1: row.number };
    });
    return NextResponse.json(pairs, { status: 200 });
  } catch (error) {
    console.error('ERROR: ', error);
    return NextResponse.json({ error: 'Failed to fetch numbers' }, { status: 500 });
  }
}