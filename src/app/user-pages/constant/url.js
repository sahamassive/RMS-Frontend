function generateRandomSlug(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return slug;
}

const slugUrl = generateRandomSlug(30); // generate a random slug with 8 characters

export { slugUrl };
