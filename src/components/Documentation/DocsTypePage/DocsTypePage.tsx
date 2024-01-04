import { useActions } from 'hooks/redux-hooks';

import { GraphQLSchema, SchemaFullType } from 'models/GraphQLSchema.interface';
import GraphQLMethod from 'shared/enums/GraphQLMethod';

import DocsTypeButton from '../DocsTypeButton/DocsTypeButton';

import style from '../Documentation.module.scss';

interface DocsTypePageProps {
  schema: GraphQLSchema;
  page: string;
  type: string;
  method: GraphQLMethod;
}

function DocsTypePage(props: DocsTypePageProps) {
  const { schema, page, type, method } = props;
  const { setDocsTargetName, setDocsTargetType } = useActions();

  let entryObject: SchemaFullType | undefined;
  switch (method) {
    case GraphQLMethod.Mutation:
      entryObject = schema.data.__schema.types.find(
        (type) =>
          type.name.toLowerCase() === GraphQLMethod.Mutation.toLowerCase()
      );
      break;
    case GraphQLMethod.Subscription:
      entryObject = schema.data.__schema.types.find(
        (type) =>
          type.name.toLowerCase() === GraphQLMethod.Subscription.toLowerCase()
      );
      break;
    default:
      entryObject = schema.data.__schema.types.find(
        (type) => type.name.toLowerCase() === GraphQLMethod.Query.toLowerCase()
      );
  }

  const takenTypeByFields = schema.data.__schema.types.find(
    (takenType) => takenType.name.toLowerCase() === type.toLowerCase()
  );
  const takenTypeByArgs = entryObject?.fields.find(
    (type) => type.name.toLowerCase() === page.toLowerCase()
  );

  const typeFields = takenTypeByFields?.fields;
  const typeArgs = takenTypeByArgs?.args;

  const handleReturn = () => {
    setDocsTargetName('index');
    setDocsTargetType('');
  };

  return (
    <>
      <div className={style.docs__returnBtn_wrapper}>
        <button
          type="button"
          onClick={handleReturn}
          className={style.docs__returnBtn}
        >
          &lt;&lt; return
        </button>
      </div>
      <p className={style.docs__description}>{takenTypeByArgs?.description}</p>
      {typeArgs && typeArgs?.length > 0 && <p>{page}(</p>}
      {typeArgs && typeArgs?.length > 0 && (
        <>
          <p>Arguments:</p>
          {typeArgs?.map((arg) => (
            <DocsTypeButton key={arg.name} field={arg} method={method} />
          ))}
        </>
      )}
      {typeFields && typeFields?.length > 0 && (
        <>
          <p>Types:</p>
          {typeFields?.map((type) => (
            <DocsTypeButton key={type.name} field={type} method={method} />
          ))}
        </>
      )}
      {!typeFields && takenTypeByFields && (
        <p>{takenTypeByFields.description}</p>
      )}
    </>
  );
}

export default DocsTypePage;
