import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';

const LogoutButton: React.FC = () => {
    const { logout, isAuthenticated } = useAuth0();

    const handleLogout = () => {
        logout({ returnTo: window.location.origin } as any);
    };

    if(isAuthenticated){
        return (
            <span className='flex font-semibold text-lg'>
                <Button onClick={handleLogout} variant="destructive" className='transition ease-in-out delay-150 bg-red-100 hover:-translate-y-1 hover:scale-110 hover:bg-red-200 duration-300 text-black text-lg font-semibold underline decoration-slate-600'>
                    Logout
                </Button> 
            </span>
        );
    };
}
export default LogoutButton;
