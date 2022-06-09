import { List, ListSubheader, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';
import { SidebarItem } from './sidebar-item';

type NavItemProps = {
  depth?: number;
  items: Array<{
    title: string;
    path: string;
    chip?: ReactNode;
    info?: string;
    icon?: ReactNode;
    roles?: Array<string>;
    children?: any;
  }>;
  path: string;
  acc?: any[];
};

const renderNavItems = ({ depth = 0, items, path }: NavItemProps) => (
  <List disablePadding>
    {items.reduce(
      (acc: any, item) => reduceChildRoutes({ acc, depth, item, path }),
      []
    )}
  </List>
);

const reduceChildRoutes = ({
  acc,
  depth,
  item,
  path,
}: {
  acc: any[];
  depth: number;
  item: {
    title: string;
    path: string;
    chip?: ReactNode;
    info?: string;
    icon?: ReactNode;
    roles?: Array<string>;
    children?: any;
  };
  path: string;
}) => {
  const { title, chip, icon, info, children } = item;
  const key = `${title}-${depth}`;
  const partialMatch = item.path ? path.includes(item.path) : false;
  const exactMatch = path.split('?')[0] === item.path;

  if (children) {
    acc.push(
      <SidebarItem
        active={partialMatch}
        title={title}
        path={item.path}
        icon={icon}
        chip={chip}
        info={info}
        key={key}
        depth={depth}
      >
        {renderNavItems({
          depth: depth + 1,
          items: item.children,
          path,
        })}
      </SidebarItem>
    );
  } else {
    acc.push(
      <SidebarItem
        active={exactMatch}
        title={title}
        path={item.path}
        key={key}
        chip={chip}
        icon={icon}
        info={info}
        depth={depth}
      />
    );
  }
  return acc;
};

type SidebarSectionProps = {
  items: Array<{
    title: string;
    path: string;
    chip?: ReactNode;
    info?: string;
    icon?: ReactNode;
    roles?: Array<string>;
    children?: any;
  }>;
  path: string;
  title: string;
  sx?: SxProps<Theme>;
};
export const SidebarSection = (props: SidebarSectionProps) => {
  const { items, path, title } = props;
  return (
    <List
      subheader={
        <ListSubheader
          disableGutters
          disableSticky
          sx={{
            color: 'neutral.500',
            fontSize: '0.75rem',
            fontWeight: 700,
            lineHeight: 2.5,
            ml: 4,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </ListSubheader>
      }
    >
      {renderNavItems({
        items,
        path,
      })}
    </List>
  );
};
