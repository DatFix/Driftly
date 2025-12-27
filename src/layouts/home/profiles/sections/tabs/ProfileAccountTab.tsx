import {
  AtIcon,
  ComputerIcon,
  FacebookIcon,
  GithubIcon,
  GlobalIcon,
  InfoIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  TiwtterIcon,
} from "@/components/icons/BaseIcon";
import BaseDatePickerRhf from "@/components/inputs/base-date-picker/BaseDatePickerRhf";
import BaseTextInputRhf from "@/components/inputs/base-input/BaseTextInputRhf";
import { BaseSelectOption } from "@/components/inputs/base-select-multi/BaseSelectMulti";
import BaseSelectRhf from "@/components/inputs/base-select/BaseSelectRhf";
import BaseTextareaRhf from "@/components/inputs/base-textarea/BaseTextareaRhf";
import { IUser } from "@/interfaces/public/IUser.interface";
import { EGender, EGenderVN } from "@/types/gender.type";
import { SimFormReturn } from "@/types/others/sim-rhf.types";
import ProfileHeading from "../../commons/heading/ProfileHeading";

export default function ProfileAccountTab({
  rhf,
}: {
  rhf: SimFormReturn<IUser>;
}) {
  const { setValue, control } = rhf;
  const GenderOptions: BaseSelectOption[] = [
    { label: EGenderVN[EGender.MALE], value: EGender.MALE },
    { label: EGenderVN[EGender.FEMALE], value: EGender.FEMALE },
    { label: EGenderVN[EGender.OTHER], value: EGender.OTHER },
  ];
  return (
    <div className="w-full flex items-start justify-between">
      <div className="w-1/2 p-1">
        <ProfileHeading icon={<InfoIcon />} title="Thông tin chung" />
        <BaseTextInputRhf
          tabIndex={1}
          name="username"
          control={control}
          placeholder="Tên người dùng"
          // autoComplete="on"
          icon={<AtIcon />}
        />

        <BaseTextareaRhf
          focus={false}
          name="bio"
          control={control}
          placeholder="Tiểu sử"
          rows={5}
          maxLength={150}
          className="border-(--color-dark-light) border-2 pt-2 pl-2 ring-[#FF567166] focus:border-[#FF567199] shadow-none focus:ring-2"
        />

        <BaseSelectRhf
          control={control}
          name="gender"
          options={GenderOptions}
          label="Giới tính"
          placeholder="Chọn giới tính"
        />

        <BaseDatePickerRhf
          name="birthday"
          label="Ngày sinh"
          control={control}
          placeholder="Chọn ngày sinh"
        />

        <BaseTextInputRhf
          label="Nơi ở hiện tại"
          name="location"
          control={control}
          placeholder="Nơi ở hiện tại"
        />
      </div>
      <div className="w-1/2 p-1">
        <ProfileHeading icon={<GlobalIcon />} title="Thông tin mạng xã hội" />
        <BaseTextInputRhf
          name="website"
          control={control}
          placeholder="Trang web cá nhân"
          icon={<ComputerIcon />}
        />

        <BaseTextInputRhf
          name="socialLinks.facebook"
          control={control}
          placeholder="Facebook"
          icon={<FacebookIcon />}
        />

        <BaseTextInputRhf
          name="socialLinks.instagram"
          control={control}
          placeholder="Instagram"
          icon={<InstagramIcon />}
        />

        <BaseTextInputRhf
          name="socialLinks.twitter"
          control={control}
          placeholder="Twitter"
          icon={<TiwtterIcon />}
        />

        <BaseTextInputRhf
          name="socialLinks.github"
          control={control}
          placeholder="Github"
          icon={<GithubIcon />}
        />

        <BaseTextInputRhf
          name="socialLinks.linkedin"
          control={control}
          placeholder="Linkedin"
          icon={<LinkedinIcon />}
        />

        <BaseTextInputRhf
          name="socialLinks.tiktok"
          control={control}
          placeholder="Tiktok"
          icon={<TiktokIcon />}
        />
      </div>
    </div>
  );
}
