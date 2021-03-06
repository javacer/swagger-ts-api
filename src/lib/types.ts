// Interfaces that come from swagger

export interface SwaggerSchemaProperty {
  type: string | string[];
  format?: string;
  enum?: string;
  items?: SwaggerSchemaProperty;
  properties?: {[key: string]: SwaggerSchemaProperty};
  required?: string[];
  'x-metadata'?: {
    schema?: string,
  };
}

export interface SwaggerSchema {
  additionalProperties: boolean;
  oneOf?: [SwaggerSchema];
  properties?: {[key: string]: SwaggerSchemaProperty};
  required?: string[];
  type: string;
  'x-metadata'?: {
    schema?: string,
  };
}

export interface SwaggerMethod {
  description?: string;
  summary?: string;
  tags?: string[];
  'x-metadata': {
    method?: string,
  };

  requestBody?: {
    content?: {
      'application/json'?: {
        schema: SwaggerSchema,
      },
      'multipart/mixed'?: {
        schema: SwaggerSchema,
      },
    },
  };
  responses: {
    '200'?: {
      content?: {
        'application/json'?: {
          schema: SwaggerSchema,
        },
        'image/png'?: {},
        'image/jpeg'?: {},
        '*/*'?: {},
      },
    },
  };
}

export interface SwaggerPath {
  get?: SwaggerMethod;
  post?: SwaggerMethod;
  put?: SwaggerMethod;
  delete?: SwaggerMethod;
}

export  interface SwaggerPaths {
  [key: string]: SwaggerPath;
}

// Inner properties
export enum BasicType {

    // SimpleTypes
    NULL = 'null',
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    DATE = 'DateOnly',
    DATETIME = 'DateTime',
    DURATION = 'Duration',
    HOSTNAME = 'Hostname',
    EMAIL = 'Email',
    PERMIT = 'Permit',
    FOLDERTYPE = 'FolderType',
    INVITATIONSTATUS = 'InvitationStatus',
    JSON = 'JSON',
    MODELTYPE = 'ModelType',
    MODELID = 'ModelId',
    BLOB = 'Blob',
    UUID = 'UUID',

    // Specific types
    ARRAY = 'array',
    OBJECT = 'object',
    ENUM = 'enum',
    LINK = 'link',
    ERROR = 'error',
}

export interface PropertyBasicType {
  basicType: BasicType;
}

export interface ArrayType extends PropertyBasicType {
  arrayType: PropertyType;
}

export interface EnumType extends PropertyBasicType {
  values: string[];
}

export interface ObjectType extends PropertyBasicType {
  properties: {[key: string]: ObjectProperty};
}

export interface LinkType extends PropertyBasicType {
  linkTo: string;
}

export interface ErrorType extends PropertyBasicType {
  error: string;
}

export type PropertyType = PropertyBasicType | ArrayType | EnumType | ObjectType | LinkType | ErrorType;


export interface ObjectProperty {
  name: string;
  isRequired: boolean;
  types: PropertyType[];
}

export interface Schema {
  name: string;
  properties: {[key: string]: ObjectProperty};
}

export interface AllSchemas {
  [key: string]: Schema;
}

export type HttpMethods = 'get' | 'post' | 'put' | 'delete';

export interface Method {
  name: string;
  tag: string;
  url: string;
  method: HttpMethods;
  description: string;
  summary: string;
  request: Schema | Schema[] | null;
  form: Schema | null;
  response: Schema | Schema[] | 'link' | null;
}

// Methods are grouped by a tag (key === tag)
export interface Paths {
  [key: string]: Method[];
}

export function isEmptyModel(schema: Schema | any) {
  return !schema || (Object(schema) === schema && Object.keys(schema.properties).length === 0);
}
