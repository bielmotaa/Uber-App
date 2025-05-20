import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';


import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin'
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from '@env';
import { UseUserRepository } from '../../database/repository/user-repository';
import { supabase } from '../../utils/supabase';
import { Button } from '../../components/button';
import { useUserStore } from '../../store/user-storage';



//aqui nesse GoogleSignin.configure() é onde vou colocar as credenciais do meu app que vou usar q definir no escope do google
GoogleSignin.configure({
    scopes: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/drive.readonly'
    ],
    webClientId: WEB_CLIENT_ID, // esse é o id do cliente web que eu peguei no google cloud e coloquei nas variaveis de ambiente
    iosClientId: IOS_CLIENT_ID
})

/* GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access). Required to get the `idToken` on the user object!
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
        profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
      });
*/



export default function Index() {

    const [isAuthenticating, setIsAuthenticating] = useState(false); //saber quando o usuario ta autenticando pra eu colocar o loading no botao
    const { create, findAll } = UseUserRepository();
    const useRepository = UseUserRepository()
    const user = useUserStore()
    async function handleGoogleSignIn() {
        try {
            setIsAuthenticating(true);

            // const response = await GoogleSignin.signIn();
            //if (response.data?.idToken) { //vou pegar esse token verificar se ele existe pra mandar pro meu backend mongoatas 
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //console.log(JSON.stringify(userInfo, null, 2));

            if (userInfo.data?.idToken) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                    provider: 'google',
                    token: userInfo.data.idToken
                })

            } else {
                throw new Error('No id token found');
            }
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }
    return (
        <View className="flex-1">
            <Image
                className="absolute w-full h-full"
                source={require('../../assets/background.png')}
                resizeMode="cover"
            />
            <View className='flex-1 justify-center p-6 gap-14'>
                <View>
                    <Text className='text-4xl text-COLORS-BRAND_MID font-bold'>Flash Car</Text>
                    <Text className='text-xl text-white font-semibold opacity-50'>Venha dirigir com um aplicativo de cofiança</Text>
                </View>
                <Button title='Entrar com conta Google' isLoadign={isAuthenticating} onPress={handleGoogleSignIn} />

                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={async () => {
                        try {
                            await GoogleSignin.hasPlayServices();
                            const userInfo = await GoogleSignin.signIn();
                            console.log("dados: ", userInfo.data?.idToken)
                            if (userInfo.data?.idToken) {
                                user.save({
                                    token: userInfo.data.idToken,
                                    firstName: userInfo.data.user.familyName ?? '',
                                    lastName: userInfo.data.user.givenName ?? '',
                                    picture: userInfo.data.user.photo ?? '',
                                    email: userInfo.data.user.email ?? '',
                                });

                                await useRepository.create({
                                    token: userInfo.data.idToken,
                                    firstName: userInfo.data.user.familyName ?? '',
                                    lastName: userInfo.data.user.givenName ?? '',
                                    picture: userInfo.data.user.photo ?? '',
                                    email: userInfo.data.user.email ?? '',
                                    phone: ''
                                })
                            } else {
                                throw new Error('No id token found');
                            }
                        } catch (error: any) {
                            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                                // user cancelled the login flow
                            } else if (error.code === statusCodes.IN_PROGRESS) {
                                // operation (e.g. sign in) is in progress already
                            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                                // play services not available or outdated
                            } else {
                                // some other error happened
                            }
                        }
                    }}
                    disabled={isAuthenticating}
                    style={{
                        width: '100%',
                        height: 48,
                        marginTop: 10,
                        borderRadius: 8,
                    }}
                />

            </View>
        </View>
    );
}
