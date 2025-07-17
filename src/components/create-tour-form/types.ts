export type TourFormData = {
  name: string;
  description: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  image?: FileList;
};

export type TourFormProps = {
  defaultValues?: TourFormData;
  successCallback: (data: TourFormData) => void;
};

export const defaultValuesForm = {
  name: "",
  description: "",
  price: undefined,
  startDate: undefined,
  endDate: undefined,
  image: undefined,
};
