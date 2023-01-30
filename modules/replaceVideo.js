module.exports = (temp, post) => {
  let output = temp.replace(/{%VIDEO-LINK%}/g, post.video);
  return output;
};
