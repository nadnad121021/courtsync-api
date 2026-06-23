import type { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { RequestWithUser } from '@core/interfaces/auth.interface';
import { IGetUsersFilterQuery } from '@core/interfaces/user.interface';
import { TSortOrder } from '@core/enums/common.enum';
import axios from "axios";
import * as cheerio from "cheerio";

type Entry = {
  char: string;
  x: number;
  y: number;
};
export class UserController {
  constructor(private service = new UserService()) { }

  getUsers = async (req: RequestWithUser, res: Response) => {
    const { skip, limit, sortBy, sortOrder, searchKey } = req.query;
    const queryParams: IGetUsersFilterQuery = {
      skip: skip ? parseInt(skip as string, 10) : 0,
      limit: limit ? parseInt(limit as string, 10) : 0,
      sortBy: sortBy as string,
      sortOrder: sortOrder as TSortOrder,
      searchKey: searchKey as string
    };

    const users = await this.service.getUsersByFilter(queryParams);
    res.json(users);
  };

  printSecretMessage = async (docUrl: string): Promise<void> => {
  try {
    const { data: html } = await axios.get(docUrl);
    const $ = cheerio.load(html);

    const entries: Entry[] = [];

    // Parse table rows from Google Doc
    $("table tr").each((_, row) => {
      const cells = $(row).find("td");

      if (cells.length >= 3) {
        const x = parseInt($(cells[0]).text().trim(), 10);
        const char = $(cells[1]).text().trim();
        const y = parseInt($(cells[2]).text().trim(), 10);

        if (!isNaN(x) && !isNaN(y) && char) {
          entries.push({ x, y, char });
        }
      }
    });

    if (entries.length === 0) {
      console.log("No valid character data found.");
      return;
    }

    const maxX = Math.max(...entries.map(e => e.x));
    const maxY = Math.max(...entries.map(e => e.y));

    const grid: string[][] = Array.from(
      { length: maxY + 1 },
      () => Array(maxX + 1).fill(" ")
    );

    for (const { x, y, char } of entries) {
      grid[y][x] = char;
    }

    for (const row of grid) {
      console.log(row.join(""));
    }

  } catch (err: any) {
    console.error("Error:", err.message);
  }
}
  testing = async (req: RequestWithUser, res: Response) => {
   await this.printSecretMessage(
      "https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub"
    );
    res.json({hello: 'world'});
  };

  getUser = async (req: Request, res: Response) => {
    const user = await this.service.getUser((req as any).params.id);
    res.json(user);
  };

  createUser = async (req: Request, res: Response) => {
    const user = await this.service.createUser(req.body);
    res.status(201).json(user);
  };

  updateUser = async (req: Request, res: Response) => {
    const user = await this.service.updateUser((req as any).params.id, req.body);
    res.json(user);
  };

  deleteUser = async (req: RequestWithUser, res: Response) => {
    const result = await this.service.softDeleteUser((req as any).params.id, req.user?.id || 'system');
    res.json(result);
  };
}
