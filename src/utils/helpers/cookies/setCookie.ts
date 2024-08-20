/* eslint-disable guard-for-in */
/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable guard-for-in */
// /* eslint-disable prefer-template */
// /* eslint-disable no-restricted-syntax */
export const setCookie = (
  name: string,
  value: string | number | boolean | null,
  props: any = {}
) => {
  // Создаем объект для хранения опций cookie
  const cookieOptions: any = props;

  // Если срок действия cookie указан в секундах, преобразуем его в дату
  if (typeof props.expires === 'number' && props.expires) {
    const date = new Date();
    date.setTime(date.getTime() + props.expires * 1000);
    cookieOptions.expires = date.toUTCString();
  }

  // Если срок действия cookie указан в формате даты, используем его
  if (props.expires && props.expires.toUTCString) {
    cookieOptions.expires = props.expires.toUTCString();
  }

  // Кодируем значение cookie
  const cookieValue = value ? encodeURIComponent(value as string) : null;
  // eslint-disable-next-line prefer-template
  let updatedCookie = name + '=' + cookieValue;

  // Добавляем остальные опции cookie
  for (const propName in cookieOptions) {
    updatedCookie += '; ' + propName;

    const propValue = cookieOptions[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }

  // Устанавливаем cookie
  document.cookie = updatedCookie;
};

/* eslint-disable guard-for-in */
/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
// export const setCookie = (
//   name: string,
//   value: string | number | boolean | null,
//   props: any = {}
// ) => {
//   // Деструктуризация свойства expires из объекта props
//   let { expires } = props;

//   // Инициализируем строку обновленного cookie с именем и значением
//   let updatedCookie = `${name}=${encodeURIComponent(String(value))}`;

//   // Обрабатываем свойство истечения срока действия отдельно, если оно существует
//   if (expires) {
//     if (typeof expires === 'number') {
//       const date = new Date();
//       date.setTime(date.getTime() + expires * 1000);
//       expires = date.toUTCString();
//     } else if (expires.toUTCString) {
//       expires = expires.toUTCString();
//     }
//     updatedCookie += `; expires=${expires}`;
//   }

//   // Добавляем другие свойства к строке cookie
//   for (const propName in props) {
//     if (propName !== 'expires') {
//       updatedCookie += `; ${propName}`;
//       const propValue = props[propName];
//       if (propValue !== true) {
//         updatedCookie += `=${propValue}`;
//       }
//     }
//   }

//   // Устанавливаем cookie
//   document.cookie = updatedCookie;
// };
