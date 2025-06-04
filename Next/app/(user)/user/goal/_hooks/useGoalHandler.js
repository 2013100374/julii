"use client";
import { useState } from "react";
import ENDPOINTS from "@/lib/endpoints";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { request } from "@/lib/helpers";

export default function useGoalHandler(setUserGoal) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        goal: "",
        days: "",
    };

 

    const handleSubmit = async (values, { resetForm }) => {

    
        if(!values?.goal){
            toast.error("Goal is required");
            return;
        }
        if(!values?.days){
            toast.error("Days is required");
            return;
        }

        setLoading(true);
        try {
            const { data } = await request.post(ENDPOINTS.SAVE_GOAL, values);
            if (data.status === "error") {
                toast.error(data.message || "An error occurred");
                return;
            }

            setUserGoal(data.data.user_goal);
            toast.success("Goal saved successfully");
            resetForm();
            
        } catch (error) {
            console.error("Error updating goal:", error);
            toast.error("An error occurred while updating your goal");
        } finally {
            setLoading(false);
        }
    };

    return { initialValues, handleSubmit, loading, setLoading };
}
