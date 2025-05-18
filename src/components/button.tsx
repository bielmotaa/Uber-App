import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { colors } from "../styles/colors";
import { ReactDOM } from "react";

type ButtonProps = TouchableOpacityProps & {
    title: string;
    color?: 'WHITE',
    isLoadign?: boolean;
    children?: ReactDOM;
}

export function Button({ title, color, isLoadign = false, children, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity className="w-full"{...rest}>
            <View className={`h-16 justify-center items-center rounded-xl ${color === 'WHITE' ? 'bg-white rounded-xl' : 'bg-COLORS-BRAND_MID'}`}>
                {isLoadign
                    ?
                    <ActivityIndicator color={colors.COLORS.WHITE} />
                    :
                    <Text className={`font-semibold ${color === 'WHITE' ? 'text-COLORS-BRAND_MID' : 'text-emerald-50'}`}>{title}</Text>
                }
                {children}
            </View>
        </TouchableOpacity>
    )
}

