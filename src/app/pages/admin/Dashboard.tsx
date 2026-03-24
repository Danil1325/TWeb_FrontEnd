import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { DashboardOverview } from '../../Components/dashboard/DashboardOverview';

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [navigate]);

    return <DashboardOverview />;
};
