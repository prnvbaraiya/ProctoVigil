const fs = require("fs");
const { google } = require("googleapis");

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

  saveFile(fileName, filePath, fileMimeType, folderId) {
    return this.driveClient.files.create({
      requestBody: {
        name: fileName,
        mimeType: fileMimeType,
        parents: folderId ? [folderId] : [],
      },
      media: {
        mimeType: fileMimeType,
        body: fs.createReadStream(filePath),
      },
    });
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
