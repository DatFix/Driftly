export enum EGender{
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export const EGenderVN:Record<EGender, string> = {
    [EGender.MALE] : 'Nam',
    [EGender.FEMALE] : 'Nữ',
    [EGender.OTHER] : 'Khác'
}