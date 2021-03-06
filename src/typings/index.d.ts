interface ISidebarAppRoute extends IAppRoute {
  icon: ((...args: any[]) => JSX.Element) | string;
}

interface IAppRoute {
  path: string;
  name: string;
  component: (...args: any[]) => JSX.Element;
}

interface MenuItem {
  content: JSX.Element | string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

interface ModalButton {
  content: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  shouldKeepModal?: boolean;
}

interface SelectOption {
  value: number;
  label: string;
}
