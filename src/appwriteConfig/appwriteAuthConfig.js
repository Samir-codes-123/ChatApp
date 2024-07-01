import { Client } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
  }
}

const authService = new AuthService();
export default authService;
