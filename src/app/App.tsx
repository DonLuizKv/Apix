import Header from '../components/sections/Header';
import Request from '../components/sections/Request';
import Response from '../components/sections/Response';

export default function App() {
    return (
        <main className="h-dvh w-dvw flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Request />
                <Response />
            </div>
        </main>
    );
}
