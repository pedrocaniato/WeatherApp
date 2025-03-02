const apiKey = "9625cecb91a1bee9c5d296a81e5a2e76";
const unsplashApiKey = "_O-9RBaA_jNDlixYUjh5CJ1C4muahMLzkkOtpepf-YU"; 

const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search");
const weatherData = document.getElementById("weather-data");
const errorMessage = document.getElementById("error-message");
const loader = document.getElementById("loader");

// Função para buscar os dados do clima
const getWeatherData = async (city) => {
  try {
    loader.classList.remove("hide");
    errorMessage.classList.add("hide");
    weatherData.classList.add("hide");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error("Cidade não encontrada");
    }

    document.getElementById("city").textContent = data.name;
    document.getElementById("temperature").innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("umidity").innerHTML = `<i class="fa-solid fa-droplet"></i> ${data.main.humidity}%`;
    document.getElementById("wind").innerHTML = `<i class="fa-solid fa-wind"></i> ${data.wind.speed} km/h`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    // Adicionando a bandeira do país
    const countryCode = data.sys.country;
    document.getElementById("country").src = `https://flagsapi.com/${countryCode}/shiny/64.png`;

    // Buscar o estado (região)
    getState(data.coord.lat, data.coord.lon);

    weatherData.classList.remove("hide");

    setBackgroundImage(city); // Chama a função para trocar o fundo

  } catch (error) {
    errorMessage.classList.remove("hide");
  } finally {
    loader.classList.add("hide");
  }
};

// Função para buscar o estado com base na latitude e longitude
const getState = async (lat, lon) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await response.json();

    if (data.address && data.address.state) {
      document.getElementById("state").textContent = data.address.state;
    } else {
      document.getElementById("state").textContent = "Estado não encontrado";
    }
  } catch (error) {
    console.error("Erro ao buscar o estado:", error);
    document.getElementById("state").textContent = "Erro ao buscar o estado";
  }
};

// Função para buscar e definir imagem de fundo com base na cidade
const setBackgroundImage = async (city, country = "") => {
  try {
    // Melhorando a precisão da busca com termos mais específicos
    const query = `${city} ${country} skyline, cityscape, downtown`;
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashApiKey}&orientation=landscape`;
    
    const response = await fetch(unsplashUrl);
    const data = await response.json();

    if (data.urls && data.urls.regular) {
      document.body.classList.add("bg-image");
      document.body.style.backgroundImage = `url('${data.urls.regular}')`;
    } else {
      console.warn("Nenhuma imagem relevante encontrada para:", city);
      setDefaultBackground();
    }
  } catch (error) {
    console.error("Erro ao carregar imagem de fundo:", error);
    setDefaultBackground();
  }
};

// Função de fallback para caso a API falhe
const setDefaultBackground = () => {
  document.body.classList.add("bg-image");
  document.body.style.backgroundImage = "url('caminho_para_imagem_padrao.jpg')";
};


// Evento de clique no botão de busca
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeatherData(city);
});

// Evento para permitir pressionar Enter no input
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeatherData(city);
  }
});

document.getElementById("search").addEventListener("click", function () {
  const cityInput = document.getElementById("city-input").value.trim();
  if (cityInput !== "") {
    document.getElementById("suggestions").classList.add("hide"); // Esconde sugestões
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const suggestionButtons = document.querySelectorAll("#suggestions button");
  const cityInput = document.getElementById("city-input");

  suggestionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cityInput.value = button.textContent; // Preenche o input
      cityInput.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" })); // Simula o Enter
    });
  });
});