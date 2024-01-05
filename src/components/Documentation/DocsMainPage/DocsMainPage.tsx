import { GraphQLSchema } from 'models/GraphQLSchema.interface';
import { useLocalization } from 'shared/context/LocalizationContext';
import GraphQLMethod from 'shared/enums/GraphQLMethod';

import DocsTypeButton from '../DocsTypeButton/DocsTypeButton';

import style from '../Documentation.module.scss';

interface DocsMainProps {
  schema: GraphQLSchema;
}

function DocsMain(props: DocsMainProps) {
  const { schema } = props;

  const queryEntryObject = schema.data.__schema.types.find(
    (type) => type.name === schema.data.__schema.queryType?.name
  );
  const mutationEntryObject = schema.data.__schema.types.find(
    (type) => type.name === schema.data.__schema.mutationType?.name
  );
  const subscriptionEntryObject = schema.data.__schema.types.find(
    (type) => type.name === schema.data.__schema.subscriptionType?.name
  );

  const { t } = useLocalization();

  return (
    <div>
      <div className={style.docs__content}>
        <div className={style.docs__returnBtn_wrapper}>
          <a
            href="https://graphql.org/learn/#:~:text=GraphQL%20is%20a%20query%20language,your%20existing%20code%20and%20data"
            target="blank"
            className={style.docs__returnBtn}
          >
            {t('documentation.info-btn')}
          </a>
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
