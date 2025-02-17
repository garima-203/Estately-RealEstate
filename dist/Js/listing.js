const API_URL = 'https://garima-203.github.io/Estately-Json/data.json'
const resultsContainer = document.getElementById('results')
const urlParams = new URLSearchParams(window.location.search)
const searchQuery = urlParams.get('search')?.toLowerCase() || ''
document.getElementById('locationSearch').value = searchQuery

let properties = []
let currentPage = 1
const itemsPerPage = 6

async function fetchData () {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    const filteredProperties = data.properties.filter(property =>
      property.location.toLowerCase().includes(searchQuery)
    )
    properties = data.properties
    displayResults(filteredProperties)
  } catch (error) {
    console.error('Error fetching data:', error)
    resultsContainer.innerHTML = `<p class="text-red-500">Error fetching data. Please try again later.</p>`
  }
}

function displayResults (data) {
  if (!data || data.length === 0) {
    resultsContainer.innerHTML = `<p class="text-gray-500">No results found.</p>`
    return
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = data.slice(startIndex, endIndex)
  resultsContainer.innerHTML = paginatedData
    .map(
      property => `
        <div class="shadow-lg bg-white rounded-lg flex flex-col">
            <!-- Image Section -->
            <img src="${property.main_image}" 
                 class="rounded-t-lg object-cover w-full h-48" 
                 alt="${property.location}">
            
            <!-- Content Section -->
            <div class="p-4 flex flex-col justify-between flex-grow">
                <div>
                    <!-- Property Type -->
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                    <i class="text-orange-500 fa-home fas"></i>
                        <span class="text-orange-500">${
                          property.type || 'N/A'
                        }</span>
                    </h3>
                    <!-- Property Details -->
                    <p class="text-sm text-gray-600">
                    <i class="fa-map-marker-alt text-orange-500 fas"></i>
                        <strong>Location:</strong> ${
                          property.location || 'Unknown'
                        }
                    </p>
                    <p class="text-sm text-gray-600">
                    <i class="text-orange-500 fa-tag fas"></i> 
                        <strong>Price:</strong> ${property.price || 'N/A'}
                    </p>
                    <p class="text-sm text-gray-600">
                    <i class="text-orange-500 fa-bed fas"></i> 
                        <strong>Bedrooms:</strong> ${property.bedrooms || 'N/A'}
                    </p>
                    <p class="text-sm text-gray-600">
                    <i class="text-orange-500 fa-couch fas"></i>
                        <strong>Furnish Type:</strong> ${
                          property.furnish_type || 'N/A'
                        }
                    </p>
                </div>
    
                <!-- Buttons -->
                <div class="mt-4 flex space-x-2">
                    <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex-1" 
                            onclick="contactProperty(${property.id})">
                        Contact
                    </button>
                    <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex-1" 
                            onclick="viewDetails(${property.id})">
                        View
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join('')

  displayPagination(data.length)
}

function displayPagination (totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginationContainer = document.getElementById('pagination')
  paginationContainer.innerHTML = ''

  const maxPagesToShow = 3
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

  const prevButton = document.createElement('button')
  prevButton.innerText = 'Previous'
  prevButton.classList.add(
    'mx-1',
    'px-2',
    'py-1',
    'bg-orange-500',
    'text-white',
    'rounded'
  )
  prevButton.disabled = currentPage === 1
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--
      filterResults()
    }
  })
  paginationContainer.appendChild(prevButton)

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button')
    pageButton.innerText = i
    pageButton.classList.add('mx-1', 'px-3', 'py-1', 'bg-gray-200', 'rounded')
    if (i === currentPage) {
      pageButton.classList.add('bg-orange-600', 'text-white')
    }
    pageButton.addEventListener('click', () => {
      currentPage = i
      filterResults()
    })
    paginationContainer.appendChild(pageButton)
  }

  const nextButton = document.createElement('button')
  nextButton.innerText = 'Next'
  nextButton.classList.add(
    'mx-1',
    'px-3',
    'py-1',
    'bg-orange-500',
    'text-white',
    'rounded'
  )
  nextButton.disabled = currentPage === totalPages
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++
      filterResults()
    }
  })
  paginationContainer.appendChild(nextButton)
}

function filterResults () {
  let filteredProperties = properties

  const locationQuery = document
    .getElementById('locationSearch')
    .value.trim()
    .toLowerCase()
  const typeQuery = document.getElementById('typeFilter').value.trim()
  const priceQuery = parseInt(document.getElementById('priceRange').value, 10)
  const bedroomQuery = parseInt(
    document.getElementById('bedroomRange').value,
    10
  )
  const furnishQuery = document.getElementById('furnishFilter').value.trim()
  const parkingQuery = document.getElementById('parkingFilter').value.trim()

  if (locationQuery) {
    filteredProperties = filteredProperties.filter(
      property =>
        property.location &&
        property.location.toLowerCase().includes(locationQuery)
    )
  }

  if (typeQuery) {
    filteredProperties = filteredProperties.filter(
      property =>
        property.type && property.type.toLowerCase() === typeQuery.toLowerCase()
    )
  }

  if (priceQuery) {
    filteredProperties = filteredProperties.filter(
      property =>
        parseInt(property.price.replace('₹', '').replace(',', ''), 10) <=
        priceQuery
    )
  }

  if (bedroomQuery) {
    filteredProperties = filteredProperties.filter(
      property => property.bedrooms && property.bedrooms >= bedroomQuery
    )
  }

  if (furnishQuery) {
    filteredProperties = filteredProperties.filter(
      property =>
        property.furnish_type &&
        property.furnish_type.toLowerCase() === furnishQuery.toLowerCase()
    )
  }

  if (parkingQuery) {
    filteredProperties = filteredProperties.filter(
      property =>
        property.parking &&
        property.parking.toLowerCase() === parkingQuery.toLowerCase()
    )
  }

  displayResults(filteredProperties)
}

document
  .getElementById('locationSearch')
  .addEventListener('input', filterResults)
document.getElementById('typeFilter').addEventListener('change', filterResults)
document.getElementById('priceRange').addEventListener('input', filterResults)
document.getElementById('bedroomRange').addEventListener('input', filterResults)
document
  .getElementById('furnishFilter')
  .addEventListener('change', filterResults)
document
  .getElementById('parkingFilter')
  .addEventListener('change', filterResults)

document.getElementById('resetFilters').addEventListener('click', () => {
  document.getElementById('locationSearch').value = ''
  document.getElementById('typeFilter').value = ''
  document.getElementById('priceRange').value = 1000000
  document.getElementById('bedroomRange').value = 5
  document.getElementById('furnishFilter').value = ''
  document.getElementById('parkingFilter').value = ''
  filterResults()
})

function viewDetails (propertyId) {
  const property = properties.find(prop => prop.id === propertyId)
  if (property) {
    localStorage.setItem('selectedProperty', JSON.stringify(property))

    window.location.href = 'details.html'
  }
}

fetchData()
