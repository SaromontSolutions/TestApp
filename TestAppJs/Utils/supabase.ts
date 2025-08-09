import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zmeiaypvcfrthohgyksx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZWlheXB2Y2ZydGhvaGd5a3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Mjg0OTQsImV4cCI6MjA3MDIwNDQ5NH0.3caVdzgRqHkQWsZBiD2CgilsmV-SYBxQxgtut5pPPRs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
