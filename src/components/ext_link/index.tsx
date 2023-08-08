import React from 'react';
import classnames from 'classnames';
import { getExternalExplorerLink } from '@utils/go_to_page';
import { useStyles } from './styles';

const ExtLink: React.FC<{
  className?: string;
  address: string;
  name?: string;
  explorer?: string;
}> = ({
  className, address, name, explorer = 'blockscout',
}) => {
  const classes = useStyles();

  const repr = name || address;

  return (
    <a
      target="_blank"
      href={getExternalExplorerLink(explorer, 'address', address)}
      rel="noopener noreferrer"
      className={classnames(className, classes.root)}
    >
      {repr}
    </a>
  );
};

export default ExtLink;
