import mongoose from "mongoose";
import { Password } from "../services/password";
import { UserDoc } from "../types/IUser";
import jwt from "jsonwebtoken";

// An interface that describes the properties required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Define the schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString(); // ✅ convert to string
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// Hash password before saving
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// JWT generator method
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id.toString(), email: this.email },
    process.env.JWT_KEY!,
    {
      expiresIn: 3600,
    }
  );
};

// Static builder method
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
