"use server"

export const verifyOTP = async (id: string, code: string) => {
    try {
        const response = await fetch(process.env.BASE_API + `/otps/verify/${id}`, {
            method: "POST",
            headers:{
                "Content-type":"application/json",
            },
            body: JSON.stringify({ code }),
        });
        const responseData=await response.json()
        return responseData
    } catch (error) {
        console.log(error);
        return {error:error}
    }
};
