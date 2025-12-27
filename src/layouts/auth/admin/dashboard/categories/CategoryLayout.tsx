"use client";
import { ICategory } from "@/interfaces/auth/ICategory.interface";
import CategoryTable from "./list/CategoryTable";

export default function CategoryLayout({ items }: { items: ICategory[] }) {
  return (
    <div>
      <CategoryTable items={items} />
    </div>
  );
}
