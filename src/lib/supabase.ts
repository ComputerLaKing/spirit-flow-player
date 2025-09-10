import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Audio upload function
export const uploadAudio = async (file: File, fileName: string) => {
  const { data, error } = await supabase.storage
    .from('audio-files')
    .upload(`tracks/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) throw error
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('audio-files')
    .getPublicUrl(`tracks/${fileName}`)
  
  return publicUrl
}

// Get all uploaded audio files
export const getAudioFiles = async () => {
  const { data, error } = await supabase.storage
    .from('audio-files')
    .list('tracks/')
  
  if (error) throw error
  return data
}