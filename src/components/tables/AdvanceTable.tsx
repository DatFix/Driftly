import { useState } from "react";
import BaseTextInput from "../inputs/base-input/BaseTextInput";
import BaseButton from "../buttons/base-button/BaseButton";
import { UserPlusIcon } from "../icons/BaseIcon";
import BaseTable from "./BaseTable";

export default function AdvanceTable() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-(--color-card) p-7 shadow-sm rounded-lg">
        <div className="flex items-center justify-between mb-5">
          <div className="w-fit">
            <BaseTextInput
              size="small"
              placeholder="Tìm kiếm người dùng"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="w-fit">
            <BaseButton size="small" onClick={() => setOpen(true)}>
              <UserPlusIcon />
              <p>Thêm người dùng</p>
            </BaseButton>
          </div>
        </div>
        {/* <BaseTable data={items} columns={columns} /> */}
      </div>
    </div>
  );
}
