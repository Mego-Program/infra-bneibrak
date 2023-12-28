import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, CircularProgress, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { cl } from '../App';
import axios from 'axios'; 


const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const image = acceptedFiles[0];
    setSelectedImage(image);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleImageUpload = async () => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/megobb/image/upload?upload_preset=fu3u8uef&public_id=${uuidv4()}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);

      const imageUrl = cl.url(data.public_id, { secure: true });
      setUploadedImageUrl(imageUrl);
      console.log('Image uploaded successfully:', imageUrl);
    
  // Make a PUT request to update the server with the imageUrl
  await axios.put('http://localhost:5000/api/users/imageUrl', { imageUrl });
  console.log('Server updated with imageUrl:', imageUrl);
} catch (error) {
  console.error('Error uploading image:', error);
} finally {
  setUploading(false);
}
};

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <div {...getRootProps()} style={{ textAlign: 'center' }}>
            <input {...getInputProps()} />
            <Typography variant="h6">Select Image</Typography>
          </div>
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ marginTop: 20, maxWidth: '100%' }}
            />
          )}
          {selectedImage && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleImageUpload}
              style={{ marginTop: 20 }}
              disabled={uploading}
            >
              {uploading ? <CircularProgress size={24} /> : 'Upload Image'}
            </Button>
          )}
        </Grid>
        {uploadedImageUrl && (
          <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <div style={{ marginTop: 10 }}>
              <Typography variant="body1">Uploaded Image:</Typography>
              <img src={uploadedImageUrl} alt="Uploaded" style={{ marginTop: 10, maxWidth: '100%' }} />
            </div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ImageUploader;
