import BasePopover from "@/components/popover/BasePopover";
import { getCategoryAction } from "./action";
import { ICategory } from "@/interfaces/auth/ICategory.interface";
import BaseTag from "@/components/tags/BaseTag";
import { useState } from "react";
import BaseModal from "@/components/modals/BaseModal";
import { getColorByName } from "@/utils/getColorByName.utils";

interface AdvancedColumn<T> {
  label: string;
  // Cho phép key là key của T hoặc string khác (ví dụ "action")
  key: keyof T | "action";
  render?: (item: T) => React.ReactNode;
}

export const getCategoryColumn = ({
  onEditCategory,
  onDeleteCategory,
}: {
  onEditCategory: (Category: ICategory) => void;
  onDeleteCategory: (Category: ICategory) => void;
}): AdvancedColumn<ICategory>[] => {
  return [
    {
      label: "Tên danh mục",
      key: "name",
    },
    {
      label: "Đường dẫn",
      key: "slug",
    },
    {
      label: "Chức năng",
      key: "isActive",
      render: (record: ICategory) => (
        <BaseTag color={`${record.isActive ? "#059669" : "#EF4444"}`}>
          {record.isActive ? "Menu chính" : "Danh mục con"}
        </BaseTag>
      ),
    },
    {
      label: "Danh mục con",
      key: "children",
      render: (record: ICategory) => <ChildrenCell record={record} />,
    },
    {
      label: "Mô tả",
      key: "description",
    },
    {
      label: "Hành động",
      key: "action",
      render: (record: ICategory) => (
        <BasePopover
          actions={getCategoryAction({
            onEditCategory: () => onEditCategory(record),
            record,
            onDeleteCategory: () => onDeleteCategory(record),
          })}
        />
      ),
    },
  ];
};

const ChildrenCell = ({ record }: { record: ICategory }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-2">
      {record.children && record.children?.length > 3 ? (
        <div className="flex flex-wrap gap-2">
          {record.children?.slice(0, 3).map((item) => (
            <BaseTag color={getColorByName(item?.name as any)} key={item?.id}>
              {item?.name}
            </BaseTag>
          ))}
          <div
            className="w-fit px-2 bg-[#4444441A] rounded-[3px] flex items-center justify-center cursor-pointer"
            onClick={() => setOpen(true)}
          >
            +{record.children.length - 3}
          </div>
        </div>
      ) : (
        record.children?.map((item) => (
          <BaseTag color={getColorByName(item?.name as any)} key={item?.id}>
            {item?.name}
          </BaseTag>
        ))
      )}

      <BaseModal
        open={open}
        onOpenChange={setOpen}
        visiableBtn={true}
        title="Chi tiết danh mục"
      >
        <div className="flex flex-wrap gap-2">
          {record.children?.map((item) => (
            <BaseTag color={getColorByName(item?.name as any)} key={item?.id}>
              {item?.name}
            </BaseTag>
          ))}
        </div>
      </BaseModal>
    </div>
  );
};
