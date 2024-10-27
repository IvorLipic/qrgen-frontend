import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HomeButton: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    return (
        <span>
            <Button onClick={handleClick} variant='secondary' className='transition ease-in-out delay-150 bg-zinc-200 hover:-translate-y-1 hover:scale-110 hover:bg-zinc-300 duration-300 text-lg font-semibold underline decoration-slate-600'>
                Home
            </Button> 
        </span>
    );
};
export default HomeButton;