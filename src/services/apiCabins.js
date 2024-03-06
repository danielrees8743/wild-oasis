import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

export const createEditCabin = async (newCabin, id) => {
  // check to see if the image is already on supabase storage
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // crate the image name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');

  // create the image path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // 1. Create/edit the cabin
  let query = supabase.from('cabins');

  // A. Create the cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B. Edit the cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload the image
  if (hasImagePath) return;

  const { error: storageError } = await supabase.storage
    .from('cabins')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('Image could not be uploaded');
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted');
  }
};
