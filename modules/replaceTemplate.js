const replaceImage = require('./replaceImage');
const replaceVideo = require('./replaceVideo');

module.exports = (temp, post) => {
  let output = temp
    .replace(/{%POSTTITLE%}/g, post.title)
    .replace(/{%POSTID%}/g, post._id.$oid)
    .replace(/{%POSTCONTENT%}/g, replaceImage(post.content))
    .replace(/{%POSTLINK%}/g, post.link)
    .replace(/{%POSTUSER%}/g, post.user.$oid);
  return output;
};