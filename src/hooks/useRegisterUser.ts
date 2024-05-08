import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from "@/api/auth";



export interface DataRegisterType {
    name: string
    email: string
    password: string
}

export const useRegisterUser = () => {
    const [error, setError] = useState<string> ();
    const navigate = useNavigate();

    const handleRegister = async (data: DataRegisterType) => {
        try {
            await registerUser(data);
            navigate("/login");
        } catch (error:any) {
            if(error){
                setError(error.message);
            }

        }
    };

    return {error, handleRegister};
};