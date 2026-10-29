import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const FUNCTION_NAME = 'hyper-function';
export const supabase = createClient(
  'https://swsxmlgoavjeklccylsc.supabase.co',
  'sb_publishable_dYFZUkr5IJY9KPiWtShDlg_Exay5I9G',
  { auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false } }
);
