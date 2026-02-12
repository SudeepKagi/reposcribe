const mongoose = require("mongoose");

const repoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    repoId: Number,
    name: String,
    fullName: String,
    defaultBranch: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Repo", repoSchema);
