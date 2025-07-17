import * as yup from "yup";

export const ClassicTourRequestSchema = yup.object({
  peopleCount: yup.number().min(1, "Առնվազն մեկ մարդ").required("Մարդկանց քանակը պարտադիր է"),

  country: yup.string().optional(),
  city: yup.string().when("country", {
    is: (val: string) => val && val.length > 0,
    then: (schema) => schema.required("Եթե նշված է երկիրը, ապա քաղաքը պարտադիր է"),
    otherwise: (schema) => schema.optional(),
  }),

  description: yup.string().required("Նկարագրությունը պարտադիր է"),

  budget: yup.number().optional(),

  withAnimals: yup.boolean().default(false),

  preferredDate: yup.string().required("Նախընտրելի ամսաթիվը պարտադիր է"),

  daysCount: yup.number().required("Օրերի քանակը պարտադիր է"),

  visaDeniedBefore: yup.boolean().default(false),

  childrenCount: yup.number().min(0, "Չի կարող լինել բացասական").default(0),
});

export type ClassicTourRequestFormData = yup.InferType<typeof ClassicTourRequestSchema>;
