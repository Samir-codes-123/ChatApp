import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class DbService {
  client = new Client();
  databases;
  bucket;
  unsubscribeFn = null; // to store the subscribe function

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost(userId, username, body, image = null) {
    try {
      const post = {
        user_id: userId,
        username: username,
        body: body,
        image: image,
        type: image ? "media" : "text",
      };
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        post,
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(msgid, newmessage) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        msgid,
        { body: newmessage }, // only send what needs to be updated other thing is updated my appwrite
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost:: error", error);
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

  // uploading file
  async uploadFile(file) {
    if (!file || file === null || file === undefined) return;
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(), //fileId
        file,
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deletefile :: error", error);
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const dbService = new DbService();
export default dbService;
