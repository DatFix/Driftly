"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface BaseTableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
  hidden?: boolean; // 👈 thêm optional cho phép ẩn riêng cột
}

interface BaseTableProps<T> {
  data: T[];
  columns: BaseTableColumn<T>[];
  caption?: string;
  footer?: React.ReactNode;
  showIndex?: boolean; // 👈 props bật/tắt cột Id mặc định
  indexLabel?: string; // 👈 tùy chỉnh tiêu đề cột Id
}

export default function BaseTable<T>({
  data,
  columns,
  caption,
  footer,
  showIndex = true,
  indexLabel = "Id",
}: BaseTableProps<T>) {
  // Thêm cột Index nếu được bật
  const displayColumns = React.useMemo(() => {
    const visibleColumns = columns.filter((c) => !c.hidden); // loại bỏ các cột bị ẩn
    if (showIndex) {
      return [
        {
          key: "__index__",
          label: indexLabel,
          render: (_: T, index: number) => (
            <span className="font-medium text-(--color-title)">
              #{index + 1}
            </span>
          ),
          className: "w-[80px]",
        },
        ...visibleColumns,
      ];
    }
    return visibleColumns;
  }, [columns, showIndex, indexLabel]);

  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}

      <TableHeader>
        <TableRow className="hover:bg-(--color-dark-light)">
          {displayColumns.map((col) => (
            <TableHead
              key={String(col.key)}
              className={`${col.className ?? ""} text-(--color-title)`}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex} className="hover:bg-(--color-dark-light)">
            {displayColumns.map((col) => (
              <TableCell key={String(col.key)} className="text-(--color-text)">
                {col.render
                  ? col.render(item, rowIndex)
                  : (item as any)[col.key] ?? ""}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>

      {footer && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={displayColumns.length}>{footer}</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
