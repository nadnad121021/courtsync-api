import { IQuery } from "@core/interfaces/common.interface";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?:string;
    password: string;
    isActive: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    isDeleted:Boolean;
    deletedAt?:Date,
    deletedBy?:string
    acceptedTerms?: boolean;
}

export interface IGetUsersFilterQuery extends IQuery {
    searchKey?: string;
}