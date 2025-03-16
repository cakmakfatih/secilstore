import Aside from './Aside';
import Main from './Main';

export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row flex-1">
      <Aside />
      <Main>{children}</Main>
    </div>
  );
}
