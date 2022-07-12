const SUPABASE_URL = 'https://lbhcxvyspdaifxljifnq.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiaGN4dnlzcGRhaWZ4bGppZm5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY1NDE1OTYsImV4cCI6MTk3MjExNzU5Nn0.CYqr69yW5FRoOjB1MgOtYhQ3GS8oEGzFi8VF0D1tAKw';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkResponse({ data, error }) {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
    }
    return data;
}

export async function getPrefectures() {
    const response = await client
        .from('prefectures')
        .select(`
            id, 
            prefName`
        );
    return checkResponse(response);
}

export async function getPrefectureRice() {
    const response = await client
        .from('prefectures')
        .select(`
        id, 
        prefName, 
        kome(
            id,
            prefID, 
            riceName
        )`)
        .order('created_at', { ascending: false });
    return checkResponse(response);
}

export async function getRicePrefecture() {
    const response = await client
        .from('kome')
        .select(`
            riceName, 
            created_at, 
            prefID, 
            id, 
            prefectures(
                prefName, 
                id
            )`)
        .order('created_at', { ascending: false });
    return checkResponse(response);
}

export async function addRice(riceName, prefID) {
    const response = await client
        .from('kome')
        .insert({
            riceName,
            prefID
        })
        .single();
    return checkResponse(response);
}

export async function deleteRice(id) {
    const response = await client
        .from('kome')
        .delete()
        .eq('id', id)
        .single();
    return checkResponse(response);
}