import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { createGameOptionApi } from '../../apis/Api';
import AdminNavbar from '../../components/AdminNavbar';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;

  margin: 80px auto;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const Heading = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 18px;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #FECF08;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`;

const Message = styled.p`
  font-size: 20px;
  color: #666;
  text-align: center;
  margin-top: 40px;
`;

const AddGameOption = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate at least 5 files are selected
    if (selectedFiles.length < 5) {
      toast.error('Please select at least 5 images.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('basePrice', basePrice);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('exampleImages', selectedFiles[i]);
    }

    try {
      const res = await createGameOptionApi(formData);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Error creating game option');
      console.error(error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <Container>
        <Heading>Add Game Option</Heading>
        <Form onSubmit={handleSubmit}>
          <Label>Name*</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Label>Description</Label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />

          <Label>Base Price</Label>
          <Input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(Number(e.target.value))}
          />

          <Label>Example Images (Select at least 5)</Label>
          <Input
            type="file"
            multiple
            onChange={(e) => setSelectedFiles(e.target.files)}
          />

          <SubmitButton type="submit">Create Game Option</SubmitButton>
        </Form>
      </Container>
    </>
  );
};

export default AddGameOption;
