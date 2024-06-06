import mongoose, { Schema } from "mongoose";

const userSettingsSchema = new Schema(
  {
    model: {
      type: String,
      default: "gpt-3.5-turbo",
    },
    outputLength: {
      type: Number,
      default: 512,
    },
    temperature: {
      type: Number,
      default: 0.7,
    },
    topP: {
      type: Number,
      default: 1.0,
    },
    topK: {
      type: Number,
      default: 50,
    },
    repetitionPenalty: {
      type: Number,
      default: 1.0,
    },
  },
  {
    timestamps: true,
  }
);

const UserSettings =
  mongoose.models.UserSettings ||
  mongoose.model("UserSettings", userSettingsSchema);

export default UserSettings;
