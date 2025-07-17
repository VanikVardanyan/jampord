import { FirestoreField } from "../../types";

export const mapProfileDataToFirestoreFields = (data: object): Record<string, FirestoreField> => {
  const fields: Record<string, FirestoreField> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      fields[key] = { stringValue: value };
    } else if (typeof value === "object" && value !== null) {
      fields[key] = {
        mapValue: {
          fields: mapProfileDataToFirestoreFields(value as Record<string, unknown>),
        },
      };
    }
  }

  return fields;
};

export const mapFirestoreFieldsToProfileData = (fields: Record<string, FirestoreField>): Record<string, unknown> => {
  const data: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(fields)) {
    if ("stringValue" in value) {
      data[key] = value.stringValue;
    } else if ("mapValue" in value && value.mapValue.fields) {
      data[key] = mapFirestoreFieldsToProfileData(value.mapValue.fields);
    }
  }

  return data;
};
