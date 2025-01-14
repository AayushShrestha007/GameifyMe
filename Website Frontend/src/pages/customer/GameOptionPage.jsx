import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { addItemToCart, getGameOptionByIdApi } from '../../apis/Api';
import CustomerTestimonialCard from '../../components/CustomerTestimonialCard';
import Navbar from '../../components/Navbar';
import { CartContext } from '../../context/cartContext';

const PageContainer = styled.div`
  padding: 20px 20px 20px 20px;
  background-color: #fff;
  display: flex;
  margin-top: 50px;
  flex-direction: column; 
  gap: 10px; 

`;

const MainContent = styled.div`
  display: flex;
  padding: 20px 20px 0px 150px;

`;

const LeftSide = styled.div`
  width: 25%;
  padding: 20px;
`;

const RightSide = styled.div`
  width: 60%;
  padding: 0px 25px 25px 30px;
  background-color: #EBEBEB;
  border-radius: 10px;
`;

const ProductImage = styled.img`
  width: 86%;
  height: auto;
  margin-bottom: 5px;
`;

const AdditionalImagesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const AdditionalImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.5);
    z-index: 1;
  }
`;

const GameOptionName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`;

const AddToCartButton = styled.button`
  width: 87%;
  padding: 12px;
  background-color: #FECF08;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 5px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

const SelectorBox = styled.div`
  padding: 10px 15px;
  border: 1px solid #ccc;
  cursor: pointer;
  color: white;
  font-weight: bold;
  user-select: none;
  border-radius: 5px;
  background-color: ${({ selected }) => (selected ? '#FECF08' : '#ED4708')};
`;

const InputField = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const PoseDescriptionField = styled.textarea`
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 30px; 
  resize: vertical; 
`;

const FileInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 0px;
`;

const Divider = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid #ccc;
`;

const ReviewsHeader = styled.h2`
  text-align: center;
  font-size: 28px;
  color: #ED4708;
  margin: 0px 0;
`;

const TestimonialsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`;

const GameOptionPage = () => {
  const { fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [gameOption, setGameOption] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [displayedPrice, setDisplayedPrice] = useState(0);
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const [poseDescription, setPoseDescription] = useState('');
  const [outfitDescription, setOutfitDescription] = useState('');
  const [mainImageFiles, setMainImageFiles] = useState([]);

  useEffect(() => {
    async function fetchGameOption() {
      try {
        const response = await getGameOptionByIdApi(id);
        if (response.data.success) {
          setGameOption(response.data.gameOption);
        }
      } catch (error) {
        console.error("Error fetching game option:", error);
      }
    }
    fetchGameOption();
  }, [id]);

  useEffect(() => {
    if (gameOption) {
      const basePrice = gameOption.basePrice || 0;
      const count = selectedPeople || 1;
      let total = basePrice;
      if (count > 1) {
        total += (count - 1) * 200;
      }
      setDisplayedPrice(total);
    }
  }, [gameOption, selectedPeople]);

  const handlePeopleSelect = (num) => {
    setSelectedPeople(num);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Prepare form data for file uploads if necessary
    const formData = new FormData();
    formData.append('gameOptionId', id);
    formData.append('peopleCount', selectedPeople || 1);
    formData.append('poseDescription', poseDescription);
    formData.append('outfitDescription', outfitDescription);

    if (backgroundImageFile) {
      formData.append('backgroundImage', backgroundImageFile);
    }
    // Append main image files
    for (let i = 0; i < mainImageFiles.length; i++) {
      formData.append('uploadedImages', mainImageFiles[i]);
    }

    try {
      const response = await addItemToCart(formData);
      if (response.data.success) {
        fetchCart();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Error adding item to cart');
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <MainContent>
          <LeftSide>
            {gameOption ? (
              <>
                <ProductImage
                  src={gameOption.exampleImages && gameOption.exampleImages[0]
                    ? `http://localhost:5500/${gameOption.exampleImages[0]}`
                    : '/assets/path_to_main_product.jpg'}
                  alt={gameOption.name}
                />
                <GameOptionName>{gameOption.name}</GameOptionName>
                <AdditionalImagesContainer>
                  {gameOption.exampleImages && gameOption.exampleImages.slice(1).map((img, index) => (
                    <AdditionalImage
                      key={index}
                      src={`http://localhost:5500/${img}`}
                      alt={`Additional ${index + 1}`}
                    />
                  ))}
                </AdditionalImagesContainer>
                <Price>Price: Rs {displayedPrice}</Price>
                <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
              </>
            ) : (
              <p>Loading product...</p>
            )}
          </LeftSide>

          <RightSide>
            <SectionTitle>No. Of People*</SectionTitle>
            <SelectorContainer>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <SelectorBox
                  key={num}
                  selected={selectedPeople === num}
                  onClick={() => handlePeopleSelect(num)}
                >
                  {num}
                </SelectorBox>
              ))}
            </SelectorContainer>

            <SectionTitle>Choose a Background*</SectionTitle>
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                console.log('Selected background image file:', file);
                setBackgroundImageFile(file);
              }}
            />

            <SectionTitle>Pose Description*</SectionTitle>
            <PoseDescriptionField
              placeholder="Enter pose description"
              value={poseDescription}
              onChange={(e) => setPoseDescription(e.target.value)}
            />

            <SectionTitle>Outfit Description*</SectionTitle>
            <InputField
              type="text"
              placeholder="Enter outfit description"
              value={outfitDescription}
              onChange={(e) => setOutfitDescription(e.target.value)}
            />

            <SectionTitle>Select Main Image*</SectionTitle>
            <FileInput
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setMainImageFiles(e.target.files)}
            />
          </RightSide>
        </MainContent>

        <Divider />
        <ReviewsHeader>Customer Reviews</ReviewsHeader>

        <TestimonialsContainer>
          <CustomerTestimonialCard
            image="/assets/images/testimonial/testimonial 1.png"
            testimonial="This service is amazing! Highly recommended."
            name="John Doe"
          />
          <CustomerTestimonialCard
            image="/assets/images/testimonial/testimonial 2.png"
            testimonial="Really good customer support. I will buy again for sure"
            name="Steve Johnson"
          />
          <CustomerTestimonialCard
            image="/assets/images/testimonial/testimonial 3.png"
            testimonial="An incredible experience from start to finish."
            name="Jane Smith"
          />
        </TestimonialsContainer>
      </PageContainer>
    </>
  );
};

export default GameOptionPage;
