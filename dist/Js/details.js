import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import {
  getFirestore,
  collection,
  addDoc
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyD5PhVdnXunUw-4ihwJ9OE6dsqaGYBdEBk',
  authDomain: 'real-estate-fecff.firebaseapp.com',
  projectId: 'real-estate-fecff',
  storageBucket: 'real-estate-fecff.appspot.com',
  messagingSenderId: '1058779905381',
  appId: '1:1058779905381:web:1584bee9cacddbfb63b58c',
  measurementId: 'G-99YNWHVJVM'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const selectedProperty = JSON.parse(localStorage.getItem('selectedProperty'))

if (selectedProperty) {
  function updateMainImage(imageUrl) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
      mainImage.src = imageUrl; // Update the src of the main image
    }
  }

  document.getElementById('propertyDetails').innerHTML = `
          <div class="mt-4">
              <img id="mainImage" src="${selectedProperty.main_image}" alt="Main Image" class="rounded-lg w-full h-96 object-cover">
            </div>
            <div class="gap-4 grid grid-cols-4 mt-4" id="thumbnailContainer">
              <img src="${selectedProperty.main_image}" alt="Main Image" class="rounded-lg w-full h-24 cursor-pointer object-cover thumbnail" data-url="${selectedProperty.main_image}">
              ${selectedProperty.images.map(image => `
                <img src="${image}" alt="Property Image" class="rounded-lg w-full h-24 cursor-pointer object-cover thumbnail" data-url="${image}">
              `).join('')}
            </div>
    <h1 class="mt-4 font-bold text-3xl text-gray-800">${
      selectedProperty.price
    }</h1>
    <p class="font-semibold text-gray-600 text-lg">${selectedProperty.type}</p>
    <p class="text-gray-500 text-sm">${selectedProperty.location}</p>

    <div class="gap-4 grid grid-cols-2 mt-4">
      <div class="flex items-center">
        <i class="mr-2 text-red-500 fa-bed fas"></i>
        <p class="text-lg"><span class="font-bold text-orange-500">Bedroom:</span> ${
          selectedProperty.bedrooms
        }</p>
      </div>
      <div class="flex items-center">
        <i class="mr-2 text-blue-500 fa-bath fas"></i>
        <p class="text-lg"><span class="font-bold text-orange-500">Bathroom:</span> ${
          selectedProperty.bathrooms
        }</p>
      </div>
      <div class="flex items-center">
        <i class="mr-2 text-green-500 fa-car fas"></i>
        <p class="text-lg"><span class="font-bold text-orange-500">Car Parking:</span> ${
          selectedProperty.parking
        }</p>
      </div>
      <div class="flex items-center">
        <i class="mr-2 text-yellow-500 fa-ruler-combined fas"></i>
        <p class="text-lg"><span class="font-bold text-orange-500">Super Area:</span> ${
          selectedProperty.super_area
        }</p>
      </div>
      <div class="flex items-center">
        <i class="mr-2 text-purple-500 fa-building fas"></i>
        <p class="text-lg"><span class="font-bold text-orange-500">Floor:</span> ${
          selectedProperty.floor
        }</p>
      </div>
    </div>

    <div class="border-gray-200 mt-6 pt-4 border-t">
      <p class="mb-2 text-gray-700"><strong>Status:</strong> ${
        selectedProperty.status
      }</p>
      <p class="mb-2 text-gray-700"><strong>Furnish Type:</strong> ${
        selectedProperty.furnish_type
      }</p>
      <p class="mb-2 text-gray-700"><strong>Balcony:</strong> ${
        selectedProperty.balcony
      }</p>
      <p class="text-gray-700">${selectedProperty.details}</p>
    </div>

    <button id="contactButton" class="bg-red-500 hover:bg-red-600 mt-6 px-4 py-2 rounded font-bold text-white">
      Contact Us
    </button>
  `;
  // Add event listeners to all thumbnail images after the HTML is rendered
  document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
      const imageUrl = this.getAttribute('data-url');  // Get the URL from data-url attribute
      updateMainImage(imageUrl);  // Update the main image when clicked
    });
  });
} else {
  document.getElementById('propertyDetails').innerHTML = `
    <p class="text-red-500">No property details available.</p>
  `
}

const contactButton = document.getElementById('contactButton')
const contactModal = document.getElementById('contactModal')
const contactForm = document.getElementById('contactForm')

contactButton.addEventListener('click', () => {
  contactModal.classList.remove('hidden')
})

contactForm.addEventListener('submit', async e => {
  e.preventDefault()
  const name = document.getElementById('name').value
  const commission = document.getElementById('commission').value
  const purchaseDate = document.getElementById('purchaseDate').value
  const contactNumber = document.getElementById('contactNumber').value
  const currentDate = new Date().toISOString()

  try {
    await addDoc(collection(db, 'contacts'), {
      name,
      commission,
      purchaseDate,
      contactNumber,
      submittedAt: currentDate
    })
    formMessage.textContent = 'Form submitted successfully!'
    formMessage.classList.add('text-green-500')
    formMessage.classList.remove('text-red-500')

    contactForm.reset()
  } catch (error) {
    console.error('Error saving data:', error)
    formMessage.textContent = 'Caught Error!'
    formMessage.classList.add('text-red-500')
  }
})

const closeModalButton = document.getElementById('closeModalButton')

closeModalButton.addEventListener('click', closeModal)

function closeModal () {
  contactModal.classList.add('hidden')
  formMessage.textContent = ''
}

const similarProperties = [
  {
    price: '₹50,00,000',
    type: 'Apartment',
    location: 'Mumbai, India',
    main_image:
      'https://www.ansariandassociates.com/images/residential-projects/lake-view-house/big/1-lake-view-house-exterior.jpg'
  },
  {
    price: '₹45,00,000',
    type: 'Condo',
    location: 'Delhi, India',
    main_image:
      'https://www.world-architects.com/images/Projects/39/08/64/ef9d49ccb998439d92c2592f2f919e87/ef9d49ccb998439d92c2592f2f919e87.6e7b65d0.jpg'
  },
  {
    price: '₹60,00,000',
    type: 'House',
    location: 'Bangalore, India',
    main_image:
      'https://architecturesstyle.b-cdn.net/wp-content/uploads/2023/08/Lake-House-with-Wrap-Around-Balcony-6.jpg'
  }
]

document.getElementById('similarProperties').innerHTML = similarProperties
  .map(
    property => `
  <div class="items-center border-gray-200 bg-gray-50 shadow-md hover:shadow-lg p-4 border rounded-lg text-center transition-shadow duration-300">
    <div class="flex justify-center">
      <img src="${property.main_image}" alt="Property Image" class="rounded-lg w-60 h-60 object-cover">
    </div>
    <div>
      <h3 class="font-bold text-gray-900 text-lg">${property.price}</h3>
      <p class="text-gray-700">${property.type}</p>
      <p class="text-gray-600 text-sm">${property.location}</p>
    </div>
  </div>
`
  )
  .join('')

