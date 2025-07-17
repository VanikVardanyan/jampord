import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AppRoutes/AuthContext";
import { CreateTourForm } from "@/components/create-tour-form";
import { useCreateTourMutation } from "@/store/tour/api";
import { toast } from "react-toastify";
import { ROUTES } from "@/routes";
import { TourFormData } from "@/components/create-tour-form/types";

export const CreateTour = () => {
  const { user } = useAuth();
  const [createTour] = useCreateTourMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: TourFormData) => {
    if (!user) {
      toast.error("Մուտք գործեք համակարգ");
      return;
    }

    try {
      const tourId = uuidv4();

      const newTour = {
        name: data.name,
        description: data.description,
        price: data.price,
        startDate: data.startDate,
        endDate: data.endDate,
        image: data.image,
        createdBy: user.uid,
      };
      await createTour({ tourId, data: newTour }).unwrap();
      toast.success("Տուրը հաջողությամբ ստեղծվեց");
      navigate(ROUTES.profile);
    } catch (error) {
      console.error("Ошибка при создании тура:", error);
      toast.error("Սխալ ստեղծելու ժամանակ");
    }
  };
  return <CreateTourForm successCallback={onSubmit} />;
};
