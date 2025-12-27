export enum EPermissionFeature{
    USER_CREATE = 'user.create',
    USER_UPDATE = 'user.update',
    USER_VIEW = 'user.view',
    USER_DELETE = 'user.delete',

    POST_CREATE = 'post.create',
    POST_UPDATE = 'post.update',
    POST_VIEW = 'post.view',
    POST_DELETE = 'post.delete',
    POST_MODERATE = 'post.moderate',

    ROLE_CREATE = 'role.create',
    ROLE_UPDATE = 'role.update',
    ROLE_VIEW = 'role.view',
    ROLE_DELETE = 'role.delete',

    CATEGORY_CREATE = 'category.create',
    CATEGORY_UPDATE = 'category.update',
    CATEGORY_VIEW = 'category.view',
    CATEGORY_DELETE = 'category.delete',

    DASHBOARD_VIEW = 'dashboard.view',
    __ALL__ = 'all'
}

export type TPermissionFeature = `${EPermissionFeature}`