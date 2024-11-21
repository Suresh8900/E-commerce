import { Bars } from 'react-loader-spinner';

const Loader = () => (
    <div className="flex justify-center h-screen items-center">
        <Bars color="#CF4144" height={20} width={20} className="text-center" />
    </div>
);
export default Loader;