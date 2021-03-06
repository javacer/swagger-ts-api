import { PropertyType, SwaggerSchemaProperty } from '../types';
import { getErrorType, PropertyProcessorContext } from '../schemaProcessor/schemaProperty';
import { ObjectTypeProcessor } from './objectTypeProcessor';
import { EnumTypeProcessor } from './enumTypeProcessor';
import { ArrayTypeProcessor } from './arrayTypeProcessor';
import { BasicTypeProcessor } from './basicTypeProcessor';
import { LinkTypeProcessor } from './linkTypeProcessor';
import { ModelTypeProcessor } from './modelTypeProcessor';

export interface TypeFactoryContext extends PropertyProcessorContext {
  propertyName: string;
  swaggerSchemaProperty: SwaggerSchemaProperty;
  typeFactory: TypeFactory;
}

export class TypeFactory {
  constructor(protected typeProcessors: TypeProcessor[]) {}

  translateType(swaggerSchemaProperty: SwaggerSchemaProperty, typeName: string, ctx: TypeProcessorContext) {
    for (const processor of this.typeProcessors) {
      const result = processor.consume(swaggerSchemaProperty, typeName, ctx);
      if (result) {
        return result;
      }
    }
    ctx.hasErrors = true;
    return getErrorType(`Unknown type or property ${JSON.stringify(swaggerSchemaProperty)} ${typeName}`);
  }
}

export type TypeProcessorContext = TypeFactoryContext;

export interface TypeProcessor {
  consume: (
        swaggerSchemaProperty: SwaggerSchemaProperty,
        typeName: string,
        ctx: TypeProcessorContext,
    ) => PropertyType | null;
}

export const defaultTypeProcessors = [
  new ModelTypeProcessor(),
  new LinkTypeProcessor(),
  new ObjectTypeProcessor(),
  new EnumTypeProcessor(),
  new ArrayTypeProcessor(),
  new BasicTypeProcessor(),
];
