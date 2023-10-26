export type CreateBonsaiParams = {
  name: string;

  price: number;

  descr: string | null;

  img_path_1: string | null;

  img_path_2: string | null;

  img_path_3: string | null;

  category: string;

  level: string;

  in_stock: boolean;
};

export type LoginUserParams = {
  email: string;
  password: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type JwtPayload = {
  email: string;
};
