import Header from '../components/sections/Header';
import Request from '../components/sections/Request';
import Response from '../components/sections/Response';
import Alert from '../components/ui/Alert';

export default function App() {
    return (
        <main className="h-dvh w-dvw flex flex-col">
            <Header />
            <div className="flex flex-1 max-sm:flex-col">
                <Request />
                <Response />
            </div>
            <Alert />
        </main>
    );
}
