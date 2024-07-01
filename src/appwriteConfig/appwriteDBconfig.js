import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class DbService {
  clinet = new Client();
  databases;
  constructor() {
    this.clinet
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.clinet);
  }
  async createPost(message) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(), //document id
        { body: message }, //content
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }
  async getPosts() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
      );
      console.log(response); // to check for error
      return response;
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }
}

const dbService = new DbService();
export default dbService;
