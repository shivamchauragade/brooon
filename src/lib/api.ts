import axios from 'axios';
export async function getUsers(
  page: number,
  pageLimit: number,
  country: string
) {
  try {
    const res = await axios.get(
      `https://stagingapi.brooon.com/v1/user/get?page=${page}&limit=${pageLimit}` +
        (country ? `&search=${country}` : '')
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateAssociationVerification(id, isVerified) {
  try {
    const res = await axios.put(
      `https://stagingapi.brooon.com/v1/association/verify/${id}`,
      { verified: isVerified }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAssociation(
  page: number,
  pageLimit: number,
  country: string
) {
  try {
    const res = await axios.get(
      `https://stagingapi.brooon.com/v1/association/get?page=${page}&limit=${pageLimit}` +
        (country ? `&search=${country}` : '')
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addAssociation(data: any) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('code', data.code);
  formData.append('city', data.city);
  formData.append('state', data.state);
  formData.append('picture', data.image);

  try {
    const res = await axios.post('https://stagingapi.brooon.com/v1/association/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Failed to add association:', error);
    throw error;
  }
}

export async function deleteAssociation(id: number) {
  try {
    const res = await axios.delete(`https://stagingapi.brooon.com/v1/association/delete/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Failed to delete association:', error);
    throw error;
  }
}
export async function updateAssociation(id, data: any) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('code', data.code);
  formData.append('city', data.city);
  formData.append('state', data.state);
  
  if (data.image) {
    formData.append('picture', data.image);
  }

  try {
    const res = await axios.put(`https://stagingapi.brooon.com/v1/association/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Failed to update association:', error);
    throw error;
  }
}


export async function getAssociationByID(id) {
  try {
    const res = await axios.get(`https://stagingapi.brooon.com/v1/association/get/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error('Failed to get association by ID:', error);
    throw error;
  }
}