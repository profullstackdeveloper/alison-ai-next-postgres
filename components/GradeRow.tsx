"use client";
import { getPerformanceLevel } from "@/utils/helpers";
import { Chip } from "@mui/material";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const GradeRow = ({ grade }: any) => {
  const performance = getPerformanceLevel(grade.value);

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell>{grade.id}</TableCell>
      <TableCell>{grade.class_name}</TableCell>
      <TableCell>{grade.value}</TableCell>
      <TableCell>
        <Chip color={performance.color} label={performance.label} />
      </TableCell>
    </TableRow>
  );
};