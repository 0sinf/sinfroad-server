import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  isValidPassword(passwordInput: string) {
    // TODO: Need to encrypt by bcrypt
    return this.password === passwordInput;
  }
}
