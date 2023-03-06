import { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface StudentDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const StudentSchema = new Schema<StudentDocument>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// Hash the password before saving
StudentSchema.pre<StudentDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err: any) {
    return next(err);
  }
});

// Compare the given password with the password hash
StudentSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return false;
  }
};

export const Student = model<StudentDocument>("Student", StudentSchema);
