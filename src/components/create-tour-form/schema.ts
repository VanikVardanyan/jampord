import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Անունը պարտադիր է"),
  description: yup.string().required("Նկարագրությունը պարտադիր է"),
  price: yup.number(),
  date: yup.string(),
  image: yup.mixed(),
});
