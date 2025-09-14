import "./App.css"
import Header from "./components/page/Header";
import Client from "./components/page/Client";
import Ouput from "./components/page/Ouput";
import { RequestProvider } from "./hooks/useRequest";

export default function App() {
  // const [url, setUrl] = useState<string>("");
  // const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // const handleConfirm = (): void => {
  //   if (url.trim()) {
  //     setIsConfirmed(true);
  //   }
  // };

  // const handleEdit = (): void => {
  //   setIsConfirmed(false);
  // };

  // const handleUrlChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setUrl(e.target.value);
  // };

  return (
    <RequestProvider>
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex gap-2 flex-1">
          <Client />
          <Ouput />
        </div>
      </main>
    </RequestProvider>
  );
}