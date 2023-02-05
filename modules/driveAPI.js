const GoogleDriveAPIClientID = '201324749864-1smrt65sd0tamjet8glkcdolqrmt66qj.apps.googleusercontent.com';
const GoogleDriveAPIClientSecret = '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';
const GoogleDriveAPIFolerID = '1vb2ZGYvrqsz7Rrw3WErV91YxxpeL3Sxh';

const fs = require('fs');
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: './t-system-376816-d231598dc1e2.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const driveService = google.drive({
  version: 'v3',
  auth,
});
const fileMetaData = {
  name: 'uploadmaterials.jpg',
  parents: [GoogleDriveAPIFolerID],
};
const media = {
  mimeType: 'image/jpg',
  body: fs.createReadStream('./images/background-01.jpg'),
};
async function uploadFile() {
  try {
    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      fields: 'id',
    });

    return response;
  } catch (err) {
    console.log('Upload error: ', err);
  }
}

module.exports = () => {
  uploadFile().then((data) => {
    console.log('This is the drive api data', data);
  });

  //https://drive.google.com/uc?export=view&id=1zI0LTya2FOPoa1CHEFISPhuKK3UO7-Ph
  //https://drive.google.com/uc?export=download&id=1zI0LTya2FOPoa1CHEFISPhuKK3UO7-Ph
};
