import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { anonKey, supaURl } from '../constants/supabase';

const supabaseURl = supaURl
const supabaseAnonKey = anonKey

export const supabase = createClient(supabaseURl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})