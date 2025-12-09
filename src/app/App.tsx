import Collections from '../components/sections/Collections';
import Header from '../components/sections/Header';
import Request from '../components/sections/Request';
import Response from '../components/sections/Response';
import Alert from '../components/ui/Alert';

export default function App() {
    return (
        <main className="max-h-dvh max-w-dvw flex flex-col">
            <Header />

            <section className='h-full w-full flex'>
                <Collections />

                <div className="flex flex-1">
                    <Request />
                    <Response />
                </div>
            </section>

            <Alert />
        </main>
    );
}
