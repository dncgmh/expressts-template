import { DocumentType, getModelForClass, ModelOptions, Pre, Prop } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true }
  }
})
@Pre<DocumentType<User>>('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = this.generateHash(this.password);
    this.password = hash;
  }
  return next();
})
export class User {
  @Prop({ unique: true, type: String, lowercase: true, index: true, trim: true })
  username: string;

  @Prop({ type: String, lowercase: true, index: true })
  email: string;

  @Prop({ type: String })
  password?: string;

  generateHash(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  transform(this: DocumentType<User>) {
    const { password, ...transformed } = this.toObject();
    return transformed;
  }
}

export const userModel = getModelForClass(User);
export type UserDocument = DocumentType<User>;
