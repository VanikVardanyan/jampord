export type TourFormData = {
  name: string;
  phone: string;
  avatar?: string;
};

export type TouristFormProps = {
  submitHandler: (data: TourFormData) => void;
  onBack?: () => void;
  defaultValues?: TourFormData;
};

export const defaultValuesForm = {
  name: "",
  phone: "",
  avatar: "",
};
