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

    weatherData.classList.remove("hide");

    setBackgroundImage(city); // Chama a função para trocar o fundo

  } catch (error) {
    errorMessage.classList.remove("hide");
  } finally {
    loader.classList.add("hide");
  }
};

// Função para buscar e definir imagem de fundo com base na cidade
const setBackgroundImage = async (city) => {
  try {
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}&orientation=landscape`;
    const response = await fetch(unsplashUrl);
    const data = await response.json();

    if (data.urls && data.urls.regular) {
      document.body.classList.add("bg-image");
      document.body.style.backgroundImage = `url('${data.urls.regular}')`;
    }
  } catch (error) {
    console.error("Erro ao carregar imagem de fundo:", error);
  }
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
