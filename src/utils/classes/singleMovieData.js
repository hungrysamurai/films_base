export default class SingleMovieData {
  constructor(itemData, creditsData, lang, imagesUrlBase, mediaType) {

    this.creditsData = creditsData;
    this.itemData = itemData;
    this.lang = lang;
    this.mediaType = mediaType;

    this.title = this.itemData.title
      ? this.itemData.title
      : this.itemData.name;
    this.poster = itemData.poster_path
      ? `${imagesUrlBase}${itemData.poster_path}`
      : `${import.meta.env.BASE_URL}assets/images/no-poster.jpg`;
    this.data =
      this.mediaType === "movie" ? this.getMovieData() : this.getTVSeriesData();
    this.description = this.itemData.overview;
  }

  getMovieData() {
    return [
      ...(this.itemData.release_date
        ? [
          {
            [`${this.lang === "en" ? "Release date" : "Дата выхода"}`]:
              this.getReleaseDate(this.itemData.release_date, this.lang),
          },
        ]
        : []),
      ...(this.itemData.genres.length > 0
        ? [
          {
            [`${this.lang === "en" ? "Genres" : "Жанр"}`]:
              this.getGenresList(),
          },
        ]
        : []),
      ...(this.itemData.production_countries.length > 0
        ? [
          {
            [`${this.lang === "en" ? "Country" : "Страна"}`]:
              this.getCountriesList(),
          },
        ]
        : []),
      ...(this.getDirector()
        ? [
          {
            [`${this.lang === "en" ? "Director" : "Режиссёр"}`]: this.director
          },
        ]
        : []),
      ...(this.itemData.budget
        ? [
          {
            [`${this.lang === "en" ? "Budget" : "Бюджет"}`]:
              this.getBudgetString(this.itemData.budget),
          },
        ]
        : []),
      ...(this.itemData.revenue
        ? [
          {
            [`${this.lang === "en" ? "Revenue" : "Сборы"}`]:
              this.getBudgetString(this.itemData.revenue),
          },
        ]
        : []),
      ...(this.itemData.runtime
        ? [
          {
            [`${this.lang === "en" ? "Runtime" : "Продолжительность"}`]:
              this.getRuntime(this.itemData.runtime),
          },
        ]
        : []),
      ...(this.itemData.vote_average
        ? [
          {
            [`${this.lang === "en" ? "TMDB Rating" : "Рейтинг TMDB"}`]:
              this.itemData.vote_average,
          },
        ]
        : []),
    ];
  }

  getTVSeriesData() {
    return [
      ...(this.itemData.first_air_date
        ? [
          {
            [`${this.lang === "en" ? "Release date" : "Дата выхода"}`]:
              this.getReleaseDate(this.itemData.first_air_date),
          },
        ]
        : []),
      ...(this.itemData.genres.length > 0
        ? [
          {
            [`${this.lang === "en" ? "Genres" : "Жанр"}`]:
              this.getGenresList(),
          },
        ]
        : []),
      ...(this.itemData.production_countries.length > 0
        ? [
          {
            [`${this.lang === "en" ? "Country" : "Страна"}`]:
              this.getCountriesList(),
          },
        ]
        : []),
      ...(this.itemData.number_of_seasons
        ? [
          {
            [`${this.lang === "en" ? "Total Seasons" : "Всего сезонов"}`]:
              this.itemData.number_of_seasons,
          },
        ]
        : []),
      ...(this.itemData.number_of_episodes
        ? [
          {
            [`${this.lang === "en" ? "Total episodes" : "Серий"}`]:
              this.itemData.number_of_episodes,
          },
        ]
        : []),
      ...(this.itemData.vote_average
        ? [
          {
            [`${this.lang === "en" ? "TMDB Rating" : "Рейтинг TMDB"}`]:
              this.itemData.vote_average,
          },
        ]
        : []),
    ];
  }

  getCountriesList() {
    return this.itemData.production_countries.reduce(
      (string, current, i) => {
        return i === 0
          ? this.getCountryName(current.iso_3166_1, this.lang)
          : `${string}, ${this.getCountryName(current.iso_3166_1, this.lang)}`;
      },
      ""
    );
  }

  getCountryName(iso_string) {
    const countryName = new Intl.DisplayNames([this.lang], { type: "region" });
    return countryName.of(iso_string);
  }

  getReleaseDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDay() + 1;

    let month = this.getMonths(this.lang)[date.getMonth()];
    if (this.lang === "ru") {
      month =
        month[month.length - 1] === "ь"
          ? month.slice(0, -1) + "я"
          : month[month.length - 1] === "й"
            ? month.slice(0, -1) + "я"
            : month + "а";
    }

    const year = date.getFullYear();

    if (this.lang === "en") {
      return `${month} ${day}, ${year}`;
    } else {
      return `${day} ${month} ${year} г.`;
    }
  }

  getMonths() {
    return Array.from({ length: 12 }, (_, i) =>
      new Intl.DateTimeFormat(this.lang, { month: "long" }).format(
        new Date(0, i)
      )
    );
  }

  getGenresList() {
    return this.itemData.genres.reduce((string, current, i) => {
      return i === 0
        ? current.name[0].toUpperCase() + current.name.slice(1)
        : `${string}, ${current.name}`;
    }, "");
  }

  getBudgetString(num) {
    const USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return USDollar.format(num);
  }

  getRuntime(mins) {
    const totalHours = Math.floor(mins / 60);
    const appMins = mins % 60;

    let hoursEndString;
    let minutesEndString;

    if (this.lang === "ru") {
      const hoursString = String(totalHours);
      const minsString = String(appMins);

      if (hoursString[hoursString.length - 1] === "1") {
        hoursEndString = "час";
      } else if (
        Number(hoursString[hoursString.length - 1]) > 1 &&
        Number(hoursString[hoursString.length - 1]) < 5
      ) {
        hoursEndString = "часа";
      } else {
        hoursEndString = "часов";
      }

      if (minsString[minsString.length - 1] === "1") {
        minutesEndString = "минута";
      } else if (
        Number(minsString[minsString.length - 1]) > 1 &&
        Number(minsString[minsString.length - 1]) < 5
      ) {
        minutesEndString = "минуты";
      } else {
        minutesEndString = "минут";
      }

      if (
        minsString === "11" ||
        minsString === "12" ||
        minsString === "13" ||
        minsString === "14"
      ) {
        minutesEndString = "минут";
      }

      if (totalHours === 0) {
        return `${minsString} ${minutesEndString}`;
      }

      if (appMins === 0) {
        return `${hoursString} ${hoursEndString}`;
      }

      return `${hoursString} ${hoursEndString} ${minsString} ${minutesEndString}`;
    }

    if (this.lang === "en") {
      if (totalHours === 1) {
        hoursEndString = "hour";
      } else {
        hoursEndString = "hours";
      }

      if (appMins === 1) {
        minutesEndString = "minute";
      } else {
        minutesEndString = "minutes";
      }

      if (totalHours === 0) {
        return `${appMins} ${minutesEndString}`;
      }

      return `${totalHours} ${hoursEndString} ${appMins} ${minutesEndString}`;
    }
  }

  getDirector() {
    this.director = this.creditsData.crew.find(person => person.job === 'Director').name;
    return this.director;
  }
}
