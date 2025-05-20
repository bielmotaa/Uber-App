import { Redirect } from "expo-router";
import { useUserStore } from "../store/user-storage";

export default function Index() {
    const { user } = useUserStore()


    if (user?.token) {
        console.log("logado")
    }

    return <Redirect href={'/(sign-in)'} />
}
