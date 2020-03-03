//Elementy
const Genders = [...document.querySelectorAll(".gender")];
const bodyTypes = [...document.querySelectorAll(".bodyType__photo")];
const form = document.querySelector(".board__form");
const Pop = document.querySelector(".board__incorrectData");

//Współczynniki
let NEAT = 0;
let GenderValue = 0;
// Non-Exercise Activity Thermogenesis(NEAT)
// Link do badań: https://www.ahajournals.org/doi/full/10.1161/01.atv.0000205848.83210.73

$(".header__start").on("click", function(e) {
  $(".wrapper").addClass("active");
  document.body.style.overflowY = "auto";
  e.preventDefault();
  $("body, html").animate(
    {
      scrollTop: $("section.app__board").offset().top
    },
    1000
  );
});
//Zegar
const CLOCK = document.querySelector(".clockBoard__clock");
const clock = () => {
  const Time = new Date();

  const hours = Time.getHours() < 10 ? "0" + Time.getHours() : Time.getHours();
  const minutes =
    Time.getMinutes() < 10 ? "0" + Time.getMinutes() : Time.getMinutes();
  const seconds =
    Time.getSeconds() < 10 ? "0" + Time.getSeconds() : Time.getSeconds();

  CLOCK.textContent = `${hours} - ${minutes} - ${seconds}`;
};
setInterval(clock, 1000);

//Wybór płci
let genderIndex = 0;
Genders.forEach(gender =>
  gender.addEventListener("click", function(e) {
    e.preventDefault();
    Genders.forEach(function(gender) {
      gender.classList.remove("active");
      genderIndex = 0;
    });
    e.target.classList.add("active");
    genderIndex = 1;
  })
);

//Dodanie do wzoru wartości w zależności od płci
const checkSex = function() {
  if (Genders[0].classList.contains("active")) {
    GenderValue = -161;
  } else if (Genders[1].classList.contains("active")) {
    GenderValue = 5;
  }
};
Genders.forEach(gender => gender.addEventListener("click", checkSex));

//Wybór sylwetki
let bodyTypeIndex = 0;
bodyTypes.forEach(type =>
  type.addEventListener("click", function(e) {
    bodyTypes.forEach(function(type) {
      type.classList.remove("active");
      bodyTypeIndex = 0;
    });
    e.target.classList.add("active");
    bodyTypeIndex = 1;
  })
);

//Zamknięcie Popupu z błędem
const closePop = document.querySelector(".board__closePop");
closePop.addEventListener("click", function() {
  Pop.classList.remove("active");
});

//Progress bar
const BAR = document.querySelector(".bar");
const load = function() {
  BAR.classList.add("loading");
  setTimeout(function() {
    BAR.textContent = "100%";
  }, 2250);
  setTimeout(function() {
    BAR.textContent = "";
    BAR.classList.add("disappear");
  }, 3000);
};

//Główna funkcja
const CountCalories = function(e) {
  e.preventDefault();
  const AgeInput = document.querySelector(".input__age");
  const WeightInput = document.querySelector(".input__weight");
  const TallInput = document.querySelector(".input__tall");

  //Sprawdzenie wieku,wagi,wzrostu pod kątem tego czy pole jest puste bądź wartość jest mniejsza od 0, płci i budowy sylwetki(zaznaczone czy nie)
  if (
    AgeInput.value === "" ||
    WeightInput.value === "" ||
    TallInput.value === "" ||
    AgeInput.value <= 0 ||
    WeightInput.value <= 0 ||
    TallInput.value <= 0 ||
    genderIndex === 0 ||
    bodyTypeIndex === 0
  ) {
    Pop.classList.add("active");
    $("html").animate(
      {
        scrollTop: $(".board__form").offset().top
      },
      1000
    );
    return;
  } else {
    load();
    let AgeScore = 4.92 * AgeInput.value;
    let WeightScore = 9.99 * WeightInput.value;
    let TallScore = 6.25 * TallInput.value;

    //Dodanie odpowiedniej wartośći do NEAT w zależności od typu sylwetki
    if (bodyTypes[0].classList.contains("active")) {
      NEAT = 900;
    } else if (bodyTypes[1].classList.contains("active")) {
      NEAT = 500;
    } else if (bodyTypes[2].classList.contains("active")) {
      NEAT = 400;
    }

    const mainScore = WeightScore + TallScore - AgeScore + GenderValue;
    const mainScore2 = mainScore + NEAT;

    //Przekazanie wyniku do elementu
    const Score = document.querySelector(".result__score");
    Score.textContent = `${Math.floor(mainScore)} kcal`;
    //Wynik z wartością NEAT
    const FullScore = document.querySelector(".result__fullScore");
    FullScore.textContent = `${Math.floor(mainScore2)} kcal`;

    //Ukazanie sekcji z wynikiem
    const Result = document.querySelector(".app__result");
    setTimeout(function() {
      Result.classList.add("active");
      $("html").animate(
        {
          scrollTop: $(".result__score").offset().top
        },
        1000
      );
    }, 3000);
    setTimeout(function() {
      const scoreDescriptions = [
        ...document.querySelectorAll(".result__scoreDescription")
      ];
      scoreDescriptions.forEach(scoreDescription =>
        scoreDescription.classList.add("active")
      );
    }, 2000);
  }
};
form.addEventListener("submit", CountCalories);
