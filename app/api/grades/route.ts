import sql from '../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { class: className, grade } = await request.json();

    const validClasses = ['Math', 'Science', 'History'];
    if (!validClasses.includes(className)) {
      return NextResponse.json({ error: 'Invalid class' }, { status: 400 });
    }
    if (!Number.isInteger(grade) || grade < 0 || grade > 100) {
      return NextResponse.json({ error: 'Grade must be an integer between 0 and 100' }, { status: 400 });
    }

    await sql`INSERT INTO grades (class, grade) VALUES (${className}, ${grade})`;
    return NextResponse.json({ message: 'Grade added' }, { status: 200 });
  } catch (error) {
    console.error('ERROR: ', error);
    return NextResponse.json({ error: 'Failed to add grade' }, { status: 500 });
  }
}
export async function GET() {
  try {
    const numbers = await sql`SELECT id, class, grade FROM grades ORDER BY id ASC`;
    const pairs = numbers.map((row) => {
      return {
        id: row.id,
        class_name: row.class,
        value: row.grade
      };
    });
    return NextResponse.json(pairs, { status: 200 });
  } catch (error) {
    console.error('ERROR: ', error);
    return NextResponse.json({ error: 'Failed to fetch grades' }, { status: 500 });
  }
}