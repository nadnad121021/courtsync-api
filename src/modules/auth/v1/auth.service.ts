import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "@config";
import { UserRepository } from "../../users/user.repository"
import { LoginDto, RegisterDto } from "../auth.dto";
import { HttpException } from '@core/exceptions/http.exception';
import { generateAccessToken } from "@core/utils/jwt";
import { RoleRepository } from "@modules/roles/role.repository";
import { AppDataSource } from "@db";
import { User } from "@modules/users/user.entity";

export class AuthService {
    constructor(private repo = new UserRepository()) { }

    async login(data: LoginDto) {
        const user = await this.repo.findByEmail(data.email);
        console.log("🚀 ~ AuthService ~ login ~ user:", user)

        if (!user) {
            throw new HttpException(401, "Invalid credentials");
        }

        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) {
            throw new HttpException(401, "Invalid credentials");
        }

        const token = generateAccessToken({ userData: { id: user.id, email: user.email } });

        const clonedUser = {...user}
        // remove password
        // @ts-ignore
        delete clonedUser.password;

        return {
            accessToken: token,
            user: clonedUser
        };
    }

    async register(payload: RegisterDto) {
        const userRepo = AppDataSource.getRepository(User);
        const email = payload.email.toLowerCase();

        const existingUser = await this.repo.findByEmail(email);

        if (existingUser && !existingUser.isDeleted && !existingUser.isVerified) {
            throw new Error('User already exists but not verified');
        }

        if (existingUser && !existingUser.isDeleted && existingUser.isVerified) {
            throw new Error('User already exists');
        }

        if (payload.password !== payload.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        // if (!payload.acceptedTerms) {
        //     throw new Error('You must accept the terms and privacy policy');
        // }

        const role = await RoleRepository.findOne({
            where: { name: payload.accountType },
        });

        if (!role) {
            throw new Error('Role not found');
        }

        const hashedPassword = await bcrypt.hash(payload.password, 10);

        const userData = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            phone: payload.phone ?? null,
            email,
            password: hashedPassword,
            acceptedTerms: payload.acceptedTerms ?? true,
            isVerified: true, // TODO: Implement email verification
            isDeleted: false,
            isActive:true,
            roles: [role],
        };

        if (existingUser && existingUser.isDeleted) {
            userRepo.merge(existingUser, userData as any);
            return await userRepo.save(existingUser);
        }

        const user = userRepo.create(userData as any);
        return await userRepo.save(user);
    }
}
