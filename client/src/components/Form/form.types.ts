interface CommonInputProps {
  labelText: string;
  disabled?: boolean;
  required?: boolean;
}

export interface NameAndId {
  nameAndId: string;
}

export interface ValuedInputProps extends CommonInputProps {
  value?: any;
  handleInput: (value: any) => void;
}

export interface CheckedInputProps extends CommonInputProps {
  id: string;
  checked?: boolean;
  handleInput: (checked: boolean) => void;
}