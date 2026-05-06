export class AuthResponseDto {
  accessToken: string;
  user: UserDto;
}

export class UserDto {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
