/*
        "id": 3,
        "username": "student",
        "active": true,
 */

import {Profile} from "./Profile";
import {Role} from "./Role";

export class Student {

  id?: number;
  username?: string;
  profile?: Profile;
  role?: Role;
}
