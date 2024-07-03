import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class DbService {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.unsubscribeFn = null; // to store the unsubscribe function
  }

  async createPost(message) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(), // document id
        { body: message }, // content
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async getPosts() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.orderDesc("$createdAt")],
      );
      console.log(response); // to check for error
      return response;
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  async deletePost(messageId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        messageId,
      );
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }
  realTime(callback) {
    console.log("Subscribing to real-time updates");
    this.unsubscribeFn = this.client.subscribe(
      // returns a function
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents`,
      (response) => {
        if (response.error) {
          console.error("Realtime error:", response.error);
        } else {
          callback(response);
        }
      },
    );
  }

  unsubscribe() {
    if (this.unsubscribeFn) {
      console.log("Unsubscribing from real-time updates");
      this.unsubscribeFn(); // this.unsubscribeFn() calls the unsubscribe function, and then it clears the reference.
      this.unsubscribeFn = null;
    }
  }
}

const dbService = new DbService();
export default dbService;
