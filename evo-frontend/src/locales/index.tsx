import type { FC } from 'react';
import type { MessageDescriptor } from 'react-intl';

import { FormattedMessage, useIntl } from 'react-intl';

import en_US from './en-US';
import vi_VN from './vi-VN';

export const localeConfig = {
  en_US: en_US,
  vi_VN: vi_VN,
};

type Id = keyof typeof en_US;

interface Props extends MessageDescriptor {
  id: Id;
}

export const LocaleFormatter: FC<Props> = ({ ...props }) => {
  const notChildProps = { ...props, children: undefined };

  return <FormattedMessage {...notChildProps} id={props.id} />;
};

type FormatMessageProps = (descriptor: Props) => string;

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  const formatMessage: FormatMessageProps = _formatMessage;

  return {
    ...rest,
    formatMessage,
  };
};
