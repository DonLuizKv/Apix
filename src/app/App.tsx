import Collections from '../components/sections/Collections';
import Header from '../components/sections/Header';
import Request from '../components/sections/Request';
import Response from '../components/sections/Response';
import Alert from '../components/ui/Alert';

export default function App() {
    return (
        <main className="h-dvh w-full flex flex-col overflow-hidden">
            <Header />

            <section className='flex flex-1 min-h-0'>
                {/* <Collections /> */}

                <div className="flex flex-1 max-sm:flex-col">
                    <Request />
                    <Response />
                </div>
            </section>

            <Alert />
        </main>
    );
}
