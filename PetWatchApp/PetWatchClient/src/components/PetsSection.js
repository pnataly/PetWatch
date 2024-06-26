import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPetsByUserId } from '../services/petService'; 
import PetCard from './PetCard';
import AddPetForm from './AddPetForm';
import '../styles/PetsSection.css';

const PetsSection = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();

    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isAddPetPopupOpen, setIsAddPetPopupOpen] = useState(false);


    const fetchData = async () => {
        try {
            const userPets = await getPetsByUserId(user._id, token);
            setPets(userPets);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(true);
            setLoading(false);
        }
      };
    

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    if (loading) {
        return (
          <div className="loading-container">
              <div className="loading-spinner"></div>
              <div>Loading...</div>
          </div>
        );
      }
    
    if (error) {
        return (
            <div className='error-container'>
                <p>Failed to fetch user data. Please try again later.</p>
                <button className='btn' onClick={fetchData}>Retry</button>
            </div>
        );
    }

    const handleAddNewPetClick = () => {
        // navigate('/add-pet');
        setIsAddPetPopupOpen(true);
      };  
    
      const handleClosePopup = () => {
        setIsAddPetPopupOpen(false);
      };
    

    return (
    <div className="pets-section-container">
        <h3>Welcome to the Pets Section!</h3>
        <p>Here you can see your pets:</p>
        { pets.length > 0 
        ?
            <>
            <div className="pet-grid">
                {pets.map((pet, index) => (
                    <div key={index}>
                        <PetCard 
                            key={pet._id}
                            pet={pet}
                        />
                    </div>
                ))}
            </div>  
            <p>You can click on a pet card to view more details.</p>
            </>
        :
        <p>No pets added yet.</p>         
        }
        
        <p>you can add new pet.</p>

        <button className='btn' onClick={handleAddNewPetClick} >Add New Pet</button>
        
        <AddPetForm 
        open={isAddPetPopupOpen}
        handleClose={handleClosePopup}
        />
    </div>  
    );
};

export default PetsSection;
