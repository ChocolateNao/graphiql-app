export interface GraphQLSchema {
  data: {
    __schema: {
      directives: {
        name: string;
        description: string;
        args: SchemaInputValue[] | null;
      };
      queryType: SchemaFullType | null;
      mutationType: SchemaFullType | null;
      subscriptionType: SchemaFullType | null;
      types: SchemaFullType[];
    };
  };
}
interface SchemaFullType {
  name: string;
  kind: string;
  description: string;
  possibleTypes: SchemaTypeRef[] | null;
  interfaces: SchemaTypeRef[] | null;
  inputFields: SchemaInputValue[] | null;
  enumValues: SchemaEnumValue | null;
  fields: SchemaField[];
}
interface SchemaField {
  name: string;
  description: string;
  args: SchemaInputValue[] | null;
  type: SchemaTypeRef[] | null;
  isDeprecated: boolean;
  deprecationReason: string;
}
interface SchemaTypeRef {
  kind: string;
  name: string;
  ofType: {
    kind: string;
    name: string;
    ofType: {
      kind: string;
      name: string;
      ofType: {
        kind: string;
        name: string;
      };
    };
  };
}
interface SchemaInputValue {
  name: string;
  description: string;
  defaultValue: string;
  type: SchemaTypeRef[] | null;
}
interface SchemaEnumValue {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: string | null;
}