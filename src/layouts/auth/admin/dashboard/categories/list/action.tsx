import { IPopupAction } from "@/components/dropdowns/BaseDropdown";
import { DeleteIcon, EditIcon } from "@/components/icons/BaseIcon";
import { ICategory } from "@/interfaces/auth/ICategory.interface";

export const getCategoryAction = ({
  onEditCategory,
  onDeleteCategory,
  record,
}: {
  onEditCategory: (Category: ICategory) => void;
  onDeleteCategory: (Category: ICategory) => void;
  record: ICategory;
}): IPopupAction[] => [
  {
    label: "Chỉnh sửa",
    icon: <EditIcon stroke={1.5} />,
    onClick: () => onEditCategory(record),
  },
  {
    label: "Xoá danh mục",
    icon: <DeleteIcon stroke={1.5} danger />,
    onClick: () => onDeleteCategory(record),
    danger: true,
  },
];
