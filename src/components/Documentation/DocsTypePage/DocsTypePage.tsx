import { useActions } from 'hooks/redux-hooks';

import { GraphQLSchema, SchemaFullType } from 'models/GraphQLSchema.interface';
import { useLocalization } from 'shared/context/LocalizationContext';
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
  const { t } = useLocalization();

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

  const typeFields = takenTypeByFields?.fields
    ? takenTypeByFields?.fields
    : takenTypeByFields?.inputFields;
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
          &lt;&lt; {t('documentation.return-btn')}
        </button>
      </div>
      <div className={style.docs__description_title}>
        <span>Type </span>
        <span className={style.docs__description_title_cyan}>{type}</span>
      </div>
      {takenTypeByArgs?.description ? (
        <p className={style.docs__description}>
          {takenTypeByArgs?.description}
        </p>
      ) : (
        <p className={style.docs__description}>
          {takenTypeByFields?.description}
        </p>
      )}
      {typeArgs && typeArgs.length > 0 && (
        <div className={style.docs__typesWrapper}>
          <span className={style.docs__typeName}>{page} </span>
          <span>&#40;</span>
          <div className={style.docs__argsList}>
            {typeArgs?.map((arg) => (
              <DocsTypeButton key={arg.name} field={arg} method={method} />
            ))}
          </div>
          <p>&#41; &#123;</p>
        </div>
      )}
      {(!typeArgs || typeArgs.length < 1) && typeFields && (
        <div className={style.docs__typesWrapper}>
          <p>{page} &#123;</p>
        </div>
      )}
      {typeFields && typeFields?.length > 0 && (
        <>
          <div className={style.docs__typesList}>
            {typeFields?.map((type) => (
              <DocsTypeButton key={type.name} field={type} method={method} />
            ))}
          </div>
          <p className={style.docs__argsList}>&#125;</p>
        </>
      )}
    </>
  );
}

export default DocsTypePage;
