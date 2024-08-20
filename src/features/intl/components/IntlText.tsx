/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { useIntl } from '../hooks/useIntl';

type Message = string;
type IntlFunction = (message: Message) => import('react').ReactNode;
interface TranslateMessage {
  path: string;
  values?: Record<string, string | number | boolean | IntlFunction>;
}
interface IntlTextProps extends TranslateMessage {
  children?: (message: Message | React.ReactNode) => React.ReactNode;
}

const removeFunctionsFromValues = (
  values: Record<string, string | number | boolean | IntlFunction>
): Record<string, string | number | boolean> => {
  const newValues: Record<string, string | number | boolean> = {};
  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (typeof value !== 'function') {
      newValues[key] = value;
    }
  });
  return newValues;
};

export const IntlText: React.FC<IntlTextProps> = ({
  path,
  values,
  children,
}) => {
  const intl = useIntl();
  const filteredValues = values ? removeFunctionsFromValues(values) : undefined;
  const withFunctionalKeys =
    !!values &&
    !!Object.keys(values).filter((key) => typeof values[key] === 'function')
      .length;

  const translateMessageWithTags = (
    message: Message,
    values?: TranslateMessage['values']
  ): React.ReactNode => {
    if (!values) return message;

    const keys = Object.keys(values);
    const functionalKeys = keys.filter(
      (key) => typeof values[key] === 'function'
    );
    const [key, ...restKeys] = functionalKeys;
    const htmlRegex = new RegExp(`<${key}>(.*?)</${key}>`, 'gm');
    const [contentWithTag, content] = htmlRegex.exec(message) ?? [];

    if (!contentWithTag) return message;
    const messageParts: string[] = message.split(contentWithTag);
    const result = (values[key] as IntlFunction)(content);
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => restKeys.includes(key))
    );

    return (
      <>
        {messageParts.map((messagePart, index) => (
          <React.Fragment key={messagePart}>
            {!!index && result}
            {translateMessageWithTags(messagePart, filteredValues)}
          </React.Fragment>
        ))}
      </>
    );
  };

  if (withFunctionalKeys) {
    if (children && typeof children === 'function') {
      return (
        <>
          {children(
            translateMessageWithTags(
              intl.translateMessage(path, filteredValues),
              values
            )
          )}
        </>
      );
    }

    return (
      <>
        {translateMessageWithTags(
          intl.translateMessage(path, filteredValues),
          values
        )}
      </>
    );
  }

  if (children && typeof children === 'function') {
    return <>{children(intl.translateMessage(path, filteredValues))}</>;
  }

  return <>{intl.translateMessage(path, filteredValues)}</>;
};

// import React from 'react';
// import { useIntl } from '../hooks/useIntl';

// type IntlFunction = (message: string) => React.ReactNode;
// type MessageValues = Record<string, string | number | boolean | IntlFunction>;

// interface TranslateMessage {
//   path: string;
//   values?: MessageValues;
// }

// interface IntlTextProps extends TranslateMessage {
//   children?: (message: React.ReactNode) => React.ReactNode;
// }

// const processMessageWithFunctions = (
//   message: string,
//   values: MessageValues
// ): React.ReactNode => {
//   let processedMessage: React.ReactNode = message;

//   Object.keys(values).forEach((key) => {
//     const value = values[key];
//     if (typeof value === 'function') {
//       const regex = new RegExp(`<${key}>(.*?)</${key}>`, 'g');
//       processedMessage = message.split(regex).map((part, index) => {
//         if (index % 2 === 1) {
//           return (value as IntlFunction)(part);
//         }
//         return part;
//       });
//     }
//   });

//   return processedMessage;
// };

// const removeFunctionsFromValues = (values: MessageValues) => {
//   const newValues: Record<string, string | number | boolean> = {};
//   Object.keys(values).forEach((key) => {
//     const value = values[key];
//     if (typeof value !== 'function') {
//       newValues[key] = value;
//     }
//   });
//   return newValues;
// };

// export const IntlText: React.FC<IntlTextProps> = ({
//   path,
//   values,
//   children,
// }) => {
//   const { translateMessage } = useIntl();
//   const nonFunctionValues = values
//     ? removeFunctionsFromValues(values)
//     : undefined;
//   const translatedMessage = translateMessage(path, nonFunctionValues);

//   const processedMessage = values
//     ? processMessageWithFunctions(translatedMessage, values)
//     : translatedMessage;

//   if (children && typeof children === 'function') {
//     return <>{children(processedMessage)}</>;
//   }

//   return <>{processedMessage}</>;
// };
