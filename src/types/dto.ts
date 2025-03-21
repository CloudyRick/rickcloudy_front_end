export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface BlogDTO {
  success: boolean;
  data: {
    id: number;
    title: string;
    content: string;
    authorId: number;
    blogStatus: string;
    images?: {
      imageUrl: string;
      imageKey: string;
    }[];
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  authorId: number;
  blogStatus: string;
  images?: {
    imageUrl: string;
    imageKey: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ImageDTO {
  success: boolean;
  data: {
    url: string;
    key: string;
  }[];
  message: string;
}

export interface ServerError {
  response: {
    status: number;
    message: string;
  };
}
