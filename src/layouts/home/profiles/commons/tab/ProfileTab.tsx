import { ReactNode, useState, useEffect } from "react";

export interface ProfileTabProps {
  key: string | number;
  label: ReactNode;
}

interface ProfileTabComponentProps {
  items: ProfileTabProps[];
  value?: string | number; // key đang active (từ cha)
  onChange?: (key: string | number) => void; // callback khi đổi tab
}

export default function ProfileTab({
  items,
  value,
  onChange,
}: ProfileTabComponentProps) {
  const [activeKey, setActiveKey] = useState<string | number>(
    value ?? items[0].key
  );

  // đồng bộ nếu prop `value` thay đổi từ bên ngoài
  useEffect(() => {
    if (value !== undefined) {
      setActiveKey(value);
    }
  }, [value]);

  const handleClick = (key: string | number) => {
    setActiveKey(key);
    onChange?.(key); // báo cho thằng cha biết tab nào được chọn
  };

  return (
    <div className="h-20 w-full flex items-center justify-start gap-2">
      {items.map((item) => (
        <div
          key={item.key}
          onClick={() => handleClick(item.key)}
          className={`w-fit px-2 py-3 border-b-2 font-medium cursor-pointer transition-colors duration-200 ${
            item.key === activeKey
              ? "text-(--color-primary) border-(--color-primary)"
              : "text-(--color-text) border-transparent"
          }`}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
