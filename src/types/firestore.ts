export type FirestoreField =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { mapValue: { fields: Record<string, FirestoreField> } }
  | { arrayValue: { values: FirestoreField[] } }
  | { nullValue: "NULL_VALUE" }
  | { timestampValue: string };

export type FirestoreDocument = {
  name: string;
  fields: Record<string, FirestoreField>;
};

export type FirestoreSingleDocument = {
  name: string;
  fields: Record<string, FirestoreField>;
};
