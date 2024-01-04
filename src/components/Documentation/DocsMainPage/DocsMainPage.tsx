import { useActions } from 'hooks/redux-hooks';

import { GraphQLSchema } from 'models/GraphQLSchema.interface';
import GraphQLMethod from 'shared/enums/GraphQLMethod';

import DocsTypeButton from '../DocsTypeButton/DocsTypeButton';

import style from '../Documentation.module.scss';

interface DocsMainProps {
  schema: GraphQLSchema;
}

function DocsMain(props: DocsMainProps) {
  const { schema } = props;
  const { setDocsTargetName } = useActions();

  const queryEntryObject = schema.data.__schema.types.find(
    (type) => type.name === schema.data.__schema.queryType?.name
  );
  const mutationEntryObject = schema.data.__schema.types.find(
    (type) => type.name === schema.data.__schema.mutationType?.name
  );
  const subscriptionEntryObject = schema.data.__schema.types.find(
    (type) => type.name === schema.data.__schema.subscriptionType?.name
  );
  const handleInfo = () => {
    setDocsTargetName('index');
  };

  return (
    <div>
      <div className={style.docs__content}>
        <div className={style.docs__returnBtn_wrapper}>
          <button
            type="button"
            onClick={handleInfo}
            className={style.docs__returnBtn}
          >
            How it works?
          </button>
        </div>
        {queryEntryObject && (
          <>
            <h2 className={style.docs__subtitle}>QUERIES</h2>
            {queryEntryObject.fields.map((field) => (
              <DocsTypeButton
                field={field}
                key={field.name}
                method={GraphQLMethod.Query}
              />
            ))}
          </>
        )}
        {mutationEntryObject && (
          <>
            <h2>Mutations</h2>
            <span>{mutationEntryObject.description}</span>
            {mutationEntryObject.fields.map((field) => (
              <DocsTypeButton
                field={field}
                key={field.name}
                method={GraphQLMethod.Mutation}
              />
            ))}
          </>
        )}
        {subscriptionEntryObject && (
          <>
            <h2>Subscriptions</h2>
            <span>{subscriptionEntryObject.description}</span>
            {subscriptionEntryObject.fields.map((field) => (
              <DocsTypeButton
                field={field}
                key={field.name}
                method={GraphQLMethod.Subscription}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default DocsMain;
