

export type ErrorUser = {
    username?: string,
    password?: string
}

export type RouteParams = {
    id: string
}
export type UserProps = {
    confirm?: string;
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean; 
};

export type UserIsActive = {
    id?: number;
    username?: string;
    email?: string;
    is_active?: boolean;
};