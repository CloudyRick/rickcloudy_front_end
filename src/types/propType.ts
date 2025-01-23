export interface IElementProps {
  isAuthenticated: boolean;
}

export interface FormInputProps {
  inputLabel: string;
  labelFor: string;
  inputType: string;
  inputId: string;
  inputName: string;
  placeholderText: string;
  required: boolean;
  options?: { value: string; label: string }[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export interface ImageProp {
  id: number;
  blogPostId: number;
  imageUrl: string;
  alt: string;
  caption: string;
  credit: string;
  imageType: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
