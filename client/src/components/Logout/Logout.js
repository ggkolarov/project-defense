import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { FormsContext } from "../../contexts/FormsContext";

export const Logout = () => {
    const { onLogout } = useContext(FormsContext);

    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Navigate to="/" />;
};