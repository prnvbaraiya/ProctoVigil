const fs = require("fs");
const { google } = require("googleapis");
const stream = require("stream");

class GoogleDriveService {
  constructor(clientId, clientSecret, redirectUri, refreshToken) {
    this.driveClient = this.createDriveClient(
      clientId,
      clientSecret,
      redirectUri,
      refreshToken
    );
  }

  createDriveClient(clientId, clientSecret, redirectUri, refreshToken) {
    const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    client.setCredentials({ refresh_token: refreshToken });

    return google.drive({
      version: "v3",
      auth: client,
    });
  }

  async createFolder(folderName, parentFolderId) {
    try {
      const res = await this.driveClient.files.create({
        resource: {
          name: folderName,
          mimeType: "application/vnd.google-apps.folder",
          parents: parentFolderId ? [parentFolderId] : [],
        },
        fields: "id, name",
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  searchFolder(folderName) {
    return new Promise((resolve, reject) => {
      this.driveClient.files.list(
        {
          q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
          fields: "files(id, name)",
        },
        (err, res) => {
          if (err) {
            return reject(err);
          }

          return resolve(res.data.files ? res.data.files[0] : null);
        }
      );
    });
  }

  async saveFile(fileName, fileBuffer, fileMimeType, folderId) {
    const fileMetadata = {
      name: fileName,
      parents: folderId ? [folderId] : [],
    };
    const media = {
      mimeType: fileMimeType,
      body: stream.Readable.from([fileBuffer]),
    };
    try {
      const file = await this.driveClient.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id",
      });
      return file;
    } catch (err) {
      // TODO(developer) - Handle error
      throw err;
    }
  }

  createPermission(fileId, emailAddress = "") {
    if (emailAddress === "") {
      return this.driveClient.permissions.create({
        fileId,
        requestBody: {
          type: "anyone",
          role: "reader",
        },
      });
    } else {
      return this.driveClient.permissions.create({
        fileId,
        requestBody: {
          type: "user",
          role: "reader",
          emailAddress,
        },
      });
    }
  }
}

module.exports = {
  GoogleDriveService,
};
