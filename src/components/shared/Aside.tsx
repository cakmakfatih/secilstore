import { ReactNode, useMemo } from 'react';
import Icon, { IconData } from './Icon';

const AsideItem = ({
  isActive = false,
  children,
  icon,
}: {
  children: ReactNode;
  isActive?: boolean;
  icon: IconData;
}) => {
  const styles = useMemo(
    () =>
      [
        'flex py-2 my-1 rounded-sm px-2 cursor-pointer hover:bg-gray-100 duration-150',
        isActive && 'border hover:!bg-transparent !cursor-default',
      ].join(' '),
    [isActive]
  );
  return (
    <div className={styles}>
      <Icon icon={icon} />
      <span className="text-subheading ml-2">{children}</span>
    </div>
  );
};

export default function Aside() {
  return (
    <aside className="w-[256px] px-3 flex flex-col border rounded-md border-color-form m-2">
      <section className="px-2 mt-6">
        <span className="text-subheading capitalize">MENÜ</span>
        <nav className="mt-1 ml-2 flex flex-col items-stretch">
          <AsideItem icon={IconData.Dashboard}>Dashboard</AsideItem>
          <AsideItem icon={IconData.Products}>Ürünler</AsideItem>
        </nav>
      </section>
      <section className="px-2 mt-6">
        <span className="text-subheading capitalize">Satış</span>
        <nav className="mt-1 ml-2 flex flex-col items-stretch">
          <AsideItem isActive={true} icon={IconData.Collection}>
            Koleksiyon
          </AsideItem>
        </nav>
      </section>
    </aside>
  );
}
