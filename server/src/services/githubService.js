const axios = require("axios");
const User = require("../models/User");

const commitReadme = async (userId, fullName, content) => {
  console.log("📦 Committing README to GitHub");

  const user = await User.findById(userId);

  const encoded = Buffer.from(content).toString("base64");

  // we try to get existing file SHA (needed for update)
  let sha;
  try {
    const existing = await axios.get(
      `https://api.github.com/repos/${fullName}/contents/README.md`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    );
    sha = existing.data.sha;
  } catch {
    sha = undefined; // file may not exist
  }

  await axios.put(
    `https://api.github.com/repos/${fullName}/contents/README.md`,
    {
      message: "docs: update README via RepoScribe",
      content: encoded,
      sha,
    },
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    },
  );

  console.log("✅ README updated on GitHub");
};

module.exports = { commitReadme };
