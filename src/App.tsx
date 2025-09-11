import "./App.css"
import { ChangeEvent, useState } from "react";
import HTTP from "./components/HTTP";
import Header from "./components/page/Header";

export default function App() {
  const [url, setUrl] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const handleConfirm = (): void => {
    if (url.trim()) {
      setIsConfirmed(true);
    }
  };

  const handleEdit = (): void => {
    setIsConfirmed(false);
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.target.value);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header/>
      asdasdasd
    </main>
  );
}