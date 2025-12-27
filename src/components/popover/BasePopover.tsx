import { BaseDropdown, IPopupAction } from "../dropdowns/BaseDropdown";
import { MoreIcon } from "../icons/BaseIcon";

export default function BasePopover({ actions }: { actions: IPopupAction[] }) {
  return (
    <BaseDropdown items={actions} className="border border-(--color-dark-light)">
      <button className="p-1.5 focus:outline-0 cursor-pointer hover:bg-(--color-dark-light) rounded-md transition-all duration-200">
        <MoreIcon />
      </button>
    </BaseDropdown>
  );
}
