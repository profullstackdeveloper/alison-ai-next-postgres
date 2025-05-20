"use client";
import { Table } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GradeRow } from "./GradeRow";

export function GradesTable ({grades, loading}: Readonly<{grades: any, loading: boolean}>) {
    if (loading) {
        return "Loading..."
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Performance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {grades && grades.length > 0 && grades.map((grade: any) => (
                    <GradeRow key={grade.id} grade={grade} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}