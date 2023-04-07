import { useContext } from "react";
import { FormsContext } from "../contexts/FormsContext";

export const useService = (serviceFactory) => {
    const { token } = useContext(FormsContext);

    const service = serviceFactory(token);

    return service;
};